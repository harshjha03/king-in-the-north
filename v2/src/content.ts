// All site copy. Builds (side projects) live in data/github-config.json instead.

export const LORE = true;        // Game-of-Thrones copy: alt eyebrow, footer, case titles, lore quotes
export const PARALLAX = 1;       // motion intensity, 0–2
export const CURSOR_GLOW = true; // background grid glow under the cursor

export const eyebrow = LORE ? 'House Growth · Fire & Blood · Ship or Die' : 'Product Manager · Bengaluru · Open to conversations';
export const footerLine = LORE ? 'Game of Products · A Song of Ideas & Execution' : 'Product · EV charging · AI';

export const trace: [string, string][] = [
  ['detect', 'home_screen.load = 20–25s'],
  ['diagnose', 'UX debt · 4 release objectives'],
  ['ship', 'Kazam 4.0 · 9+ features · 5 languages'],
  ['measure', '20–25s → 3s  ✓'],
];

export const stats = [
  { key: 'mau.growth', val: '140%', lbl: 'MAU growth' },
  { key: 'dropoff', val: '35%', lbl: 'Drop-off reduced' },
  { key: 'txn.growth', val: '65%', lbl: 'Transaction growth' },
  { key: 'shipped', val: '9+', lbl: 'Features shipped in 4.0' },
];

export const featuredTitle = LORE ? 'Dracarys — Kazam App 4.0: up to 10× faster' : 'Kazam App 4.0: up to 10× faster, in five new languages';

export const shipped = [
  'Scan-to-charge in under 5 seconds',
  'Charger filters by type, network, connector, time and distance',
  'Quick Add Charger: QR scan auto-fills, no ops step',
  'AMC auto-renewal with UPI AutoPay for host revenue',
  'Hindi, Kannada, Telugu, Tamil and Marathi for Tier 2/3 India',
  'Redesigned host earnings with real-time payouts',
];

// [label, before label, before s, after s]
export const speedRows: [string, string, number, number][] = [
  ['Home screen', '20–25s', 22.5, 3],
  ['Enter charging screen', '30–33s', 31.5, 3.5],
  ['Home charger onboarding', '55s', 55, 4],
  ['Login OTP', '14.8s', 14.8, 4.5],
  ['Charging history', '14s', 14, 1.1],
  ['QR scan', '12s', 12, 2.5],
];

export interface WorkCase {
  id: string; title: string; lt: string; type: string; period: string;
  mVal: string; mLbl: string; msg: string; lore: string;
  metrics: { val: string; lbl: string }[];
  sections: [string, string, string][]; // [plain heading, lore heading, text]
}

export const work: WorkCase[] = [
  { id:'anomaly', title:'Charging session anomaly rectification', lt:'The Corruption of Ravens', type:'Data integrity · Payments', period:'Jun 2024', mVal:'0', mLbl:'manual reconciliation', msg:'fix(payments): real-time anomaly rectification',
    lore:'When the ravens send false messages, kingdoms fall. When chargers send false data, revenue dies.',
    metrics:[{val:'4',lbl:'Anomaly types handled'},{val:'Real-time',lbl:'Correction at session close'},{val:'0',lbl:'Over-billing incidents post-launch'}],
    sections:[
      ['Problem','The Problem','Chargers often sent corrupted session data from firmware bugs, network drops or timezone mismatches: start after end, missing end timestamps, usage above the charger’s rated capacity. Each one caused failed payment capture, revenue leakage and manual reconciliation for ops.'],
      ['Approach','The Battle Plan','Defined four detection rules and moved correction to real time at session close instead of batch post-processing. Session rectification fixes timelines, usage rectification caps kWh against rated capacity, payment rectification triggers delayed capture. Original and corrected values are both stored for audit.'],
      ['Outcome','The Victory','Removed the manual reconciliation dependency, recovered payment capture for sessions that used to fail silently, and kept full OCPP 1.6J compliance. Operators can download raw audit logs for CPO–utility settlement.']]},
  { id:'wallet', title:'Corporate fleet wallet', lt:'The Iron Bank of Fleets', type:'B2B · Fleet billing', period:'2025', mVal:'₹ / kWh', mLbl:'per-driver daily caps', msg:'feat(b2b): corporate fleet wallet',
    lore:'The Iron Bank will have its due. So shall the fleet wallet, to the last kWh.',
    metrics:[{val:'Real-time',lbl:'Wallet deductions'},{val:'2',lbl:'Limit types (₹ and kWh)'},{val:'Full',lbl:'Top-up audit trail'}],
    sections:[
      ['Problem','The Problem','Fleet drivers paid individually at each charge. Fleet owners had no central financial control, no spending caps and no visibility.'],
      ['Approach','The Architecture','Designed the data model Org → Fleet → Driver Group → Driver. A prepaid corporate wallet funds charging for driver groups tagged to tariffs. Daily limits in ₹ or kWh, with group defaults and per-driver overrides. Top-ups record fleet, UTR and payment proof.'],
      ['Rules','The Rules of the Realm','Limits don’t carry forward, so budgets can’t overrun. Charging is blocked at session start if the wallet is short or the driver has hit the cap. Balances update with every completed session.']]},
  { id:'noqr', title:'Charging session & payment flow spec', lt:'The Four Paths to Power', type:'Consumer · Payments · PRD', period:'Apr 2026', mVal:'1', mLbl:'source of truth', msg:'docs(prd): charging session & payment flow',
    lore:'There is more than one path to the Iron Throne. Know all four, or you will be ambushed by the one you ignored.',
    metrics:[{val:'4',lbl:'Flow variants'},{val:'3',lbl:'Protocols (KCPP, OCPP, OCPI)'},{val:'3',lbl:'Teams on one document'}],
    sections:[
      ['Problem','The Problem','The charging and payment flow had never been specified in one place. Four variants (paid/free × QR/no-QR) across KCPP, OCPP and OCPI chargers, each with different pre-auth logic and edge cases, lived in scattered docs.'],
      ['Approach','The Scroll','Wrote the single PRD for engineering, design and QA. A routing table maps every charger type to its flow; routing stays server-side and reaches the client as a flow type. Covers screen states, pre-auth, polling, capture, reconciliation and edge cases like network drops, pre-auth expiry and zero-usage sessions.'],
      ['Outcome','The Victory','Edge-case back-and-forth between teams stopped. The spec is in active development.']]},
  { id:'reports', title:'Revenue reports & analytics', lt:'The Maester’s Ledger', type:'Analytics · B2B', period:'2024', mVal:'10', mLbl:'new report types', msg:'feat(analytics): revenue dashboard + 10 reports',
    lore:'A kingdom without records is a kingdom without memory.',
    metrics:[{val:'8',lbl:'CSMs interviewed'},{val:'10',lbl:'New or enhanced reports'},{val:'1',lbl:'Real-time revenue dashboard'}],
    sections:[
      ['Problem','The Problem','The reports module was missing host-wise, charger-wise and OCPI roaming breakdowns. Units embedded in values broke clients’ MIS workflows, and with no dashboard, operators worked in Excel.'],
      ['Research','The Council','Gathered structured feedback from 8 CSMs across clients including HPCL, Synergy, Nikol and GreEnergy, and sorted it into missing reports, presentation issues and lack of real-time views. HPCL’s MIS format, GreEnergy’s transaction-ID mismatch and Nikol’s OCPI gap became the top priorities.'],
      ['Outcome','The Decree','Shipped a dashboard with KPI cards (revenue comparison, gross vs net, OCPI partner revenue, top drivers, parking and hogging fees) and 10 reports: sessions, driver, host, charger, hub, driver group, penalties, roaming, theft and suspense.']]},
  { id:'withdrawal', title:'Wallet withdrawal & reconciliation', lt:'The Gold Road', type:'Fintech · Ledger · CMS', period:'2025', mVal:'0', mLbl:'manual reconciliation', msg:'feat(ledger): wallet withdrawal reconciliation',
    lore:'Every coin that leaves the treasury must be recorded.',
    metrics:[{val:'UTR + proof',lbl:'Per-entry audit'},{val:'Instant',lbl:'Balance update'},{val:'Key-gated',lbl:'Entry authorisation'}],
    sections:[
      ['Problem','The Problem','Withdrawals processed through Razorpay didn’t update the Kazam CMS. Ledgers drifted, the testing team reconciled by hand, and audit trails were incomplete.'],
      ['Approach','The Solution','A CMS workflow to record processed withdrawals: amount, UTR, payment proof (PNG/JPG/PDF) and a user- and org-specific security key. Submission updates the driver’s balance and writes a ledger entry.'],
      ['Outcome','The Outcome','Balances stay in sync, every withdrawal is traceable, and reconciliation no longer depends on the testing team.']]},
  { id:'notifications', title:'Notification management CMS', lt:'The Raven Network', type:'Engagement · CMS', period:'Oct 2025', mVal:'Scheduled', mLbl:'push campaigns', msg:'feat(cms): notification management',
    lore:'A king who cannot send messages to his people is a prisoner in his own castle.',
    metrics:[{val:'Push',lbl:'Channel at launch'},{val:'Scheduled',lbl:'Campaign support'},{val:'0',lbl:'Engineering needed per campaign'}],
    sections:[
      ['Problem','The Problem','Operators had no way to reach drivers in the app: no offers, downtime alerts or payment confirmations. Support tickets rose because users weren’t told things proactively.'],
      ['Approach','The Module','Built a notification module in the Kazam CMS: templates with title, body and type, a live device preview, send-now or scheduled delivery, and sent/scheduled history.'],
      ['Outcome','The Impact','Operators now run discount campaigns, downtime alerts and loyalty announcements on their own. The design leaves room for SMS and email next.']]},
  { id:'carbon', title:'Carbon savings dashboard', lt:'The Green Promise', type:'Sustainability · PRD', period:'2024', mVal:'Per session', mLbl:'emissions tracked', msg:'feat(esg): carbon savings dashboard',
    lore:'Even dragons must answer to the sky.',
    metrics:[{val:'Per session',lbl:'Avoided emissions'},{val:'Hub + period',lbl:'Filters'},{val:'Exportable',lbl:'In reports'}],
    sections:[
      ['Problem','The Problem','Operators and fleets couldn’t quantify their environmental impact for compliance, ESG reporting or marketing. Enterprise clients such as Joule asked for it directly.'],
      ['Approach','The Solution','Dashboard of avoided emissions per session and per charger, filterable by hub and period. Calculated per vehicle type (3W, 4W) from kWh consumed against ICE-equivalent mileage, e.g. Mahindra Treo Zor at 10.85 km/kWh. Surfaced in session reports and exports.']]},
];

export interface LogEntry { k: string; ref: string; msg: string; sub: string; role?: boolean; side?: boolean }

const byId = Object.fromEntries(work.map((w) => [w.id, w]));
const workLog = (ids: string[]): LogEntry[] =>
  ids.map((id) => ({ k: id, ref: 'kazam', msg: byId[id].msg, sub: `${byId[id].title} · ${byId[id].period}` }));

// Career log before side builds; builds from github-config.json are appended, then HEAD.
export const careerLog: LogEntry[] = [
  { k:'fuelbuddy', role:true, ref:'init', msg:'FuelBuddy UAE — Product Manager, B2B', sub:'On-demand B2B fuel delivery. Driver workflows, dispatch, client features and payments · 2024 – 2025' },
  { k:'kazamjoin', role:true, ref:'merge', msg:'Kazam — Associate Product Manager', sub:'Reporting to the Founder. Onboarding, transaction systems and growth metrics · Bengaluru · 2025 – Present' },
  ...workLog(['anomaly', 'reports', 'carbon']),
  { k:'kazam4', ref:'tag: v4.0', msg:'release(app): Kazam 4.0 — up to 10× faster', sub:'Home screen 20–25s → 3s · 9+ features · 5 languages · May 2025' },
  ...workLog(['wallet', 'withdrawal', 'notifications', 'noqr']),
];
export const headLog: LogEntry = { k:'head', ref:'HEAD', msg:'wip: next role', sub:'Open to conversations about product roles.' };

export const links = [
  { label:'email', value:'harshtimes112@gmail.com', href:'mailto:harshtimes112@gmail.com' },
  { label:'linkedin', value:'/in/harsh-jha-0311', href:'https://www.linkedin.com/in/harsh-jha-0311/' },
  { label:'github', value:'harshjha03', href:'https://github.com/harshjha03' },
  { label:'résumé', value:'Download PDF', href:'/assets/resume.pdf' },
];
