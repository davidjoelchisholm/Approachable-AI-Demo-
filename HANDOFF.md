# Approachable AI Animation — Handoff Document

## What This Is

A self-contained browser animation used in sales demos. It shows a laptop screen where a local AI answers three manufacturing questions in sequence, each backed by a sliding knowledge-base document. No server, no API calls — everything runs client-side.

**Live URL:** `https://davidjoelchisholm.github.io/Approachable-AI-Demo-/`
**GitHub repo:** `https://github.com/davidjoelchisholm/Approachable-AI-Demo-`

---

## Two Directories — Know the Difference

| Directory | Purpose |
|---|---|
| `/home/fte/approachable-ai-demo/` | **Deploy repo** — this is the GitHub Pages source. Edit here to update the live site. |
| `/home/fte/Claude_Code/Animation_Apporachable-AI/cosmic-scale-animation/project/` | **Working source** — the original dev files. Keep in sync with the deploy repo manually. |

**Workflow to update the live site:**
1. Edit JSX/HTML in the working source directory
2. Copy changed files to `/home/fte/approachable-ai-demo/`
3. `cd /home/fte/approachable-ai-demo && git add -A && git commit -m "describe change" && git push`
4. GitHub Pages deploys automatically within ~60 seconds

---

## File Map

```
approachable-ai-demo/
├── index.html        Entry point. Loads React 18 + Babel Standalone from unpkg CDN,
│                     then loads the four JSX files as type="text/babel" scripts.
├── scene.jsx         The animation itself — all timing, layout, the laptop sprite,
│                     splash/boot/chat/outro screens, doc panel slide-in. ~1500 lines.
├── config.jsx        Pre-launch config UI (the ⚙ CONFIGURE screen), CONFIG_DEFAULTS
│                     object, JSON upload/download helpers. Reads/writes localStorage.
├── docs.jsx          Renders the sliding knowledge-base document panel on the right.
│                     Handles all three doc styles: notes, standardwork, recovery.
├── animations.jsx    Shared animation primitives (typewriter effect, fade, etc.)
│                     used by scene.jsx.
└── favicon.png       GrayMatter logo — shows in browser tab and bookmarks.
```

No build step. No npm. No bundler. Babel Standalone compiles JSX in the browser at load time.

---

## How the Animation Works

**Total duration: ~55 seconds** — plays once then loops.

| Time | What happens |
|---|---|
| 0–1s | Black screen |
| 1–2.5s | Laptop lid opens |
| 3–6.5s | Splash screen ("Your best operator, built into a laptop.") |
| 6.5–8s | Camera zooms in, chat UI appears |
| 8–22s | Scene 1: user types prompt → AI streams response → doc slides in from right |
| 22–36s | Scene 2: same structure |
| 36–50s | Scene 3: same structure (fault log format) |
| 50–55s | Outro card |

**Config is loaded from `localStorage` key `aai-config-v1`.** If nothing is stored, `CONFIG_DEFAULTS` in `config.jsx` provides the full default demo (Toyota automotive scenarios).

---

## Customising a Demo (the config JSON)

Every visible string, all three prompts, and all three knowledge-base documents are driven by a single JSON config object. Two ways to load a custom config:

### Option A — Upload via the UI
1. Open the animation, click **⚙ CONFIGURE** (bottom-right corner)
2. Scroll to the bottom → **Upload Config** → select a `.json` file
3. Animation reloads with the new config

### Option B — Edit localStorage directly
Open DevTools → Application → Local Storage → `aai-config-v1` → paste JSON value.

### Config schema

```json
{
  "splashCaption": "WHAT IS APPROACHABLE AI",
  "splashHeadlineLine1": "Your best operator,",
  "splashHeadlineLine2": "built into a laptop.",
  "bootSubtitle": "ON-DEMAND INTELLIGENCE · READY",
  "outroTag": "",
  "outroLine1": "FROM TRIBAL KNOWLEDGE TO INSTITUTIONAL INTELLIGENCE",
  "outroLine2": "",
  "logoSrc": "",
  "logoBgColor": "#002141",
  "showRing": true,
  "showInfoBars": true,
  "featureCards": [
    { "label": "01", "title": "AIR-GAPPED" },
    { "label": "02", "title": "TRIBAL KNOWLEDGE BASE" },
    { "label": "03", "title": "AVAILABLE 24 / 7 / 365" }
  ],
  "prompts": [ /* 3 items */ ],
  "docs":    [ /* 3 items */ ]
}
```

**`prompts[]` item:**
```json
{
  "tag": "REAL-TIME TROUBLESHOOTING",
  "user": "Why does this wrinkle keep showing up on Line 4?",
  "response": [
    { "kind": "p",   "text": "paragraph text — streams in character by character" },
    { "kind": "sp" },
    { "kind": "h",   "text": "SECTION HEADING" },
    { "kind": "li",  "text": "bullet item" },
    { "kind": "lst", "text": "amber highlight box — use once per response max" },
    { "kind": "log", "date": "MAY 12", "detail": "what happened", "fix": "how resolved" }
  ]
}
```

**`docs[]` item:**
```json
{
  "style": "notes",
  "label": "KNOWLEDGE-BASE ENTRY · TRIBAL",
  "title": "Document Title",
  "sub":   "AUTHOR NAME · ROLE · DATE",
  "sections": [
    {
      "heading": "Section Heading",
      "items": [
        "- bullet item",
        "[amber highlight box item]",
        "plain paragraph item"
      ]
    }
  ]
}
```

`style` values: `"notes"` (scene 1, informal), `"standardwork"` (scene 2, formal SOP), `"recovery"` (scene 3, diagnostic).

---

## Building a Customer-Specific Demo Config

There is a Claude skill and a standalone prompt that interview you and generate a ready-to-upload JSON config.

### Claude Code skill (if working in Claude Code)
```
/build-demo
```
Runs the interview in-session and writes `[company-name]-approachable-ai-demo.json` to disk.
Skill definition: `/home/fte/Claude_Code/.claude/commands/build-demo.md`

### Regular Claude (Claude.ai or any Claude conversation)
Paste the contents of:
```
/home/fte/Claude_Code/Animation_Apporachable-AI/cosmic-scale-animation/build-demo-prompt.md
```
…as Project Instructions in a Claude.ai Project, or at the start of any conversation. Claude will interview you and output the config JSON block.

---

## Running Locally

The animation requires files to be served over HTTP (Babel Standalone fetches JSX via XHR — `file://` won't work).

```bash
cd /home/fte/approachable-ai-demo
python3 -m http.server 8888
# open http://localhost:8888
```

Or use the VS Code Live Server extension on `index.html`.

---

## Key Design Decisions

- **No build step** — Babel Standalone in the browser means zero toolchain. Any editor, any machine, just open and serve.
- **Single JSON config** — all demo content is data, not code. A sales engineer can generate a new demo without touching JSX.
- **localStorage persistence** — config survives page reload without re-uploading. Cleared by clicking Reset in the configure screen.
- **GitHub Pages** — free, zero-config static hosting. Push to `main` → live in 60 seconds.
- **Separate deploy repo** — the deploy directory is its own git repo (not a subdirectory of the Claude_Code repo) to avoid nested-repo issues.

---

## Colour Palette (for any UI work)

| Name | Hex | Role |
|---|---|---|
| PAPER | `#EFEDE8` | Primary text / light surfaces |
| INK | `#002141` | Background / dark surfaces |
| AMBER | `#E6870B` | Highlights, headings, accent |
| MUTED | `#737984` | Secondary text |
| STEEL | `#8C9CA4` | Tertiary / borders |
| SAGE | `#365E95` | Status dots, gradient center |

Fonts: **Inter** (body) + **JetBrains Mono** (monospace labels). Both loaded from Google Fonts in `index.html`.
