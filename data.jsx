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
    subtitle: 'A customizable B2B2C Help Center',
    role: 'Lead Designer (solo)',
    year: '2024 — 2025',
    timeline: 'Ongoing, multi-phase',
    platform: 'Web — admin + end-user, responsive',
    team: 'Solo designer · PMs · engineers',
    sector: 'B2B SaaS · Enterprise knowledge',
    kind: 'B2B SaaS',
    company: 'KMS Lighthouse',
    tile: 'wide',
    summary: 'A customizable Help Center that gave business admins full control over their self-service site — no developers required. Replaced a legacy product that wasn\'t winning customers.',
    heroImage: 'help center/36.png',
    swatch: { from: '#1A1F1B', to: '#0C100D', mark: '#3E5142' },
    sections: [
      { id: 'context', title: 'Context', body: [
        'KMS Lighthouse is an enterprise knowledge management platform used by companies like DHL, GE Healthcare, AIG, and Allianz to power their call centers, self-service portals, and internal knowledge bases.',
        'The Help Center is one of Lighthouse\'s external products. It lets businesses spin up a fully branded self-service site for their end users — pulling content directly from the Lighthouse platform their teams already use, so no separate site, no data migration, no parallel content workflow.',
        'It\'s sold separately from the core platform, but built to extend it. For existing customers it\'s an upsell; for new ones it\'s a differentiator against competitors who can\'t offer the same end-to-end loop.',
      ]},
      { id: 'role', title: 'Role & Approach', body: [
        'I was the sole designer on this project, working alongside product managers and engineers across multiple delivery phases.',
        'That meant owning every part of the design — research, IA, flows, wireframes, UI, design system contributions, and handoff. It also meant balancing two very different audiences inside one product: the business admin configuring the Help Center, and the end user trying to find an answer fast.',
      ]},
      { id: 'problem', title: 'The Problem',
        body: ['Lighthouse had an existing Help Center product, but it wasn\'t selling. The reasons were structural, not cosmetic:'],
        list: [
          { label: 'Complex setup.', text: 'Every change — from copy to layout to branding — had to be made in the backend by a specialized dev team. Admins couldn\'t touch their own site.' },
          { label: 'Usability issues.', text: 'Most end users accessed help on mobile, but the existing design wasn\'t responsive. Articles were hard to find, support tickets went up instead of down, and the whole experience felt dated.' },
          { label: 'Limited customization.', text: 'The product offered almost no flexibility. Businesses couldn\'t make the Help Center feel like their own brand, which made it a hard sell to enterprise clients who care about brand consistency.' },
        ],
        outro: ['The result: a product positioned as a competitive differentiator that wasn\'t actually differentiating anything. Existing clients passed on the upsell. New prospects went elsewhere.'],
        media: [
          { src: 'help center/3.png', caption: 'The legacy Help Center', kind: 'wide' },
        ],
      },
      { id: 'goals', title: 'Goals',
        body: ['Three goals shaped the redesign, each tied directly to one of the problems above:'],
        list: [
          { label: 'Put admins in control.', text: 'Give business admins full ownership of their Help Center — setup, content, and maintenance — without needing dev or support involvement.' },
          { label: 'Design mobile-first.', text: 'Rebuild the end-user experience around how people actually use it: on their phone, looking for one answer, fast.' },
          { label: 'Make it brandable.', text: 'Give admins meaningful control over branding and layout so the Help Center could feel like a natural extension of their own site, not a third-party tool bolted on.' },
        ],
      },
      { id: 'research', title: 'Research',
        body: ['To ground the redesign in real needs rather than assumptions, I ran four research tracks in parallel:'],
        list: [
          { label: 'Stakeholder interviews', text: 'with business customers, focused on setup pain points, customization needs, and desired features.' },
          { label: 'User interviews', text: 'with both admins and end users, surfacing where the existing Help Center broke down on each side.' },
          { label: 'Competitive analysis', text: 'of other self-service help platforms, identifying both table-stakes patterns and opportunities to differentiate.' },
          { label: 'Surveys', text: 'with both audiences to validate qualitative findings at scale.' },
        ],
      },
      { id: 'insights', title: 'Key Insights',
        body: ['Three insights drove every design decision that followed:'],
        list: [
          { label: 'Brand customization isn\'t a nice-to-have.', text: 'Enterprise clients won\'t ship a Help Center that doesn\'t feel like theirs. Layout, color, typography, content presentation — admins need real control, and they need it without writing code.' },
          { label: 'Navigation is the product.', text: 'For end users, the Help Center is its search and category structure. Everything else is decoration. Getting findability right was the single biggest unlock.' },
          { label: 'The UI needed to earn its place.', text: 'The old product looked like an admin tool. The new one needed to look like something a brand would proudly link from their main site.' },
        ],
      },
      { id: 'flows', title: 'User Flows',
        body: [
          'I mapped flows for both audiences in parallel — admins configuring the site, end users navigating it — to make sure neither experience was an afterthought of the other.',
          'The exercise surfaced where the two audiences\' needs intersected (and where they didn\'t), which shaped how I structured the admin panel later: a customization model that gives admins real power without exposing end users to its complexity.',
        ],
        media: [
          { src: 'help center/8.png', caption: 'User flow — admin + end-user paths', kind: 'wide' },
        ],
      },
      { id: 'wireframing', title: 'Wireframing',
        body: [
          'Wireframes covered both sides of the product: the admin\'s setup and customization screens, and the end user\'s homepage, category, article, and search experiences.',
          'The goal at this stage was structural — making sure information density, navigation, and content hierarchy worked before any visual design entered the picture.',
        ],
        media: [
          { src: 'help center/9.png', caption: 'Wireframe grid', kind: 'wide' },
        ],
      },
      { id: 'admin', title: 'The Admin Experience',
        body: [
          'The admin side is where this product had to earn its keep. If admins couldn\'t set up and customize the Help Center themselves, nothing else mattered.',
          'I designed the admin panel as a series of focused settings: site configuration, localization, content management, and a dedicated customization panel for branding.',
        ],
        subsections: [
          {
            id: 'admin-settings',
            title: 'Settings',
            body: ['A dedicated section for managing the Help Center\'s website settings, language support, and integration with the Lighthouse platform — including real-time content sync.'],
            media: [
              { src: 'help center/11.png', kind: 'sq' },
              { src: 'help center/12.png', kind: 'sq' },
              { src: 'help center/13.png', kind: 'sq' },
              { src: 'help center/14.png', kind: 'sq' },
              { src: 'help center/15.png', kind: 'sq' },
            ],
          },
          {
            id: 'admin-custom',
            title: 'Customization panel',
            body: ['The customization panel gives admins direct control over their site\'s brand and structure: logo, favicon, header, footer, color system, card styles, and content layout. Non-technical users can change how the Help Center looks and behaves without touching a line of code.'],
            media: [
              { src: 'help center/26.png', caption: 'Customization panel breakdown', kind: 'wide' },
            ],
          },
          {
            id: 'admin-onboarding',
            title: 'Homepage setup with guided onboarding',
            body: ['First-time admins are walked through localization, language management, and translation workflows via inline guides — turning what was previously a developer task into a self-serve flow.'],
            media: [
              { src: 'help center/17.png', kind: 'sq' },
              { src: 'help center/18.png', kind: 'sq' },
              { src: 'help center/19.png', kind: 'sq' },
              { src: 'help center/20.png', kind: 'sq' },
              { src: 'help center/21.png', kind: 'sq' },
              { src: 'help center/22.png', kind: 'sq' },
            ],
          },
        ],
      },
      { id: 'enduser', title: 'The End-User Experience',
        body: [
          'For end users, success is one thing: finding the right answer fast.',
          'The redesigned homepage leads with a hero search anchored in the brand\'s own visual identity, followed by category cards that map to the most common end-user tasks. Articles live in a clean reading layout with related links, helpful/not-helpful feedback, and step-by-step content where it applies.',
        ],
        media: [
          { src: 'help center/36.png', caption: 'Final homepage', kind: 'wide' },
          { src: 'help center/40.png', caption: 'Article view', kind: 'wide' },
        ],
        outro: ['The shift from the previous product is dramatic: the old Help Center looked like a templated FAQ widget. The new one feels like part of the brand\'s own site.'],
        beforeAfter: {
          before: { src: 'help center/3.png',  label: 'Before — legacy product' },
          after:  { src: 'help center/36.png', label: 'After — new Help Center' },
        },
      },
      { id: 'responsive', title: 'Responsive',
        body: ['Mobile-first wasn\'t a slogan — it was a constraint that shaped every layout decision. The end-user experience scales cleanly across desktop, tablet, and mobile, with the same search-first hierarchy at every breakpoint.'],
        media: [
          { src: 'help center/33.png', caption: 'Desktop · tablet · mobile', kind: 'wide' },
        ],
      },
      { id: 'outcome', title: 'Outcome', placeholder: true,
        body: ['Outcome content to fill in together — likely a combination of: first fully customizable Help Center in the Lighthouse product line; existing clients now actively requesting the new version after passing on the old one; new clients signing on partially because of the Help Center; admins able to self-serve setup without dev or support involvement; positive feedback from sales and CS teams.'],
      },
      { id: 'reflection', title: 'Reflection', placeholder: true,
        body: ['One honest sentence on what I learned or would do differently — to fill in.'],
      },
    ],
    gallery: [
      { src: 'help center/36.png', label: 'Final homepage',       kind: 'wide' },
      { src: 'help center/26.png', label: 'Customization panel',  kind: 'sq'   },
      { src: 'help center/40.png', label: 'Article view',         kind: 'sq'   },
      { src: 'help center/33.png', label: 'Responsive',           kind: 'tall' },
      { src: 'help center/8.png',  label: 'User flows',           kind: 'tall' },
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
