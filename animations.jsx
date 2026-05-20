
// animations.jsx — Animation engine: Stage, Sprite, easing helpers.
//
// Gate format: { at: number, resumeAt: number }
//   at:       timestamp where playback pauses (shows scroll indicator)
//   resumeAt: timestamp to jump to when user scrolls down through this gate
//             (allows skipping over the tail end of a scene)
//
// Scroll behaviour:
//   - Scroll DOWN while frozen at a gate → jump to gate.resumeAt, continue
//   - Scroll DOWN while playing → boost playback speed (decays back to 1×)
//   - Scroll UP → go to start of previous segment, replay it

// ── Easing ───────────────────────────────────────────────────────────────────
const Easing = {
  linear: (t) => t,
  easeInQuad:    (t) => t * t,
  easeOutQuad:   (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic:    (t) => t * t * t,
  easeOutCubic:   (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart:    (t) => t * t * t * t,
  easeOutQuart:   (t) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t),
  easeInExpo:  (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t) => {
    if (t === 0) return 0; if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  easeInSine:    (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine:   (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  easeInBack:  (t) => { const c1 = 1.70158, c3 = c1 + 1; return c3 * t * t * t - c1 * t * t; },
  easeInOutBack: (t) => {
    const c1 = 1.70158, c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0) return 0; if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function interpolate(input, output, ease = Easing.linear) {
  return (t) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? (ease[i] || Easing.linear) : ease;
        return output[i] + (output[i + 1] - output[i]) * easeFn(local);
      }
    }
    return output[output.length - 1];
  };
}

function animate({ from = 0, to = 1, start = 0, end = 1, ease = Easing.easeInOutCubic }) {
  return (t) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}

// ── Timeline context ──────────────────────────────────────────────────────────
const TimelineContext = React.createContext({ time: 0, duration: 10, playing: false, paused: false });
const useTime     = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ────────────────────────────────────────────────────────────────────
const SpriteContext = React.createContext({ localTime: 0, progress: 0, duration: 0 });
const useSprite = () => React.useContext(SpriteContext);

function Sprite({ start = 0, end = Infinity, children, keepMounted = false }) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;
  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value = { localTime, progress, duration, visible };
  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  );
}

// ── Sample sprite components ──────────────────────────────────────────────────
function TextSprite({ text, x = 0, y = 0, size = 48, color = '#111',
  font = 'Inter, system-ui, sans-serif', weight = 600,
  entryDur = 0.45, exitDur = 0.35,
  entryEase = Easing.easeOutBack, exitEase = Easing.easeInCubic,
  align = 'left', letterSpacing = '-0.01em' }) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1, ty = 0;
  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t; ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t; ty = -t * 8;
  }
  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return (
    <div style={{ position: 'absolute', left: x, top: y,
      transform: `translate(${translateX}, ${ty}px)`, opacity,
      fontFamily: font, fontSize: size, fontWeight: weight, color, letterSpacing,
      whiteSpace: 'pre', lineHeight: 1.1, willChange: 'transform, opacity' }}>
      {text}
    </div>
  );
}

function ImageSprite({ src, x = 0, y = 0, width = 400, height = 300,
  entryDur = 0.6, exitDur = 0.4, kenBurns = false, kenBurnsScale = 1.08,
  radius = 12, fit = 'cover', placeholder = null }) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1, scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t; scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t; scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdT = (exitStart - entryDur) > 0 ? (localTime - entryDur) / (exitStart - entryDur) : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }
  const content = placeholder
    ? <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
        color: '#6b6458', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.04em' }}>
        {placeholder.label || 'image'}
      </div>
    : <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width, height, opacity,
      transform: `scale(${scale})`, transformOrigin: 'center',
      borderRadius: radius, overflow: 'hidden', willChange: 'transform, opacity' }}>
      {content}
    </div>
  );
}

function RectSprite({ x = 0, y = 0, width = 100, height = 100, color = '#111',
  radius = 8, entryDur = 0.4, exitDur = 0.3, render }) {
  const spriteCtx = useSprite();
  const { localTime, duration } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1, scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1); scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t; scale = 1 - 0.15 * t;
  }
  const overrides = render ? render(spriteCtx) : {};
  return (
    <div style={{ position: 'absolute', left: x, top: y, width, height, background: color,
      borderRadius: radius, opacity, transform: `scale(${scale})`, transformOrigin: 'center',
      willChange: 'transform, opacity', ...overrides }} />
  );
}

// ── Stage ─────────────────────────────────────────────────────────────────────
function Stage({ width = 1280, height = 720, duration = 10, background = '#f6f4ef',
  autoplay = true, gates = [], children }) {

  const [time, setTime]           = React.useState(0);
  const [playing, setPlaying]     = React.useState(autoplay);
  const [scale, setScale]         = React.useState(1);
  const [frozen, setFrozen]       = React.useState(false);
  const [segmentIdx, setSegmentIdx] = React.useState(0);

  const stageRef        = React.useRef(null);
  const rafRef          = React.useRef(null);
  const lastTsRef       = React.useRef(null);
  const frozenRef       = React.useRef(false);
  const segmentIdxRef   = React.useRef(0);
  const gatesRef        = React.useRef(gates);
  const lastScrollRef   = React.useRef(0);
  const speedRef        = React.useRef(1);   // playback speed multiplier (1x = normal)
  const rewindingRef    = React.useRef(false);
  const manualPauseRef  = React.useRef(false);
  const [manualPause, setManualPause] = React.useState(false);
  const lastScrollDirRef  = React.useRef(0); // 1 = down, -1 = up
  const scrollPausedRef   = React.useRef(false);
  const rewindTimerRef    = React.useRef(null); // clears rewind when scroll stops
  const timeRef           = React.useRef(0);    // mirrors time state for timeout callbacks

  React.useLayoutEffect(() => { gatesRef.current = gates; });

  // Inject CSS for scroll indicator bounce (once per page)
  React.useEffect(() => {
    const id = '__aai_scroll_style';
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = `
      @keyframes __aai_bounce {
        0%,100% { transform: translateX(-50%) translateY(0); opacity: .5; }
        50%      { transform: translateX(-50%) translateY(11px); opacity: 1; }
      }
      .__aai_scroll_ind { animation: __aai_bounce 1.8s ease-in-out infinite; }
    `;
    document.head.appendChild(el);
  }, []);

  // Auto-scale canvas to viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const s = Math.min(el.clientWidth / width, el.clientHeight / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [width, height]);

  // rAF animation loop
  React.useEffect(() => {
    if (!playing) { lastTsRef.current = null; return; }
    const step = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const rawDt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      // Decay speed multiplier back toward 1× each frame
      speedRef.current = Math.max(1, speedRef.current * 0.94);

      if (rewindingRef.current && !manualPauseRef.current) {
        setTime(t => {
          const next = Math.max(0, t - rawDt * 4);
          timeRef.current = next;
          if (next === 0) {
            rewindingRef.current = false;
            scrollPausedRef.current = true;
          }
          return next;
        });
      } else if (!frozenRef.current && !manualPauseRef.current && !scrollPausedRef.current) {
        setTime(t => {
          const gate = gatesRef.current[segmentIdxRef.current];
          const gateAt = gate ? gate.at : undefined;
          let next = t + rawDt * speedRef.current;
          if (gateAt !== undefined && next >= gateAt) {
            frozenRef.current = true;
            setFrozen(true);
            speedRef.current = 1;
            timeRef.current = gateAt;
            return gateAt;
          }
          if (next >= duration) {
            frozenRef.current = true;
            setFrozen(true);
            speedRef.current = 1;
            timeRef.current = duration;
            return duration;
          }
          timeRef.current = next;
          return next;
        });
      }

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastTsRef.current = null; };
  }, [playing, duration]);

  // Wheel / scroll handler
  React.useEffect(() => {
    const GATE_DEBOUNCE = 500; // ms between gate-advance events

    const onWheel = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      if (deltaY === 0) return;

      // Any scroll clears manual pause
      if (manualPauseRef.current) {
        manualPauseRef.current = false;
        setManualPause(false);
      }

      const dir = deltaY > 0 ? 1 : -1;

      // Direction change: clear debounce and cancel in-progress motion
      if (lastScrollDirRef.current !== 0 && lastScrollDirRef.current !== dir) {
        lastScrollRef.current = 0;
        if (dir > 0) {
          // switched to down — stop rewind timer, cancel rewind, resume forward
          clearTimeout(rewindTimerRef.current);
          rewindingRef.current = false;
          scrollPausedRef.current = false;
        } else {
          // switched to up — kill speed boost
          speedRef.current = 1;
        }
      }
      lastScrollDirRef.current = dir;

      if (deltaY > 0) {
        // ── Scroll down ────────────────────────────────────────────────────
        if (scrollPausedRef.current) {
          // Resume from scroll-pause — fix up segmentIdx then play
          scrollPausedRef.current = false;
          const t = timeRef.current;
          const g = gatesRef.current;
          const si = g.findIndex(gate => gate.at > t);
          const newSi = si === -1 ? g.length : si;
          segmentIdxRef.current = newSi;
          setSegmentIdx(newSi);
          return;
        }
        if (frozenRef.current) {
          // ── Advance past gate (debounced) ────────────────────────────────
          const now = Date.now();
          if (now - lastScrollRef.current < GATE_DEBOUNCE) return;
          lastScrollRef.current = now;

          const g = gatesRef.current;
          const si = segmentIdxRef.current;
          if (si < g.length) {
            const resumeAt = g[si].resumeAt;
            const next = si + 1;
            segmentIdxRef.current = next;
            frozenRef.current = false;
            speedRef.current = 1;
            setTime(resumeAt);
            setSegmentIdx(next);
            setFrozen(false);
          }
        } else {
          // ── Speed up playback (no debounce, additive) ────────────────────
          speedRef.current = Math.min(6, speedRef.current + Math.abs(deltaY) / 80);
        }
      } else if (deltaY < 0) {
        // ── Scroll up: rewind while scrolling, pause when scroll stops ─────
        scrollPausedRef.current = false;
        frozenRef.current = false;
        rewindingRef.current = true;
        setFrozen(false);

        // Reset the "scroll stopped" timer — fires 150ms after the last event
        clearTimeout(rewindTimerRef.current);
        rewindTimerRef.current = setTimeout(() => {
          rewindingRef.current = false;
          scrollPausedRef.current = true;
          lastScrollDirRef.current = 0; // allow next up-scroll to rewind again
          // Sync segmentIdx to current time so forward playback stops at correct gate
          const t = timeRef.current;
          const g = gatesRef.current;
          const si = g.findIndex(gate => gate.at > t);
          const newSi = si === -1 ? g.length : si;
          segmentIdxRef.current = newSi;
          setSegmentIdx(newSi);
        }, 150);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // Arrow-key gate navigation
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();

      const g = gatesRef.current;

      // Cancel any in-progress rewind or scroll-pause
      clearTimeout(rewindTimerRef.current);
      rewindingRef.current = false;
      scrollPausedRef.current = false;
      manualPauseRef.current = false;
      setManualPause(false);
      speedRef.current = 1;

      if (e.key === 'ArrowRight') {
        // Jump to next gate pause point, or to the very end if past all gates
        const si = segmentIdxRef.current;
        const nextSi = frozenRef.current ? si + 1 : si;
        if (nextSi < g.length) {
          segmentIdxRef.current = nextSi;
          frozenRef.current = true;
          setTime(g[nextSi].at);
          setFrozen(true);
          setSegmentIdx(nextSi);
        } else {
          segmentIdxRef.current = g.length;
          frozenRef.current = true;
          setTime(duration);
          setFrozen(true);
          setSegmentIdx(g.length);
        }
      } else {
        // Jump to previous gate pause point
        const si = segmentIdxRef.current;
        const prevSi = si > 0 ? si - 1 : -1;
        if (prevSi >= 0) {
          segmentIdxRef.current = prevSi;
          frozenRef.current = true;
          setTime(g[prevSi].at);
          setFrozen(true);
          setSegmentIdx(prevSi);
        } else {
          // Before the first gate — go to beginning and play
          segmentIdxRef.current = 0;
          frozenRef.current = false;
          setTime(0);
          setFrozen(false);
          setSegmentIdx(0);
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Show indicator when frozen at a gate (not at the very end)
  const showScrollIndicator = frozen && !manualPause && segmentIdx < gates.length;

  const paused = manualPause; // only manual pause (click) hides the caret; gate-freeze does not
  const ctxValue = React.useMemo(
    () => ({ time, duration, playing, setTime, setPlaying, paused }),
    [time, duration, playing, paused]
  );

  const handleClick = () => {
    const next = !manualPauseRef.current;
    manualPauseRef.current = next;
    setManualPause(next);
  };

  return (
    <div ref={stageRef} onClick={handleClick} style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a', overflow: 'hidden',
      cursor: 'default',
    }}>
      <div data-anim-canvas="true" style={{
        width, height, background,
        position: 'relative',
        transform: `scale(${scale})`, transformOrigin: 'center',
        flexShrink: 0,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        overflow: 'hidden',
      }}>
        <TimelineContext.Provider value={ctxValue}>
          {children}
        </TimelineContext.Provider>

        {showScrollIndicator && (
          <div className="__aai_scroll_ind" style={{
            position: 'absolute', bottom: 88, left: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
            pointerEvents: 'none', zIndex: 50,
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 13, letterSpacing: '0.2em', color: '#737984' }}>
              SCROLL TO CONTINUE
            </div>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 3v16M3 11l8 8 8-8"
                stroke="#E6870B" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  Easing, interpolate, animate, clamp,
  TimelineContext, useTime, useTimeline,
  Sprite, SpriteContext, useSprite,
  TextSprite, ImageSprite, RectSprite,
  Stage,
});
