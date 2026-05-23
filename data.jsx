// Portfolio data — Raz Silberman

const COMPANIES = [
  {
    id: 'quill',
    name: 'Quill',
    tagline: 'Knowledge management for support teams',
    description: 'B2B SaaS · Tel Aviv. The KMS lighthouse for support orgs — writers, agents, admins, and end-users sharing one knowledge graph.',
    role: 'Senior → Lead Product Designer',
    when: '2023 — Present',
    accent: 'sage',
    swatch: { from: '#1A1F1B', to: '#0C100D', mark: '#3E5142' },
    projectIds: ['help-center', 'design-system', 'product-redesign'],
  },
  {
    id: 'northbeam',
    name: 'Northbeam',
    tagline: 'B2B2C platform — admins set up, employees live in it',
    description: 'Two-audience SaaS, sold to companies and used daily by their employees. Owned the analytics squad and rebuilt first-run.',
    role: 'Product Designer',
    when: '2021 — 2023',
    accent: 'blue',
    swatch: { from: '#181B1D', to: '#0B0D0E', mark: '#3E4448' },
    projectIds: ['platform-redesign'],
  },
];

const PROJECTS = [
  {
    id: 'help-center',
    n: '01',
    title: 'Help Center',
    subtitle: 'Self-serve support, end to end',
    role: 'Lead Product Designer',
    year: '2024 — 2025',
    timeline: 'Sep 2024 — Mar 2025',
    platform: 'Web (admin + customer-facing)',
    team: '1 designer, 4 engineers, PM',
    sector: 'B2B SaaS · Knowledge management',
    kind: 'B2B SaaS',
    tile: 'wide',
    summary: 'Replaced a stitched-together legacy help center with a coherent two-sided product: a writer-friendly admin and a fast, searchable end-user reading experience.',
    swatch: { from: '#1A1F1B', to: '#0C100D', mark: '#3E5142' },
    sections: [
      { id: 'context', title: 'Context', body: [
        'The existing help center was three different products taped together — a CMS for writers, an admin for support managers, and a public reader. None of them shared a layout, a search index, or a sense of voice.',
        'The team had been adding to it for four years. By the time I joined, even the people who built it would routinely ask each other where a setting lived. Customers were churning on small things — they couldn\'t find articles they had read the day before.',
      ]},
      { id: 'shape', title: 'Shaping the work', body: [
        'I split the project into two tracks that could ship independently: a unified reader experience (urgent — customers were complaining), and an admin redesign (slower, but unblocked everything else).',
        'Within those, four discrete sub-projects: search & navigation, the article view, the writer\'s editor, and the manager\'s analytics view. Each had its own short doc and its own success metric.',
      ]},
      { id: 'reader', title: 'The reader', body: [
        'Reframed the homepage from "marketing surface" to "reading list." The thing people actually wanted was to find the article they were here for in under five seconds.',
        'Persistent left-rail navigation with the article tree. Inline search that searches as you type, weighted by what the user has already opened in this session.',
      ]},
      { id: 'admin', title: 'The admin', body: [
        'Writers had been working in a Notion-like editor that was great for prose and terrible for the structured fields support articles actually need (steps, prerequisites, related articles).',
        'New editor leans on the structure: title and intro are free-form, but the body is a typed tree of blocks with their own validation and preview.',
      ]},
      { id: 'outcomes', title: 'What changed', kind: 'outcomes', items: [
        { num: '−42%', label: 'Time to first article' },
        { num: '+3.1×', label: 'Self-serve resolution rate' },
        { num: '94%', label: 'Writer satisfaction (was 51%)' },
      ]},
    ],
    gallery: [
      { kind: 'wide', label: 'Reader — article view', tone: '#11140F' },
      { kind: 'sq', label: 'Search', tone: '#0F1311' },
      { kind: 'sq', label: 'Admin · article tree', tone: '#10130E' },
      { kind: 'tall', label: 'Editor', tone: '#0E1110' },
      { kind: 'tall', label: 'Analytics', tone: '#101412' },
    ],
  },
  {
    id: 'design-system',
    n: '02',
    title: 'Telos Design System',
    subtitle: 'A shared language across six product surfaces',
    role: 'Design Systems Lead',
    year: '2023 — 2024',
    timeline: 'Apr 2023 — Feb 2024',
    platform: 'Web · iOS · Android',
    team: '2 designers, 3 engineers',
    sector: 'Internal platform',
    kind: 'Design system',
    tile: 'tall',
    summary: 'Built the company\'s first proper design system from the inside out — tokens, primitives, patterns, governance — and migrated four shipped products onto it without freezing a single feature team.',
    swatch: { from: '#1F1A14', to: '#13100C', mark: '#5A4A33' },
    sections: [
      { id: 'context', title: 'Context', body: [
        'Six product teams, three platforms, and exactly one shared component: the company logo. Buttons came in 14 visually distinct flavors. Spacing followed nobody\'s scale.',
        'Leadership wanted "a design system." What that meant in practice was the much harder thing: a way for six teams to agree without anyone losing autonomy.',
      ]},
      { id: 'tokens', title: 'Tokens first', body: [
        'I started at the bottom — a single source of truth for color, spacing, type, and motion, exported to CSS variables, Swift, and Compose from one JSON spec.',
        'Tokens shipped before any components did. That decision made the rest of the project possible: teams could adopt the new visual language gradually, one variable at a time, without waiting for a button.',
      ]},
      { id: 'primitives', title: 'Primitives, not pages', body: [
        'Resisted the temptation to ship a "card component" or a "form component." Instead: layout primitives (Stack, Cluster, Grid), surface primitives (Box, Sheet, Divider), and a small set of true components (Button, Field, Menu, Toast).',
        'Pages and patterns live in product repos — not in the system. The system is the floor; product teams build the building.',
      ]},
      { id: 'governance', title: 'Governance', body: [
        'Weekly office hours, a public Linear board for requests, and a clear rule: anything used in 3+ products gets promoted to the system; anything in 1 stays local.',
        'The hardest part wasn\'t the components — it was teaching everyone that "this should be in the system" is a question, not a demand.',
      ]},
      { id: 'outcomes', title: 'What changed', kind: 'outcomes', items: [
        { num: '4 → 1', label: 'Button implementations' },
        { num: '−68%', label: 'Time to ship new screens' },
        { num: '0', label: 'Frozen feature teams during migration' },
      ]},
    ],
    gallery: [
      { kind: 'wide', label: 'Token spec', tone: '#15110C' },
      { kind: 'sq', label: 'Primitives', tone: '#13100B' },
      { kind: 'sq', label: 'Components', tone: '#16120D' },
    ],
  },
  {
    id: 'product-redesign',
    n: '03',
    title: 'Product Redesign',
    subtitle: 'System fields & AI-driven article navigation',
    role: 'Senior Product Designer',
    year: '2025',
    timeline: 'Apr — Aug 2025',
    platform: 'Web',
    team: '2 designers, 5 engineers, ML lead',
    sector: 'B2B SaaS',
    kind: 'B2B SaaS',
    tile: 'sq',
    summary: 'Two adjacent redesigns inside the same product surface — one structural (rebuilding how system field metadata is edited), one applied-AI (a navigation menu that reshapes itself around the article you\'re reading).',
    swatch: { from: '#1B1820', to: '#0E0C13', mark: '#4A4458' },
    sections: [
      { id: 'context', title: 'Context', body: [
        'Two pieces of the product had reached the limit of incremental polish — the system fields editor (where admins configure metadata) and the article navigation menu (where readers find their next article).',
        'I treated them as one project because both were really about the same thing: making structure visible without making it heavy.',
      ]},
      { id: 'fields', title: '01 · System fields', body: [
        'System fields are the typed metadata attached to every article — author, audience, status, related products, locale. Twelve of them, sometimes more.',
        'The old editor was a flat form: twelve labeled rows, one validation message per row, and no sense of which fields mattered for the article in front of you.',
        'Redesigned it as a tray that lives next to the article. Fields collapse to a one-line summary when they\'re set; expand inline when they\'re not. Required-but-empty fields lift to the top with a quiet warning style.',
      ]},
      { id: 'nav', title: '02 · AI-driven article navigation', body: [
        'The old navigation was a left-rail tree — every article in the help center, alphabetised under categories. It was complete and unhelpful.',
        'New navigation is generated per-article by a model that ranks neighbours by likely relevance: prerequisites surface above the current article, follow-ups below, alternatives in a quiet "or you might want…" group at the bottom.',
        'The hard part was making the AI legible. Each suggested article has a one-line "why this is here" that the model writes — it\'s editable by the writer and reviewable by the manager.',
      ]},
      { id: 'principles', title: 'Principles for AI surfaces', body: [
        'Three rules I wrote for the team and have kept since: (1) the model never changes the page silently — every change is announced. (2) Every model output is editable by a human. (3) When the model is uncertain, the UI is uncertain — a soft state, not a confident wrong one.',
      ]},
      { id: 'outcomes', title: 'What changed', kind: 'outcomes', items: [
        { num: '+58%', label: 'Article completion (read-through)' },
        { num: '−71%', label: 'Field-editor support tickets' },
        { num: '4.6/5', label: 'Writer trust in AI suggestions' },
      ]},
    ],
    gallery: [
      { kind: 'wide', label: 'Article + fields tray', tone: '#13101A' },
      { kind: 'sq', label: 'AI nav menu', tone: '#15121C' },
      { kind: 'sq', label: 'Field types', tone: '#100E16' },
    ],
  },
  {
    id: 'platform-redesign',
    n: '04',
    title: 'Platform Onboarding',
    subtitle: 'First-run experience for a B2B2C SaaS',
    role: 'Product Designer',
    year: '2022 — 2023',
    timeline: 'Oct 2022 — Mar 2023',
    platform: 'Web',
    team: '1 designer, 3 engineers',
    sector: 'B2B2C SaaS',
    kind: 'B2B2C SaaS',
    tile: 'sq',
    summary: 'Designed the first-run experience for a platform with two audiences — the admin who configures it and the end user who lives in it — and found a way to serve both without forking the product.',
    swatch: { from: '#181B1D', to: '#0B0D0E', mark: '#3E4448' },
    sections: [
      { id: 'context', title: 'Context', body: [
        'A platform sold to companies but used by their employees. Admins set it up once a quarter. End users open it every day. Both groups had been getting the same tour.',
        'Admin completion was 78%, which sounded fine until you looked at the sub-step where they\'re asked to invite their team — only 31% finished that.',
      ]},
      { id: 'split', title: 'A two-track first run', body: [
        'Forked the experience at the door: admins land on a configuration view, end users on a "what is this product even for" view. Each track is short — 4 steps for admin, 2 for end user.',
        'Crucially, end users can be productive before their admin finishes setup. The product degrades gracefully into a personal mode.',
      ]},
      { id: 'outcomes', title: 'What changed', kind: 'outcomes', items: [
        { num: '94%', label: 'Admin completion' },
        { num: '78%', label: 'Team-invite completion' },
        { num: '11d → 2d', label: 'Time to first end-user value' },
      ]},
    ],
    gallery: [
      { kind: 'wide', label: 'Admin setup', tone: '#101315' },
      { kind: 'sq', label: 'End-user welcome', tone: '#0E1112' },
    ],
  },
];

const RESUME = {
  name: 'Raz Silberman',
  title: 'Product Designer',
  blurb: 'Six years designing B2B and B2B2C SaaS products end-to-end — research, structure, interaction, visual, and the unglamorous follow-through that makes work actually ship.',
  contact: [
    { k: 'Email', v: 'hello@razsilberman.com' },
    { k: 'Location', v: 'Tel Aviv · remote-friendly' },
    { k: 'Read.cv', v: 'read.cv/raz' },
    { k: 'LinkedIn', v: 'linkedin.com/in/raz' },
  ],
  experience: [
    {
      role: 'Senior Product Designer',
      org: 'Quill (knowledge management)',
      when: '2023 — Present',
      where: 'Tel Aviv · hybrid',
      notes: [
        'Lead designer on the help center product (~3M monthly readers).',
        'Built and shipped the company\'s first design system; migrated four products onto it.',
        'Owned applied-AI navigation work — wrote the team\'s principles for AI surfaces.',
      ],
    },
    {
      role: 'Product Designer',
      org: 'Northbeam (B2B2C platform)',
      when: '2021 — 2023',
      where: 'Remote',
      notes: [
        'Redesigned first-run for a two-audience SaaS; admin completion 78% → 94%.',
        'Embedded with the analytics squad for a year — owned all dashboard surfaces.',
      ],
    },
    {
      role: 'Product Designer',
      org: 'Studio Faun (agency)',
      when: '2019 — 2021',
      where: 'Berlin',
      notes: [
        'Lead designer on six client engagements across fintech, climate, and healthcare.',
        'Founded the studio\'s component library practice.',
      ],
    },
  ],
  education: [
    { role: 'BFA, Visual Communication', org: 'Bezalel Academy of Arts and Design', when: '2015 — 2019' },
  ],
  speaking: [
    { role: 'Designing for AI uncertainty', org: 'Config (Figma) · panel', when: '2025' },
    { role: 'Tokens before components', org: 'Friends of Figma TLV', when: '2024' },
  ],
  capabilities: [
    'Product strategy', 'Information architecture', 'Interaction design', 'Visual design',
    'Design systems', 'Prototyping (React)', 'User research (mod. + unmod.)', 'Applied AI surfaces',
    'Design ops', 'Cross-functional facilitation',
  ],
};

window.PROJECTS = PROJECTS;
window.COMPANIES = COMPANIES;
window.RESUME = RESUME;
