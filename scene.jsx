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
      <div style={{ fontSize: 12, letterSpacing: '0.14em', opacity: 0.5 }}>·  AI FACTORY ADVISOR · RUNNING LOCALLY</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 11, letterSpacing: '0.16em', opacity: 0.5 }}>FTE FACTORY ADVISORS</div>
    </div>);

}

function BottomBar({ sceneIdx, phase }) {
  const labels = ['INTRO', 'PROMPT 1', 'PROMPT 2', 'PROMPT 3', 'OUTRO'];
  return (
    <div style={{
      position: 'absolute',
      left: 60, right: 60, bottom: 36,
      display: 'flex', gap: 14, alignItems: 'center',
      color: PAPER,
      fontFamily: MONO,
      fontSize: 11,
      letterSpacing: '0.14em'
    }}>
      {labels.map((label, i) => {
        const active = i === phase;
        const done = i < phase;
        return (
          <React.Fragment key={i}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: active ? 1 : done ? 0.55 : 0.25
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: 4,
                background: active ? AMBER : done ? PAPER : 'transparent',
                border: `1px solid ${active || done ? 'transparent' : 'rgba(239, 237, 232, 0.35)'}`
              }} />
              <span style={{ fontWeight: active ? 600 : 400 }}>{label}</span>
            </div>
            {i < labels.length - 1 &&
            <div style={{ flex: 1, height: 1, background: 'rgba(239, 237, 232, 0.14)', maxWidth: 60 }} />
            }
          </React.Fragment>);

      })}
      <div style={{ flex: 1 }} />
      <div style={{ opacity: 0.45 }}>0 BYTES EGRESS · SINCE BOOT</div>
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
  const laptopY = 180;
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

  const [mode, setMode] = React.useState(skipConfig ? 'play' : 'config');
  const [cfg, setCfg] = React.useState(bakedCfg || CONFIG_DEFAULTS);

  const timing = React.useMemo(() => computeTiming(cfg.prompts), [cfg]);

  const handleLaunch = (savedCfg) => {
    setCfg(savedCfg);
    setMode('play');
  };

  if (mode === 'config') {
    return <ConfigScreen onLaunch={handleLaunch} />;
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
      {!skipConfig && (
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