# 조선철도기록보관소 · Archive of DPRK Railways

A scholarly-archival website documenting the locomotives, lines, stations, and
Korean-language vocabulary of rail transport in the Democratic People's
Republic of Korea. Bilingual (English / 한글) throughout.

**Content note:** the material is illustrative and research-style, not
authoritative historical record. Swap in verified sources and real imagery
before citing.

---

## Hosting on GitHub Pages (recommended)

1. Create a new GitHub repo and upload every file in this folder.
2. Go to **Settings → Pages**.
3. Under *Source*, select branch `main` and folder `/ (root)`. Save.
4. Wait ~60 seconds. Your site will be live at
   `https://<your-username>.github.io/<repo-name>/`

That's it — `index.html` loads by default, and all the `.jsx`/`.css` files
sit alongside it.

### Alternative: single-file version

`standalone.html` is a fully self-contained bundle (everything inlined, works
offline). Upload just that one file if you prefer — rename it to `index.html`
in the repo.

---

## File map

| File | Purpose |
|---|---|
| `index.html` | Entry point — loads fonts, React, and the app |
| `styles.css` | All visual styling (paper/dark/blueprint themes) |
| `data.jsx` | Locomotive, line, station, and glossary data |
| `chrome.jsx` | Admin bar, masthead, nav, sidebar, footer |
| `pages.jsx` | Home, Roster, Lines/Map, Stations, Article, Glossary |
| `tweaks-panel.jsx` | In-page Tweaks UI helpers |
| `standalone.html` | Single-file bundled version |

## Editing content

All locomotive / line / station / glossary entries live as plain JS arrays at
the top of `data.jsx`. Add, edit, or remove entries there and refresh the
page — no build step required.

## Local development

Just open `index.html` in a browser, or serve the folder with any static
server (e.g. `python -m http.server`).

## License

Project content and code: CC-BY 4.0 unless otherwise noted. Fonts loaded from
Google Fonts under their respective licenses.
