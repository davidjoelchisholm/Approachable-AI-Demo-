// scene.jsx — Approachable AI animation scene
// Sprite-based: laptop runs a local LLM, user types 3 manufacturing prompts.

// Restricted palette — only these colors and their alpha variants are used.
const PAPER = '#EFEDE8'; // Light 1
const PAPER_DIM = '#D6E0E9'; // Light 2
const INK = '#002141'; // Dark 1 / Dark Blue Accent
const INK_SOFT = '#002141'; // Dark 1 (use opacity for hierarchy)
const MUTED = '#737984'; // Accent 1
const BG = '#002141'; // Dark 1
const BG_2 = '#365E95'; // Primary 2 (used as radial-gradient center for a soft glow)
const AMBER = '#E6870B'; // Primary 1
const AMBER_DIM = 'rgba(230, 135, 11, 0.18)';
const SAGE = '#365E95'; // Primary 2 (status dot — was sage green, now blue)
const STEEL = '#8C9CA4'; // Accent 2

const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";
const SANS = "'Inter', system-ui, -apple-system, sans-serif";

// ─── Tweaks context ─────────────────────────────────────────────────────────
const TweaksContext = React.createContext(null);
const useT = () => React.useContext(TweaksContext) || {};

// ─── Conversation script (defaults live in CONFIG_DEFAULTS in config.jsx) ─────


// Scene timing (seconds)
const LID_OPEN_START = 1.0;
const LID_OPEN_END = 2.5;
const SPLASH_START = 3.0;
const SPLASH_END = 6.5;
const ZOOM_END = 8.0;
const INTRO_END = ZOOM_END; // chat scenes start here
const SCENE_DUR = 14.0;
const OUTRO_START = INTRO_END + 3 * SCENE_DUR;
const TOTAL_DUR = OUTRO_START + 5.0; // 55s

// Per-scene phases (seconds since scene start)
const PHASE = {
  typeOut: 2.6, // user finishes typing prompt
  submit: 2.85, // bubble flies up into chat
  thinkIn: 3.05,
  respIn: 3.55, // AI starts streaming response
  docIn: 5.40, // document slides in from the right
  docOpen: 6.10, // doc fully open
  interactIn: 7.20, // cursor / scroll / highlight begins
  interactHold: 11.0 // interaction settles, hold until scene end
};

// ─── Small primitives ──────────────────────────────────────────────────────

// Render `text` progressively, char by char, with a blinking caret.
function Typewriter({ text, msPerChar = 24, startAt = 0, color = 'currentColor', showCaret = true, caretColor }) {
  const { localTime } = useSprite();
  const { paused } = useTimeline();
  const elapsed = Math.max(0, localTime - startAt);
  const n = Math.min(text.length, Math.floor(elapsed * 1000 / msPerChar));
  const done = n >= text.length;
  const blink = Math.floor(localTime * 2.4) % 2 === 0;
  // Hide end-of-text caret when paused so it doesn't appear stuck
  const caretVisible = showCaret && (!done || (blink && !paused));
  return (
    <span style={{ color, fontSize: "60px" }}>
      {text.slice(0, n)}
      {caretVisible &&
      <span style={{
        display: 'inline-block',
        width: '0.5ch', height: '1em',
        background: caretColor || color,
        marginLeft: 1,
        verticalAlign: '-0.12em',
        opacity: done ? blink ? 0.9 : 0 : 0.9
      }} />
      }
    </span>);
}

function ThinkingDots({ color = INK }) {
  const { localTime } = useSprite();
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '6px 2px' }}>
      {[0, 1, 2].map((i) => {
        const a = 0.25 + 0.75 * (Math.sin(localTime * 6 - i * 0.7) * 0.5 + 0.5);
        return <div key={i} style={{ width: 7, height: 7, borderRadius: 4, background: color, opacity: a }} />;
      })}
    </div>);

}

// ─── Laptop chassis (CSS rectangles only) ──────────────────────────────────
function LaptopChassis({ x, y, screenW, screenH, bezel = 22, children, openProgress = 1, scale = 1, translate = { x: 0, y: 0 } }) {
  // openProgress: 0 closed flat, 1 fully open. Tilts via rotateX.
  const rotX = (1 - openProgress) * -95; // -95deg closed → 0deg open
  const lidW = screenW + bezel * 2;
  const lidH = screenH + bezel * 2;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: lidW, height: lidH + 36,
      perspective: 2200,
      transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
      transformOrigin: 'center center',
      willChange: 'transform'
    }}>
      {/* deck (keyboard base) */}
      <div style={{
        position: 'absolute',
        left: -28, right: -28,
        top: lidH - 6,
        height: 30,
        background: '#002141',
        borderRadius: '10px 10px 18px 18px',
        boxShadow: '0 36px 72px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -8px 16px rgba(0,0,0,0.35)'
      }}>
        {/* trackpad/keyboard hint line */}
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          width: 220, height: 3, background: 'rgba(0,0,0,0.55)', borderRadius: 2,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)'
        }} />
      </div>
      {/* lid */}
      <div style={{
        position: 'absolute', inset: 0,
        height: lidH,
        background: '#002141',
        borderRadius: 14,
        padding: bezel,
        transform: `rotateX(${rotX}deg)`,
        transformOrigin: 'bottom center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.04)'
      }}>
        {/* camera */}
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          width: 6, height: 6, borderRadius: 4,
          background: 'rgba(0,0,0,0.6)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)'
        }} />
        {/* screen */}
        <div style={{
          width: screenW, height: screenH,
          background: PAPER,
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.18)'
        }}>
          {children}
        </div>
      </div>
    </div>);

}

// ─── Chat-window UI inside the screen ──────────────────────────────────────
function ScreenHeader() {
  const { localTime } = useSprite();
  const pulse = 0.6 + 0.4 * (Math.sin(localTime * 2.4) * 0.5 + 0.5);
  return (
    <div style={{
      height: 50,
      borderBottom: `1px solid ${PAPER_DIM}`,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 16,
      background: PAPER_DIM,
      fontFamily: MONO,
      fontSize: 13,
      color: MUTED,
      letterSpacing: '0.08em',
      flexShrink: 0
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 12, height: 12, borderRadius: 6, background: AMBER }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, background: STEEL }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, background: SAGE }} />
      </div>
      <div style={{ width: 1, height: 22, background: PAPER_DIM, marginLeft: 4 }} />
      <div style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: INK, letterSpacing: '-0.005em' }}>
        Approachable AI
      </div>
      <div style={{ color: MUTED }}>FACTORY-FLOOR ADVISOR</div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 9, height: 9, borderRadius: 5, background: SAGE, opacity: pulse, boxShadow: `0 0 10px ${SAGE}` }} />
        LOCAL · ON-DEVICE · 0 EGRESS
      </div>
    </div>);

}

function UserBubble({ text, settle }) {
  // settle: 0 = still in input box; 1 = settled into chat
  const ty = (1 - settle) * 14;
  return (
    <div style={{
      alignSelf: 'flex-end',
      maxWidth: '82%',
      padding: '14px 20px',
      background: INK,
      color: PAPER,
      borderRadius: '14px 14px 4px 14px',
      fontFamily: SANS,
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.45,
      transform: `translateY(${ty}px)`,
      opacity: settle,
      boxShadow: '0 1px 0 rgba(0,0,0,0.06)'
    }}>
      {text}
    </div>);

}

function AssistantBubble({ children, opacity = 1 }) {
  return (
    <div style={{
      alignSelf: 'flex-start',
      maxWidth: '94%',
      padding: '18px 22px',
      background: PAPER_DIM,
      color: INK,
      border: `1px solid ${PAPER_DIM}`,
      borderRadius: '14px 14px 14px 4px',
      fontFamily: SANS,
      fontSize: 18.5,
      lineHeight: 1.55,
      opacity,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }}>
      {children}
    </div>);

}

// Render the streamed response as the playhead advances.
// Each block reveals after a per-block start offset; characters type in.
function StreamedResponse({ blocks, startAt }) {
  const { localTime } = useSprite();
  // assign cumulative reveal offsets per block based on its character count
  const MS_PER_CHAR = 22;
  const BLOCK_GAP = 110; // ms between blocks
  let cursor = 0;
  const decorated = blocks.map((b) => {
    const text = b.text || '';
    const extra = (b.detail || '') + (b.fix || '') + (b.date || '');
    const charCount = Math.max(1, (text + extra).length);
    const blockStart = startAt + cursor / 1000;
    cursor += charCount * MS_PER_CHAR + BLOCK_GAP;
    const blockEnd = startAt + cursor / 1000;
    return { ...b, blockStart, blockEnd, charCount };
  });

  return (
    <>
      {decorated.map((b, i) => {
        const elapsed = (localTime - b.blockStart) * 1000;
        if (elapsed < 0) return null;

        if (b.kind === 'sp') {
          return <div key={i} style={{ height: 8 }} />;
        }

        if (b.kind === 'h') {
          const n = Math.min(b.text.length, Math.floor(elapsed / MS_PER_CHAR));
          return (
            <div key={i} style={{
              fontFamily: MONO, fontSize: 13,
              letterSpacing: '0.12em', color: AMBER,
              marginTop: 12, marginBottom: 4,
              fontWeight: 600
            }}>
              {b.text.slice(0, n)}
            </div>);

        }

        if (b.kind === 'li') {
          const n = Math.min(b.text.length, Math.floor(elapsed / MS_PER_CHAR));
          return (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '2px 0' }}>
              <div style={{
                width: 5, height: 5, borderRadius: 3,
                background: INK, marginTop: 12, flexShrink: 0
              }} />
              <div style={{ flex: 1 }}>{b.text.slice(0, n)}</div>
            </div>);

        }

        if (b.kind === 'log') {
          // 3 phases: date, detail, fix
          const total = b.date.length + b.detail.length + b.fix.length;
          const reveal = Math.min(total, Math.floor(elapsed / MS_PER_CHAR));
          const dateN = Math.min(b.date.length, reveal);
          const detailN = Math.min(b.detail.length, Math.max(0, reveal - b.date.length));
          const fixN = Math.min(b.fix.length, Math.max(0, reveal - b.date.length - b.detail.length));
          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: '4px 14px',
              padding: '8px 0',
              borderTop: i > 0 && decorated[i - 1].kind === 'log' ? `1px dashed ${PAPER_DIM}` : 'none',
              fontSize: 17
            }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: AMBER, fontWeight: 600, letterSpacing: '0.07em', paddingTop: 2 }}>
                {b.date.slice(0, dateN)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ color: INK, fontWeight: 500 }}>{b.detail.slice(0, detailN)}</div>
                <div style={{ color: MUTED, fontSize: 15.5 }}>→ {b.fix.slice(0, fixN)}</div>
              </div>
            </div>);

        }

        // 'p'
        const n = Math.min(b.text.length, Math.floor(elapsed / MS_PER_CHAR));
        const inProgress = n < b.text.length;
        return (
          <div key={i} style={{ padding: '1px 0' }}>
            {b.text.slice(0, n)}
            {inProgress &&
            <span style={{
              display: 'inline-block',
              width: '0.5ch', height: '1em',
              background: INK,
              verticalAlign: '-0.12em',
              marginLeft: 1,
              opacity: 0.85
            }} />
            }
          </div>);

      })}
    </>);

}

function SourceBadge({ progress = 1 }) {
  return (
    <div style={{
      display: 'flex',
      marginTop: 10,
      opacity: progress,
      transform: `translateY(${(1 - progress) * 6}px)`,
    }}>
      <div style={{
        display: 'inline-flex', gap: 8, alignItems: 'center',
        padding: '5px 13px 5px 9px',
        background: AMBER_DIM,
        border: `1px solid rgba(230,135,11,0.38)`,
        borderRadius: 20,
        fontFamily: MONO, fontSize: 12,
        color: AMBER, fontWeight: 600,
        letterSpacing: '0.08em',
      }}>
        {/* small document icon */}
        <div style={{ width: 9, height: 11, border: `1.5px solid ${AMBER}`, borderRadius: 2, position: 'relative', flexShrink: 0 }}>
          <div style={{ position: 'absolute', top: 2.5, left: 1.5, width: 4, height: 1.5, background: AMBER, borderRadius: 1 }} />
          <div style={{ position: 'absolute', top: 5, left: 1.5, width: 4, height: 1.5, background: AMBER, borderRadius: 1 }} />
        </div>
        1 SOURCE
      </div>
    </div>
  );
}

function InputBox({ text, typing, submitted, submitProgress }) {
  const showText = !submitted;
  return (
    <div style={{
      borderTop: `1px solid ${PAPER_DIM}`,
      padding: '16px 20px',
      background: PAPER_DIM,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexShrink: 0
    }}>
      <div style={{
        flex: 1,
        height: 48,
        background: PAPER,
        border: `1px solid ${PAPER_DIM}`,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        padding: '0 18px',
        fontFamily: SANS,
        fontSize: 18,
        color: INK,
        opacity: 1 - submitProgress * 0.4
      }}>
        {showText ?
        <>
            {text}
            {typing &&
          <span style={{
            display: 'inline-block',
            width: '0.45ch', height: '1.05em',
            background: INK,
            marginLeft: 1,
            verticalAlign: '-0.15em',
            opacity: 0.85
          }} />
          }
          </> :

        <span style={{ color: MUTED }}>Ask anything about the line…</span>
        }
      </div>
      <div style={{
        width: 48, height: 48, borderRadius: 10,
        background: AMBER,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: INK,
        fontFamily: MONO, fontSize: 17, fontWeight: 700
      }}>↵</div>
    </div>);

}

// ─── Per-scene interaction config ──────────────────────────────────────────
// Each scene has a doc that opens on the right. Some have cursor / highlight / scroll.
const SCENE_INTERACTIONS = [
  // 0 — notes: scroll through tribal knowledge entry
  { kind: 'scroll', targetScrollY: 165 },
  // 1 — standard work: scroll down to reveal the changeover steps
  { kind: 'scroll', targetScrollY: 240 },
  // 2 — recovery: scroll down to the highlighted coolant section
  { kind: 'scroll', targetScrollY: 235 },
];


// ─── Dynamic timing ────────────────────────────────────────────────────────
// Derives scene durations, gate positions, and total length from content.
const _MS  = 22;   // ms per char — must match StreamedResponse
const _GAP = 110;  // ms per block gap
const _SLIDE = PHASE.docOpen - PHASE.docIn; // 0.70s slide duration
const _HOLD  = 2.5; // seconds of hold after interaction before gate fires

function _respDur(response) {
  let ms = 0;
  for (const b of (response || [])) {
    const chars = Math.max(1, ((b.text||'')+(b.detail||'')+(b.fix||'')+(b.date||'')).length);
    ms += chars * _MS + _GAP;
  }
  return ms / 1000;
}

function _interactDur(kind) {
  if (kind === 'hover')  return 2.4;
  if (kind === 'scroll') return 3.5;
  return 0;
}

function computeTiming(prompts) {
  const sceneStarts = [], sceneDurs = [], gateAts = [];
  let cursor = INTRO_END;

  for (let i = 0; i < 3; i++) {
    const p    = (prompts && prompts[i]) || CONFIG_DEFAULTS.prompts[i];
    const kind = SCENE_INTERACTIONS[i].kind;

    const respEnd      = PHASE.respIn + _respDur(p.response);
    const docIn        = respEnd + 2.0;
    const docOpen      = docIn + _SLIDE;
    const interactStart = Math.max(PHASE.interactIn, docOpen + 0.8);
    const interactEnd  = interactStart + _interactDur(kind);
    const gateAt       = interactEnd + _HOLD;
    const sceneDur     = gateAt + 0.5;

    sceneStarts.push(cursor);
    sceneDurs.push(sceneDur);
    gateAts.push(gateAt);
    cursor += sceneDur;
  }

  const outroStart = cursor;
  const totalDur   = outroStart + 5.0;

  const gates = [
    { at: 5.5, resumeAt: 5.5 },
    { at: sceneStarts[0] + gateAts[0], resumeAt: sceneStarts[1] },
    { at: sceneStarts[1] + gateAts[1], resumeAt: sceneStarts[2] },
    { at: sceneStarts[2] + gateAts[2], resumeAt: outroStart },
  ];

  return { sceneStarts, sceneDurs, outroStart, totalDur, gates };
}

function ChatScene({ idx }) {
  const t = useT();
  const { localTime } = useSprite();
  const p = (t.prompts && t.prompts[idx]) || CONFIG_DEFAULTS.prompts[idx];
  const doc = (t.docs && t.docs[idx]) || DOCS[idx];
  const interaction = SCENE_INTERACTIONS[idx];

  const chatOuterRef  = React.useRef(null);
  const chatInnerRef  = React.useRef(null);
  const maxScrollRef  = React.useRef(0);
  const handleMaxScroll = React.useCallback((v) => { maxScrollRef.current = v; }, []);

  // After every render (every animation frame), pin the bottom of the chat content
  // to the bottom of the visible pane by translating upward by the overflow amount.
  React.useEffect(() => {
    const outer = chatOuterRef.current;
    const inner = chatInnerRef.current;
    if (!outer || !inner) return;
    const overflow = Math.max(0, inner.scrollHeight - outer.clientHeight);
    inner.style.transform = `translateY(-${overflow}px)`;
  });

  // ── Typing the prompt ────────────────────────────────────────────────────
  const typeDur = PHASE.typeOut - 0.1;
  const cps = p.user.length / typeDur;
  const typedCharCount = Math.min(p.user.length, Math.floor(localTime * cps));
  const typedText = p.user.slice(0, typedCharCount);
  const typing = localTime < PHASE.typeOut;

  const submitted = localTime >= PHASE.submit;
  const submitProgress = clamp((localTime - PHASE.submit) / 0.3, 0, 1);
  const bubbleSettle = clamp((localTime - PHASE.submit) / 0.4, 0, 1);
  const thinking = localTime >= PHASE.thinkIn && localTime < PHASE.respIn;

  // ── When does the streaming response finish? ────────────────────────────
  const MS_PER_CHAR = 22;
  const BLOCK_GAP = 110;
  let _respCursor = 0;
  for (const b of p.response) {
    const chars = Math.max(1, ((b.text || '') + (b.detail || '') + (b.fix || '') + (b.date || '')).length);
    _respCursor += chars * MS_PER_CHAR + BLOCK_GAP;
  }
  const respEndTime  = PHASE.respIn + _respCursor / 1000;
  const docInTime    = respEndTime + 2.0;
  const DOC_SLIDE    = PHASE.docOpen - PHASE.docIn;
  const interactTime = Math.max(PHASE.interactIn, docInTime + DOC_SLIDE + 0.8);

  // ── "1 Source" badge ─────────────────────────────────────────────────────
  const badgeShowAt  = respEndTime + 0.3;
  const badgeProgress = Easing.easeOutCubic(clamp((localTime - badgeShowAt) / 0.5, 0, 1));

  // ── Chat-area cursor: slides in → moves to badge → clicks → fades ────────
  // Badge sits near bottom-left of the chat pane in screen coords (~1100×640).
  const BADGE_X = 108;
  const BADGE_Y = 514;
  const clickAt         = docInTime - 0.2;      // cursor arrives 0.2s before doc slides in
  const cursorMoveStart = clickAt - 1.3;         // 1.3s of travel

  let chatCursor = null;
  if (localTime >= cursorMoveStart) {
    const moveDur = clickAt - cursorMoveStart;
    const moveT   = Easing.easeInOutCubic(clamp((localTime - cursorMoveStart) / moveDur, 0, 1));
    const cx = 700 + (BADGE_X - 700) * moveT;
    const cy = 280 + (BADGE_Y - 280) * moveT;

    const clickT    = clamp((localTime - clickAt) / 0.4, 0, 1);
    const clickPulse = Math.sin(clickT * Math.PI);
    const basePulse  = 0.5 + 0.5 * Math.sin(localTime * 4.5);
    const pulse      = moveT < 1 ? basePulse : Math.max(0.2, clickPulse);

    const fadeOut = clamp((localTime - (docInTime + DOC_SLIDE)) / 0.4, 0, 1);
    chatCursor = { x: cx, y: cy, pulse, opacity: 1 - fadeOut };
  }

  // ── Document open progress ───────────────────────────────────────────────
  const docOpenRaw = clamp((localTime - docInTime) / DOC_SLIDE, 0, 1);
  const docOpen = Easing.easeOutCubic(docOpenRaw);
  const docVisible = docOpen > 0.01;

  // ── Per-scene interaction state ──────────────────────────────────────────
  let scrollY = 0;
  let highlight = null;
  let cursor = null;
  const tInt = localTime - interactTime;

  if (interaction.kind === 'hover' && tInt > 0) {
    const moveDur = 2.0;
    const moveT = Easing.easeInOutCubic(clamp(tInt / moveDur, 0, 1));
    const { cursorStart: s, cursorEnd: e, targetScrollY: tgt = 0 } = interaction;
    const pulse = 0.5 + 0.5 * Math.sin(tInt * 4.5);
    // scroll and cursor animate together so step 6 emerges as the cursor approaches
    scrollY = tgt * moveT;
    cursor = {
      visible: true,
      x: s.x + (e.x - s.x) * moveT,
      y: s.y + (e.y - s.y) * moveT,
      pulse
    };
    // highlight fades in shortly after the cursor lands
    const hlT = clamp((tInt - moveDur + 0.2) / 0.6, 0, 1);
    highlight = { stepIndex: interaction.target.stepIndex, progress: hlT };
  }

  if (interaction.kind === 'scroll' && tInt > 0) {
    const scrollDur = 3.5;
    const sT = clamp(tInt / scrollDur, 0, 1);
    const sE = Easing.easeInOutCubic(sT);
    scrollY = maxScrollRef.current * sE;   // scroll to measured bottom
    const pulse = 0.5 + 0.5 * Math.sin(tInt * 4.5);
    cursor = {
      visible: true,
      x: 540,
      y: 200,   // fixed viewport position while content scrolls beneath
      pulse
    };
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: PAPER
    }}>
      <ScreenHeader />

      {/* tag strip */}
      <div style={{
        padding: '12px 22px 10px',
        fontFamily: MONO, fontSize: 12,
        letterSpacing: '0.14em',
        color: MUTED,
        display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 18, height: 1, background: AMBER }} />
          EXAMPLE {idx + 1} / 3
        </div>
        <div style={{ width: 4, height: 4, borderRadius: 3, background: PAPER_DIM }} />
        <div style={{ color: INK_SOFT, fontWeight: 600 }}>{p.tag}</div>
        <div style={{ flex: 1 }} />
        {docVisible &&
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: docOpen, color: AMBER, fontWeight: 600 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: AMBER }} />
            DOC RETRIEVED
          </div>
        }
      </div>

      {/* split: chat on left, doc on right */}
      <div style={{
        flex: 1, display: 'flex', minHeight: 0,
        gap: docOpen * 14,
        padding: '0 20px 0 22px'
      }}>
        {/* chat pane — outer clips, inner scrolls up via translateY */}
        <div ref={chatOuterRef} style={{
          flex: 1, minWidth: 0,
          overflow: 'hidden',
          fontFamily: SANS
        }}>
          <div ref={chatInnerRef} style={{
            padding: '8px 4px 14px',
            display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            {submitted && <UserBubble text={p.user} settle={bubbleSettle} />}
            {thinking &&
            <AssistantBubble>
                <ThinkingDots />
              </AssistantBubble>
            }
            {localTime >= PHASE.respIn &&
            <AssistantBubble>
                <StreamedResponse blocks={p.response} startAt={PHASE.respIn} />
              </AssistantBubble>
            }
            {localTime >= PHASE.respIn &&
              <SourceBadge progress={badgeProgress} />
            }
          </div>
        </div>

        {/* doc pane — slides in from the right */}
        {docVisible &&
        <div style={{
          width: 580 * docOpen,
          flexShrink: 0,
          overflow: 'hidden',
          paddingTop: 8,
          paddingBottom: 14,
          display: 'flex',
          justifyContent: 'flex-start'
        }}>
            <div style={{
            width: 580,
            height: '100%',
            flexShrink: 0,
            transform: `translateX(${(docOpen - 1) * 580}px)`,
            opacity: 0.4 + 0.6 * docOpen
          }}>
              <DocPanel doc={doc} scrollY={scrollY} highlight={highlight} cursor={cursor} onMaxScroll={handleMaxScroll} />
            </div>
          </div>
        }
      </div>

      <InputBox
        text={typedText}
        typing={typing && !submitted}
        submitted={submitted}
        submitProgress={submitProgress} />

      {/* cursor that moves to the "1 Source" badge and clicks to reveal the doc */}
      {chatCursor && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10, opacity: chatCursor.opacity }}>
          <CursorIndicator x={chatCursor.x} y={chatCursor.y} pulse={chatCursor.pulse} />
        </div>
      )}
    </div>);

}

// ─── Intro screen (the boot moment on the laptop) ──────────────────────────
function IntroScreen() {
  const { localTime } = useSprite();
  const t = useT();
  const pulse = 0.5 + 0.5 * (Math.sin(localTime * 3) * 0.5 + 0.5);
  const subtitle = t.bootSubtitle || 'ON-DEMAND INTELLIGENCE · READY';
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: PAPER,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 22,
      fontFamily: SANS
    }}>
      {/* Logo tile */}
      <div style={{
        width: 120, height: 120,
        background: t.logoBgColor || INK, borderRadius: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 ${10 + pulse * 18}px rgba(230,135,11,${0.25 + pulse * 0.35})`,
      }}>
        <img src={t.logoSrc || 'scraps/GrayMatterLogo.png'} alt="Logo"
          style={{ width: 88, height: 88, objectFit: 'contain' }} />
      </div>

      <Typewriter
        text="APPROACHABLE AI"
        msPerChar={58}
        startAt={0.2}
        color={INK}
        showCaret={true} />
      
      <div style={{
        fontFamily: MONO,
        letterSpacing: '0.2em',
        color: MUTED, fontSize: "30px"
      }}>{subtitle}

      </div>

      {/* boot progress */}
      <div style={{
        width: 380, height: 4,
        background: PAPER_DIM,
        marginTop: 6,
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${Math.min(100, localTime / 3.0 * 100)}%`,
          height: '100%',
          background: AMBER,
          transition: 'none'
        }} />
      </div>
    </div>);

}

// ─── Outro screen ──────────────────────────────────────────────────────────
function OutroScreen() {
  const t = useT();
  const tag = t.outroTag || '';
  const line1 = t.outroLine1 || 'FROM TRIBAL KNOWLEDGE TO INSTITUTIONAL INTELLIGENCE';
  const line2 = t.outroLine2 || '';

  // Optional split-color rendering: marker "||" in line1 splits amber→dark.
  // Default split is at " TO " → first half amber, second half dark.
  const renderHeadline = (text) => {
    if (text.includes('||')) {
      const [a, b] = text.split('||');
      return <><span style={{ color: AMBER }}>{a}</span><span style={{ color: INK }}>{b}</span></>;
    }
    const m = text.match(/^(.*?\bTO\b\s*)(.*)$/);
    if (m && m[2]) {
      return <><span style={{ color: AMBER }}>{m[1]}</span><span style={{ color: INK }}>{m[2]}</span></>;
    }
    return <span style={{ color: AMBER }}>{text}</span>;
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: PAPER,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 14,
      fontFamily: SANS,
      padding: 40,
      textAlign: 'center'
    }}>
      {tag && (
        <div style={{
          fontFamily: MONO, fontSize: 13,
          letterSpacing: '0.22em',
          color: AMBER
        }}>
          {tag}
        </div>
      )}
      <div style={{
        fontSize: 60, fontWeight: 600,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        maxWidth: 1100,
        textWrap: 'pretty'
      }}>
        {renderHeadline(line1)}{line2 && <><br />{renderHeadline(line2)}</>}
      </div>
      <div style={{ height: 8 }} />
      <div style={{ display: 'flex', gap: 32, marginTop: 16, fontFamily: MONO, color: MUTED, letterSpacing: '0.12em', fontSize: "24px" }}>
        <div>NO CLOUD</div>
        <div style={{ width: 1, background: PAPER_DIM }} />
        <div>NO INTERNET</div>
        <div style={{ width: 1, background: PAPER_DIM }} />
        <div>0 BYTES EGRESS</div>
      </div>
    </div>);

}

// ─── Feature splash (left-side intro) ──────────────────────────────────────
function FeatureIntro() {
  const { localTime, duration } = useSprite();
  const t = useT();
  const exitDur = 0.65;
  const exitStart = duration - exitDur;

  // headline timing
  const headInE = Easing.easeOutCubic(clamp(localTime / 0.7, 0, 1));
  const headOutE = clamp((localTime - exitStart) / exitDur, 0, 1);
  const headOpacity = headInE * (1 - headOutE);
  const headTy = (1 - headInE) * 22 - headOutE * 14;

  const caption = t.splashCaption || 'WHAT IS APPROACHABLE AI';
  const line1 = t.splashHeadlineLine1 || 'Your best operator,';
  const line2 = t.splashHeadlineLine2 || 'built into a laptop.';

  return (
    <div style={{
      position: 'absolute', left: 90, top: 200, width: 760,
      color: PAPER, fontFamily: SANS
    }}>
      <div style={{
        opacity: headOpacity, transform: `translateY(${headTy}px)`,
        fontFamily: MONO, fontSize: 14, letterSpacing: '0.22em',
        color: AMBER, marginBottom: 18
      }}>
        {caption}
      </div>
      <div style={{
        opacity: headOpacity, transform: `translateY(${headTy}px)`,
        fontSize: 54, fontWeight: 600, letterSpacing: '-0.022em',
        lineHeight: 1.05, marginBottom: 48,
        color: PAPER,
        textWrap: 'pretty'
      }}>
        {line1}<br />
        {line2}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {(t.featureCards || CONFIG_DEFAULTS.featureCards).map((f, i) => {
          const inStart = 0.5 + i * 0.35;
          const inE = Easing.easeOutCubic(clamp((localTime - inStart) / 0.6, 0, 1));
          const outE = clamp((localTime - exitStart - i * 0.05) / exitDur, 0, 1);
          const opacity = inE * (1 - outE);
          const ty = (1 - inE) * 24 - outE * 12;
          return (
            <FeatureCard key={i} {...f} opacity={opacity} ty={ty} />);

        })}
      </div>
    </div>);

}

function FeatureCard({ label, title, desc, opacity, ty }) {
  return (
    <div style={{
      opacity,
      transform: `translateY(${ty}px)`,
      display: 'grid',
      gridTemplateColumns: '80px 1fr',
      gap: 22,
      color: PAPER,
      fontFamily: SANS
    }}>
      <div style={{
        fontFamily: MONO, fontSize: 26, fontWeight: 600,
        color: AMBER, letterSpacing: '0.04em', paddingTop: 6
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 32, fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.15,
        alignSelf: 'center'
      }}>
        {title}
      </div>
    </div>);

}

// "data egress = 0" ring around the laptop — implied via a dashed outline that
// fades in early and stays. No cloud iconography invented.
function ContainmentRing({ rect }) {
  const { localTime } = useSprite();
  const t = clamp(localTime / 1.2, 0, 1);
  const dash = localTime * 30 % 24;
  return (
    <svg style={{
      position: 'absolute',
      left: rect.x - 28, top: rect.y - 28,
      width: rect.w + 56, height: rect.h + 56,
      pointerEvents: 'none',
      opacity: t * 0.55
    }}>
      <rect
        x={1} y={1}
        width={rect.w + 54} height={rect.h + 54}
        rx={26}
        fill="none"
        stroke={AMBER}
        strokeWidth={1.2}
        strokeDasharray="12 12"
        strokeDashoffset={-dash} />
      
    </svg>);

}

function TopBar() {
  return (
    <div style={{
      position: 'absolute',
      left: 60, right: 60, top: 38,
      display: 'flex', alignItems: 'baseline', gap: 16,
      color: PAPER,
      fontFamily: MONO
    }}>
      <div style={{ fontSize: 12, letterSpacing: '0.18em', color: AMBER }}>APPROACHABLE AI</div>
      <div style={{ fontSize: 12, letterSpacing: '0.14em', opacity: 0.5 }}>· RUNNING LOCALLY</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 11, letterSpacing: '0.16em', opacity: 0.5 }}>FACTORY ADVISORS</div>
    </div>);

}

function BottomBar({ sceneIdx, phase }) {
  const labels = ['INTRO', 'PROMPT 1', 'PROMPT 2', 'PROMPT 3', 'OUTRO'];
  return (
    <div style={{
      position: 'absolute',
      left: 60, right: 60, bottom: 20,
      display: 'flex', gap: 14, alignItems: 'center',
      color: PAPER,
      fontFamily: MONO,
      fontSize: 18,
      letterSpacing: '0.14em',
    }}>
      {labels.map((label, i) => {
        const active = i === phase;
        const done = i < phase;
        return (
          <React.Fragment key={i}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              opacity: active ? 1 : done ? 0.55 : 0.25
            }}>
              <div style={{
                width: 14, height: 14, borderRadius: 7,
                background: active ? AMBER : done ? PAPER : 'transparent',
                border: `1px solid ${active || done ? 'transparent' : 'rgba(239, 237, 232, 0.35)'}`
              }} />
              <span style={{ fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
            {i < labels.length - 1 &&
            <div style={{ flex: 1, height: 1, background: 'rgba(239, 237, 232, 0.14)', maxWidth: 80 }} />
            }
          </React.Fragment>);

      })}
      <div style={{ flex: 1 }} />
      <div style={{ opacity: 0.45, fontSize: 11 }}>0 BYTES EGRESS</div>
    </div>);

}

// ─── Main scene ────────────────────────────────────────────────────────────
function ApproachableAIScene() {
  const time = useTime();
  const t = useT();
  const { sceneStarts, sceneDurs, outroStart, totalDur } = t._timing || computeTiming(t.prompts);

  // laptop position
  const screenW = 1100;
  const screenH = 640;
  const bezel = 22;
  const laptopX = 410;
  const laptopY = 120;
  const laptopRect = { x: laptopX, y: laptopY, w: screenW + bezel * 2, h: screenH + bezel * 2 };

  // figure out the current phase index (for bottom bar)
  let phase = 0;
  if (time >= sceneStarts[0] && time < sceneStarts[1]) phase = 1;
  else if (time >= sceneStarts[1] && time < sceneStarts[2]) phase = 2;
  else if (time >= sceneStarts[2] && time < outroStart) phase = 3;
  else if (time >= outroStart) phase = 4;

  // Lid opens between LID_OPEN_START and LID_OPEN_END.
  const openProgress = clamp((time - LID_OPEN_START) / (LID_OPEN_END - LID_OPEN_START), 0, 1);

  // Laptop scale + translate: small + shifted right during splash, then zooms to full.
  const zoomT = clamp((time - SPLASH_END) / (ZOOM_END - SPLASH_END), 0, 1);
  const zoomE = Easing.easeInOutCubic(zoomT);
  const laptopScale = 0.55 + 0.45 * zoomE;
  const laptopTx = (1 - zoomE) * 358;

  return (
    <>
      {/* subtle blue glow floor */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 50% 60%, rgba(54, 94, 149, 0.35) 0%, ${BG} 70%)`
      }} />

      {t.showInfoBars !== false && <TopBar />}

      {/* Feature splash — left side, only during intro */}
      <Sprite start={SPLASH_START} end={SPLASH_END + 1.0} keepMounted>
        <FeatureIntro />
      </Sprite>

      {/* Containment ring — fades in once the laptop reaches full size */}
      {t.showRing !== false &&
      <Sprite start={ZOOM_END - 0.2} end={totalDur} keepMounted>
          <ContainmentRing rect={laptopRect} />
        </Sprite>
      }

      {/* laptop with screen content */}
      <LaptopChassis
        x={laptopX}
        y={laptopY}
        screenW={screenW}
        screenH={screenH}
        bezel={bezel}
        openProgress={openProgress}
        scale={laptopScale}
        translate={{ x: laptopTx, y: 0 }}>
        
        {/* intro / boot screen — visible after lid finishes opening */}
        <Sprite start={LID_OPEN_END} end={INTRO_END}>
          <IntroScreen />
        </Sprite>

        {/* 3 chat scenes */}
        {[0, 1, 2].map((i) => (
          <Sprite key={i} start={sceneStarts[i]} end={sceneStarts[i] + sceneDurs[i]}>
            <ChatScene idx={i} />
          </Sprite>
        ))}

        {/* outro on screen */}
        <Sprite start={outroStart} end={totalDur}>
          <OutroScreen />
        </Sprite>
      </LaptopChassis>

      {t.showInfoBars !== false &&
      <BottomBar phase={phase} />
      }
    </>);

}

// ─── Intro gate screen ─────────────────────────────────────────────────────
function IntroGate({ cfg, onBegin }) {
  const [fading, setFading] = React.useState(false);

  const begin = React.useCallback(() => {
    if (fading) return;
    setFading(true);
    setTimeout(onBegin, 500);
  }, [fading, onBegin]);

  React.useEffect(() => {
    const id = '__aai_gate_style';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = `
        @keyframes __aai_gate_bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(10px); }
        }
        .__aai_gate_arrow { animation: __aai_gate_bounce 1.8s ease-in-out infinite; }
      `;
      document.head.appendChild(el);
    }
    const onWheel = (e) => { e.preventDefault(); if (e.deltaY > 0) begin(); };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [begin]);

  const logoSrc = (cfg && cfg.logoSrc) || CONFIG_DEFAULTS.logoSrc;

  return (
    <div onClick={begin} style={{
      position: 'fixed', inset: 0, background: BG, cursor: 'pointer',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: MONO, userSelect: 'none',
      opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease',
    }}>
      {/* Factory Advisors lockup */}
      <img src="data:image/png;base64,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1wEJOkKDIDDNFveluGqaYTbPPWqZV20uozNtdxySAGnq/pl7Hey8fe8jxYi8f3REB07xZWhERMSAvvDAPtxncd2IF0CPDq07OxJzB4x+Iw5tMlZvtJUKbwV3j9Z2sigf8jI9KU2MtLG3fjm1P5W5cSi2T77phs4d2DemChm5rs9cN8L0OhERAzoBOH5Tl7Ftl10UBsFAYHGtoP3JakthevJdHNjcK7zXR7PMD6y48+m/Fx0R1smJiBjQabbR9Yz6+sTQuqsCYwajyFy6kOVkC7qHGcvjphruKTi5J7l99x8A1smJiBjQaf5BtbThy3Af7OfWrb/ZGHwnjuz5E7UcTudfX2/nsl7VH9vAJv83IIPJN/c8VIzIF7qBDRERMaCf2YG9lNYe2/HxntC5uyC4Na7YaLyeQ6HzOtHtbUbkHlAvkKArCVDPXE0UO9LUblt595+PKCDo6zPCOjkRETGgL065vj5+/9oPB6G9W9X3JXFg09Qhdd4D8M1JcGLQzMnLLMFbm4ly9a1JciYKjIkqFvXUZUbwiyzH97s37/nbzA4FERERA/pSjNZnHGs6sX3DxQZ6oyq+EIfmPcYK1CnS3CN3Cq9QEfWqAAQCFTEGEhpBJTAQK3C5R5rry0bkl7nKT7o2PTVaBPIzcbtWIiJiQD9xgb1UXweA1+7b0NUZ+4/B40rnsVaBC1W1JwqsDaxMb7ydO0Wau1xEDhmRF43oXlg8EUeN3XLzc7XpQM46ORERMaCf4MBeOvil8Np9G7rOrfrz6g3T4512OyC0xmUu1/FKFB6Kz6oelBsenyz/TnPv912egZyIiBjQ36nA3krFY/SQoH+Xm0+avHlwyhUGvau02NSGLUlERAzoJ1uA74egt+/4Nh8BcNGIoh/K2jgREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREdHy+x+GHTB+1LSVFwAAAABJRU5ErkJggg==" alt="Factory Advisors"
        style={{ width: 480, objectFit: 'contain', marginBottom: 44, opacity: 0.92 }} />

      {/* Brand label */}
      <div style={{ fontSize: 13, letterSpacing: '0.22em', color: AMBER, marginBottom: 16 }}>
        APPROACHABLE AI
      </div>

      {/* Headline */}
      <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '0.08em', color: PAPER, marginBottom: 36 }}>
        INTERACTIVE DEMO
      </div>

      {/* Divider */}
      <div style={{ width: 340, height: 1, background: 'rgba(239,237,232,0.12)', marginBottom: 44 }} />

      {/* CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <div style={{ fontSize: 17, letterSpacing: '0.2em', color: MUTED }}>
          CLICK OR SCROLL TO BEGIN
        </div>
        <div className="__aai_gate_arrow">
          <svg width="34" height="34" viewBox="0 0 22 22" fill="none">
            <path d="M11 3v16M3 11l8 8 8-8" stroke={AMBER} strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Mount ─────────────────────────────────────────────────────────────────
// Gates: pause at `at`, then on scroll-down jump to `resumeAt` (next scene start).
const GATES = [
  { at: 5.5,                                              resumeAt: 5.5 },          // all feature cards fully visible
  { at: INTRO_END + PHASE.interactHold,                   resumeAt: INTRO_END + SCENE_DUR },
  { at: INTRO_END + SCENE_DUR + PHASE.interactHold,       resumeAt: INTRO_END + 2 * SCENE_DUR },
  { at: INTRO_END + 2 * SCENE_DUR + PHASE.interactHold,  resumeAt: OUTRO_START },
];

function App() {
  // Support baked-config exports: skip config screen and use window.__BAKED_CONFIG
  const skipConfig = !!window.__SKIP_CONFIG_SCREEN;
  const bakedCfg = window.__BAKED_CONFIG
    ? { ...CONFIG_DEFAULTS, ...window.__BAKED_CONFIG } : null;

  const [mode, setMode] = React.useState(skipConfig ? 'gate' : 'config');
  const [cfg, setCfg] = React.useState(bakedCfg || CONFIG_DEFAULTS);
  const [launched, setLaunched] = React.useState(skipConfig);

  const timing = React.useMemo(() => computeTiming(cfg.prompts), [cfg]);

  const handleLaunch = (savedCfg) => {
    setCfg(savedCfg);
    setLaunched(true);
    setMode('gate');
  };

  if (mode === 'config') {
    return <ConfigScreen onLaunch={handleLaunch} />;
  }

  if (mode === 'gate') {
    return <IntroGate cfg={cfg} onBegin={() => setMode('play')} />;
  }

  return (
    <>
      <TweaksContext.Provider value={{ ...cfg, _timing: timing }}>
        <Stage
          width={1920}
          height={1080}
          duration={timing.totalDur}
          background={BG}
          autoplay={true}
          gates={timing.gates}>
          <ApproachableAIScene />
        </Stage>
      </TweaksContext.Provider>
      {!launched && (
        <button
          onClick={() => setMode('config')}
          title="Back to configuration"
          style={{
            position: 'fixed', bottom: 14, right: 14, zIndex: 9999,
            background: 'rgba(0,33,65,0.88)',
            color: '#737984',
            border: '1px solid rgba(140,156,164,0.22)',
            borderRadius: 6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: '0.1em',
            padding: '6px 13px', cursor: 'pointer',
          }}>
          ⚙ CONFIGURE
        </button>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);