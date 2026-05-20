// docs.jsx — Document panels, cursor, highlight, scroll
// Used by scene.jsx. Loaded after animations.jsx, before scene.jsx.

const DOC_PAPER     = '#EFEDE8';   // Light 1
const DOC_PAPER_2   = '#D6E0E9';   // Light 2 (elevated surfaces)
const DOC_BORDER    = 'rgba(140, 156, 164, 0.55)';  // Accent 2 @ alpha
const DOC_INK       = '#002141';   // Dark 1
const DOC_MUTED     = '#737984';   // Accent 1
const DOC_AMBER     = '#E6870B';   // Primary 1
const DOC_AMBER_BG  = 'rgba(230, 135, 11, 0.22)';

const DOC_MONO = "'JetBrains Mono', ui-monospace, monospace";
const DOC_SANS = "'Inter', system-ui, sans-serif";

// ─── Documents per scene ────────────────────────────────────────────────────
const DOCS = [
  // ── Scene 1: line-leader notes on wrinkles ────────────────────────────────
  {
    style: 'notes',
    label: 'KNOWLEDGE-BASE ENTRY · TRIBAL',
    title: "Line 4 — Wrinkle Defect Notes",
    sub: "J. VASQUEZ · LEAD OP, 2ND SHIFT · UPDATED MAY 04",
    sections: [
      {
        heading: "Rules of thumb",
        items: [
          "- Keep dwell at or below 3.6s on softer alloy lots — anything more and the wrinkle starts.",
          "- Reynolds 5052 has been running hot all week. Back off another 0.2s on those coils.",
          "- Don't re-run until the die is under 240°F. Use the IR gun, not the HMI temp.",
        ],
      },
      {
        heading: "What I've noticed",
        items: [
          "- The wrinkles cluster near the corner radius first. That tells you where to look.",
          "- Worst hour is 05:00–07:00. Die is cold from the overnight idle.",
        ],
      },
      {
        heading: "Lower clamp ring history",
        items: [
          "- Pads were last swapped at 4,200 cycles. We're due around now.",
          "- Symptom progression I keep seeing: hairline → wave → full wrinkle. Catch it at the wave.",
        ],
      },
    ],
  },

  // ── Scene 2: standard work for mold changeover ───────────────────────────
  {
    style: 'standardwork',
    label: 'STANDARD WORK · REV 3 · CONTROLLED',
    title: "Standard Instructions - Mold Changeover",
    sub: "SIENNA → HIGHLANDER · TAKT 22:00 · QA K. RHEA",
    sections: [
      {
        heading: "Prep",
        items: [
          "- Park both robots in maintenance pose (M-pose).",
          "- Drain coolant manifold A — blue panel valve, turn ¼ clockwise.",
          "- Disengage clamp pressure: HMI → Safety → Release Hold.",
        ],
      },
      {
        heading: "Fixture Swap",
        items: [
          "- Bolt out fixture plates 1–4 — reverse torque sequence (plate 4 first).",
          "- Lift Sienna cassette via overhead crane, set in Rack 1.",
          "[Load Highlander cassette — Rack 3, Slot B.]",
        ],
      },
      {
        heading: "Restart & Verify",
        items: [
          "- Re-engage clamp pressure and re-prime coolant manifold.",
          "- Run 3 first-piece test parts past the QC gate. Flag if cycle > 47s.",
        ],
      },
    ],
  },

  // ── Scene 3: recovery procedure (scroll down to coolant section) ─────────
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
];

// ─── DocPanel ───────────────────────────────────────────────────────────────
function DocPanel({ doc, scrollY = 0, highlight = null, cursor = null, onMaxScroll }) {
  const bodyRef    = React.useRef(null);
  const contentRef = React.useRef(null);
  const maxScrollRef = React.useRef(0);

  // Measure actual scrollable range every frame and report to caller.
  React.useEffect(() => {
    if (!bodyRef.current || !contentRef.current) return;
    const max = Math.max(0, contentRef.current.scrollHeight - bodyRef.current.clientHeight);
    maxScrollRef.current = max;
    if (onMaxScroll) onMaxScroll(max);
  });

  return (
    <div style={{
      width: '100%', height: '100%',
      background: DOC_PAPER,
      border: `1px solid ${DOC_BORDER}`,
      borderRadius: 8,
      boxShadow: '0 12px 28px rgba(0, 33, 65, 0.18), 0 2px 6px rgba(0, 33, 65, 0.10)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* doc title bar (file chrome) */}
      <div style={{
        height: 30,
        background: DOC_PAPER_2,
        borderBottom: `1px solid ${DOC_BORDER}`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 14px',
        fontFamily: DOC_MONO,
        fontSize: 11.5,
        letterSpacing: '0.06em',
        color: DOC_MUTED,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: DOC_AMBER }} />
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#8C9CA4' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>{doc.label}</div>
        <div style={{ width: 24 }} />
      </div>

      {/* doc header */}
      <div style={{
        padding: '16px 26px 14px',
        background: DOC_PAPER,
        borderBottom: `1px solid ${DOC_BORDER}`,
        flexShrink: 0,
      }}>
        <div style={{
          fontFamily: DOC_SANS,
          fontSize: 23, fontWeight: 600,
          color: DOC_INK, letterSpacing: '-0.012em', lineHeight: 1.18,
        }}>
          {doc.title}
        </div>
        <div style={{
          fontFamily: DOC_MONO, fontSize: 11,
          letterSpacing: '0.13em', color: DOC_MUTED,
          marginTop: 6,
        }}>
          {doc.sub}
        </div>
      </div>

      {/* scrollable body */}
      <div ref={bodyRef} style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: DOC_PAPER,
      }}>
        <div ref={contentRef} style={{
          position: 'absolute', inset: 0,
          padding: '18px 26px 28px',
          transform: `translateY(${-scrollY}px)`,
          willChange: 'transform',
          color: DOC_INK,
          fontFamily: DOC_SANS,
          fontSize: 16,
          lineHeight: 1.55,
        }}>
          {doc.style === 'notes'        && <NotesBody doc={doc} />}
          {doc.style === 'standardwork' && <StandardWorkBody doc={doc} highlight={highlight} />}
          {doc.style === 'recovery'     && <RecoveryBody doc={doc} />}
        </div>

        {/* highlight overlay (in body-content coords, offset by scrollY) */}
        {highlight && highlight.progress > 0 && (
          <HighlightBox highlight={highlight} scrollY={scrollY} />
        )}

        {/* cursor */}
        {cursor && cursor.visible && (
          <CursorIndicator x={cursor.x} y={cursor.y - scrollY} pulse={cursor.pulse} />
        )}

        {/* scrollbar */}
        {maxScrollRef.current > 0 && (
          <Scrollbar scrollY={scrollY} maxScroll={maxScrollRef.current} />
        )}
      </div>
    </div>
  );
}

// ─── Body renderers ─────────────────────────────────────────────────────────
function NotesBody({ doc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{
        padding: '12px 14px',
        background: 'rgba(230, 135, 11, 0.08)',
        border: `1px dashed ${DOC_BORDER}`,
        borderRadius: 4,
        fontStyle: 'italic',
        fontSize: 15,
        color: DOC_MUTED,
        lineHeight: 1.5,
      }}>
        Personal notes from the team lead — captured via teach-back session, not a
        controlled SOP. Use alongside the official spec.
      </div>

      {doc.sections.map((sec, i) => (
        <div key={i}>
          <div style={{
            fontFamily: DOC_MONO, fontSize: 11.5,
            letterSpacing: '0.16em', color: DOC_AMBER, fontWeight: 600,
            marginBottom: 10, textTransform: 'uppercase',
          }}>
            ◆ {sec.heading}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sec.items.map((it, j) => {
              const isLst = it.startsWith('[') && it.endsWith(']');
              const isBullet = !isLst && it.startsWith('- ');
              const text = isLst ? it.slice(1, -1) : isBullet ? it.slice(2) : it;
              return isLst ? (
                <div key={j} style={{
                  padding: '5px 12px', fontSize: 16, lineHeight: 1.5,
                  background: 'rgba(230,135,11,0.07)',
                  borderLeft: `2px solid ${DOC_AMBER}`,
                  borderRadius: '0 4px 4px 0',
                }}>{text}</div>
              ) : isBullet ? (
                <div key={j} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  fontSize: 16, lineHeight: 1.5,
                }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: 3,
                    background: DOC_INK, marginTop: 10, flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>{text}</div>
                </div>
              ) : (
                <div key={j} style={{ fontSize: 16, lineHeight: 1.5 }}>{text}</div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function StandardWorkBody({ doc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {(doc.sections || []).map((sec, i) => (
        <div key={i}>
          <div style={{
            fontFamily: DOC_MONO, fontSize: 11.5,
            letterSpacing: '0.16em', color: DOC_AMBER, fontWeight: 600,
            marginBottom: 10, textTransform: 'uppercase',
          }}>
            ◆ {sec.heading}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sec.items.map((it, j) => {
              const isLst = it.startsWith('[') && it.endsWith(']');
              const isBullet = !isLst && it.startsWith('- ');
              const text = isLst ? it.slice(1, -1) : isBullet ? it.slice(2) : it;
              return isLst ? (
                <div key={j} style={{
                  padding: '5px 12px', fontSize: 16, lineHeight: 1.5,
                  background: 'rgba(230,135,11,0.07)',
                  borderLeft: `2px solid ${DOC_AMBER}`,
                  borderRadius: '0 4px 4px 0',
                }}>{text}</div>
              ) : isBullet ? (
                <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 16, lineHeight: 1.5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 3, background: DOC_INK, marginTop: 10, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>{text}</div>
                </div>
              ) : (
                <div key={j} style={{ fontSize: 16, lineHeight: 1.5 }}>{text}</div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecoveryBody({ doc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {doc.sections.map((sec, i) => (
        <div key={i} style={{
          padding: sec.highlight ? '12px 14px' : '4px 0',
          background: sec.highlight ? 'rgba(230, 135, 11, 0.08)' : 'transparent',
          border: sec.highlight ? `1px solid ${DOC_BORDER}` : '1px solid transparent',
          borderRadius: 4,
        }}>
          <div style={{
            fontFamily: DOC_MONO, fontSize: 11.5,
            letterSpacing: '0.16em', color: DOC_AMBER, fontWeight: 600,
            marginBottom: 8, textTransform: 'uppercase',
          }}>
            ▸ {sec.heading}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sec.items.map((it, j) => {
              const isLst = it.startsWith('[') && it.endsWith(']');
              const isBullet = !isLst && it.startsWith('- ');
              const text = isLst ? it.slice(1, -1) : isBullet ? it.slice(2) : it;
              return isLst ? (
                <div key={j} style={{
                  padding: '5px 12px', fontSize: 15.5, lineHeight: 1.5,
                  background: 'rgba(230,135,11,0.07)',
                  borderLeft: `2px solid ${DOC_AMBER}`,
                  borderRadius: '0 4px 4px 0',
                }}>{text}</div>
              ) : isBullet ? (
                <div key={j} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  fontSize: 15.5, lineHeight: 1.5,
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: 3,
                    background: DOC_MUTED, marginTop: 7, flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>{text}</div>
                </div>
              ) : (
                <div key={j} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  fontSize: 15.5, lineHeight: 1.5,
                }}>
                  <div style={{
                    width: 18, fontFamily: DOC_MONO, fontSize: 12,
                    color: DOC_MUTED, marginTop: 3, flexShrink: 0,
                  }}>
                    {j + 1}.
                  </div>
                  <div style={{ flex: 1 }}>{text}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Highlight overlay ─────────────────────────────────────────────────────
function HighlightBox({ highlight, scrollY }) {
  const { x, y, w, h, progress = 1 } = highlight;
  const drawY = y - scrollY;
  return (
    <div style={{
      position: 'absolute',
      left: x, top: drawY,
      width: w, height: h,
      border: `2px solid ${DOC_AMBER}`,
      borderRadius: 4,
      background: `rgba(230, 135, 11, ${0.14 * progress})`,
      boxShadow: `0 0 0 4px rgba(230, 135, 11, ${0.20 * progress})`,
      opacity: progress,
      pointerEvents: 'none',
    }} />
  );
}

// ─── Cursor (pulsing ring + dot, no fake arrow SVG) ────────────────────────
function CursorIndicator({ x, y, pulse = 0 }) {
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: 0, height: 0,
      pointerEvents: 'none',
      zIndex: 5,
    }}>
      <div style={{
        position: 'absolute',
        left: -18, top: -18,
        width: 36, height: 36,
        borderRadius: 18,
        border: `2px solid ${DOC_AMBER}`,
        opacity: 0.45 + 0.55 * pulse,
        transform: `scale(${0.65 + 0.45 * pulse})`,
      }} />
      <div style={{
        position: 'absolute',
        left: -6, top: -6,
        width: 12, height: 12,
        borderRadius: 6,
        background: DOC_AMBER,
        boxShadow: `0 0 14px ${DOC_AMBER}`,
      }} />
    </div>
  );
}

function Scrollbar({ scrollY, maxScroll }) {
  const trackHeight = 0.78; // fraction of body
  const thumbFrac = 0.36;
  const scrollPct = Math.min(1, Math.max(0, scrollY / maxScroll));
  return (
    <div style={{
      position: 'absolute',
      right: 7, top: '11%',
      width: 4, height: `${trackHeight * 100}%`,
      background: 'rgba(0, 33, 65, 0.07)',
      borderRadius: 2,
      pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        left: 0, width: '100%',
        top: `${scrollPct * (1 - thumbFrac) * 100}%`,
        height: `${thumbFrac * 100}%`,
        background: 'rgba(0, 33, 65, 0.32)',
        borderRadius: 2,
      }} />
    </div>
  );
}

Object.assign(window, {
  DOCS, DocPanel, HighlightBox, CursorIndicator,
});
