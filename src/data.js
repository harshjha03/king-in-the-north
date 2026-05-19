// Shared content — Harsh Jha's portfolio data.
// Edit any of these to update both variants at once.

window.PORTFOLIO = {
  identity: {
    name: "Harsh Jha",
    house: "House Growth · Business & Tech",
    title: "Game of Products",
    subtitle: "A Song of Ideas & Execution",
    epithets: "House Growth · First of His Name · Builder of Products · Breaker of Blockers · \nRightful Owner of Mufasa",
    epithetsAside: "(not the lion)",
    words: "Fire & Blood · Ship or Die",
    email: "harshtimes112@gmail.com",
    linkedin: "https://linkedin.com/in/harsh-jha-0311",
    mufasa: "https://mufasa-ka-jungle.vercel.app",
    resumeUrl: "#",
  },

  // The four headline stats (hero)
  heroStats: [
    { val: "140%", lbl: "MAU Growth" },
    { val: "35%",  lbl: "Drop-off Reduced" },
    { val: "65%",  lbl: "Transaction Growth" },
    { val: "9+",   lbl: "Features Shipped" },
  ],

  // The chronicles — grouped by season.
  // Each track has a case-study id pointing into `caseStudies` below.
  seasons: [
    {
      number: "I",
      title: "Two Kingdoms",
      lore: "Before you can rule Westeros, you must first survive Essos. Two kingdoms. Two schools of fire.",
      tracks: [
        { id: "fuelbuddy", roman: "I", title: "Essos — FuelBuddy UAE",
          type: "Origin Story · B2B", tags: ["Fuel Delivery", "Logistics", "UAE"],
          duration: "2023–24", index: "Season I · Essos" },
        { id: "kazamexp", roman: "II", title: "Westeros — Kazam",
          type: "Growth · B2C · B2B · EV Charging",
          tags: ["2024–Present", "Bengaluru", "EV Charging"],
          duration: "2024–Present", index: "Season I · Westeros" },
      ],
    },
    {
      number: "II",
      title: "The Rise — Claiming Kazam",
      lore: "A dragon does not ask permission to breathe fire. Nor does a PM ask permission to ship.",
      tracks: [
        { id: "anomaly", roman: "III", title: "The Corruption of Ravens — Anomaly Rectification",
          type: "Data Integrity · Payments", tags: [{ label: "OCPP", fire: true }, "Real-time", "Revenue"],
          duration: "Jun 2024", index: "Season II · Track 1" },
        { id: "reports", roman: "IV", title: "The Maester's Ledger — Revenue Reports Enhancement",
          type: "Analytics · PRD · B2B", tags: ["10 Report Types", "Dashboard", "Client Feedback"],
          duration: "2024", index: "Season II · Track 2" },
        { id: "carbon", roman: "V", title: "The Green Promise — Carbon Savings Dashboard",
          type: "Sustainability · PRD", tags: ["Emissions Tracking", "CPO"],
          duration: "2024", index: "Season II · Track 3" },
      ],
    },
    {
      number: "III",
      title: "The Power — Dragons Unleashed",
      lore: "When the Mother of Dragons finally took the field, no castle could hold her. No wall could stop her.",
      tracks: [
        { id: "kazam4", roman: "VI", title: "Dracarys — Kazam App 4.0",
          type: "Consumer Mobile · Growth · Flagship",
          tags: [{ label: "FEATURED", fire: true }, { label: "140% MAU", fire: true }, "9+ Features", "Multi-language"],
          duration: "May 2025", index: "Season III · Track 1" },
        { id: "wallet", roman: "VII", title: "The Iron Bank of Fleets — Corporate Wallet",
          type: "B2B · Fleet Billing · Payments",
          tags: ["Fleet Management", "Real-time Deductions", "Audit Trail"],
          duration: "2025", index: "Season III · Track 2" },
        { id: "noqr", roman: "VIII", title: "The Four Paths to Power — Charging Session Flow",
          type: "Consumer · Payments · PRD",
          tags: ["4 Flow Variants", "OCPP/KCPP/OCPI", "Single Source of Truth"],
          duration: "Apr 2026", index: "Season III · Track 3" },
        { id: "notifications", roman: "IX", title: "The Raven Network — App Notification Management",
          type: "Engagement · CMS",
          tags: ["Push Notifications", "Campaign Scheduling"],
          duration: "Oct 2025", index: "Season III · Track 4" },
        { id: "withdrawal", roman: "X", title: "The Gold Road — Wallet Withdrawal & Reconciliation",
          type: "Fintech · Ledger · CMS",
          tags: ["UTR Traceability", "Razorpay", "Audit Compliance"],
          duration: "2025", index: "Season III · Track 5" },
      ],
    },
    {
      number: "IV",
      title: "Beyond the Wall — The King's Own Kingdom",
      lore: "The lone wolf dies, but the pack survives. So he built his own pack — with code, AI, and 55 Indian foods.",
      petProject: true,
      tracks: [
        { id: "mufasa", roman: "XI", title: "Remember Who You Are — Mufasa AI Fitness Coach",
          type: "Pet Project · Consumer · AI · Live",
          tags: [{ label: "🦁 LIVE", fire: true }, { label: "Gemini AI", fire: true }, "Built for India", "PWA"],
          duration: "May 2026", index: "Season IV · Track 1",
          easter: "🦁 Remember who you are, Simba…",
          link: "https://mufasa-ka-jungle.vercel.app" },
      ],
    },
  ],

  // Full case-study content keyed by track id.
  caseStudies: {
    fuelbuddy: {
      season: "Season I · Essos",
      title: "Essos — FuelBuddy UAE",
      lore: "Every conqueror was first a stranger in a strange land. This is where it began.",
      metrics: [
        { val: "B2B",     lbl: "Product Domain" },
        { val: "2023–24", lbl: "Era of Service" },
        { val: "UAE",     lbl: "Kingdom Served" },
      ],
      sections: [
        { title: "The Land", text: "FuelBuddy UAE operated a B2B fuel delivery platform — connecting enterprise clients with on-demand fuel logistics. Complex ops, SLA-driven delivery, and multi-party coordination across a supply chain in the UAE." },
        { title: "The Role", text: "Worked as a Product Manager on the B2B platform — responsible for driver workflows, client-facing features, dispatch coordination, and payment integration. First real PM role. Built intuition for ops-heavy products, stakeholder management, and shipping under constraints." },
        { title: "The Lessons", text: "B2B products live and die by operational precision. Learned to map user journeys across multiple personas (drivers, dispatchers, clients), write specs for edge cases that ops teams actually encounter, and prioritize ruthlessly when engineering capacity is limited." },
      ],
    },
    kazamexp: {
      season: "Season I · Westeros",
      title: "Westeros — Kazam",
      lore: "A king does not ask for the throne. He builds the road that leads to it.",
      metrics: [
        { val: "B2C+B2B",   lbl: "Product Domain" },
        { val: "2024–25",   lbl: "Era of Service" },
        { val: "Bengaluru", lbl: "Kingdom Served" },
      ],
      sections: [
        { title: "The Land", text: "Kazam operated an EV charging platform — bridging charge point operators, fleet clients, and everyday EV riders across India. A two-sided marketplace with real infrastructure stakes, payment complexity, and a user base that couldn't afford friction." },
        { title: "The Role", text: "Worked as Associate Product Manager reporting directly to the Founder — owning onboarding flows, transaction systems, and growth metrics. Reduced drop-offs, drove MAU growth, and shipped payment integrations under the pressure of a scaling, scrappy team." },
        { title: "The Lessons", text: "Consumer products are won in the first 60 seconds. Learned to obsess over onboarding, instrument every funnel drop, and negotiate ruthlessly between UX debt and shipping velocity. Discovered that B2C and B2B live by completely different laws — and learned to speak both." },
      ],
    },
    anomaly: {
      season: "Season II · Track 1 — The Rise",
      title: "The Corruption of Ravens — Anomaly Rectification",
      lore: "When the ravens send false messages, kingdoms fall. When chargers send false data, revenue dies.",
      metrics: [
        { val: "Real-time", lbl: "Correction Speed" },
        { val: "4",         lbl: "Anomaly Types Vanquished" },
        { val: "0",         lbl: "Manual Ops Dependency" },
      ],
      sections: [
        { title: "The Problem", text: "EV chargers frequently send corrupted session data due to firmware bugs, network drops, or timezone mismatches — start time greater than end time, missing end timestamps, usage exceeding the charger's physical rated capacity. Each anomaly caused payment capture failure, revenue leakage, and manual reconciliation work for the ops team." },
        { title: "The Battle Plan", text: "Defined 4 anomaly detection rules. Designed real-time correction at session close — not batch post-processing. Session rectification corrects timelines, usage rectification caps kWh against rated capacity, payment rectification triggers delayed capture for settled-but-corrupted sessions. Both original and rectified values stored for audit compliance." },
        { title: "The Victory", text: "Eliminated manual reconciliation dependency entirely. Payment capture recovered for sessions that previously failed silently. Zero over-billing incidents post-launch. OCPP 1.6J compliant across all charger types. Operators download raw audit logs for CPO-utility settlement." },
      ],
    },
    reports: {
      season: "Season II · Track 2 — The Rise",
      title: "The Maester's Ledger — Revenue Reports Enhancement",
      lore: "A kingdom without records is a kingdom without memory. Without memory, there is no strategy.",
      metrics: [
        { val: "10", lbl: "New Report Types" },
        { val: "8+", lbl: "Client Pain Points Slain" },
        { val: "1",  lbl: "Unified Dashboard" },
      ],
      sections: [
        { title: "The Problem", text: "The Reports & Analytics module was missing critical report types — host-wise, charger-wise, and OCPI roaming revenue breakdowns. Data was shown with units breaking MIS workflows. No visualization dashboard existed. Operators were doing manual Excel work." },
        { title: "The Council", text: "Gathered structured feedback from 8 CSMs across all client organizations — Synergy, HPCL, Nikol, GreEnergy, and more. Mapped every pain point into three categories: missing report types, data presentation issues, and lack of real-time visualization. HPCL's MIS format, GreEnergy's hogging transaction ID mismatch, and Nikol's OCPI analytics gap became the top priorities." },
        { title: "The Decree", text: "Designed a real-time revenue dashboard with KPI cards (revenue comparison, gross vs net, OCPI partner revenue, top 5 drivers leaderboard, parking/hogging fees). 10 new/enhanced report types: sessions, driver-wise, host-wise, charger-wise, hub-wise, driver group, penalties, roaming, theft, and suspense." },
      ],
    },
    carbon: {
      season: "Season II · Track 3 — The Rise",
      title: "The Green Promise — Carbon Savings Dashboard",
      lore: "Even dragons must answer to the sky. The CPO who shows their environmental impact wins the next decade.",
      metrics: [
        { val: "Per-session", lbl: "Emissions Tracked" },
        { val: "Hub filter",  lbl: "Granularity" },
        { val: "Downloadable",lbl: "Report Integration" },
      ],
      sections: [
        { title: "The Problem", text: "CPOs and fleet operators had no way to quantify their environmental impact — critical for regulatory compliance, ESG investor reporting, and marketing their green credentials. Joule org and other enterprise clients explicitly requested this." },
        { title: "The Solution", text: "Designed a dashboard showing avoided carbon emissions per session and per charger, filterable by hub and time period. Calculation logic defined per vehicle type (3W, 4W) using kWh consumed vs ICE equivalent mileage — e.g., Mahindra Treo Zor 3W at 10.85 km/kWh baseline. Data surfaced in session reports and downloadable from R&A." },
      ],
    },
    kazam4: {
      season: "Season III · Track 1 — The Power · FLAGSHIP",
      title: "Dracarys — Kazam App 4.0",
      lore: "She did not ask them to bend the knee. She showed them what bending meant. Then they knelt.",
      metrics: [
        { val: "10×", lbl: "Faster Home Screen" },
        { val: "9+",  lbl: "Features Shipped" },
        { val: "5",   lbl: "Languages Added" },
      ],
      sections: [
        { title: "The Problem", text: "The Kazam app had accumulated serious UX debt. Home screen: 20–25 seconds to load. QR scan: 12 seconds. Entering charging screen: 30–33 seconds. Home charger onboarding required ops team intervention. Charger discovery was shallow. Retention was bleeding." },
        { title: "The Campaign", text: "Led end-to-end product planning for the 4.0 release. Defined 4 release objectives: reduce charging initiation time, improve charger discovery, simplify user workflows, expand the charging network. Cross-functional execution across engineering, design, and ops across 2 quarters." },
        { title: "The Weapons Deployed", text: "Faster charging start (scan → charge in under 5 seconds). Advanced filters by charger type, network, connector, estimated time, distance. Quick Add Charger (QR scan → auto-fill → 2 seconds, eliminating ops dependency). AMC auto-renewal with UPI AutoPay for recurring host revenue. Multi-language support (Hindi, Kannada, Telugu, Tamil, Marathi) for Tier 2/3 India. Redesigned host earnings dashboard with real-time payout tracking." },
        { title: "The Aftermath", text: "Home screen: 20–25 sec → 3 sec. QR scan: 12 sec → 2–3 sec. Charging screen entry: 30–33 sec → 3–4 sec. Home charger onboarding: 55 sec → 3–5 sec. Login OTP: 14.79 sec → 4–5 sec. Charging history: 14 sec → 1.1 sec." },
      ],
    },
    wallet: {
      season: "Season III · Track 2 — The Power",
      title: "The Iron Bank of Fleets — Corporate Wallet",
      lore: "The Iron Bank will have its due. So shall the fleet wallet, to the last kWh.",
      metrics: [
        { val: "Real-time", lbl: "Deductions" },
        { val: "2",         lbl: "Limit Types (₹ & kWh)" },
        { val: "Full",      lbl: "Audit Trail" },
      ],
      sections: [
        { title: "The Problem", text: "Fleet owners settled charging expenses with the organization through offline transactions, but there was no mechanism for their drivers to charge on the network without individual billing. Each driver had to pay at point of charging — no centralized financial control, no spending caps, no transparency." },
        { title: "The Architecture", text: "Designed the full data model: Org → Fleet → Driver Group → Driver hierarchy. Corporate wallet holds prepaid funds. Driver groups are tagged to tariffs, enabling wallet-funded charging. Per-driver daily limits configurable in ₹ or kWh, with group-level defaults and individual overrides. Add Balance flow: fleet selection, UTR, payment proof attachment for audit compliance." },
        { title: "The Rules of the Realm", text: "Daily limits are non-carry-forward — unused quota resets daily, preventing budget overruns. Charging is blocked at session start if fleet wallet balance is insufficient OR driver has hit their daily cap. Fleet wallet balance updates in real-time with every completed session. Full ledger of top-ups with UTR, proof, and timestamp." },
      ],
    },
    noqr: {
      season: "Season III · Track 3 — The Power",
      title: "The Four Paths to Power — Charging Session & Payment Flow",
      lore: "There is more than one path to the Iron Throne. Know all four, or you will be ambushed by the one you ignored.",
      metrics: [
        { val: "4", lbl: "Flow Variants" },
        { val: "3", lbl: "Protocol Types" },
        { val: "1", lbl: "Source of Truth" },
      ],
      sections: [
        { title: "The Problem", text: "The charging session and payment flow had never been documented as a single cohesive spec. 4 distinct flow variants (Paid QR, Paid No-QR, Free QR, Free No-QR) across KCPP, OCPP, and OCPI charger types, with different pre-auth logic, edge cases, and reconciliation flows. Engineering and QA were working from scattered, inconsistent documentation." },
        { title: "The Scroll", text: "Wrote the definitive PRD as the single source of truth for Engineering, Design, and QA. Routing table maps every charger type (KCPP, OCPP industrial, OCPP non-industrial, OCPI) to the correct flow variant. Server-side routing surfaced to client as a flow type — keeping the client dumb and logic centralized. Covered: golden screen states, pre-auth initiation, session polling, payment capture, post-session reconciliation, edge cases (network drop, pre-auth expiry, zero usage sessions)." },
        { title: "The Victory", text: "Three teams now operate from one document. Back-and-forth on edge cases eliminated. Spec is actively in development as of May 2026." },
      ],
    },
    notifications: {
      season: "Season III · Track 4 — The Power",
      title: "The Raven Network — App Notification Management",
      lore: "A king who cannot send messages to his people is not a king. He is a prisoner in his own castle.",
      metrics: [
        { val: "Push",      lbl: "Notification Channel" },
        { val: "Scheduled", lbl: "Campaign Support" },
        { val: "Templates", lbl: "Reusable Formats" },
      ],
      sections: [
        { title: "The Problem", text: "CPOs had no direct communication channel to their drivers through the app. No mechanism for promotional offers, charger downtime alerts, maintenance notifications, or payment confirmations. Support tickets were elevated because users had no proactive information." },
        { title: "The Module", text: "Built a notification management module within Kazam CMS. Operators create push notification templates with title, message body, and notification type. A live device preview panel shows exactly how the message appears on a user's screen. Send immediately or schedule for a future date and time. Sent tab and scheduled tab for full campaign history and tracking." },
        { title: "The Impact", text: "CPOs can now run seasonal discount campaigns, charger downtime alerts, loyalty program announcements, and payment confirmations — all without engineering support. Groundwork laid for SMS and Email channels in future iterations." },
      ],
    },
    withdrawal: {
      season: "Season III · Track 5 — The Power",
      title: "The Gold Road — Wallet Withdrawal & Reconciliation",
      lore: "Every coin that leaves the treasury must be recorded. Every withdrawal must leave a trail of ravens.",
      metrics: [
        { val: "UTR+Proof", lbl: "Per-entry Audit" },
        { val: "0",         lbl: "Manual Reconciliation" },
        { val: "Real-time", lbl: "Balance Update" },
      ],
      sections: [
        { title: "The Problem", text: "When driver wallet withdrawals were processed through external gateways like Razorpay, the Kazam CMS was not automatically updated. Ledger mismatches accumulated. The Testing team manually reconciled. Audit trails were incomplete. Human error risk was high. No standardization or scalability." },
        { title: "The Solution", text: "Designed a structured CMS workflow for authorized users to record already-processed withdrawals. Required fields: Amount (mandatory), UTR (Unique Transaction Reference) for traceability, Payment Proof attachment (PNG/JPG/PDF), and a Security Key (user- and org-specific) to prevent unauthorized entries. On submission, driver wallet balance updates instantly and a ledger entry is created." },
        { title: "The Outcome", text: "Manual reconciliation dependency eliminated. Wallet balances stay accurate and in sync. Clean, verifiable audit trail for every withdrawal. Ledger integrity maintained without dependency on the Testing team." },
      ],
    },
    mufasa: {
      season: "Season IV · Track 1 — Beyond the Wall · Pet Project",
      title: "Remember Who You Are — Mufasa AI Fitness Coach",
      lore: "Remember who you are, Simba. You are more than what you have become. So he built his own kingdom.",
      metrics: [
        { val: "Live",  lbl: "Deployed & Breathing" },
        { val: "55+",   lbl: "Indian Foods in DB" },
        { val: "<90s",  lbl: "Onboarding to Plan" },
      ],
      link: "https://mufasa-ka-jungle.vercel.app",
      sections: [
        { title: "The Wildfire Problem", text: "Generic fitness apps (MyFitnessPal, Nike Training) are not built for India. They ignore Indian dietary patterns, require a gym, lack budget constraints, and give no personalisation for desi food or body types. The 18–35 year old Indian professional cannot afford a personal trainer but wants structure." },
        { title: "The Pride Lands", text: "Built a live PWA — mufasa-ka-jungle.vercel.app — that generates fully personalised workout + meal plans using Gemini 2.0 Flash. Adapted to body type (ectomorph/mesomorph/endomorph via BMI + activity), Indian diet preferences (veg/eggetarian/non-veg/vegan), monthly budget, and activity level. 6-step onboarding completes in under 90 seconds." },
        { title: "The Dragon's Logic", text: "All macro calculations are fully deterministic (Mifflin-St Jeor BMR → TDEE → body type adjustments). Gemini output is validated against this logic before saving — preventing unsafe AI outputs. Plans stored in Supabase, only regenerated on profile edit, not per session — managing API costs. Local Indian food DB (55 foods, 8 categories) as primary source; Groq Llama 4 Scout as web search fallback only. Weight-to-macro auto-sync when weight delta ≥ 1kg — no AI call needed." },
        { title: "The Stack", text: "React 18 + TypeScript + Vite + Tailwind CSS. Supabase (PostgreSQL + Google OAuth + Row-Level Security on all tables). Vercel with auto-deploy on push to main. Gemini 2.0 Flash for plan generation, Groq Llama 4 Scout for food search. Screens: Today · Workout · Nutrition · Progress · Expenses · Profile." },
        { title: "The North Star", text: "Weekly active users who log at least 1 workout AND at least 1 meal in the same week — capturing full-loop engagement with the core value proposition." },
      ],
    },
  },

  // Contact / Oath section
  oath: {
    title: "Harsh Jha of House Growth, \nFirst of His Name,Builder of Products",
    text: "The chronicles continue. If you seek a PM who ships with fire and blood, dispatch a raven.",
  },

  links: [
    { label: "Send a Raven",       value: "harshtimes112@gmail.com", href: "mailto:harshtimes112@gmail.com" },
    { label: "Cross Blades",       value: "/in/harshjha03",          href: "https://linkedin.com/in/harshjha03" },
    { label: "Walk the Pride Lands", value: "mufasa-ka-jungle",      href: "https://mufasa-ka-jungle.vercel.app" },
    { label: "Unfurl the Scroll",  value: "Résumé · CV",             href: "#" },
  ],
};
