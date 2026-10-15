# Bestatter Landingpage

Arbeitsprobe nach Brankos Briefing: React + Vite, PT Sans, Bebas Neue, #00a98e, Lorem Ipsum, responsive Onepager.

## Entwicklung

Node.js 22 oder neuer. `npm install`, dann `npm run dev`. Produktion: `npm run build`; lokale Vorschau: `npm run preview`.

## Konfiguration

In src/config.js Name, Telefon und Calendly-Link ergänzen. Solange Telefonnummer oder Calendly-Link fehlen, zeigen die zugehörigen Aktionen einen Hinweis statt ein falsches Ziel zu öffnen. Platzhaltergrafiken sind lokal und benötigen keine Bilddienste. Texte, Kundenstimmen und rechtliche Angaben sind Platzhalter; keine echten Bewertungen oder Leistungsversprechen.

## GitHub Pages

Settings → Pages → Build and deployment → Source: GitHub Actions. Der Workflow baut und veröffentlicht dist bei Änderungen auf main. Falls die erstmalige Veröffentlichung scheitert, zuerst Pages aktivieren und Workflow erneut starten. Vite base ist relativ, damit Assets unter /bestatter-landingpage/ funktionieren. Keine SPA-Routen nötig.

## Briefing und offene Punkte

Struktur angelehnt an https://umzug-anfragen.de/: Hero, drei Prozessschritte, Kundenstimmen-Platzhalter, Zusammenarbeit, Kontakt. Keine Formulare oder Datenbank, da die Zielaktionen Calendly und Telefon sind. Das AlsterCloud-Logo wurde laut Manuel nur als Beispiel geliefert; die Wortmarke BESTATTER ist vorläufig. Die hochgeladene Designinspiration war technisch nicht lesbar und wurde nicht nachgebildet. CMS-Bedarf und öffentliche Nutzung sind noch mit Branko abzuklären.

## Validierung

Kein lokaler Build oder Browsertest ausgeführt: Entwicklungsumgebung war beim Erstellen nicht verfügbar. GitHub Actions führt den Produktionsbuild aus. Vor Abgabe Desktop/Mobile, Tastatur, Dialog, Anker, Telefon und Calendly mit echten Konfigurationswerten prüfen.
