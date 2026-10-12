// Deploys the built site to Cloudflare, retrying when Cloudflare's own API
// hiccups (a 5xx or a "malformed response" during an outage), so one bad
// minute on their side doesn't leave the live site behind.
// Cloudflare build settings: deploy command `npm run deploy`.
import { spawnSync } from "node:child_process";

const TRANSIENT = /\b5\d\d\b|Gateway Timeout|malformed response|ECONNRESET|ETIMEDOUT|fetch failed|Service Unavailable/i;
const waits = [0, 30, 60, 120]; // seconds before each attempt

for (const [i, wait] of waits.entries()) {
  if (wait) {
    console.log(`deploy: Cloudflare's API had a problem, trying again in ${wait}s (attempt ${i + 1} of ${waits.length})`);
    await new Promise((r) => setTimeout(r, wait * 1000));
  }
  const run = spawnSync("npx", ["wrangler", "deploy"], { encoding: "utf8", stdio: ["inherit", "pipe", "pipe"] });
  process.stdout.write(run.stdout ?? "");
  process.stderr.write(run.stderr ?? "");
  if (run.status === 0) process.exit(0);
  if (!TRANSIENT.test(`${run.stdout}\n${run.stderr}`)) process.exit(run.status ?? 1); // a real error: fail now
}
console.error("deploy: Cloudflare's API kept failing; check https://www.cloudflarestatus.com and retry the build.");
process.exit(1);
