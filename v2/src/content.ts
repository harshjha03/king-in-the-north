// All page copy for the site. Side projects ("Products") live in data/github-config.json.
// The Game of Thrones edition of the site is the original site, served at /got/.

export const PARALLAX = 1;       // motion intensity, 0–2
export const CURSOR_GLOW = true; // background grid glow under the cursor

export const nav: [id: string, label: string][] = [
  ['top', 'About'], ['builds', 'Products'], ['flagship', 'Kazam 4.0'], ['cases', 'Case studies'], ['career', 'Experience'], ['contact', 'Contact'],
];
export const resumeLabel = 'Résumé ↓';

export const hero = {
  eyebrow: 'Product Manager · Bengaluru · Open to new opportunities',
  // Rendered as: before <em>accent</em> after
  heading: { before: 'Product manager delivering ', accent: 'measurable', after: ' outcomes.' },
  bio: 'Associate Product Manager at Kazam, leading EV charging, payments and fleet billing products used by riders, fleet operators and charge-point operators across India. Previously Product Manager for B2B fuel logistics at FuelBuddy UAE. I also design and build independent products end to end.',
  backdrop: '140%',
  // Drop your picture at v2/public/assets/photo.jpg (portrait, ~4:5). Until it exists, the frame shows initials.
  photo: '/assets/photo.jpg',
  photoAlt: 'Portrait of Harsh Jha',
  photoCaption: ['Harsh Jha', 'Bengaluru, India'] as [string, string],
  initials: 'HJ',
  scrollCue: 'Scroll',
};

export const stats = [
  { key: 'Engagement', val: '140%', lbl: 'Growth in monthly active users' },
  { key: 'Onboarding', val: '35%', lbl: 'Reduction in drop-off' },
  { key: 'Payments', val: '65%', lbl: 'Growth in transactions' },
  { key: 'Delivery', val: '9+', lbl: 'Features shipped in Kazam 4.0' },
];

export const buildsSection = {
  label: '01 — Independent products',
  heading: { before: 'Products I built ', accent: 'independently', after: '' },
  intro: 'Designed, developed and launched end to end.',
  readCase: 'Read case study →',
};

export const flagship = {
  label: '02 — Flagship · Kazam',
  title: 'Kazam App 4.0: up to 10× faster, in five new languages',
  text: 'The app had accumulated significant UX debt: a home screen that took 20–25 seconds to load, a 30-second wait to begin charging, and home-charger onboarding that required operations support. I led the two-quarter 4.0 release across engineering, design and operations against four objectives: faster charging initiation, better charger discovery, simpler workflows and a larger network.',
  shipped: [
    'Scan-to-charge in under 5 seconds',
    'Charger filters by type, network, connector, time and distance',
    'Quick Add Charger: QR scan auto-fills details, with no operations step',
    'AMC auto-renewal with UPI AutoPay for host revenue',
    'Hindi, Kannada, Telugu, Tamil and Marathi for Tier 2 and Tier 3 India',
    'Redesigned host earnings with real-time payouts',
  ],
  metricLabel: 'Home screen load time',
  improvementLabel: 'Improvement',
  from: 'Version 3.x',
  to: 'Version 4.0',
  scrollHint: 'Scroll to see the results →',
  progress: (pct: number) => `${pct}% complete`,
  // [label, before label, before s, after s]
  speedRows: [
    ['Home screen', '20–25s', 22.5, 3],
    ['Charging screen', '30–33s', 31.5, 3.5],
    ['Home charger onboarding', '55s', 55, 4],
    ['Login OTP', '14.8s', 14.8, 4.5],
    ['Charging history', '14s', 14, 1.1],
    ['QR scan', '12s', 12, 2.5],
  ] as [string, string, number, number][],
};

export const casesSection = {
  label: '03 — Case studies',
  heading: 'Selected work at Kazam',
  intro: 'Payments, data integrity and B2B analytics. Select a case study to read it in full.',
  read: 'Read →',
};

export const modal = { close: 'Close', prev: '← Previous', next: 'Next →' };

export interface WorkCase {
  id: string; title: string; type: string;
  mVal: string; mLbl: string;
  metrics: { val: string; lbl: string }[];
  sections: [heading: string, text: string][];
}

export const work: WorkCase[] = [
  { id:'anomaly', title:'Charging session anomaly rectification', type:'Data integrity · Payments', mVal:'0', mLbl:'Manual reconciliation required',
    metrics:[{val:'4',lbl:'Anomaly types handled'},{val:'Real-time',lbl:'Correction at session close'},{val:'0',lbl:'Over-billing incidents after launch'}],
    sections:[
      ['Problem','Chargers frequently sent corrupted session data caused by firmware bugs, network drops or timezone mismatches: start times after end times, missing end timestamps, and usage above the charger’s rated capacity. Each anomaly led to failed payment capture, revenue leakage and manual reconciliation by the operations team.'],
      ['Approach','Defined four detection rules and moved correction from batch post-processing to real time at session close. Session rectification corrects timelines, usage rectification caps kWh at rated capacity, and payment rectification triggers delayed capture. Original and corrected values are both stored for audit.'],
      ['Outcome','Eliminated the dependency on manual reconciliation, recovered payment capture for sessions that previously failed silently, and maintained full OCPP 1.6J compliance. Operators can download raw audit logs for CPO–utility settlement.']]},
  { id:'wallet', title:'Corporate fleet wallet', type:'B2B · Fleet billing', mVal:'₹ / kWh', mLbl:'Per-driver daily limits',
    metrics:[{val:'Real-time',lbl:'Wallet deductions'},{val:'2',lbl:'Limit types (₹ and kWh)'},{val:'Full',lbl:'Top-up audit trail'}],
    sections:[
      ['Problem','Fleet drivers paid individually for each charging session. Fleet owners had no central financial control, no spending limits and no visibility into usage.'],
      ['Approach','Designed the data model Organisation → Fleet → Driver Group → Driver. A prepaid corporate wallet funds charging for driver groups linked to tariffs. Daily limits can be set in ₹ or kWh, with group defaults and per-driver overrides. Each top-up records the fleet, UTR and payment proof.'],
      ['Rules','Limits do not carry forward, which prevents budget overruns. Charging is blocked at session start if the wallet balance is insufficient or the driver has reached the daily limit. Balances update after every completed session.']]},
  { id:'noqr', title:'Charging session and payment flow specification', type:'Consumer · Payments · PRD', mVal:'1', mLbl:'Single source of truth',
    metrics:[{val:'4',lbl:'Flow variants'},{val:'3',lbl:'Protocols (KCPP, OCPP, OCPI)'},{val:'3',lbl:'Teams working from one document'}],
    sections:[
      ['Problem','The charging and payment flow had never been specified in one place. Four variants (paid or free, with or without QR) across KCPP, OCPP and OCPI chargers, each with its own pre-authorisation logic and edge cases, were documented across scattered sources.'],
      ['Approach','Wrote a single PRD for engineering, design and QA. A routing table maps every charger type to its flow; routing remains server-side and reaches the client as a flow type. The specification covers screen states, pre-authorisation, polling, capture, reconciliation and edge cases such as network drops, pre-authorisation expiry and zero-usage sessions.'],
      ['Outcome','Removed repeated clarification of edge cases between teams. The specification is in active development.']]},
  { id:'reports', title:'Revenue reports and analytics', type:'Analytics · B2B', mVal:'10', mLbl:'New report types',
    metrics:[{val:'8',lbl:'Customer success managers interviewed'},{val:'10',lbl:'New or enhanced reports'},{val:'1',lbl:'Real-time revenue dashboard'}],
    sections:[
      ['Problem','The reports module lacked host-wise, charger-wise and OCPI roaming breakdowns. Units embedded in values broke clients’ MIS workflows, and without a dashboard, operators relied on spreadsheets.'],
      ['Research','Gathered structured feedback from 8 customer success managers across clients including HPCL, Synergy, Nikol and GreEnergy, and grouped it into missing reports, presentation issues and the lack of real-time views. HPCL’s MIS format, GreEnergy’s transaction ID mismatch and Nikol’s OCPI reporting gap became the top priorities.'],
      ['Outcome','Delivered a dashboard with KPI cards (revenue comparison, gross versus net, OCPI partner revenue, top drivers, parking and hogging fees) and 10 reports: sessions, driver, host, charger, hub, driver group, penalties, roaming, theft and suspense.']]},
  { id:'withdrawal', title:'Wallet withdrawal and reconciliation', type:'Fintech · Ledger · CMS', mVal:'0', mLbl:'Manual reconciliation required',
    metrics:[{val:'UTR + proof',lbl:'Audit record per entry'},{val:'Instant',lbl:'Balance update'},{val:'Key-gated',lbl:'Entry authorisation'}],
    sections:[
      ['Problem','Withdrawals processed through Razorpay were not reflected in the Kazam CMS. Ledgers drifted out of sync, the testing team reconciled them manually, and audit trails were incomplete.'],
      ['Approach','Introduced a CMS workflow for recording processed withdrawals, capturing the amount, UTR, payment proof (PNG, JPG or PDF) and a user- and organisation-specific security key. Each submission updates the driver’s balance and creates a ledger entry.'],
      ['Outcome','Balances remain in sync, every withdrawal is traceable, and reconciliation no longer depends on the testing team.']]},
  { id:'notifications', title:'Notification management CMS', type:'Engagement · CMS', mVal:'Scheduled', mLbl:'Push notification campaigns',
    metrics:[{val:'Push',lbl:'Channel at launch'},{val:'Scheduled',lbl:'Campaign support'},{val:'0',lbl:'Engineering effort per campaign'}],
    sections:[
      ['Problem','Operators had no way to reach drivers within the app, whether for offers, downtime alerts or payment confirmations. Support tickets increased because users were not informed proactively.'],
      ['Approach','Built a notification module in the Kazam CMS with reusable templates (title, body and type), a live device preview, immediate or scheduled delivery, and a history of sent and scheduled notifications.'],
      ['Outcome','Operators now run discount campaigns, downtime alerts and loyalty announcements independently. The design allows SMS and email channels to be added next.']]},
  { id:'carbon', title:'Carbon savings dashboard', type:'Sustainability · PRD', mVal:'Per session', mLbl:'Emissions tracked',
    metrics:[{val:'Per session',lbl:'Avoided emissions'},{val:'Hub and period',lbl:'Filters'},{val:'Exportable',lbl:'In reports'}],
    sections:[
      ['Problem','Operators and fleets could not quantify their environmental impact for compliance, ESG reporting or marketing. Enterprise clients such as Joule requested this capability directly.'],
      ['Approach','Designed a dashboard of avoided emissions per session and per charger, filterable by hub and time period. Savings are calculated per vehicle type (3W, 4W) from kWh consumed against ICE-equivalent mileage, for example the Mahindra Treo Zor at 10.85 km/kWh. Results appear in session reports and exports.']]},
];

export interface LogEntry { k: string; ref: string; msg: string; sub: string; role?: boolean; side?: boolean }

const byId = Object.fromEntries(work.map((w) => [w.id, w]));
const workLog = (ids: string[]): LogEntry[] =>
  ids.map((id) => ({ k: id, ref: 'Kazam', msg: byId[id].title, sub: byId[id].type }));

export const careerSection = { label: '04 — Experience', heading: 'Experience', intro: '2024 — Present', buildRef: 'Independent' };

// Timeline before independent products; visible products from github-config.json are appended, then `headLog`.
export const careerLog: LogEntry[] = [
  { k:'fuelbuddy', role:true, ref:'Role', msg:'FuelBuddy UAE — Product Manager, B2B', sub:'On-demand B2B fuel delivery: driver workflows, dispatch, client features and payments · 2024 – 2025' },
  { k:'kazamjoin', role:true, ref:'Role', msg:'Kazam — Associate Product Manager', sub:'Reporting to the Founder; responsible for onboarding, transaction systems and growth metrics · Bengaluru · 2025 – Present' },
  ...workLog(['anomaly', 'reports', 'carbon']),
  { k:'kazam4', ref:'Release', msg:'Kazam App 4.0 — up to 10× faster', sub:'Home screen load time reduced from 20–25s to 3s · 9+ features · 5 languages' },
  ...workLog(['wallet', 'withdrawal', 'notifications', 'noqr']),
];
export const headLog: LogEntry = { k:'head', ref:'Now', msg:'Open to new product roles', sub:'Available for conversations about product management opportunities.' };

export const contact = {
  label: '05 — Contact',
  heading: { before: 'Interested in working together? ', accent: 'Get in touch.' },
  email: 'harshtimes112@gmail.com',
  backdrop: 'Harsh Jha',
  links: [
    { label:'Email', value:'harshtimes112@gmail.com', href:'mailto:harshtimes112@gmail.com' },
    { label:'LinkedIn', value:'linkedin.com/in/harsh-jha-0311', href:'https://www.linkedin.com/in/harsh-jha-0311/' },
    { label:'GitHub', value:'github.com/harshjha03', href:'https://github.com/harshjha03' },
    { label:'Résumé', value:'Download PDF', href:'/assets/resume.pdf' },
  ],
  footerLeft: '© 2026 Harsh Jha',
  footerRight: 'Product Management · EV Charging · Payments',
};
