// app.jsx — main portfolio app
const { useState, useEffect, useRef, useCallback, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "blue",
  "displayFont": "afacad",
  "theme": "light",
  "tileStyle": "polaroid",
  "heroAlign": "bottom",
  "density": "dense",
  "cursorOn": true,
  "cursorStyle": "puddle",
  "grain": true
}/*EDITMODE-END*/;

const ACCENTS = {
  sage:    'oklch(0.74 0.05 145)',
  clay:    'oklch(0.72 0.08 45)',
  blue:    'oklch(0.72 0.08 240)',
  amber:   'oklch(0.78 0.10 75)',
  mono:    'oklch(0.85 0.005 250)',
  violet:  '#6B5FFF',
};
const ACCENTS_LIGHT = {
  sage:    'oklch(0.45 0.06 145)',
  clay:    'oklch(0.50 0.10 45)',
  blue:    'oklch(0.45 0.09 240)',
  amber:   'oklch(0.52 0.10 75)',
  mono:    'oklch(0.30 0.005 250)',
  violet:  '#5448E0',
};

/* ─── Cursors (3 styles: blob | puddle | ripple) ─── */
function CursorFilters() {
  // Global SVG filters used by puddle (gooey merge) and ripple (water displacement).
  return (
    <svg width="0" height="0" style={{position:'absolute', pointerEvents:'none'}} aria-hidden="true">
      <defs>
        <filter id="gooey-puddle" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
          <feColorMatrix in="b" mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -14" result="g" />
          <feComposite in="SourceGraphic" in2="g" operator="atop" />
        </filter>
        {/* Mask used by .cmyk-burst — punches the live cursor shape out of the burst.
            The path runs the same puddleMorph animation, so the cutout stays in sync. */}
        <mask id="cmyk-cutout" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox"
              x="0" y="0" width="1" height="1">
          <rect width="1" height="1" fill="white" />
          {/* The wrapper's transform is updated each tick so the cutout mirrors the cursor's
              live rotate + elastic scale. The 0.96 keeps the cutout just inside the cursor's
              gooey-rendered edge so no cream halo can show through. */}
          <g className="cmyk-mask-wrap" transform="translate(0.5 0.5) scale(1) translate(-0.5 -0.5)">
            <path className="cmyk-mask-blob"
                  transform="scale(0.01)"
                  d="M50,18 C72,12 90,28 88,52 C92,72 70,90 50,86 C30,90 12,74 12,52 C10,30 28,16 50,18 Z"
                  fill="black" />
          </g>
        </mask>
        {/* Real water-distortion filter applied to the whole #root.
            Turbulence + Displacement = the UI literally warps under the cursor. */}
        <filter id="water-distort" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014 0.020" numOctaves="2" seed="4" result="noise">
            <animate attributeName="baseFrequency" dur="18s"
              values="0.014 0.020;0.022 0.014;0.014 0.020" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function BlobCursor({ enabled, style }) {
  const dotRef = useRef(null);
  const trailRef = useRef(null);
  const ringLayerRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('cursor-on');
    document.documentElement.classList.toggle('cursor-water', style === 'ripple');
    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let rx = mx, ry = my, prx = mx, pry = my;
    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      if (style === 'ripple') {
        document.documentElement.style.setProperty('--mx', mx + 'px');
        document.documentElement.style.setProperty('--my', my + 'px');
      }
    };
    window.addEventListener('mousemove', onMove);

    // Ripple-on-click + occasional ripple while moving
    let lastRing = 0;
    const spawnRing = (x, y, scale = 1) => {
      const r = document.createElement('div');
      r.className = 'water-ring';
      r.style.left = x + 'px';
      r.style.top  = y + 'px';
      r.style.setProperty('--rs', scale.toFixed(2));
      (ringLayerRef.current || document.body).appendChild(r);
      setTimeout(() => r.remove(), 1800);
    };
    const activeBursts = new Set();
    const spawnCmyk = (x, y) => {
      const burst = document.createElement('div');
      burst.className = 'cmyk-burst';
      const cursorEl = dotRef.current;
      if (cursorEl) {
        const r = cursorEl.getBoundingClientRect();
        burst.style.left   = (r.left + r.width / 2)  + 'px';
        burst.style.top    = (r.top  + r.height / 2) + 'px';
        burst.style.width  = cursorEl.offsetWidth  + 'px';
        burst.style.height = cursorEl.offsetHeight + 'px';
      } else {
        burst.style.left = x + 'px';
        burst.style.top  = y + 'px';
      }
      const blob = 'M50,18 C72,12 90,28 88,52 C92,72 70,90 50,86 C30,90 12,74 12,52 C10,30 28,16 50,18 Z';
      burst.innerHTML = `
        <svg class="c" viewBox="0 0 100 100" aria-hidden="true"><path d="${blob}"/></svg>
        <svg class="m" viewBox="0 0 100 100" aria-hidden="true"><path d="${blob}"/></svg>
        <svg class="y" viewBox="0 0 100 100" aria-hidden="true"><path d="${blob}"/></svg>
      `;
      document.body.appendChild(burst);
      activeBursts.add(burst);
      setTimeout(() => { burst.remove(); activeBursts.delete(burst); }, 460);
    };
    const onDown = (e) => {
      spawnCmyk(e.clientX, e.clientY);
      if (style !== 'ripple') return;
      spawnRing(e.clientX, e.clientY, 1.6);
      setTimeout(() => spawnRing(e.clientX, e.clientY, 1.2), 120);
    };
    window.addEventListener('mousedown', onDown);

    let lastTrail = 0;
    let raf;
    const tick = (ts) => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const dx = rx - prx, dy = ry - pry;
      const v = Math.min(28, Math.hypot(dx, dy));
      if (dotRef.current) {
        dotRef.current.style.left = rx + 'px';
        dotRef.current.style.top  = ry + 'px';
        dotRef.current.style.setProperty('--vel', v.toFixed(2));
        const angDeg = Math.atan2(dy, dx) * 180 / Math.PI;
        dotRef.current.style.setProperty('--ang', angDeg.toFixed(1) + 'deg');
        if (style === 'puddle') {
          // strong elastic stretch along direction of motion
          const sx = 1 + v * 0.06;
          const sy = Math.max(0.45, 1 - v * 0.038);
          dotRef.current.style.setProperty('--sx', sx.toFixed(3));
          dotRef.current.style.setProperty('--sy', sy.toFixed(3));
          // Sync the CMYK mask cutout to the cursor's live transform so the cutout
          // shape matches the rendered cursor (rotate + elastic scale + 0.96 inset).
          const maskWrap = document.querySelector('.cmyk-mask-wrap');
          if (maskWrap) {
            maskWrap.setAttribute(
              'transform',
              `translate(0.5 0.5) rotate(${angDeg.toFixed(1)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(-0.5 -0.5)`
            );
          }
        }

        // ripple: emit water rings while moving
        if (style === 'ripple' && v > 1.2 && (!lastRing || ts - lastRing > 130)) {
          lastRing = ts;
          spawnRing(rx, ry, 0.9 + Math.min(0.6, v * 0.04));
        }
        // keep CMYK bursts glued to the cursor so the mask stays aligned
        if (activeBursts.size) {
          activeBursts.forEach(b => {
            b.style.left = rx + 'px';
            b.style.top  = ry + 'px';
          });
        }
      }
      prx = rx; pry = ry;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e) => {
      const t = e.target.closest?.('a, button, [data-hover], input, textarea');
      if (!dotRef.current) return;
      dotRef.current.classList.remove('big', 'text');
      if (!t) return;
      if (t.matches('input, textarea, [contenteditable]')) dotRef.current.classList.add('text');
      else dotRef.current.classList.add('big');
    };
    document.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('cursor-on');
      document.documentElement.classList.remove('cursor-water');
    };
  }, [enabled, style]);
  if (!enabled) return null;

  if (style === 'puddle') {
    return (
      <>
        <CursorFilters />
        <div ref={trailRef} className="cur-trail-layer" />
        <div ref={dotRef} className="puddle-cursor">
          <svg viewBox="0 0 100 100" aria-hidden="true" className="puddle-svg">
            <path className="puddle-body" d="M50,18 C72,12 90,28 88,52 C92,72 70,90 50,86 C30,90 12,74 12,52 C10,30 28,16 50,18 Z" />
          </svg>
        </div>
      </>
    );
  }

  if (style === 'ripple') {
    return (
      <>
        <CursorFilters />
        <div className="water-veil" />
        <div ref={ringLayerRef} className="water-ring-layer" />
        <div ref={dotRef} className="ripple-cursor">
          <span className="rc-core" />
          <span className="rc-halo" />
        </div>
      </>
    );
  }

  // default — blob
  return (
    <div ref={dotRef} className="blob-cursor">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path className="blob-outer" d="M50,8 C72,6 94,22 94,46 C96,68 80,90 56,94 C32,98 10,82 6,58 C2,36 18,12 50,8 Z" />
        <path className="blob-inner" d="M50,22 C66,20 82,32 80,52 C82,68 66,80 48,80 C30,80 18,66 20,48 C22,32 36,22 50,22 Z" />
      </svg>
    </div>
  );
}

/* ─── Loader ─── */
function Loader({ onDone }) {
  const ref = useRef(null);
  const progRef = useRef(null);
  const subRef = useRef(null);
  useEffect(() => {
    const final = 'Raz Silberman — Portfolio';
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789·×#@%&*';
    // Each char gets a "lock-in" frame; before that, it scrambles.
    const lockAt = final.split('').map((_, i) => 6 + i * 2 + Math.floor(Math.random() * 4));
    let frame = 0;
    const totalFrames = Math.max(...lockAt) + 4;
    const scrambleId = setInterval(() => {
      frame++;
      const out = final.split('').map((ch, i) => {
        if (ch === ' ' || ch === '—') return ch;
        if (frame >= lockAt[i]) return ch;
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      }).join('');
      if (subRef.current) subRef.current.textContent = out;
      if (frame >= totalFrames) clearInterval(scrambleId);
    }, 45);

    const t1 = setTimeout(() => progRef.current?.classList.add('run'), 100);
    const t2 = setTimeout(() => {
      ref.current?.classList.add('out');
      setTimeout(onDone, 800);
    }, 1900);
    return () => { clearInterval(scrambleId); clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  return (
    <div id="loader" ref={ref}>
      <div className="loader-mark">RS<span className="accent">·</span></div>
      <div className="loader-progress" ref={progRef}></div>
      <div className="loader-sub" ref={subRef}>Raz Silberman — Portfolio</div>
    </div>
  );
}

/* ─── Nav ─── */
function Nav({ page, setPage, onCmdK, theme, toggleTheme }) {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 60);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [
    { id: 'home',   label: 'Index' },
    { id: 'work',   label: 'Work' },
    { id: 'about',  label: 'About' },
    { id: 'resume', label: 'Resume' },
  ];
  return (
    <nav className={`top ${compact ? 'compact' : ''} ${hidden ? 'hidden' : ''}`}>
      <a className="nav-logo" href="#" onClick={e => { e.preventDefault(); setPage('home'); }}>
        Raz<span className="accent">.</span>
      </a>
      <div className="nav-right">
        <ul className="nav-links">
          {items.map(it => (
            <li key={it.id}>
              <a href="#" className={page === it.id ? 'active' : ''}
                 onClick={e => { e.preventDefault(); setPage(it.id); }}>{it.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <span className="avail"><span className="avail-dot"></span>Available</span>
          <button className="icon-btn" onClick={onCmdK} title="Search (⌘K)" aria-label="Open command palette">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>
            </svg>
          </button>
          <button className="icon-btn" onClick={toggleTheme} title={`${theme === 'dark' ? 'Light' : 'Dark'} mode`} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero({ align }) {
  const [up, setUp] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setUp(true), 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <section className="hero" data-align={align}>
      <div className={`hero-eyebrow ${up ? 'up' : ''}`}>
        <span className="avail-dot" style={{display:'inline-block'}}></span>
        <span>Product designer · Tel Aviv · Open to work</span>
      </div>
      <h1 className={`hero-title ${up ? 'up' : ''}`}>
        <span className="word"><span className="word-inner">Think</span></span>{' '}
        <span className="word"><span className="word-inner">of</span></span>{' '}
        <span className="word"><span className="word-inner">what</span></span>{' '}
        <span className="word"><span className="word-inner accent">inspires</span></span>{' '}
        <span className="word"><span className="word-inner">you,</span></span>{' '}
        <span className="word"><span className="word-inner">and</span></span>{' '}
        <span className="word"><span className="word-inner"><em>imagine</em></span></span>{' '}
        <span className="word"><span className="word-inner">that's</span></span>{' '}
        <span className="word"><span className="word-inner">whats</span></span>{' '}
        <span className="word"><span className="word-inner">written</span></span>{' '}
        <span className="word"><span className="word-inner">here</span></span>
      </h1>
      <div className={`hero-bottom ${up ? 'up' : ''}`}>
        <p className="hero-desc">
          I'm Raz — a product designer working on B2B SaaS, knowledge management, and
          applied-AI surfaces. Six years in. Currently designing the help-center stack
          and design system at Quill.
        </p>
        <div className="hero-meta">
          <div><b>Currently</b></div>
          <div>Senior at Quill</div>
          <div style={{marginTop:'.4rem'}}><b>Based</b></div>
          <div>Tel Aviv · Remote-friendly</div>
        </div>
      </div>
    </section>
  );
}

/* ─── Work tile ─── */
function Tile({ p, idx, onOpen, style }) {
  return (
    <div className={`tile ${p.tile === 'wide' ? 'wide' : ''} ${p.tile === 'tall' ? 'tall' : ''} reveal`}
         style={{transitionDelay: `${idx * 80}ms`}}
         onClick={() => onOpen(p.id)} data-hover>
      <div className="tile-img"
           style={{ background: `linear-gradient(135deg, ${p.swatch.from} 0%, ${p.swatch.to} 100%)` }}>
        <div className="tile-img-mark">{p.n}</div>
        <div className="tile-img-bg" style={{ color: p.swatch.mark }}>{p.n}</div>
        <div className="tile-overlay"></div>
        <div className="tile-label">View case study →</div>
        <div className="tile-arrow-corner">→</div>
      </div>
      {style !== 'index' && style !== 'fullbleed' && (
        <div className="tile-meta">
          <span className="tile-name">{p.title}</span>
          <span className="tile-tags">{p.kind} · {p.year}</span>
        </div>
      )}
      {style === 'fullbleed' && (
        <>
          <span className="tile-num">{p.n}</span>
          <span className="tile-name">{p.title}</span>
          <span className="tile-tags">{p.kind}</span>
          <span className="tile-arrow">→</span>
        </>
      )}
      {style === 'index' && (
        <>
          <span className="tile-num">{p.n}</span>
          <span className="tile-name">{p.title}</span>
          <span className="tile-tags">{p.kind}</span>
          <span className="tile-year">{p.year}</span>
          <span className="tile-arrow">→</span>
        </>
      )}
    </div>
  );
}

/* ─── Home page ─── */
function Home({ onOpen, tweaks, openContact }) {
  return (
    <div className="page active">
      <Hero align={tweaks.heroAlign} />

      <section className="section" id="work">
        <div className="section-head">
          <h2>Selected Work</h2>
          <span className="right">04 · 2022 — 2025</span>
        </div>
        <div className={`work-grid ${tweaks.tileStyle}`}>
          {window.PROJECTS.map((p, i) => (
            <Tile key={p.id} p={p} idx={i} onOpen={onOpen} style={tweaks.tileStyle} />
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-photo-col">
          <div className="about-photo clip-reveal">
            <div className="inner">
              <div className="mono">RS</div>
              <div className="note">Photo placeholder</div>
            </div>
          </div>
        </div>
        <div className="about-text">
          <div className="about-eyebrow clip-reveal">About</div>
          <h2 className="about-headline clip-reveal" style={{transitionDelay:'.1s'}}>
            I design products that <em>respect the people using them.</em>
          </h2>
          <p className="clip-reveal" style={{transitionDelay:'.15s'}}>
            Six years in B2B SaaS. I'm at my best when a problem looks unfixable from
            the outside — when the real shape of it is hiding under three layers of
            "we've always done it this way."
          </p>
          <p className="clip-reveal" style={{transitionDelay:'.2s'}}>
            Lately that's meant a lot of work on knowledge tools and applied-AI
            surfaces — places where the product has to be honest about what it knows,
            what it's guessing, and what it'd like you to teach it.
          </p>
          <p className="clip-reveal" style={{transitionDelay:'.25s'}}>
            I work end to end. Research, structure, interaction, visual, and the
            unglamorous follow-through that makes work actually ship.
          </p>
          <div className="cap-list clip-reveal" style={{transitionDelay:'.3s'}}>
            {window.RESUME.capabilities.slice(0, 8).map(c => (
              <span key={c} className="cap-pill">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-eyebrow">Open to work · Q3 2025</div>
        <h2 className="contact-headline">
          Let's make<br/>something <em>good.</em>
        </h2>
        <a className="contact-btn" href="mailto:hello@razsilberman.com">
          hello@razsilberman.com
          <span>→</span>
        </a>
        <ul className="contact-links">
          <li><a href="#">Read.cv</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Are.na</a></li>
          <li><a href="#">Twitter</a></li>
        </ul>
      </section>

      <footer>
        <span>© 2025 Raz Silberman</span>
        <span>Set in Afacad Flux + Afacad</span>
      </footer>
    </div>
  );
}

/* ─── Work index page (filterable) ─── */
function WorkIndex({ onOpen }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort]     = useState('recent');
  const kinds = useMemo(() => {
    const set = new Set(window.PROJECTS.map(p => p.kind));
    return ['all', ...Array.from(set)];
  }, []);
  const items = useMemo(() => {
    let list = window.PROJECTS.filter(p => filter === 'all' || p.kind === filter);
    if (sort === 'recent') list = [...list].sort((a, b) => b.year.localeCompare(a.year));
    if (sort === 'name')   list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [filter, sort]);
  return (
    <div className="page active">
      <section className="section" style={{paddingTop:'9rem'}}>
        <div className="section-head" style={{borderTop:'none', paddingTop:0}}>
          <h2>All Work</h2>
          <span className="right">{window.PROJECTS.length} projects · 2022 — 2025</span>
        </div>
        <div className="filters">
          {kinds.map(k => (
            <button key={k} className={`filter-chip ${filter === k ? 'active' : ''}`}
                    onClick={() => setFilter(k)}>{k === 'all' ? 'All' : k}</button>
          ))}
          <span className="filter-spacer"></span>
          <span className="filter-sort">Sort:</span>
          <button className={`filter-chip ${sort === 'recent' ? 'active' : ''}`} onClick={() => setSort('recent')}>Recent</button>
          <button className={`filter-chip ${sort === 'name' ? 'active' : ''}`} onClick={() => setSort('name')}>A–Z</button>
        </div>
        <div className="work-grid index">
          {items.map((p, i) => (
            <Tile key={p.id} p={p} idx={i} onOpen={onOpen} style="index" />
          ))}
        </div>
      </section>
      <footer>
        <span>© 2025 Raz Silberman</span>
        <span>{items.length} of {window.PROJECTS.length} shown</span>
      </footer>
    </div>
  );
}

/* ─── About page (just home about + extras) ─── */
function About({ onOpen }) {
  return (
    <div className="page active">
      <section className="about" style={{paddingTop:'9rem', borderTop:'none'}}>
        <div className="about-photo-col">
          <div className="about-photo">
            <div className="inner">
              <div className="mono">RS</div>
              <div className="note">Photo placeholder</div>
            </div>
          </div>
        </div>
        <div className="about-text">
          <div className="about-eyebrow">About</div>
          <h2 className="about-headline">
            Six years in. Still <em>genuinely curious</em> about the work.
          </h2>
          <p>
            I'm Raz. I design B2B SaaS — knowledge tools, design systems, and the kind of
            product surfaces that AI is starting to live inside. Currently a senior at
            Quill, where I lead the help center product and the company's design system.
          </p>
          <p>
            Before that I was at Northbeam working on first-run experiences for
            two-audience platforms, and at Studio Faun in Berlin doing client work
            across fintech, climate, and healthcare.
          </p>
          <p>
            I studied visual communication at Bezalel. I think a lot about the
            difference between a product that looks finished and one that <em>is</em>
            finished. The second is harder. Both are worth doing.
          </p>
          <p>
            Outside of work: long walks, slow cooking, and a stubborn analog film habit
            that has cost me more than I'd like to admit.
          </p>
          <div className="cap-list">
            {window.RESUME.capabilities.map(c => (
              <span key={c} className="cap-pill">{c}</span>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <span>© 2025 Raz Silberman</span>
        <span>Tel Aviv · Remote-friendly</span>
      </footer>
    </div>
  );
}

/* ─── Resume page ─── */
function Resume() {
  const r = window.RESUME;
  return (
    <div className="page active">
      <section className="resume">
        <div className="resume-head">
          <div>
            <div className="role">Resume · CV · v2025.3</div>
            <h1>{r.name}</h1>
            <p>{r.blurb}</p>
          </div>
          <ul className="resume-contact">
            {r.contact.map(c => (
              <li key={c.k}><span className="k">{c.k}</span>{c.v}</li>
            ))}
          </ul>
        </div>

        <div className="resume-block">
          <h2>Experience</h2>
          {r.experience.map(e => (
            <div key={e.org} className="resume-row">
              <div className="when">
                {e.when}
                <span className="where">{e.where}</span>
              </div>
              <div>
                <div className="role-name">{e.role}</div>
                <div className="org">{e.org}</div>
                <ul>{e.notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-block">
          <h2>Education</h2>
          {r.education.map(e => (
            <div key={e.org} className="resume-row">
              <div className="when">{e.when}</div>
              <div>
                <div className="role-name">{e.role}</div>
                <div className="org">{e.org}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-block">
          <h2>Speaking</h2>
          {r.speaking.map(s => (
            <div key={s.role} className="resume-row">
              <div className="when">{s.when}</div>
              <div>
                <div className="role-name">{s.role}</div>
                <div className="org">{s.org}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-block">
          <h2>Capabilities</h2>
          <div className="cap-grid">
            {r.capabilities.map(c => <span key={c} className="cap-pill">{c}</span>)}
          </div>
        </div>
      </section>
      <footer>
        <span>© 2025 Raz Silberman</span>
        <a href="#" onClick={e => e.preventDefault()}>Download PDF →</a>
      </footer>
    </div>
  );
}

/* ─── Article versioning flow diagram (User Flows section) ─── */
function UserFlowDiagram() {
  return (
    <svg className="uf-svg" viewBox="0 0 1210 1170" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="Article versioning flow: Draft to Active to Past">
      <defs>
        <marker id="uf-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" className="uf-arrow-head" />
        </marker>
      </defs>

      {/* === LANES === (fixed; labels anchor the left side, diagram is offset right of them) */}
      <rect className="uf-lane-rect" x="40" y="120" width="1020" height="220" rx="10" />
      <text className="uf-lane-title" x="60" y="220">“Future” version</text>
      <text className="uf-lane-note" x="60" y="248">there can be only one</text>

      <rect className="uf-lane-rect" x="40" y="570" width="1020" height="220" rx="10" />
      <text className="uf-lane-title" x="60" y="670">“Active” version</text>
      <text className="uf-lane-note" x="60" y="698">there can be only one</text>

      <rect className="uf-lane-rect" x="40" y="900" width="1020" height="220" rx="10" />
      <text className="uf-lane-title" x="60" y="1000">“Past” versions</text>
      <text className="uf-lane-note" x="60" y="1028">there can be numerous</text>

      {/* === DIAGRAM === (offset 100px right so it clears the lane labels) */}
      <g transform="translate(100, 0)">
        {/* Start indicator (oval) */}
        <rect x="410" y="14" width="280" height="44" rx="22" className="uf-start-oval" />
        <text x="550" y="42" className="uf-start-label" textAnchor="middle">User creates a new article</text>
        <path d="M 550 64 L 550 158" className="uf-arrow-path" markerEnd="url(#uf-arrow)" />

        {/* Draft node */}
        <g transform="translate(450, 160)">
          <rect className="uf-node" width="200" height="140" rx="2" />
          <text x="100" y="62" className="uf-node-title" textAnchor="middle">“Draft”</text>
          <circle cx="58" cy="106" r="5" className="uf-dot uf-off" />
          <text x="72" y="111" className="uf-node-status">Offline</text>
        </g>

        {/* Draft → label box → Decision */}
        <path d="M 550 300 L 550 364" className="uf-arrow-path" />
        <rect x="410" y="364" width="280" height="62" rx="6" className="uf-flow-label-box" />
        <text x="550" y="390" className="uf-flow-label-text" textAnchor="middle">User marks “Draft”</text>
        <text x="550" y="406" className="uf-flow-label-text" textAnchor="middle">version as “Active”</text>
        <path d="M 550 426 L 550 448" className="uf-arrow-path" markerEnd="url(#uf-arrow)" />

        {/* Decision diamond */}
        <g transform="translate(550, 500)">
          <polygon points="0,-50 90,0 0,50 -90,0" className="uf-decision" />
          <text x="0" y="-4" className="uf-decision-label" textAnchor="middle">Do you want</text>
          <text x="0" y="18" className="uf-decision-label" textAnchor="middle">to publish?</text>
        </g>

        {/* Yes / No labels */}
        <text x="400" y="492" className="uf-helper" textAnchor="middle">Yes</text>
        <text x="700" y="492" className="uf-helper" textAnchor="middle">No</text>

        {/* Decision branches */}
        <path d="M 460 500 L 350 500 L 350 598" className="uf-arrow-path" fill="none" markerEnd="url(#uf-arrow)" />
        <path d="M 640 500 L 750 500 L 750 598" className="uf-arrow-path" fill="none" markerEnd="url(#uf-arrow)" />

        {/* Published */}
        <g transform="translate(250, 600)">
          <rect className="uf-node" width="200" height="140" rx="2" />
          <text x="100" y="62" className="uf-node-title" textAnchor="middle">“Published”</text>
          <circle cx="58" cy="106" r="5" className="uf-dot uf-on" />
          <text x="72" y="111" className="uf-node-status">Online</text>
        </g>

        {/* Unpublished */}
        <g transform="translate(650, 600)">
          <rect className="uf-node" width="200" height="140" rx="2" />
          <text x="100" y="62" className="uf-node-title" textAnchor="middle">“Unpublished”</text>
          <circle cx="58" cy="106" r="5" className="uf-dot uf-off" />
          <text x="72" y="111" className="uf-node-status">Offline</text>
        </g>

        {/* Toggle Published ↔ Unpublished */}
        <text x="550" y="654" className="uf-helper" textAnchor="middle">User can toggle</text>
        <path d="M 452 665 L 648 665" className="uf-arrow-path" markerStart="url(#uf-arrow)" markerEnd="url(#uf-arrow)" />

        {/* Published → label box → Archived */}
        <path d="M 350 740 L 350 814" className="uf-arrow-path" />
        <rect x="210" y="814" width="280" height="62" rx="6" className="uf-flow-label-box" />
        <text x="350" y="832" className="uf-flow-label-text" textAnchor="middle">A new “Draft” version</text>
        <text x="350" y="848" className="uf-flow-label-text" textAnchor="middle">marked as “Active”,</text>
        <text x="350" y="864" className="uf-flow-label-text" textAnchor="middle">old one pushed to “Archived”</text>
        <path d="M 350 876 L 350 928" className="uf-arrow-path" markerEnd="url(#uf-arrow)" />

        {/* Unpublished → label box → Hidden */}
        <path d="M 750 740 L 750 814" className="uf-arrow-path" />
        <rect x="610" y="814" width="280" height="62" rx="6" className="uf-flow-label-box" />
        <text x="750" y="832" className="uf-flow-label-text" textAnchor="middle">If the “Active” version</text>
        <text x="750" y="848" className="uf-flow-label-text" textAnchor="middle">never was “Published”</text>
        <text x="750" y="864" className="uf-flow-label-text" textAnchor="middle">it turns to “Hidden”</text>
        <path d="M 750 876 L 750 928" className="uf-arrow-path" markerEnd="url(#uf-arrow)" />

        {/* Archived */}
        <g transform="translate(250, 930)">
          <rect className="uf-node" width="200" height="140" rx="2" />
          <text x="100" y="62" className="uf-node-title" textAnchor="middle">“Archived”</text>
          <circle cx="58" cy="106" r="5" className="uf-dot uf-on" />
          <text x="72" y="111" className="uf-node-status">Online</text>
        </g>

        {/* Hidden */}
        <g transform="translate(650, 930)">
          <rect className="uf-node" width="200" height="140" rx="2" />
          <text x="100" y="62" className="uf-node-title" textAnchor="middle">“Hidden”</text>
          <circle cx="58" cy="106" r="5" className="uf-dot uf-off" />
          <text x="72" y="111" className="uf-node-status">Offline</text>
        </g>

        {/* Toggle Archived ↔ Hidden */}
        <text x="550" y="984" className="uf-helper" textAnchor="middle">User can toggle</text>
        <path d="M 452 995 L 648 995" className="uf-arrow-path" markerStart="url(#uf-arrow)" markerEnd="url(#uf-arrow)" />

        {/* Return loop */}
        <path d="M 850 1000 L 1080 1000 L 1080 230 L 650 230" className="uf-arrow-path" fill="none" markerEnd="url(#uf-arrow)" />
        <text x="1098" y="615" className="uf-helper" transform="rotate(-90, 1098, 615)" textAnchor="middle">Creating new “Draft”</text>
      </g>
    </svg>
  );
}

/* ─── Inline interactive grid demo (Responsive Grid System section) ─── */
function GridDemo({ caption }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const $ = (id) => root.querySelector('#' + id);
    const VW = 800;
    const BPS = [
      { name: 'XS', min: 0,    max: 599,      columns: 4,  gx: 16, gy: 16, margin: 16 },
      { name: 'SM', min: 600,  max: 1023,     columns: 8,  gx: 16, gy: 24, margin: 24 },
      { name: 'MD', min: 1024, max: 1439,     columns: 12, gx: 24, gy: 24, margin: 32 },
      { name: 'LG', min: 1440, max: 1919,     columns: 12, gx: 24, gy: 24, margin: 48 },
      { name: 'XL', min: 1920, max: Infinity, columns: 12, gx: 32, gy: 32, margin: 64 },
    ];
    const state = { vp: 1280, left: 'off', right: 'off' };
    const bpFor = (w) => { for (const b of BPS) if (w >= b.min && w <= b.max) return b; return BPS[0]; };
    const rwReal = (vbp, st) => {
      if (st === 'off') return 0;
      if (vbp.name === 'XS' || vbp.name === 'SM') return -1;
      if (vbp.name === 'MD') return 360;
      return st === 'collapsed' ? 56 : 460;
    };
    const lwReal = (vbp, st) => {
      if (st === 'off') return 0;
      if (vbp.name === 'XS') return -1;
      return 320;
    };
    function paint() {
      const vbp = bpFor(state.vp);
      const rw = rwReal(vbp, state.right);
      const lw = lwReal(vbp, state.left);
      const reduces = rw > 0;
      const available = state.vp - (reduces ? rw : 0);
      const gridReal = Math.min(available, 1920);
      const extraEach = (available - gridReal) / 2;
      const abp = bpFor(gridReal);
      $('g-vp').textContent = state.vp + ' px';
      $('g-eff').textContent = Math.round(gridReal) + ' px';
      const sb = $('g-bp'); sb.textContent = abp.name; sb.className = 'bp-pill bp-' + abp.name;
      $('g-cols').textContent = abp.columns;
      $('g-gut').textContent = abp.gx + ' / ' + abp.gy;
      $('g-mar').textContent = abp.margin;
      const scale = VW / state.vp;
      const gridVisual = gridReal * scale;
      const padVisual = extraEach * scale;
      const grid = $('g-container');
      grid.style.left = padVisual + 'px';
      grid.style.width = gridVisual + 'px';
      const mPx = abp.margin * scale;
      $('g-mleft').style.left = '0';
      $('g-mleft').style.width = mPx + 'px';
      $('g-mright').style.left = (gridVisual - mPx) + 'px';
      $('g-mright').style.width = mPx + 'px';
      const cols = $('g-colslot');
      cols.innerHTML = '';
      cols.style.left = mPx + 'px';
      const innerW = Math.max(0, gridVisual - 2 * mPx);
      cols.style.width = innerW + 'px';
      const totalGut = (abp.columns - 1) * abp.gx * scale;
      const colW = Math.max(0, (innerW - totalGut) / abp.columns);
      for (let i = 0; i < abp.columns; i++) {
        const c = document.createElement('div'); c.className = 'grid-col'; c.style.width = colW + 'px';
        cols.appendChild(c);
        if (i < abp.columns - 1) {
          const g = document.createElement('div'); g.className = 'grid-gutter'; g.style.width = (abp.gx * scale) + 'px';
          cols.appendChild(g);
        }
      }
      const rp = $('g-right');
      if (state.right !== 'off') { rp.style.display = 'block'; rp.style.width = (rw === -1 ? VW : rw * scale) + 'px'; }
      else rp.style.display = 'none';
      const lp = $('g-left');
      if (state.left === 'on') {
        lp.style.display = 'block';
        lp.style.left = padVisual + 'px';
        lp.style.width = (lw === -1 ? VW : lw * scale) + 'px';
      } else lp.style.display = 'none';
      const jump = $('g-bp-jump');
      if (jump) jump.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.bp === abp.name));
    }
    const slider = $('g-vp-slider');
    const out = $('g-vp-out');
    const onSlide = () => { state.vp = parseInt(slider.value, 10); out.textContent = state.vp; paint(); };
    slider.addEventListener('input', onSlide);
    const cleanups = [() => slider.removeEventListener('input', onSlide)];
    const bind = (id, key) => {
      const wrap = $(id);
      wrap.querySelectorAll('button').forEach(b => {
        const h = () => {
          wrap.querySelectorAll('button').forEach(x => x.classList.remove('active'));
          b.classList.add('active');
          state[key] = b.dataset.v;
          paint();
        };
        b.addEventListener('click', h);
        cleanups.push(() => b.removeEventListener('click', h));
      });
    };
    bind('g-left-toggle', 'left');
    bind('g-right-toggle', 'right');
    $('g-bp-jump').querySelectorAll('button').forEach(b => {
      const h = () => {
        const v = parseInt(b.dataset.vp, 10);
        state.vp = v;
        slider.value = v;
        out.textContent = v;
        paint();
      };
      b.addEventListener('click', h);
      cleanups.push(() => b.removeEventListener('click', h));
    });
    paint();
    return () => cleanups.forEach(fn => fn());
  }, []);
  return (
    <figure className="proj-media-item k-wide grid-demo-figure">
      <div id="proj-grid-demo" ref={rootRef}>
        <div className="card">
          <div className="grid-stats">
            <div className="grid-stat"><p className="grid-stat-label">Viewport</p><p className="grid-stat-val" id="g-vp">1280 px</p></div>
            <div className="grid-stat"><p className="grid-stat-label">Effective</p><p className="grid-stat-val" id="g-eff">1280 px</p></div>
            <div className="grid-stat"><p className="grid-stat-label">Breakpoint</p><p className="grid-stat-val"><span className="bp-pill bp-MD" id="g-bp">MD</span></p></div>
            <div className="grid-stat"><p className="grid-stat-label">Columns</p><p className="grid-stat-val" id="g-cols">12</p></div>
            <div className="grid-stat"><p className="grid-stat-label">Gutter</p><p className="grid-stat-val" id="g-gut">24 / 24</p></div>
            <div className="grid-stat"><p className="grid-stat-label">Margin</p><p className="grid-stat-val" id="g-mar">32</p></div>
          </div>
          <div className="grid-stage">
            <div className="grid-header"></div>
            <div className="grid-body" id="g-body">
              <div className="grid-container" id="g-container">
                <div className="grid-margin" id="g-mleft"></div>
                <div className="grid-cols" id="g-colslot"></div>
                <div className="grid-margin" id="g-mright"></div>
              </div>
              <div className="grid-right-panel" id="g-right" style={{display:'none'}}></div>
              <div className="grid-left-panel" id="g-left" style={{display:'none'}}></div>
            </div>
          </div>
          <div className="controls-row">
            <label htmlFor="g-vp-slider">Viewport</label>
            <input type="range" id="g-vp-slider" min="360" max="2400" step="1" defaultValue="1280" />
            <span style={{fontFamily:'ui-monospace, monospace', minWidth:'56px', textAlign:'right'}} id="g-vp-out">1280</span>
          </div>
          <div className="controls-row">
            <label>Left panel</label>
            <div className="pill-toggle" id="g-left-toggle">
              <button data-v="off" className="active">Hidden</button>
              <button data-v="on">Open (overlay)</button>
            </div>
          </div>
          <div className="controls-row">
            <label>Right panel</label>
            <div className="pill-toggle" id="g-right-toggle">
              <button data-v="off" className="active">Hidden</button>
              <button data-v="on">Open</button>
              <button data-v="collapsed">Collapsed (LG/XL)</button>
            </div>
          </div>
          <div className="controls-row">
            <label>Jump to</label>
            <div className="bp-jump" id="g-bp-jump">
              <button data-bp="XS" data-vp="360"  className="bp-pill bp-XS">XS</button>
              <button data-bp="SM" data-vp="800"  className="bp-pill bp-SM">SM</button>
              <button data-bp="MD" data-vp="1280" className="bp-pill bp-MD">MD</button>
              <button data-bp="LG" data-vp="1600" className="bp-pill bp-LG">LG</button>
              <button data-bp="XL" data-vp="2000" className="bp-pill bp-XL">XL</button>
            </div>
          </div>
        </div>
      </div>
      {caption && <figcaption className="proj-caption">{caption}</figcaption>}
    </figure>
  );
}

/* ─── Side gallery — scrollable carousel for the right column of a split section ─── */
function SideGallery({ items }) {
  const [active, setActive] = useState(0);
  const total = items.length;
  if (!total) return null;
  const m = items[active];
  return (
    <div className="proj-side-gallery">
      <figure className="proj-side-gallery-frame">
        <img src={m.src} alt={m.caption || ''} loading="lazy" />
        {m.caption && <figcaption className="proj-caption">{m.caption}</figcaption>}
      </figure>
      <div className="proj-side-gallery-nav">
        <button
          className="proj-side-gallery-btn"
          onClick={() => setActive((a) => (a - 1 + total) % total)}
          aria-label="Previous image"
        >←</button>
        <div className="proj-side-gallery-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`proj-side-gallery-dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1} of ${total}`}
            />
          ))}
        </div>
        <button
          className="proj-side-gallery-btn"
          onClick={() => setActive((a) => (a + 1) % total)}
          aria-label="Next image"
        >→</button>
      </div>
    </div>
  );
}

/* ─── Project page — section media (image grid + captions) ─── */
function ProjectMedia({ items }) {
  if (!items || !items.length) return null;
  const allThumb = items.length > 1 && items.every(m => m.kind === 'sq');
  const isVideo = (src) => /\.(mp4|mov|webm|ogg)$/i.test(src || '');
  return (
    <div className={`proj-media ${allThumb ? 'thumbs' : 'stack'}`}>
      {items.map((m, i) => (
        <figure key={i} className={`proj-media-item k-${m.kind || 'wide'} ${isVideo(m.src) ? 'is-video' : ''} ${m.placeholder ? 'is-placeholder' : ''} ${m.diagram ? 'is-diagram' : ''}`}>
          {m.diagram === 'user-flow' ? (
            <UserFlowDiagram />
          ) : m.placeholder ? (
            <div className="proj-media-placeholder"><span>Image placeholder</span></div>
          ) : isVideo(m.src) ? (
            <video src={m.src} autoPlay loop muted playsInline preload="metadata" />
          ) : (
            <img src={m.src} alt={m.caption || ''} loading="lazy" />
          )}
          {m.caption && <figcaption className="proj-caption">{m.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

/* ─── Parallax section — sticky stage, clipped scrolling right frame ─── */
function ParallaxSection({ s, isSub }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!section || !track || !frame) return;
    let raf = 0;

    const getStage = () => section.firstElementChild;
    const STICKY_OFFSET = 5 * 16; /* matches top: 5rem */

    const recalc = () => {
      const stage = getStage();
      if (!stage) return;
      const overflow = Math.max(0, track.scrollHeight - frame.clientHeight);
      section.style.minHeight = `${stage.offsetHeight + overflow + STICKY_OFFSET}px`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const stage = getStage();
        if (!stage) return;
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - stage.offsetHeight - STICKY_OFFSET;
        if (scrollable <= 0) { track.style.transform = 'translateY(0)'; return; }
        const traveled = Math.max(0, Math.min(scrollable, STICKY_OFFSET - rect.top));
        const progress = traveled / scrollable;
        const maxOffset = Math.max(0, track.scrollHeight - frame.clientHeight);
        track.style.transform = `translateY(${-progress * maxOffset}px)`;
      });
    };

    recalc();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { recalc(); onScroll(); });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div id={`s-${s.id}`} ref={sectionRef} className="proj-section is-parallax">
      <div className="proj-parallax-stage">
        <header className="proj-section-head">
          {isSub && <div className="proj-section-eyebrow">{s.groupLabel || s.group}</div>}
          <h2 className={`proj-section-title ${isSub ? 'is-sub' : ''}`}>{s.title}</h2>
        </header>
        <div className="proj-parallax-row">
          <div className="proj-parallax-text">
            {s.body?.map((para, i) => <p key={`b${i}`}>{para}</p>)}
            {s.list && (
              <ul className="proj-list">
                {s.list.map((it, i) => (
                  <li key={i}><strong>{it.label}</strong> {it.text}</li>
                ))}
              </ul>
            )}
            {s.outro?.map((para, i) => <p key={`o${i}`}>{para}</p>)}
          </div>
          <div className="proj-parallax-frame" ref={frameRef}>
          <div className="proj-parallax-track" ref={trackRef}>
            {s.sideMedia && (
              <figure className="proj-parallax-item">
                {s.sideMedia.placeholder ? (
                  <div className="proj-media-placeholder"><span>Image placeholder</span></div>
                ) : s.sideMedia.diagram === 'user-flow' ? (
                  <UserFlowDiagram />
                ) : /\.(mp4|mov|webm|ogg)$/i.test(s.sideMedia.src || '') ? (
                  <video src={s.sideMedia.src} autoPlay loop muted playsInline preload="metadata" />
                ) : (
                  <img src={s.sideMedia.src} alt={s.sideMedia.caption || ''} loading="lazy" />
                )}
                {s.sideMedia.caption && <figcaption className="proj-caption">{s.sideMedia.caption}</figcaption>}
              </figure>
            )}
            {s.media?.map((m, i) => {
              const mIsVideo = /\.(mp4|mov|webm|ogg)$/i.test(m.src || '');
              return (
                <figure key={i} className="proj-parallax-item">
                  {m.placeholder ? (
                    <div className="proj-media-placeholder"><span>Image placeholder</span></div>
                  ) : mIsVideo ? (
                    <video src={m.src} autoPlay loop muted playsInline preload="metadata" />
                  ) : (
                    <img src={m.src} alt={m.caption || ''} loading="lazy" />
                  )}
                  {m.caption && <figcaption className="proj-caption">{m.caption}</figcaption>}
                </figure>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Project page — one section (handles every section variant) ─── */
function ProjectSection({ s }) {
  const isSub = !!s.group;
  if (s.parallax && !s.placeholder) return <ParallaxSection s={s} isSub={isSub} />;
  const titleBlock = (
    <header className="proj-section-head">
      {isSub && <div className="proj-section-eyebrow">{s.groupLabel || s.group}</div>}
      <h2 className={`proj-section-title ${isSub ? 'is-sub' : ''}`}>{s.title}</h2>
    </header>
  );
  if (s.kind === 'outcomes') {
    return (
      <div id={`s-${s.id}`} className={`proj-section ${isSub ? 'is-sub' : ''}`}>
        {titleBlock}
        <div className="outcome-grid">
          {s.items.map(it => (
            <div key={it.label} className="outcome-cell">
              <div className="outcome-num">{it.num}</div>
              <div className="outcome-label">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div id={`s-${s.id}`} className={`proj-section ${s.placeholder ? 'is-placeholder' : ''} ${isSub ? 'is-sub' : ''}`}>
      {titleBlock}
      {s.placeholder ? (
        <div className="proj-placeholder">
          <div className="proj-placeholder-tag">Placeholder · to fill in</div>
          {s.body?.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      ) : (
        <>
          {s.sideMedia ? (
            <div className="proj-split">
              <div className="proj-split-text">
                {s.body?.map((para, i) => <p key={`b${i}`}>{para}</p>)}
                {s.list && (
                  <ul className="proj-list">
                    {s.list.map((it, i) => (
                      <li key={i}><strong>{it.label}</strong> {it.text}</li>
                    ))}
                  </ul>
                )}
                {s.outro?.map((para, i) => <p key={`o${i}`}>{para}</p>)}
              </div>
              <figure className="proj-split-media proj-media-item k-wide">
                {s.sideMedia.placeholder ? (
                  <div className="proj-media-placeholder"><span>Image placeholder</span></div>
                ) : s.sideMedia.diagram === 'user-flow' ? (
                  <UserFlowDiagram />
                ) : /\.(mp4|mov|webm|ogg)$/i.test(s.sideMedia.src || '') ? (
                  <video src={s.sideMedia.src} autoPlay loop muted playsInline preload="metadata" />
                ) : (
                  <img src={s.sideMedia.src} alt={s.sideMedia.caption || ''} loading="lazy" />
                )}
                {s.sideMedia.caption && <figcaption className="proj-caption">{s.sideMedia.caption}</figcaption>}
              </figure>
            </div>
          ) : s.sideGallery ? (
            <div className="proj-split">
              <div className="proj-split-text">
                {s.body?.map((para, i) => <p key={`b${i}`}>{para}</p>)}
                {s.list && (
                  <ul className="proj-list">
                    {s.list.map((it, i) => (
                      <li key={i}><strong>{it.label}</strong> {it.text}</li>
                    ))}
                  </ul>
                )}
                {s.outro?.map((para, i) => <p key={`o${i}`}>{para}</p>)}
              </div>
              <SideGallery items={s.sideGallery} />
            </div>
          ) : (
            <>
              {s.body?.map((para, i) => <p key={`b${i}`}>{para}</p>)}
              {s.list && (
                <ul className="proj-list">
                  {s.list.map((it, i) => (
                    <li key={i}><strong>{it.label}</strong> {it.text}</li>
                  ))}
                </ul>
              )}
              {s.outro?.map((para, i) => <p key={`o${i}`}>{para}</p>)}
            </>
          )}
          {s.inlineDemo === 'grid' && <GridDemo caption={s.inlineDemoCaption} />}
          {s.problemRows && (
            <div className="problem-rows">
              {s.problemRows.map((row, i) => {
                const slots = row.images || Array.from({ length: row.count || 0 });
                return (
                  <div key={i} className="problem-row">
                    <h3 className="problem-row-label">{row.label}</h3>
                    <div className="problem-row-imgs" data-count={slots.length}>
                      {slots.map((src, j) => (
                        src ? (
                          <figure key={j} className="problem-img">
                            <img src={src} alt={`${row.label} — ${j + 1}`} loading="lazy" />
                          </figure>
                        ) : (
                          <div key={j} className="problem-placeholder">
                            <span>Image placeholder</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {s.media && <ProjectMedia items={s.media} />}
          {s.subsections?.map((sub, i) => (
            <div key={sub.id || i}
                 id={sub.id ? `s-${sub.id}` : undefined}
                 className="proj-subsection">
              <h3 className="proj-sub-title">{sub.title}</h3>
              {sub.body?.map((para, j) => <p key={j}>{para}</p>)}
              {sub.media && <ProjectMedia items={sub.media} />}
            </div>
          ))}
          {s.beforeAfter && (
            <div className="proj-beforeafter">
              <figure>
                <img src={s.beforeAfter.before.src} alt={s.beforeAfter.before.label || 'before'} loading="lazy" />
                <figcaption><span className="ba-tag">Before</span>{s.beforeAfter.before.label}</figcaption>
              </figure>
              <figure>
                <img src={s.beforeAfter.after.src} alt={s.beforeAfter.after.label || 'after'} loading="lazy" />
                <figcaption><span className="ba-tag after">After</span>{s.beforeAfter.after.label}</figcaption>
              </figure>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Project / case study page ─── */
function Project({ projectId, onBack, onOpen }) {
  const p = window.PROJECTS.find(x => x.id === projectId) || window.PROJECTS[0];
  const next = window.PROJECTS[(window.PROJECTS.indexOf(p) + 1) % window.PROJECTS.length];
  const [activeSection, setActiveSection] = useState(p.sections[0].id);
  useEffect(() => {
    const onScroll = () => {
      let cur = p.sections[0].id;
      for (const s of p.sections) {
        const el = document.getElementById('s-' + s.id);
        if (el && window.scrollY >= el.offsetTop - 220) cur = s.id;
      }
      setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [p]);
  return (
    <div className="page active">
      <a className="back-btn" href="#" onClick={e => { e.preventDefault(); onBack(); }}>
        <span>←</span> All work
      </a>

      <section className="proj-hero">
        <div className="proj-hero-bg"
             style={{ background: `linear-gradient(160deg, ${p.swatch.from} 0%, ${p.swatch.to} 100%)` }} />
        <div className="proj-hero-glow" />
        <div className="proj-hero-inner">
          <div>
            <div className="proj-eyebrow">
              {p.company ? `${p.company} · ` : ''}{p.kind} · {p.year}
            </div>
            <h1 className="proj-hero-title">{p.title}<br/><em>{p.subtitle}</em></h1>
            <p className="proj-summary">{p.summary}</p>
          </div>
          <div className="proj-meta">
            <div className="row"><div className="k">Role</div><div className="v">{p.role}</div></div>
            <div className="row"><div className="k">Timeline</div><div className="v">{p.timeline}</div></div>
            <div className="row"><div className="k">Platform</div><div className="v">{p.platform}</div></div>
            <div className="row"><div className="k">Team</div><div className="v">{p.team}</div></div>
          </div>
        </div>
      </section>

      {p.heroImage && (
        <div className="proj-hero-image">
          <img src={p.heroImage} alt={`${p.title} — hero`} loading="eager" />
        </div>
      )}

      <div className="proj-gallery">
        {p.gallery.map((g, i) => (
          <div key={i} className={`g-cell ${g.kind} ${g.src ? 'has-img' : ''}`}
               style={!g.src ? { background: g.tone } : undefined}>
            {g.src ? (
              <img className="g-img" src={g.src} alt={g.label || ''} loading="lazy" />
            ) : (
              <div className="g-fill">— {g.label}</div>
            )}
          </div>
        ))}
      </div>

      <div className="proj-content">
        <aside className="proj-sidebar">
          <div className="sidebar-label">Contents</div>
          <ul className="sidebar-nav">
            {p.sections.map((s, i) => {
              const prev = p.sections[i - 1];
              const showGroupHeader = s.group && (!prev || prev.group !== s.group);
              return (
                <React.Fragment key={s.id}>
                  {showGroupHeader && (
                    <li className="sidebar-group-label" aria-hidden="true">
                      {s.groupLabel || s.group}
                    </li>
                  )}
                  <li className={s.group ? 'is-sub' : ''}>
                    <a href={`#s-${s.id}`} className={activeSection === s.id ? 'active' : ''}>{s.title}</a>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </aside>
        <div>
          {p.sections.map(s => <ProjectSection key={s.id} s={s} />)}
        </div>
      </div>

      <div className="next-proj" onClick={() => onOpen(next.id)} data-hover>
        <div>
          <div className="next-label">Next project</div>
          <div className="next-title">{next.title}</div>
        </div>
        <div className="next-arrow">→</div>
      </div>
      <footer>
        <span>© 2025 Raz Silberman</span>
        <a href="#" onClick={e => { e.preventDefault(); onBack(); }}>← Back to work</a>
      </footer>
    </div>
  );
}

/* ─── Cmd-K palette ─── */
function CmdK({ open, onClose, setPage, openProject, toggleTheme }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);
  const all = useMemo(() => [
    { group: 'Pages', label: 'Home',   sub: '↵', action: () => setPage('home') },
    { group: 'Pages', label: 'Work',   sub: '↵', action: () => setPage('work') },
    { group: 'Pages', label: 'About',  sub: '↵', action: () => setPage('about') },
    { group: 'Pages', label: 'Resume', sub: '↵', action: () => setPage('resume') },
    ...window.PROJECTS.map(p => ({
      group: 'Projects', label: p.title, sub: p.kind,
      action: () => openProject(p.id),
    })),
    { group: 'Actions', label: 'Toggle theme', sub: '⇧⌘L', action: toggleTheme },
    { group: 'Actions', label: 'Email Raz',    sub: '↵',
      action: () => window.location.href = 'mailto:hello@razsilberman.com' },
  ], [setPage, openProject, toggleTheme]);
  const filtered = useMemo(() => {
    if (!q) return all;
    return all.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));
  }, [q, all]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
      else if (e.key === 'Enter')   {
        e.preventDefault();
        filtered[sel]?.action(); onClose();
      } else if (e.key === 'Escape') { onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, sel, onClose]);
  // group items
  const groups = useMemo(() => {
    const map = {};
    filtered.forEach((it, i) => {
      (map[it.group] = map[it.group] || []).push({ ...it, _i: i });
    });
    return map;
  }, [filtered]);
  return (
    <div className={`cmdk-overlay ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="cmdk" onClick={e => e.stopPropagation()}>
        <div className="cmdk-input-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>
          </svg>
          <input ref={inputRef} className="cmdk-input"
                 placeholder="Search pages, projects, actions…"
                 value={q} onChange={e => { setQ(e.target.value); setSel(0); }} />
          <span className="kbd">esc</span>
        </div>
        <div className="cmdk-list">
          {Object.entries(groups).map(([g, items]) => (
            <div key={g}>
              <div className="cmdk-group">{g}</div>
              {items.map(it => (
                <div key={it.label} className={`cmdk-item ${it._i === sel ? 'sel' : ''}`}
                     onMouseEnter={() => setSel(it._i)}
                     onClick={() => { it.action(); onClose(); }}>
                  <span className="ic">{g === 'Projects' ? '◆' : g === 'Actions' ? '◇' : '↗'}</span>
                  <span className="lbl">{it.label}</span>
                  <span className="sub">{it.sub}</span>
                </div>
              ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="cmdk-item"><span className="lbl" style={{color:'var(--muted)'}}>No results</span></div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Tweaks ─── */
function PortfolioTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Theme" />
      <TweakRadio  label="Mode" value={tweaks.theme}
                   options={['dark', 'light']}
                   onChange={v => setTweak('theme', v)} />
      <TweakSelect label="Accent color" value={tweaks.accent}
                   options={['sage', 'clay', 'blue', 'amber', 'mono', 'violet']}
                   onChange={v => setTweak('accent', v)} />
      <TweakSection label="Typography" />
      <TweakSelect label="Display font" value={tweaks.displayFont}
                   options={['afacad', 'serif', 'mono', 'sans']}
                   onChange={v => setTweak('displayFont', v)} />
      <TweakSection label="Layout" />
      <TweakSelect label="Tile style" value={tweaks.tileStyle}
                   options={['polaroid', 'fullbleed', 'index']}
                   onChange={v => setTweak('tileStyle', v)} />
      <TweakRadio  label="Hero alignment" value={tweaks.heroAlign}
                   options={['top', 'center', 'bottom']}
                   onChange={v => setTweak('heroAlign', v)} />
      <TweakRadio  label="Density" value={tweaks.density}
                   options={['loose', 'standard', 'dense']}
                   onChange={v => setTweak('density', v)} />
      <TweakSection label="Other" />
      <TweakToggle label="Custom cursor" value={tweaks.cursorOn}
                   onChange={v => setTweak('cursorOn', v)} />
      <TweakSelect label="Cursor style" value={tweaks.cursorStyle}
                   options={['blob', 'puddle', 'ripple']}
                   onChange={v => setTweak('cursorStyle', v)} />
      <TweakToggle label="Film grain" value={tweaks.grain}
                   onChange={v => setTweak('grain', v)} />
    </TweaksPanel>
  );
}

/* ─── App ─── */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [page, setPageRaw] = useState('home');
  const [projectId, setProjectId] = useState(null);
  const [wipe, setWipe] = useState(''); // '' | 'in' | 'out'
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  // apply tweaks to document
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = tweaks.theme;
    root.dataset.density = tweaks.density;
    root.dataset.displayFont = tweaks.displayFont;
    const acc = tweaks.theme === 'light' ? ACCENTS_LIGHT[tweaks.accent] : ACCENTS[tweaks.accent];
    root.style.setProperty('--accent', acc);
  }, [tweaks]);

  const setPage = useCallback((id, opts = {}) => {
    setWipe('in');
    setTimeout(() => {
      if (id === 'project') setProjectId(opts.id);
      setPageRaw(id);
      window.scrollTo(0, 0);
      setWipe('out');
      setTimeout(() => setWipe(''), 600);
    }, 480);
  }, []);

  const openProject = useCallback((id) => setPage('project', { id }), [setPage]);

  const toggleTheme = useCallback(() => {
    setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark');
  }, [tweaks.theme, setTweak]);

  // cmd+k
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setCmdkOpen(o => !o);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault(); toggleTheme();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleTheme]);

  // scroll progress
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollPct(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  // reveal observer
  useEffect(() => {
    const t = setTimeout(() => {
      const els = document.querySelectorAll('.reveal:not(.visible), .clip-reveal:not(.visible)');
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: .1 });
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * .92) el.classList.add('visible');
        else io.observe(el);
      });
      return () => io.disconnect();
    }, 100);
    return () => clearTimeout(t);
  }, [page, projectId]);

  return (
    <>
      <div className={`grain ${tweaks.grain ? '' : 'off'}`}></div>
      <div className="scroll-bar" style={{ height: scrollPct + '%' }}></div>
      <BlobCursor enabled={tweaks.cursorOn} style={tweaks.cursorStyle} />
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className={`wipe ${wipe}`}></div>

      <Nav page={page} setPage={(id) => setPage(id)} onCmdK={() => setCmdkOpen(true)}
           theme={tweaks.theme} toggleTheme={toggleTheme} />

      {page === 'home'    && <Home   onOpen={openProject} tweaks={tweaks} />}
      {page === 'work'    && <WorkIndex onOpen={openProject} />}
      {page === 'about'   && <About  onOpen={openProject} />}
      {page === 'resume'  && <Resume />}
      {page === 'project' && <Project projectId={projectId}
                                      onBack={() => setPage('work')}
                                      onOpen={openProject} />}

      <CmdK open={cmdkOpen} onClose={() => setCmdkOpen(false)}
            setPage={(id) => setPage(id)} openProject={openProject}
            toggleTheme={toggleTheme} />

      <PortfolioTweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
