import type { CSSProperties, ReactElement } from "react";
import { Icon } from "../components/Icon";
import "./service-art.css";

// One picture of the real thing for each service, made from our own fictional
// sample brands in their own colours and type (founder, 20 Nov 2026: the stock
// photos "doesn't make any sense", then "room for improvement"). Each one plays
// a short moment of the work happening when its card scrolls into view
// (.s-svc.is-in, set in Services), and simply shows the finished state without
// JavaScript or with reduced motion. Styles: service-art.css.

const at = (i: number) => ({ "--i": i } as CSSProperties);
const Tick = () => <span className="sa-tick" aria-hidden="true"><Icon name="check" /></span>;
const Tag = ({ children }: { children: string }) => <p className="sa-tag">{children} · sample</p>;

function Brand() {
  return (
    <div className="sa sa-brand">
      <Tag>Fenwick Hale</Tag>
      <p className="sa-brand-mark sa-step" style={at(0)}>Fenwick<br />Hale</p>
      <div className="sa-dots sa-step" style={at(1)}>
        {["#1b1a17", "#6b5637", "#d6cfc3", "#f7f5f1"].map((c) => <i key={c} style={{ background: c }} />)}
      </div>
      <div className="sa-hoarding sa-step" style={at(2)}>
        <small>Now selling · Elsternwick</small>
        <p>Forty homes,<br /><em>one garden.</em></p>
      </div>
    </div>
  );
}

function Website() {
  return (
    <div className="sa sa-web">
      <Tag>Corella Hotels</Tag>
      <div className="sa-browser sa-step" style={at(0)}>
        <div className="sa-bar"><i /><i /><i /><span>oceanalt.com.au/work/corella-hotels</span></div>
        <img src="/previews/corella-hotels.webp" alt="" width={1200} height={750} />
      </div>
      <div className="sa-mobile sa-step" style={at(1)}>
        <img src="/previews/corella-hotels.webp" alt="" width={1200} height={750} />
      </div>
    </div>
  );
}

function Software() {
  return (
    <div className="sa sa-app">
      <Tag>Calloway Day Surgery</Tag>
      <div className="sa-sheet">
        <p className="sa-sheet-h"><b>Admissions today</b><span>Tue 24 Nov</span></p>
        <ul>
          <li className="sa-step" style={at(0)}><span className="sa-av">MR</span><span><b>Margaret R.</b><small className="num">7:30 · Cataract</small></span><span className="sa-pill is-ok">Ready</span></li>
          <li className="sa-step" style={at(1)}><span className="sa-av">JT</span><span><b>James T.</b><small className="num">8:15 · Knee scope</small></span><span className="sa-pill is-ok">Paid</span></li>
          <li className="sa-step" style={at(2)}><span className="sa-av">AK</span><span><b>Aisha K.</b><small className="num">9:00 · Endoscopy</small></span>
            <span className="sa-swap"><span className="sa-pill is-wait">Forms due</span><span className="sa-pill is-ok">Ready</span></span></li>
          <li className="sa-step" style={at(3)}><span className="sa-av">PL</span><span><b>Peter L.</b><small className="num">9:45 · Skin check</small></span><span className="sa-pill">Booked</span></li>
        </ul>
      </div>
    </div>
  );
}

function Automation() {
  const steps = [
    ["G", "Gmail", "Referral received", "8:02"],
    ["C", "Calendar", "Admission booked", "8:03"],
    ["S", "Stripe", "Deposit paid", "9:41"],
    ["X", "Xero", "Invoice synced", "9:41"],
  ];
  return (
    <div className="sa sa-flow">
      <Tag>Calloway Day Surgery</Tag>
      <ol>
        {steps.map(([l, app, what, t], i) => (
          <li key={app} className="sa-step" style={at(i)}>
            <span className="sa-app-chip">{l}</span>
            <span><b>{what}</b><small>{app}</small></span>
            <time className="num">{t}</time>
            <Tick />
          </li>
        ))}
      </ol>
      <p className="sa-flow-end sa-step" style={at(4)}>Nothing typed twice.</p>
    </div>
  );
}

function Agents() {
  return (
    <div className="sa sa-chat">
      <Tag>Corella Hotels</Tag>
      <p className="sa-msg is-in sa-step" style={at(0)}>Hi, can we bring our dog to the Bondi hotel in March?</p>
      <p className="sa-typing sa-step" style={at(1)} aria-hidden="true"><i /><i /><i /></p>
      <p className="sa-msg is-out sa-step" style={at(2)}>Yes. Two of our Bondi rooms are dog friendly, and I've held one for 14 to 16 March. Shall I book it?</p>
      <p className="sa-checked sa-step" style={at(3)}><Tick /> Checked by reservations</p>
    </div>
  );
}

function Voice() {
  return (
    <div className="sa sa-voice">
      <Tag>Corella Hotels</Tag>
      <p className="sa-call sa-step" style={at(0)}><span className="sa-live" />Tom Avery · on a call</p>
      <div className="sa-wave sa-step" style={at(1)} aria-hidden="true">
        {Array.from({ length: 32 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 8) * -0.15}s`, height: `${28 + ((i * 41) % 66)}%` }} />)}
      </div>
      <p className="sa-caption sa-step" style={at(2)}>“Arriving after midnight is fine. I'll let the night team know you're coming.”</p>
      <p className="sa-voice-t sa-step" style={at(3)}>Corella's AI agent · this call is recorded</p>
    </div>
  );
}

function Payments() {
  return (
    <div className="sa sa-pay">
      <Tag>Tallowwood</Tag>
      <div className="sa-throw" aria-hidden="true" />
      <div className="sa-checkout sa-step" style={at(0)}>
        <p className="sa-pay-row"><span>Linen throw, oat</span><b className="num">$189.00</b></p>
        <span className="sa-paybtn">
          <span className="sa-paybtn-a">Pay with Apple Pay</span>
          <span className="sa-paybtn-b"><Tick /> Paid</span>
        </span>
        <p className="sa-pay-more">Google Pay · Card · Afterpay</p>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="sa sa-search">
      <Tag>Calder &amp; Ames</Tag>
      <p className="sa-q"><span className="sa-type">private wealth adviser melbourne</span></p>
      <div className="sa-answer sa-step" style={at(1)}><small>AI overview</small><p>Calder &amp; Ames is a private wealth firm in Melbourne advising families and business owners…</p></div>
      <div className="sa-result sa-step" style={at(2)}><small>calderandames.com.au</small><b>Calder &amp; Ames Private Wealth</b><p>Advice for families, business owners and what comes next.</p></div>
    </div>
  );
}

function Care() {
  return (
    <div className="sa sa-care">
      <Tag>Torrens &amp; Pike</Tag>
      <div className="sa-report">
        <p className="sa-report-h">November</p>
        <div className="sa-days" aria-hidden="true">{Array.from({ length: 30 }, (_, i) => <i key={i} style={at(i)} />)}</div>
        <ul>
          <li className="sa-step" style={at(0)}><Tick /> Up every day</li>
          <li className="sa-step" style={at(1)}><Tick /> Backed up every night</li>
          <li className="sa-step" style={at(2)}><Tick /> 6 changes made</li>
        </ul>
        <p className="sa-next sa-step" style={at(3)}>Next month: faster project pages</p>
      </div>
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
