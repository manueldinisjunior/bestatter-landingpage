# 02 Technische Anforderungen

## Bestehende Architektur

Statische React-Anwendung in JavaScript/JSX, gebaut mit Vite. CSS steuert Layout, Typografie und responsive Zustände. Phosphor liefert die Bibliotheksicons. Es gibt keinen Anwendungsserver und keine Datenbank.

| Bestandteil | Festgelegter Stand | Quelle |
|---|---|---|
| React / React DOM | 19.1.1 | `package.json` |
| Vite | ^7.1.7 | `package.json` |
| Phosphor React | ^2.1.10 | `package.json` |
| Build-Laufzeit | Node.js 22 und npm | Pages-Workflow |
| Hosting | GitHub Pages | `.github/workflows/pages.yml` |
| Veröffentlichung | Push auf `main` → Build → Pages-Deployment | GitHub Actions |
| Vite-Basis | Relative Asset-URLs, `base: './'` | `vite.config.js` |

## Dateien und Zuständigkeiten

- `src/main.jsx`: Seitenstruktur, Navigation, gemeinsames Karussell, Formular, Standort und Footer.
- `src/styles.css`: Farben, Schriften, Breakpoints und Animationen.
- `src/config.js`: Name, Telefonnummer und Calendly-Adresse. Weitere Kontaktangaben stehen noch direkt in JSX.
- `public/`: bereitgestelltes Logo und illustrative Assets.

## Externe Verbindungen

Google Fonts lädt Cormorant Garamond und Bebas Neue. `tel:` öffnet die Telefonfunktion; `mailto:` übergibt Formulardaten an das E-Mail-Programm. Google Maps erhält die Zieladresse erst beim Routenlink. Calendly wird bei konfigurierter HTTPS-Adresse als externe Seite geöffnet, nicht eingebettet. Ein Live-Map-Embed und Analyse-Tracker sind im aktuellen Anwendungscode nicht eingebunden.

## Anforderungen für Änderungen

- Architektur und Branding beibehalten; kein Framework- oder Hostingwechsel ohne ausdrücklichen Auftrag.
- Keine Schlüssel, Zugangsdaten oder personenbezogenen Testdaten in Browsercode oder Repository.
- Externe Links mit neuer Registerkarte verwenden `noopener noreferrer`.
- Kontaktvalidierung bleibt aktiv; kein falscher Erfolgsstatus beim vorbereiteten E-Mail-Versand.
- Inhalte auf kleinen Displays ohne horizontales Abschneiden und mit bedienbaren Steuerelementen darstellen.
- Produktionsbuild mit `npm run build` prüfen. Ein erfolgreicher Build ersetzt keinen Browsertest.

## Ausführung

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Bekannte technische Grenzen

Bebas Neue wird nur als Regular geladen. `font-weight: 300` ist der gewünschte CSS-Wert, erzeugt mit dieser Datei jedoch keinen echten 300-Schnitt. Ein direkter Formularversand und eine Datenbank sind nicht vorhanden. Der Lockfile- und CI-Installationsablauf ist vor weiteren Infrastrukturänderungen separat zu prüfen.
