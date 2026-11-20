import type { ReactElement } from "react";
import { Icon } from "../components/Icon";

// One small picture of the real thing for each service, made from our own
// fictional sample brands instead of stock photos (founder, 20 Nov 2026:
// "this part can be better"). Pure HTML and CSS, so nothing waits on an image
// except the website preview. Styles: .sa-* in studio.css.

const Tick = () => <span className="sa-tick" aria-hidden="true"><Icon name="check" /></span>;

function Brand() {
  return (
    <div className="sa sa-brand">
      <p className="sa-brand-mark">Fenwick<br />Hale</p>
      <p className="sa-brand-sub">Residential · Melbourne</p>
      <div className="sa-swatches">
        {["#1b1a17", "#6b5637", "#d6cfc3", "#f7f5f1"].map((c) => (
          <span key={c} style={{ background: c }} />
        ))}
      </div>
      <p className="sa-brand-aa">Aa<i>Aa</i></p>
    </div>
  );
}

function Website() {
  return (
    <div className="sa sa-web">
      <div className="sa-browser">
        <div className="sa-bar"><i /><i /><i /><span>oceanalt.com.au/work/corella-hotels</span></div>
        <img src="/previews/corella-hotels.webp" alt="" width={1200} height={750} />
      </div>
    </div>
  );
}

function Software() {
  const rows = [
    ["MR", "7:30", "Ready", "ok"],
    ["JT", "8:15", "Paid", "ok"],
    ["AK", "9:00", "Forms due", "wait"],
    ["PL", "9:45", "Booked", "plain"],
  ];
  return (
    <div className="sa sa-app">
      <div className="sa-panel">
        <p className="sa-panel-h"><b>Admissions</b><span>Calloway · Tue</span></p>
        <ul>
          {rows.map(([who, t, s, k]) => (
            <li key={who}><span className="sa-av">{who}</span><span className="num">{t}</span><span className={`sa-pill is-${k}`}>{s}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Automation() {
  const steps = [
    ["Gmail", "Referral received", "8:02"],
    ["Calendar", "Admission booked", "8:03"],
    ["Stripe", "Deposit paid", "9:41"],
    ["Xero", "Invoice synced", "9:41"],
  ];
  return (
    <div className="sa sa-flow">
      <ol>
        {steps.map(([app, what, t]) => (
          <li key={app}><Tick /><span><b>{what}</b><small>{app}</small></span><time className="num">{t}</time></li>
        ))}
      </ol>
      <p className="sa-foot">Nothing typed twice.</p>
    </div>
  );
}

function Agents() {
  return (
    <div className="sa sa-chat">
      <p className="sa-msg is-in">Can we bring our dog to the Bondi hotel?</p>
      <p className="sa-msg is-out">Yes. Two of our Bondi rooms are pet friendly, and I've held one for your dates. Want me to book it?</p>
      <p className="sa-note"><Tick /> Checked by reservations</p>
    </div>
  );
}

function Voice() {
  return (
    <div className="sa sa-voice">
      <p className="sa-voice-who">Corella's AI agent</p>
      <div className="sa-wave" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * -0.17}s`, height: `${30 + ((i * 37) % 60)}%` }} />)}
      </div>
      <p className="sa-voice-t num">0:42 · this call is recorded</p>
    </div>
  );
}

function Payments() {
  return (
    <div className="sa sa-pay">
      <div className="sa-panel">
        <p className="sa-panel-h"><b>Tallowwood</b><span>Checkout</span></p>
        <p className="sa-pay-row"><span>Linen throw, oat</span><b className="num">$189.00</b></p>
        <span className="sa-paybtn is-apple">Pay with Apple Pay</span>
        <span className="sa-paybtn is-google">Pay with Google Pay</span>
        <span className="sa-paybtn is-card">Card</span>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="sa sa-search">
      <p className="sa-q">private wealth adviser melbourne</p>
      <div className="sa-answer"><small>AI overview</small><p>Calder &amp; Ames is a Melbourne private wealth firm that…</p></div>
      <div className="sa-result"><small>calderandames.com.au</small><b>Calder &amp; Ames Private Wealth</b><p>Advice for families and business owners…</p></div>
    </div>
  );
}

function Care() {
  return (
    <div className="sa sa-care">
      <p className="sa-panel-h"><b>November report</b><span>Torrens &amp; Pike</span></p>
      <div className="sa-days" aria-hidden="true">{Array.from({ length: 30 }, (_, i) => <i key={i} />)}</div>
      <ul>
        <li><Tick /> Site up every day</li>
        <li><Tick /> Backed up every night</li>
        <li><Tick /> 6 changes made</li>
      </ul>
      <p className="sa-foot">Next: faster project pages</p>
    </div>
  );
}

const ART: Record<string, () => ReactElement> = {
  brand: Brand, websites: Website, software: Software, automation: Automation, ai: Agents,
  voice: Voice, payments: Payments, search: Search, care: Care,
};

export function ServiceArt({ id }: { id: string }) {
  const Art = ART[id];
  return Art ? <Art /> : null;
}
