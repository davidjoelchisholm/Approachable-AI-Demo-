
// config.jsx — Pre-launch configuration screen, config helpers, standalone export

const CONFIG_KEY = 'aai-config-v1';

const CONFIG_DEFAULTS = {
  splashCaption: "WHAT IS APPROACHABLE AI",
  splashHeadlineLine1: "Your best operator,",
  splashHeadlineLine2: "built into a laptop.",
  bootSubtitle: "ON-DEMAND INTELLIGENCE · READY",
  outroTag: "",
  outroLine1: "FROM TRIBAL KNOWLEDGE TO INSTITUTIONAL INTELLIGENCE",
  outroLine2: "",
  logoSrc: '',        // data URL from upload; empty = use default GrayMatterLogo.png
  logoBgColor: '#002141',
  showRing: true,
  showInfoBars: true,
  featureCards: [
    { label: '01', title: 'AIR-GAPPED' },
    { label: '02', title: 'TRIBAL KNOWLEDGE BASE' },
    { label: '03', title: 'AVAILABLE 24 / 7 / 365' },
  ],
  prompts: [
    {
      tag: 'REAL-TIME TROUBLESHOOTING',
      user: "Why does this wrinkle keep showing up on Line 4?",
      response: [
        { kind: 'p',   text: "Most likely: dwell time on the forming station has crept up. Joe's rule of thumb — keep it under 3.6s on the softer aluminum lots." },
        { kind: 'sp' },
        { kind: 'p',   text: "Walk it in this order:" },
        { kind: 'li',  text: "Check today's coil supplier — Reynolds 5052 has been running hot all week." },
        { kind: 'li',  text: "Pull dwell back to 3.4s, verify on the HMI." },
        { kind: 'li',  text: "Confirm die temp is below 240°F before re-running." },
        { kind: 'sp' },
        { kind: 'p',   text: "If the wrinkle persists, the lower clamp ring has worn pads — last replaced 4,200 cycles ago." },
      ],
    },
    {
      tag: 'ON-DEMAND WORK INSTRUCTION',
      user: "How do I run a changeover on Line 2 — Sienna to Highlander?",
      response: [
        { kind: 'p',  text: "Target window is 22 minutes. Three stages:" },
        { kind: 'sp' },
        { kind: 'h',  text: "1 · SHUT DOWN  (3 min)" },
        { kind: 'li', text: "Park both robots in maintenance pose." },
        { kind: 'li', text: "Drain coolant manifold A — valve is behind the blue panel." },
        { kind: 'h',  text: "2 · TOOLING SWAP  (12 min)" },
        { kind: 'li', text: "Bolt out fixture plates 1–4 (torque-down sequence reversed)." },
        { kind: 'li', text: "Load Highlander cassette — rack 3, slot B." },
        { kind: 'h',  text: "3 · FIRST PIECE  (7 min)" },
        { kind: 'li', text: "Run 3 test parts past the QC gate. Flag if cycle > 47s." },
      ],
    },
    {
      tag: 'ROOT-CAUSE FROM LOG HISTORY',
      user: "What were the last 3 times fault E-204 hit, and what fixed it?",
      response: [
        { kind: 'p',   text: "Fault E-204 — spindle torque over-limit. Recent occurrences pulled from the local cell log:" },
        { kind: 'sp' },
        { kind: 'log', date: 'MAY 12', detail: 'Tool 7 reground past spec',      fix: 'Replaced insert · cleared in 14 min' },
        { kind: 'log', date: 'APR 28', detail: 'Chip evac line clogged',          fix: 'Blew out manifold · cleared in 22 min' },
        { kind: 'log', date: 'APR 14', detail: 'Coolant concentration 4.1%',      fix: 'Topped to 7% · cleared in 6 min' },
        { kind: 'sp' },
        { kind: 'p',   text: "Pattern: 2 of 3 trace to coolant or chip-evac. Suggest checking coolant concentration first — 30-second test." },
      ],
    },
  ],
  docs: [
    {
      style: 'notes',
      label: 'KNOWLEDGE-BASE ENTRY · TRIBAL',
      title: "Line 4 — Wrinkle Defect Notes",
      sub: "J. VASQUEZ · LEAD OP, 2ND SHIFT · UPDATED MAY 04",
      sections: [
        { heading: "Rules of thumb", items: [
          "- Keep dwell at or below 3.6s on softer alloy lots — anything more and the wrinkle starts.",
          "- Reynolds 5052 has been running hot all week. Back off another 0.2s on those coils.",
          "- Don't re-run until the die is under 240°F. Use the IR gun, not the HMI temp.",
        ]},
        { heading: "What I've noticed", items: [
          "- The wrinkles cluster near the corner radius first. That tells you where to look.",
          "- Worst hour is 05:00–07:00. Die is cold from the overnight idle.",
        ]},
        { heading: "Lower clamp ring history", items: [
          "- Pads were last swapped at 4,200 cycles. We're due around now.",
          "- Symptom progression I keep seeing: hairline → wave → full wrinkle. Catch it at the wave.",
        ]},
      ],
    },
    {
      style: 'standardwork',
      label: 'STANDARD WORK · REV 3 · CONTROLLED',
      title: "Standard Instructions - Mold Changeover",
      sub: "SIENNA → HIGHLANDER · TAKT 22:00 · QA K. RHEA",
      sections: [
        { heading: "Prep", items: [
          "- Park both robots in maintenance pose (M-pose).",
          "- Drain coolant manifold A — blue panel valve, turn ¼ clockwise.",
          "- Disengage clamp pressure: HMI → Safety → Release Hold.",
        ]},
        { heading: "Fixture Swap", items: [
          "- Bolt out fixture plates 1–4 — reverse torque sequence (plate 4 first).",
          "- Lift Sienna cassette via overhead crane, set in Rack 1.",
          "[Load Highlander cassette — Rack 3, Slot B.]",
        ]},
        { heading: "Restart & Verify", items: [
          "- Re-engage clamp pressure and re-prime coolant manifold.",
          "- Run 3 first-piece test parts past the QC gate. Flag if cycle > 47s.",
        ]},
      ],
    },
    {
      style: 'recovery',
      label: 'RECOVERY PROCEDURE · QA REV 7',
      title: "Incident Log - CNC Machine",
      sub: "TIER 1 ESCALATION · 14-MIN MEAN RESOLUTION",
      sections: [
        { heading: "Fault E-204", items: [
          "- Triggered when spindle torque exceeds 142% of nominal for >300ms.",
          "- Auto-pause engages. Carriage retracts to home. Part damage is uncommon.",
        ]},
        { heading: "Initial diagnostics (1 min)", items: [
          "- Confirm the fault on HMI · note timestamp and program block.",
          "- Visual check: chips piling, coolant pooling, tool jam.",
        ]},
        { heading: "Tier 1 — Tooling", items: [
          "- Inspect Tool 7 wear flat. Replace insert if > 0.3mm.",
          "- Verify tool offset against last calibrated value.",
        ]},
        { heading: "Tier 1 — Chip evacuation", items: [
          "- Inspect chip evac line for clog (manifold B).",
          "- Blow out at 90 psi. Re-run a half-cycle dry to confirm flow.",
        ]},
        { heading: "Tier 1 — Coolant concentration", highlight: true, items: [
          "- Pull a 50ml sample from the Line A return port.",
          "- Test on the refractometer — target band is 6.0–8.0%.",
          "[If below 5.0%: top up with concentrate to 7.0%, agitate 60 seconds.]",
          "- Re-test before resuming production. Log result in the cell journal.",
        ]},
        { heading: "Tier 2 — Mechanical", items: [
          "- Check spindle bearing temperature (sensor SP-3T).",
          "- Inspect drawbar tension — service if below 18 kN.",
        ]},
        { heading: "Escalation", items: [
          "[If 3 tier-1 attempts fail: page maintenance lead and open a work order.]",
        ]},
      ],
    },
  ],
};

function loadConfig() {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) return { ...CONFIG_DEFAULTS, ...JSON.parse(saved) };
  } catch {}
  return { ...CONFIG_DEFAULTS };
}
function saveConfig(cfg)  { try { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); } catch {} }
function clearConfig()    { try { localStorage.removeItem(CONFIG_KEY); } catch {} }

// ─── Palette ──────────────────────────────────────────────────────────────────
const C_BG    = '#002141';
const C_PAPER = '#EFEDE8';
const C_DIM   = '#D6E0E9';
const C_MUTED = '#737984';
const C_AMBER = '#E6870B';
const C_MONO  = "'JetBrains Mono', ui-monospace, monospace";
const C_SANS  = "'Inter', system-ui, sans-serif";

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
function arrayMove(arr, from, to) {
  if (to < 0 || to >= arr.length) return arr;
  const r = [...arr];
  const [item] = r.splice(from, 1);
  r.splice(to, 0, item);
  return r;
}

function newBlock(kind) {
  if (kind === 'sp')  return { kind };
  if (kind === 'log') return { kind, date: 'DATE', detail: 'Description', fix: 'Resolution' };
  return { kind, text: '' };
}

// ─── Export standalone HTML ───────────────────────────────────────────────────
async function exportStandalone(cfg) {
  let status = 'Fetching source files…';
  try {
    const [animSrc, docsSrc, cfgSrc, sceneSrc] = await Promise.all([
      fetch('animations.jsx').then(r => r.text()),
      fetch('docs.jsx').then(r => r.text()),
      fetch('config.jsx').then(r => r.text()),
      fetch('scene.jsx').then(r => r.text()),
    ]);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Approachable AI · Local LLM on a Laptop</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  html,body,#root{height:100%;margin:0;background:#002141;}
  body{font-family:'Inter',system-ui,sans-serif;color:#EFEDE8;}
  *{box-sizing:border-box;}
</style>
</head>
<body>
<div id="root"></div>
<script>
  window.__BAKED_CONFIG = ${JSON.stringify(cfg)};
  window.__SKIP_CONFIG_SCREEN = true;
<\/script>
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"><\/script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"><\/script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"><\/script>
<script type="text/babel">
${cfgSrc}
<\/script>
<script type="text/babel">
${animSrc}
<\/script>
<script type="text/babel">
${docsSrc}
<\/script>
<script type="text/babel">
${sceneSrc}
<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'Approachable AI - Presentation.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return 'Downloaded!';
  } catch (err) {
    return 'Export failed: ' + err.message;
  }
}

// ─── Form primitives ──────────────────────────────────────────────────────────
function CField({ label, value, onChange, textarea = false, mono = false }) {
  return (
    <div style={{ marginBottom: 8 }}>
      {label && (
        <div style={{ fontFamily: C_MONO, fontSize: 9.5, letterSpacing: '0.12em',
          color: C_AMBER, marginBottom: 3, textTransform: 'uppercase' }}>
          {label}
        </div>
      )}
      {textarea
        ? <textarea value={value} rows={2} onChange={e => onChange(e.target.value)}
            style={{ width: '100%', padding: '7px 10px', background: C_DIM, color: C_BG,
              border: 'none', borderRadius: 5, fontFamily: mono ? C_MONO : C_SANS,
              fontSize: mono ? 11 : 13, resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)}
            style={{ width: '100%', padding: '7px 10px', background: C_DIM, color: C_BG,
              border: 'none', borderRadius: 5, fontFamily: mono ? C_MONO : C_SANS,
              fontSize: mono ? 11 : 13, outline: 'none', boxSizing: 'border-box' }} />
      }
    </div>
  );
}

function CSec({ label }) {
  return (
    <div style={{ fontFamily: C_MONO, fontSize: 10.5, letterSpacing: '0.2em', color: C_AMBER,
      marginTop: 28, marginBottom: 12, borderBottom: '1px solid rgba(230,135,11,0.25)', paddingBottom: 6 }}>
      {label}
    </div>
  );
}

function CSub({ label }) {
  return (
    <div style={{ fontFamily: C_MONO, fontSize: 9.5, letterSpacing: '0.14em', color: C_MUTED,
      marginTop: 14, marginBottom: 8 }}>
      ▸ {label}
    </div>
  );
}

const btnBase = {
  border: 'none', borderRadius: 4, cursor: 'pointer',
  fontFamily: C_MONO, fontSize: 10, letterSpacing: '0.08em',
  padding: '4px 8px',
};

// ─── Markdown ↔ blocks converters ────────────────────────────────────────────
function blocksToText(blocks) {
  return (blocks || []).map(b => {
    if (b.kind === 'sp')  return '';
    if (b.kind === 'h')   return `## ${b.text}`;
    if (b.kind === 'li')  return `- ${b.text}`;
    if (b.kind === 'lst') return `[${b.text}]`;
    if (b.kind === 'log') return `[LOG ${b.date} | ${b.detail} | ${b.fix}]`;
    return b.text; // 'p'
  }).join('\n');
}

function textToBlocks(text) {
  const blocks = [];
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    if (line.trim() === '') {
      if (blocks.length > 0 && blocks[blocks.length - 1].kind !== 'sp')
        blocks.push({ kind: 'sp' });
    } else if (line.startsWith('## ')) {
      blocks.push({ kind: 'h', text: line.slice(3).trim() });
    } else if (/^[-*] /.test(line)) {
      blocks.push({ kind: 'li', text: line.slice(2).trim() });
    } else if (/^\[LOG /i.test(line) && line.endsWith(']')) {
      const parts = line.slice(5, -1).split('|').map(s => s.trim());
      blocks.push({ kind: 'log', date: parts[0] || '', detail: parts[1] || '', fix: parts[2] || '' });
    } else if (line.startsWith('[') && line.endsWith(']')) {
      blocks.push({ kind: 'lst', text: line.slice(1, -1).trim() });
    } else {
      blocks.push({ kind: 'p', text: line });
    }
  }
  while (blocks.length && blocks[blocks.length - 1].kind === 'sp') blocks.pop();
  return blocks;
}

function docToBlocks(doc) {
  if (!doc) return [];
  const blocks = [];
  for (const sec of (doc.sections || [])) {
    if (blocks.length > 0) blocks.push({ kind: 'sp' });
    blocks.push({ kind: 'h', text: sec.heading });
    for (const item of sec.items) {
      if (item.startsWith('[') && item.endsWith(']'))
        blocks.push({ kind: 'lst', text: item.slice(1, -1) });
      else if (item.startsWith('- '))
        blocks.push({ kind: 'li', text: item.slice(2) });
      else
        blocks.push({ kind: 'p', text: item });
    }
  }
  return blocks;
}

function blocksToDoc(blocks, origDoc) {
  const sections = [];
  let cur = null;
  for (const b of blocks) {
    if (b.kind === 'sp') continue;
    if (b.kind === 'h') { cur = { heading: b.text, items: [] }; sections.push(cur); }
    else if (b.kind === 'li' || b.kind === 'p' || b.kind === 'lst') {
      if (!cur) { cur = { heading: '', items: [] }; sections.push(cur); }
      cur.items.push(b.kind === 'lst' ? `[${b.text}]` : b.kind === 'li' ? `- ${b.text}` : b.text);
    }
  }
  return { ...origDoc, sections };
}

// ─── Markdown response editor ─────────────────────────────────────────────────
function MarkdownEditor({ blocks, onChange, hint }) {
  const [text, setText] = React.useState(() => blocksToText(blocks));

  const handle = (val) => { setText(val); onChange(textToBlocks(val)); };

  return (
    <div>
      <textarea
        value={text}
        rows={10}
        spellCheck={false}
        onChange={e => handle(e.target.value)}
        style={{ width: '100%', padding: '10px 12px', background: C_DIM, color: C_BG,
          border: 'none', borderRadius: 5, fontFamily: C_MONO, fontSize: 12,
          resize: 'vertical', outline: 'none', lineHeight: 1.65, boxSizing: 'border-box' }}
      />
      <div style={{ fontFamily: C_MONO, fontSize: 9, color: C_MUTED,
        letterSpacing: '0.08em', marginTop: 4 }}>
        {hint || '## Heading  ·  - Bullet  ·  [List item]  ·  blank line = spacer'}
      </div>
    </div>
  );
}

// ─── Block editor (for AI response) ──────────────────────────────────────────
function BlockEditor({ blocks, onChange }) {
  const move   = (i, dir) => onChange(arrayMove(blocks, i, i + dir));
  const remove = (i)      => onChange(blocks.filter((_, j) => j !== i));
  const add    = (kind)   => onChange([...blocks, newBlock(kind)]);
  const update = (i, patch) => onChange(blocks.map((b, j) => j !== i ? b : { ...b, ...patch }));

  const kindLabel = { p: 'Paragraph', h: 'Heading', li: 'Bullet', log: 'Log entry', sp: 'Spacer' };

  return (
    <div>
      {blocks.map((block, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
          {/* Block type badge */}
          <div style={{ fontFamily: C_MONO, fontSize: 9, color: C_AMBER, background: 'rgba(230,135,11,0.12)',
            borderRadius: 3, padding: '3px 6px', whiteSpace: 'nowrap', marginTop: 2, flexShrink: 0 }}>
            {kindLabel[block.kind] || block.kind}
          </div>

          {/* Fields */}
          <div style={{ flex: 1 }}>
            {block.kind === 'sp' && (
              <div style={{ fontFamily: C_MONO, fontSize: 10, color: C_MUTED, padding: '6px 0' }}>— spacer —</div>
            )}
            {block.kind === 'log' && (
              <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', gap: 6 }}>
                <CField value={block.date}   onChange={v => update(i, { date: v })}   mono />
                <CField value={block.detail} onChange={v => update(i, { detail: v })} />
                <CField value={block.fix}    onChange={v => update(i, { fix: v })}    />
              </div>
            )}
            {(block.kind === 'p' || block.kind === 'h' || block.kind === 'li') && (
              <CField value={block.text} onChange={v => update(i, { text: v })}
                textarea={block.kind === 'p'} />
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
            <button onClick={() => move(i, -1)} style={{ ...btnBase, background: 'rgba(239,237,232,0.08)', color: C_MUTED }}>↑</button>
            <button onClick={() => move(i,  1)} style={{ ...btnBase, background: 'rgba(239,237,232,0.08)', color: C_MUTED }}>↓</button>
            <button onClick={() => remove(i)}   style={{ ...btnBase, background: 'rgba(230,135,11,0.12)',  color: C_AMBER }}>✕</button>
          </div>
        </div>
      ))}

      {/* Add block buttons */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
        {['p', 'h', 'li', 'log', 'sp'].map(kind => (
          <button key={kind} onClick={() => add(kind)}
            style={{ ...btnBase, background: 'rgba(239,237,232,0.08)', color: C_DIM,
              border: '1px solid rgba(214,224,233,0.2)', padding: '5px 10px' }}>
            + {kindLabel[kind]}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Preview components — full 1920×1080 frames scaled to fit ─────────────────
// Each preview renders at actual animation coordinates then scales to ~720px wide.

const PREV_SC = 0.375; // 1920 × 0.375 = 720px

function PrevWrap({ label, children }) {
  return (
    <div style={{ marginBottom: 6, borderRadius: 8, overflow: 'hidden',
      border: '1px solid rgba(230,135,11,0.22)' }}>
      <div style={{ fontFamily: C_MONO, fontSize: 9, letterSpacing: '0.18em', color: C_AMBER,
        background: 'rgba(230,135,11,0.08)', padding: '5px 12px',
        borderBottom: '1px solid rgba(230,135,11,0.15)' }}>
        PREVIEW · {label}
      </div>
      {children}
    </div>
  );
}

function FramePreview({ label, children }) {
  return (
    <PrevWrap label={label}>
      <div style={{ position: 'relative', width: 1920 * PREV_SC, height: 1080 * PREV_SC,
        overflow: 'hidden', maxWidth: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1920, height: 1080,
          transformOrigin: 'top left', transform: `scale(${PREV_SC})`, pointerEvents: 'none' }}>
          {children}
        </div>
      </div>
    </PrevWrap>
  );
}

// Shared scene-frame building blocks
function PrevBG() {
  return <div style={{ position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(54,94,149,0.35) 0%, #002141 70%)' }} />;
}
function PrevTopBar() {
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, top: 38,
      display: 'flex', alignItems: 'baseline', gap: 16, fontFamily: C_MONO, color: '#EFEDE8', fontSize: 12 }}>
      <div style={{ letterSpacing: '0.18em', color: C_AMBER }}>APPROACHABLE AI</div>
      <div style={{ letterSpacing: '0.14em', opacity: 0.5 }}>· AI FACTORY ADVISOR · RUNNING LOCALLY</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 11, letterSpacing: '0.16em', opacity: 0.5 }}>FTE FACTORY ADVISORS</div>
    </div>
  );
}
function PrevBottomBar({ phase }) {
  const labels = ['INTRO', 'PROMPT 1', 'PROMPT 2', 'PROMPT 3', 'OUTRO'];
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, bottom: 36,
      display: 'flex', gap: 14, alignItems: 'center',
      color: '#EFEDE8', fontFamily: C_MONO, fontSize: 11, letterSpacing: '0.14em' }}>
      {labels.map((lbl, i) => {
        const active = i === phase, done = i < phase;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8,
              opacity: active ? 1 : done ? 0.55 : 0.25 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4,
                background: active ? C_AMBER : done ? '#EFEDE8' : 'transparent',
                border: `1px solid ${active || done ? 'transparent' : 'rgba(239,237,232,0.35)'}` }} />
              <span style={{ fontWeight: active ? 600 : 400 }}>{lbl}</span>
            </div>
            {i < labels.length - 1 &&
              <div style={{ flex: 1, height: 1, background: 'rgba(239,237,232,0.14)', maxWidth: 60 }} />}
          </React.Fragment>
        );
      })}
      <div style={{ flex: 1 }} />
      <div style={{ opacity: 0.45 }}>0 BYTES EGRESS · SINCE BOOT</div>
    </div>
  );
}
function PrevScrollHint() {
  return (
    <div style={{ position: 'absolute', bottom: 88, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
      <div style={{ fontFamily: C_MONO, fontSize: 13, letterSpacing: '0.2em', color: '#737984' }}>
        SCROLL TO CONTINUE
      </div>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3v16M3 11l8 8 8-8" stroke="#E6870B" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
// Laptop shell at the exact scene coordinates (410, 180), screenW=1100, screenH=640, bezel=22
function PrevLaptop({ scale = 1, tx = 0, children }) {
  const lw = 1144, lh = 684; // 1100+22*2, 640+22*2
  return (
    <div style={{ position: 'absolute', left: 410, top: 180, width: lw, height: lh + 36,
      transform: `translate(${tx}px, 0) scale(${scale})`, transformOrigin: '50% 50%' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: lw, height: lh,
        background: '#1c2030', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 22, top: 22, width: 1100, height: 640,
          background: '#EFEDE8', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 36,
        background: '#141820', borderRadius: '0 0 12px 12px' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)', width: 120, height: 16,
          background: '#0d1118', borderRadius: 3 }} />
      </div>
    </div>
  );
}

// ── Screen content components (render inside the 1100×640 laptop screen) ────

function PrevBootContent({ subtitle, logoSrc, logoBgColor }) {
  const src = logoSrc || 'scraps/GrayMatterLogo.png';
  const bg  = logoBgColor || '#002141';
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#EFEDE8',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 22, fontFamily: C_SANS }}>
      <div style={{ width: 120, height: 120, background: bg, borderRadius: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 20px rgba(230,135,11,0.45)' }}>
        <img src={src} alt="Logo"
          style={{ width: 88, height: 88, objectFit: 'contain' }} />
      </div>
      <div style={{ fontFamily: C_MONO, fontSize: 60, fontWeight: 600,
        color: '#002141', letterSpacing: '0.06em' }}>APPROACHABLE AI</div>
      <div style={{ fontFamily: C_MONO, fontSize: 30, letterSpacing: '0.2em',
        color: '#737984', textAlign: 'center' }}>{subtitle}</div>
      <div style={{ width: 380, height: 4, background: '#D6E0E9' }}>
        <div style={{ width: '100%', height: '100%', background: C_AMBER }} />
      </div>
    </div>
  );
}

function BlocksStatic({ blocks }) {
  return (
    <div style={{ fontFamily: C_SANS, fontSize: 18, color: '#002141', lineHeight: 1.6 }}>
      {(blocks || []).map((b, i) => {
        if (b.kind === 'sp') return <div key={i} style={{ height: 10 }} />;
        if (b.kind === 'h') return (
          <div key={i} style={{ fontFamily: C_MONO, fontSize: 13, letterSpacing: '0.12em',
            color: C_AMBER, fontWeight: 600, margin: '10px 0 4px' }}>{b.text}</div>
        );
        if (b.kind === 'li') return (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '2px 0', alignItems: 'flex-start' }}>
            <div style={{ width: 5, height: 5, borderRadius: 3, background: '#002141',
              marginTop: 9, flexShrink: 0 }} />
            <div>{b.text}</div>
          </div>
        );
        if (b.kind === 'lst') return (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start',
            padding: '5px 12px', margin: '2px 0',
            background: 'rgba(230,135,11,0.07)',
            borderLeft: '2px solid rgba(230,135,11,0.45)',
            borderRadius: '0 4px 4px 0', fontSize: 17, lineHeight: 1.5 }}>
            {b.text}
          </div>
        );
        if (b.kind === 'log') return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr',
            gap: '4px 14px', padding: '8px 0', fontSize: 17,
            borderTop: i > 0 && blocks[i - 1].kind === 'log' ? '1px dashed #D6E0E9' : 'none' }}>
            <div style={{ fontFamily: C_MONO, fontSize: 13, color: C_AMBER, fontWeight: 600 }}>{b.date}</div>
            <div style={{ fontWeight: 500 }}>{b.detail}</div>
            <div />
            <div style={{ color: '#737984', fontSize: 15.5 }}>→ {b.fix}</div>
          </div>
        );
        return <div key={i} style={{ padding: '1px 0' }}>{b.text}</div>;
      })}
    </div>
  );
}

function PrevChatContent({ prompt, doc }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#EFEDE8',
      display: 'flex', flexDirection: 'column' }}>
      {/* screen header */}
      <div style={{ height: 50, background: '#D6E0E9', borderBottom: '1px solid #D6E0E9',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16,
        fontFamily: C_MONO, fontSize: 13, color: '#737984', letterSpacing: '0.08em', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#E6870B', '#8C9CA4', '#365E95'].map((c, i) =>
            <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
        </div>
        <div style={{ fontFamily: C_SANS, fontSize: 16, fontWeight: 600, color: '#002141' }}>
          Approachable AI
        </div>
        <div>FACTORY-FLOOR ADVISOR</div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 9, height: 9, borderRadius: 5, background: '#365E95' }} />
          LOCAL · ON-DEVICE · 0 EGRESS
        </div>
      </div>
      {/* tag strip */}
      <div style={{ padding: '12px 22px 10px', fontFamily: C_MONO, fontSize: 12,
        letterSpacing: '0.14em', color: '#737984',
        display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 18, height: 1, background: C_AMBER }} />{prompt.tag}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C_AMBER, fontWeight: 600 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: C_AMBER }} />DOC RETRIEVED
        </div>
      </div>
      {/* split: chat left, doc right */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0, gap: 14, padding: '0 20px 0 22px' }}>
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', padding: '8px 4px 14px',
          display: 'flex', flexDirection: 'column', gap: 14, fontFamily: C_SANS }}>
          <div style={{ alignSelf: 'flex-end', maxWidth: '82%', padding: '14px 20px',
            background: '#002141', color: '#EFEDE8', borderRadius: '14px 14px 4px 14px',
            fontSize: 20, fontWeight: 500, lineHeight: 1.45 }}>{prompt.user}</div>
          <div style={{ alignSelf: 'flex-start', maxWidth: '94%', padding: '18px 22px',
            background: '#D6E0E9', borderRadius: '4px 14px 14px 14px',
            fontSize: 18, color: '#002141', lineHeight: 1.6 }}>
            <BlocksStatic blocks={prompt.response} />
          </div>
        </div>
        {doc && (
          <div style={{ width: 580, flexShrink: 0, paddingTop: 8, paddingBottom: 14, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: 8,
              padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              overflow: 'hidden', color: '#002141', fontFamily: C_SANS }}>
              <div style={{ fontFamily: C_MONO, fontSize: 9, letterSpacing: '0.18em',
                color: '#737984', marginBottom: 4 }}>{doc.label}</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{doc.title}</div>
              <div style={{ fontFamily: C_MONO, fontSize: 11, color: '#737984', marginBottom: 14 }}>{doc.sub}</div>
              {(doc.sections || []).map((sec, si) => (
                <div key={si} style={{ marginBottom: 10 }}>
                  <div style={{ fontFamily: C_MONO, fontSize: 9.5, letterSpacing: '0.1em',
                    color: C_AMBER, fontWeight: 600, marginBottom: 4 }}>{sec.heading.toUpperCase()}</div>
                  {sec.items.map((item, ii) => {
                    const isLst = item.startsWith('[') && item.endsWith(']');
                    const isBullet = !isLst && item.startsWith('- ');
                    const text = isLst ? item.slice(1, -1) : isBullet ? item.slice(2) : item;
                    return isLst ? (
                      <div key={ii} style={{ padding: '3px 8px', margin: '1px 0',
                        background: 'rgba(230,135,11,0.07)',
                        borderLeft: '2px solid rgba(230,135,11,0.45)',
                        borderRadius: '0 3px 3px 0', fontSize: 13 }}>{text}</div>
                    ) : isBullet ? (
                      <div key={ii} style={{ display: 'flex', gap: 8, padding: '2px 0',
                        fontSize: 13, alignItems: 'flex-start' }}>
                        <div style={{ width: 3, height: 3, borderRadius: 2, background: '#002141',
                          marginTop: 6, flexShrink: 0 }} />
                        <div>{text}</div>
                      </div>
                    ) : (
                      <div key={ii} style={{ fontSize: 13, padding: '2px 0', lineHeight: 1.5 }}>{text}</div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* input bar */}
      <div style={{ borderTop: '1px solid #D6E0E9', padding: '16px 20px',
        background: '#D6E0E9', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <div style={{ flex: 1, height: 48, background: '#EFEDE8', border: '1px solid #D6E0E9',
          borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 18px',
          fontFamily: C_SANS, fontSize: 18, color: '#737984' }}>Ask anything about the line…</div>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: C_AMBER,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: C_MONO, fontSize: 17, fontWeight: 700, color: '#002141' }}>↵</div>
      </div>
    </div>
  );
}

function PrevOutroContent({ cfg }) {
  const d = CONFIG_DEFAULTS;
  const tag = cfg.outroTag || '', line1 = cfg.outroLine1 || d.outroLine1, line2 = cfg.outroLine2 || '';
  const split = (text) => {
    if (!text) return null;
    if (text.includes('||')) { const [a, b] = text.split('||'); return <><span style={{ color: C_AMBER }}>{a}</span><span style={{ color: '#002141' }}>{b}</span></>; }
    const m = text.match(/^(.*?\bTO\b\s*)(.*)/s);
    if (m && m[2]) return <><span style={{ color: C_AMBER }}>{m[1]}</span><span style={{ color: '#002141' }}>{m[2]}</span></>;
    return <span style={{ color: C_AMBER }}>{text}</span>;
  };
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#EFEDE8',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 14, padding: 40, textAlign: 'center', fontFamily: C_SANS }}>
      {tag && <div style={{ fontFamily: C_MONO, fontSize: 13, letterSpacing: '0.22em', color: C_AMBER }}>{tag}</div>}
      <div style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: 1100, color: '#002141' }}>
        {split(line1)}{line2 && <><br />{split(line2)}</>}
      </div>
      <div style={{ display: 'flex', gap: 32, marginTop: 16, fontFamily: C_MONO,
        color: '#737984', letterSpacing: '0.12em', fontSize: 24 }}>
        <span>NO CLOUD</span>
        <span style={{ width: 1, background: '#D6E0E9', display: 'inline-block' }} />
        <span>NO INTERNET</span>
        <span style={{ width: 1, background: '#D6E0E9', display: 'inline-block' }} />
        <span>RUNS LOCALLY</span>
      </div>
    </div>
  );
}

// ── Assembled scene previews ──────────────────────────────────────────────────

function OpeningScenePrev({ cfg }) {
  const d = CONFIG_DEFAULTS;
  const cards = cfg.featureCards || d.featureCards;
  return (
    <FramePreview label="OPENING SCENE">
      <PrevBG />
      <PrevTopBar />
      {/* Feature intro — left side, fully visible at t=5.5 */}
      <div style={{ position: 'absolute', left: 90, top: 200, width: 760,
        color: '#EFEDE8', fontFamily: C_SANS }}>
        <div style={{ fontFamily: C_MONO, fontSize: 14, letterSpacing: '0.22em',
          color: C_AMBER, marginBottom: 18 }}>{cfg.splashCaption || d.splashCaption}</div>
        <div style={{ fontSize: 54, fontWeight: 600, letterSpacing: '-0.022em',
          lineHeight: 1.05, marginBottom: 48 }}>
          {cfg.splashHeadlineLine1 || d.splashHeadlineLine1}<br />
          {cfg.splashHeadlineLine2 || d.splashHeadlineLine2}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {cards.map((card, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 22 }}>
              <div style={{ fontFamily: C_MONO, fontSize: 26, fontWeight: 600, color: C_AMBER }}>
                {card.label}
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em',
                lineHeight: 1.15, alignSelf: 'center' }}>{card.title}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Laptop — scale 0.55, tx 358 (exact values at t=5.5 in the animation) */}
      <PrevLaptop scale={0.55} tx={358}>
        <PrevBootContent subtitle={cfg.bootSubtitle || d.bootSubtitle} logoSrc={cfg.logoSrc} logoBgColor={cfg.logoBgColor} />
      </PrevLaptop>
      <PrevScrollHint />
      <PrevBottomBar phase={0} />
    </FramePreview>
  );
}

function BootPrev({ cfg }) {
  return (
    <FramePreview label="BOOT SCREEN — laptop at full size">
      <PrevBG />
      <PrevTopBar />
      <PrevLaptop scale={1} tx={0}>
        <PrevBootContent subtitle={cfg.bootSubtitle || CONFIG_DEFAULTS.bootSubtitle} />
      </PrevLaptop>
      <PrevBottomBar phase={0} />
    </FramePreview>
  );
}

function OutroPrev({ cfg }) {
  return (
    <FramePreview label="OUTRO SCREEN">
      <PrevBG />
      <PrevTopBar />
      <PrevLaptop scale={1} tx={0}>
        <PrevOutroContent cfg={cfg} />
      </PrevLaptop>
      <PrevBottomBar phase={4} />
    </FramePreview>
  );
}

function ChatPrev({ prompt, doc, sceneIdx }) {
  return (
    <FramePreview label={`SCENE ${sceneIdx + 1} — PAUSED WITH FULL CONTENT`}>
      <PrevBG />
      <PrevTopBar />
      <PrevLaptop scale={1} tx={0}>
        <PrevChatContent prompt={prompt} doc={doc} />
      </PrevLaptop>
      <PrevScrollHint />
      <PrevBottomBar phase={sceneIdx + 1} />
    </FramePreview>
  );
}

function DocPrev({ doc, prompt, sceneIdx }) {
  return (
    <FramePreview label={`SCENE ${sceneIdx + 1} — DOCUMENT PANEL`}>
      <PrevBG />
      <PrevTopBar />
      <PrevLaptop scale={1} tx={0}>
        <PrevChatContent prompt={prompt} doc={doc} />
      </PrevLaptop>
      <PrevScrollHint />
      <PrevBottomBar phase={sceneIdx + 1} />
    </FramePreview>
  );
}

// ─── ConfigScreen ─────────────────────────────────────────────────────────────
function ConfigScreen({ onLaunch }) {
  const [cfg, setCfg]       = React.useState(() => loadConfig());
  const [exporting, setExp] = React.useState(false);
  const [exportMsg, setMsg] = React.useState('');
  const [importKey, setImportKey] = React.useState(0);

  const set = (key, val) => setCfg(c => ({ ...c, [key]: val }));

  const setCard = (i, field, val) => setCfg(c => ({
    ...c, featureCards: c.featureCards.map((card, idx) => idx === i ? { ...card, [field]: val } : card),
  }));

  const setPrompt = (pi, field, val) => setCfg(c => ({
    ...c, prompts: c.prompts.map((p, i) => i !== pi ? p : { ...p, [field]: val }),
  }));

  const setResponse = (pi, blocks) => setCfg(c => ({
    ...c, prompts: c.prompts.map((p, i) => i !== pi ? p : { ...p, response: blocks }),
  }));

  const setDocField = (di, field, val) => setCfg(c => ({
    ...c, docs: c.docs.map((d, i) => i !== di ? d : { ...d, [field]: val }),
  }));

  const setDocBody = (di, newDoc) => setCfg(c => ({
    ...c, docs: c.docs.map((d, i) => i !== di ? d : newDoc),
  }));

  const addCard    = () => setCfg(c => ({ ...c, featureCards: [...c.featureCards, { label: String(c.featureCards.length + 1).padStart(2, '0'), title: '' }] }));
  const removeCard = (i) => setCfg(c => ({ ...c, featureCards: c.featureCards.filter((_, idx) => idx !== i) }));

  const handleLaunch = () => { saveConfig(cfg); onLaunch(cfg); };
  const handleReset  = () => { clearConfig(); setCfg({ ...CONFIG_DEFAULTS }); setImportKey(k => k + 1); };

  const handleDownloadConfig = () => {
    const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'approachable-ai-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadConfig = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        // Migrate any standardwork doc that still uses the old steps[] format
        if (parsed.docs) {
          parsed.docs = parsed.docs.map(doc => {
            if (doc.style === 'standardwork' && doc.steps && !doc.sections) {
              return {
                ...doc,
                sections: [{ heading: 'Steps', items: doc.steps.map(s => `- ${s.text}`) }],
                steps: undefined,
              };
            }
            return doc;
          });
        }
        setCfg({ ...CONFIG_DEFAULTS, ...parsed });
        setImportKey(k => k + 1);
      } catch {
        setMsg('Upload failed: invalid config file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExport = async () => {
    setExp(true);
    setMsg('Fetching source files…');
    const result = await exportStandalone(cfg);
    setMsg(result);
    setExp(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: C_BG, color: C_PAPER,
      fontFamily: C_SANS, overflowY: 'auto', zIndex: 9999 }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '36px 28px 120px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: C_MONO, fontSize: 10, letterSpacing: '0.22em', color: C_AMBER, marginBottom: 6 }}>
              APPROACHABLE AI
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>
              Presentation Setup
            </div>
          </div>
          <button onClick={handleReset} style={{ marginTop: 4, padding: '6px 14px', background: 'transparent',
            border: `1px solid ${C_MUTED}`, borderRadius: 5, color: C_MUTED,
            fontFamily: C_MONO, fontSize: 10, letterSpacing: '0.1em', cursor: 'pointer' }}>
            RESET DEFAULTS
          </button>
        </div>

        {/* ── Opening scene ── */}
        <OpeningScenePrev cfg={cfg} />
        <CSec label="SPLASH SCREEN" />
        <CField label="Caption"        value={cfg.splashCaption}       onChange={v => set('splashCaption', v)} />
        <CField label="Headline line 1" value={cfg.splashHeadlineLine1} onChange={v => set('splashHeadlineLine1', v)} />
        <CField label="Headline line 2" value={cfg.splashHeadlineLine2} onChange={v => set('splashHeadlineLine2', v)} />

        {/* ── Feature cards (preview shared with splash above) ── */}
        <CSec label="FEATURE CARDS" />
        {cfg.featureCards.map((card, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 8 }}>
            <div style={{ width: 80, flexShrink: 0 }}>
              <CField label="Label" value={card.label} onChange={v => setCard(i, 'label', v)} />
            </div>
            <div style={{ flex: 1 }}>
              <CField label="Title" value={card.title} onChange={v => setCard(i, 'title', v)} />
            </div>
            <button onClick={() => removeCard(i)}
              style={{ ...btnBase, background: 'rgba(230,135,11,0.12)', color: C_AMBER,
                padding: '7px 10px', marginBottom: 8, flexShrink: 0 }}>✕</button>
          </div>
        ))}
        <button onClick={addCard}
          style={{ ...btnBase, background: 'rgba(239,237,232,0.08)', color: C_DIM,
            border: `1px solid rgba(214,224,233,0.2)`, padding: '6px 14px', marginTop: 2 }}>
          + Add card
        </button>

        {/* ── Boot ── */}
        <BootPrev cfg={cfg} />
        <CSec label="BOOT SCREEN" />
        <CField label="Subtitle" value={cfg.bootSubtitle} onChange={v => set('bootSubtitle', v)} />

        {/* Logo upload + background color */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 16 }}>
          {/* Logo preview tile */}
          <div style={{ width: 64, height: 64, borderRadius: 10, flexShrink: 0,
            background: cfg.logoBgColor || '#002141',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(214,224,233,0.2)' }}>
            <img src={cfg.logoSrc || 'scraps/GrayMatterLogo.png'} alt="Logo"
              style={{ width: 46, height: 46, objectFit: 'contain' }} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* PNG upload */}
            <div>
              <div style={{ fontFamily: C_MONO, fontSize: 9, letterSpacing: '0.18em',
                color: C_MUTED, marginBottom: 5 }}>LOGO IMAGE (PNG)</div>
              <label style={{ display: 'inline-block', cursor: 'pointer',
                padding: '6px 14px', background: 'rgba(239,237,232,0.08)', color: C_DIM,
                border: `1px solid rgba(214,224,233,0.2)`, borderRadius: 5,
                fontFamily: C_MONO, fontSize: 10, letterSpacing: '0.1em' }}>
                {cfg.logoSrc ? 'CHANGE IMAGE' : 'UPLOAD PNG'}
                <input type="file" accept="image/png,image/*" style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = ev => set('logoSrc', ev.target.result);
                    reader.readAsDataURL(file);
                  }} />
              </label>
              {cfg.logoSrc && (
                <button onClick={() => set('logoSrc', '')}
                  style={{ marginLeft: 8, ...btnBase, background: 'rgba(230,135,11,0.12)',
                    color: C_AMBER, padding: '6px 10px' }}>✕ RESET</button>
              )}
            </div>

            {/* Background color */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontFamily: C_MONO, fontSize: 9, letterSpacing: '0.18em',
                color: C_MUTED }}>TILE COLOR</div>
              <input type="color" value={cfg.logoBgColor || '#002141'}
                onChange={e => set('logoBgColor', e.target.value)}
                style={{ width: 32, height: 24, padding: 0, border: 'none',
                  borderRadius: 4, cursor: 'pointer', background: 'none' }} />
              <span style={{ fontFamily: C_MONO, fontSize: 10, color: C_DIM }}>
                {cfg.logoBgColor || '#002141'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Outro ── */}
        <OutroPrev cfg={cfg} />
        <CSec label="OUTRO SCREEN" />
        <CField label="Tagline (optional)"        value={cfg.outroTag}  onChange={v => set('outroTag', v)} />
        <CField label="Headline line 1"            value={cfg.outroLine1} onChange={v => set('outroLine1', v)} />
        <CField label="Headline line 2 (optional)" value={cfg.outroLine2} onChange={v => set('outroLine2', v)} />

        {/* ── Scenes (chat + document together) ── */}
        {cfg.prompts.map((prompt, i) => {
          const doc = cfg.docs[i];
          return (
            <div key={i}>
              <ChatPrev prompt={prompt} doc={doc} sceneIdx={i} />
              <CSec label={`SCENE ${i + 1}`} />
              <CField label="Scene tag"     value={prompt.tag}  onChange={v => setPrompt(i, 'tag', v)} />
              <CField label="User question" value={prompt.user} onChange={v => setPrompt(i, 'user', v)} textarea />
              <CSub label="AI RESPONSE" />
              <MarkdownEditor
                key={`response-${i}-${importKey}`}
                blocks={prompt.response}
                onChange={blocks => setResponse(i, blocks)}
              />
              <CSub label="DOCUMENT" />
              <CField label="Title"               value={doc.title} onChange={v => setDocField(i, 'title', v)} />
              <CField label="Subtitle / metadata" value={doc.sub}   onChange={v => setDocField(i, 'sub', v)} mono />
              <MarkdownEditor
                key={`doc-${i}-${importKey}`}
                blocks={docToBlocks(doc)}
                onChange={blocks => setDocBody(i, blocksToDoc(blocks, doc))}
              />
            </div>
          );
        })}

        {/* ── Actions ── */}
        <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <button onClick={handleLaunch} style={{
            padding: '15px 56px', background: C_AMBER, color: C_BG,
            border: 'none', borderRadius: 8, fontFamily: C_MONO,
            fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', cursor: 'pointer',
          }}>
            LAUNCH PRESENTATION
          </button>

          <button onClick={handleExport} disabled={exporting} style={{
            padding: '10px 32px',
            background: 'transparent',
            color: exporting ? C_MUTED : C_DIM,
            border: `1px solid ${exporting ? C_MUTED : 'rgba(214,224,233,0.35)'}`,
            borderRadius: 8, fontFamily: C_MONO,
            fontSize: 11, letterSpacing: '0.1em', cursor: exporting ? 'default' : 'pointer',
          }}>
            {exporting ? 'EXPORTING…' : '↓ EXPORT STANDALONE HTML'}
          </button>

          {/* Config file import / export */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={handleDownloadConfig} style={{
              padding: '10px 24px', background: 'transparent', color: C_DIM,
              border: '1px solid rgba(214,224,233,0.35)', borderRadius: 8,
              fontFamily: C_MONO, fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
            }}>
              ↓ DOWNLOAD CONFIG
            </button>
            <label style={{
              padding: '10px 24px', background: 'transparent', color: C_DIM,
              border: '1px solid rgba(214,224,233,0.35)', borderRadius: 8,
              fontFamily: C_MONO, fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
            }}>
              ↑ UPLOAD CONFIG
              <input type="file" accept=".json,application/json" style={{ display: 'none' }}
                onChange={handleUploadConfig} />
            </label>
          </div>

          {exportMsg && (
            <div style={{ fontFamily: C_MONO, fontSize: 11, color: C_MUTED, letterSpacing: '0.06em' }}>
              {exportMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CONFIG_DEFAULTS, loadConfig, saveConfig, clearConfig, ConfigScreen });
