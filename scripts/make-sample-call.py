#!/usr/bin/env python3
"""Make the concierge sample call for the "Hear a sample call" player in the
story (src/components/Story.tsx).

Free, offline (Kokoro, Apache-2.0 model; kokoro-onnx, MIT). British voices,
the closest it has to Australian:
  pip install kokoro-onnx soundfile   # in a venv
  # model files: github.com/thewh1teagle/kokoro-onnx/releases (kokoro-v1.0.onnx, voices-v1.0.bin)
  python scripts/make-sample-call.py --engine kokoro --kokoro-dir <folder> [--agent bf_emma --caller bf_isabella]

ElevenLabs (Australian voices, needs the account's key as a secret):
  ELEVENLABS_API_KEY=... python3 scripts/make-sample-call.py            # pick voices automatically
  python3 scripts/make-sample-call.py --list                            # show Australian voices on the account

Reads the CEO-approved lines from src/data/sample-call.json, voices each one
(the AI agent and Mel get different Australian voices), joins them with short
natural pauses, and writes:
  public/audio/concierge-sample.mp3
  src/data/sample-call.json  ->  "audio": { src, duration, starts, peaks, voices }
The site only shows the player once "audio" is set (CEO rule: no dead play button).

Use voices you are licensed to use commercially (ElevenLabs default/library
voices on a paid plan). Never clone a real person. Needs ffmpeg and ffprobe.
"""
import argparse
import array
import json
import os
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data" / "sample-call.json"
OUT = ROOT / "public" / "audio" / "concierge-sample.mp3"
API = "https://api.elevenlabs.io/v1"
GAP = 0.45  # seconds between speakers
PEAKS = 40  # bars in the waveform

p = argparse.ArgumentParser()
p.add_argument("--engine", choices=["elevenlabs", "kokoro"], default="elevenlabs")
p.add_argument("--kokoro-dir", default=".", help="folder with kokoro-v1.0.onnx and voices-v1.0.bin")
p.add_argument("--agent", help="voice id for Jim's AI agent")
p.add_argument("--caller", help="voice id for Mel, the caller")
p.add_argument("--model", default="eleven_multilingual_v2")
p.add_argument("--list", action="store_true", help="list Australian voices and exit")
a = p.parse_args()

key = os.environ.get("ELEVENLABS_API_KEY")
if a.engine == "elevenlabs" and not key:
    sys.exit("Set ELEVENLABS_API_KEY (add it as a secret in the environment settings, never in the repo), or use --engine kokoro.")

def call(path, body=None):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode() if body else None,
                                 headers={"xi-api-key": key, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()

def voices():
    vs = json.loads(call("/voices"))["voices"]
    def aus(v):
        lab = v.get("labels") or {}
        return "austral" in (lab.get("accent", "") + " " + v.get("description", "") + " " + v.get("name", "")).lower()
    return [v for v in vs if aus(v)] or vs

if a.list:
    for v in voices():
        lab = v.get("labels") or {}
        print(f'{v["voice_id"]}  {v["name"]:<24} {lab.get("gender", ""):<8} {lab.get("accent", "")}  {v.get("category", "")}')
    sys.exit()

agent, caller = a.agent, a.caller
if a.engine == "kokoro":
    from kokoro_onnx import Kokoro
    import soundfile
    kok = Kokoro(str(Path(a.kokoro_dir) / "kokoro-v1.0.onnx"), str(Path(a.kokoro_dir) / "voices-v1.0.bin"))
    agent, caller = agent or "bf_emma", caller or "bf_isabella"
    names = {agent: f"Kokoro {agent}", caller: f"Kokoro {caller}"}
elif not (agent and caller):
    vs = voices()
    fem = [v for v in vs if (v.get("labels") or {}).get("gender") == "female"]
    agent = agent or (fem[0] if fem else vs[0])["voice_id"]
    caller = caller or next((v["voice_id"] for v in fem[1:] + vs if v["voice_id"] != agent), vs[-1]["voice_id"])
if a.engine == "elevenlabs":
    names = {v["voice_id"]: v["name"] for v in json.loads(call("/voices"))["voices"]}
print(f"Agent voice: {names.get(agent, agent)}  Caller voice: {names.get(caller, caller)}")

data = json.loads(DATA.read_text())
lines = data["lines"]

def dur(f):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(f)],
                         capture_output=True, text=True, check=True).stdout
    return float(out.strip())

with tempfile.TemporaryDirectory() as d:
    d = Path(d)
    parts, starts, t = [], [], 0.6  # a beat of silence before the agent answers
    def wav(src, dst):  # every part as 44.1 kHz mono PCM so they join cleanly
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-ac", "1", "-ar", "44100",
                        "-c:a", "pcm_s16le", str(dst)], check=True)
    silence = d / "gap.wav"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono",
                    "-t", str(GAP), "-c:a", "pcm_s16le", str(silence)], check=True)
    lead = d / "lead.wav"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono",
                    "-t", "0.6", "-c:a", "pcm_s16le", str(lead)], check=True)
    parts.append(lead)
    for i, line in enumerate(lines):
        voice = agent if line["who"] == "c" else caller
        text = line.get("say", line["text"])
        raw = d / f"raw{i}"
        if a.engine == "kokoro":
            samples, rate = kok.create(text, voice=voice, speed=1.0 if line["who"] == "c" else 1.05, lang="en-gb")
            soundfile.write(str(raw) + ".wav", samples, rate)
            raw = Path(str(raw) + ".wav")
        else:
            raw = Path(str(raw) + ".mp3")
            raw.write_bytes(call(f"/text-to-speech/{voice}?output_format=mp3_44100_128", {
                "text": text, "model_id": a.model,
                "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.2, "use_speaker_boost": True},
            }))
        f = d / f"line{i}.wav"
        wav(raw, f)
        starts.append(round(t, 2))
        parts.append(f)
        t += dur(f)
        if i < len(lines) - 1:
            parts.append(silence)
            t += GAP
        print(f"  line {i + 1}: {line['text'][:50]}")
    lst = d / "list.txt"
    lst.write_text("".join(f"file '{x}'\n" for x in parts))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(lst),
                    "-ac", "1", "-ar", "44100", "-b:a", "96k", str(OUT)], check=True)
    pcm = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(OUT), "-f", "s16le", "-ac", "1", "-ar", "8000", "-"],
                         capture_output=True, check=True).stdout

samples = array.array("h", pcm)
step = max(1, len(samples) // PEAKS)
peaks = [max(abs(x) for x in samples[i:i + step]) for i in range(0, step * PEAKS, step)]
top = max(peaks) or 1
data["audio"] = {
    "src": "/audio/concierge-sample.mp3",
    "duration": round(dur(OUT), 2),
    "starts": starts,
    "peaks": [round(0.15 + 0.85 * x / top, 2) for x in peaks],
    "voices": {"agent": names.get(agent, agent), "caller": names.get(caller, caller)},
    "model": "kokoro-v1.0" if a.engine == "kokoro" else a.model,
}
DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
print(f"Wrote {OUT.relative_to(ROOT)} ({data['audio']['duration']}s) and the timings in {DATA.relative_to(ROOT)}")
