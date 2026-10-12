# Portfolio v4 (Vite + React)

```sh
npm install && npm run dev   # npm run build → dist/
```

- Site copy (cases, career log, stats, links, `LORE` toggle): `src/content.ts`
- Side projects ("Builds"): `src/data/github-config.json`

## Adding a GitHub project

Push the repo, then add an entry keyed by the repo name:

```json
"my-repo": { "visible": true, "oneLiner": "What it is in one line." }
```

`visible` is the show/hide flag. Everything else is optional copy; anything missing falls back to GitHub
(description, homepage/repo URL, language, created year). Available fields: `name`, `oneLiner`, `text`,
`glyph`, `theme` (`accent` | `green` | `gold`), `status`, `period`, `link`, `cta`, `flow` + `flowHighlight`,
`metrics`, `stack`, `log` + `logSub` (career timeline line), and `lore` + `sections` (adds a "read case →" modal).
Entries appear in config order. Each visible build is also added to the career timeline.
