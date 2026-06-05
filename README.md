# Boreal Codeforge — Documentation Site

Bilingual (EN/DE) docs for the Boreal Codeforge FiveM resources, built with
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and themed to
match the Tebex store (dark `#070707` + copper `#c9782b` + cream).

## Local preview

```bash
pip install -r requirements.txt
mkdocs serve
```

Open <http://127.0.0.1:8000>. The site rebuilds live as you edit Markdown.

## Project layout

```
boreal-docs/
├── mkdocs.yml                  # site config, nav, theme, EN/DE i18n
├── requirements.txt
├── docs/
│   ├── index.md                # English home
│   ├── getting-started.md      # English pages (default language)
│   ├── boreal-core.md
│   ├── boreal-payphone-robbery.md
│   ├── de/                     # German translations (same filenames)
│   │   ├── index.md
│   │   ├── getting-started.md
│   │   ├── boreal-core.md
│   │   └── boreal-payphone-robbery.md
│   ├── assets/                 # logo.png, favicon.png, banner.png  <-- ADD THESE
│   └── stylesheets/boreal.css  # Boreal theme
└── .github/workflows/deploy.yml  # auto-deploy to GitHub Pages on push
```

## Adding a new resource page

1. Create `docs/<resource>.md` (English) and `docs/de/<resource>.md` (German).
2. Add it to the `nav:` block in `mkdocs.yml` (and `nav_translations` for the DE label).
3. Commit & push — the GitHub Action rebuilds and deploys automatically.

---

## First-time setup (3 steps — only you can do these)

> Requires a GitHub account and Git installed locally.

**1. Add the brand assets**

Drop these three files into `docs/assets/` (exact filenames):

| File | What | Recommended |
|---|---|---|
| `logo.png` | header logo (round BCF emblem) | ~256×256, transparent PNG |
| `favicon.png` | browser tab icon | 64×64 PNG |
| `banner.png` | wide hero banner on the home page | the 2000×800 store banner |

**2. Create the GitHub repo and push**

```bash
cd boreal-docs
git init -b main
git add .
git commit -m "Initial docs site"
git remote add origin https://github.com/BorealCodeforge/boreal-docs.git
git push -u origin main
```

**3. Enable GitHub Pages**

In the repo: **Settings → Pages → Build and deployment → Source: "Deploy from a
branch" → Branch: `gh-pages` / root → Save.**

The first `git push` runs the Action, which builds the site and pushes it to the
`gh-pages` branch. Your docs go live at:

```
https://BorealCodeforge.github.io/boreal-docs/
```

Finally, update `site_url` in `mkdocs.yml` and the Discord links to your real URLs.
