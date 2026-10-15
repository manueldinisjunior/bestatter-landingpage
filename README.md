# Bestatter Landingpage

Responsive Landingpage für ein Bestattungsunternehmen, erstellt als Arbeitsprobe nach dem Briefing von AlsterCloud. Besucher können Leistungen kennenlernen und Kontakt aufnehmen.

[Live-Demo](https://manueldinisjunior.github.io/bestatter-landingpage/)

## Technologien und ihre Aufgaben

| Technologie | Aufgabe im Projekt |
|---|---|
| HTML / JSX | Beschreibt den Aufbau der Seite: Überschriften, Abschnitte, Links und Formularfelder. JSX wird innerhalb der React-Komponenten verwendet. |
| React | Teilt die Oberfläche in wiederverwendbare Komponenten auf und verwaltet Zustände, etwa das geöffnete Menü oder die aktuelle Karussellansicht. |
| JavaScript | Steuert Interaktionen wie animiertes Scrollen, automatische Kartenwechsel und die Vorbereitung der Kontaktanfrage. |
| CSS | Gestaltet Farben, Schriften, Abstände, responsive Layouts, Hover-Effekte und Animationen. |
| Vite | Startet die lokale Entwicklungsumgebung und erstellt die optimierten Dateien für die Veröffentlichung. |
| Phosphor Icons | Liefert Symbole für Telefon, Kalender, Bewertungen und soziale Netzwerke. |
| Google Fonts | Lädt Cormorant Garamond für Überschriften und Fließtext sowie Bebas Neue für Navigation und Buttons. |
| Git | Hält Änderungen am Code nachvollziehbar fest und ermöglicht den Vergleich früherer Versionen. |
| GitHub | Speichert das Repository mit Quellcode und Dokumentation online. |
| GitHub Actions | Installiert nach Änderungen auf `main` die Abhängigkeiten, führt Tests aus, erstellt den Build und veröffentlicht die Seite. |
| GitHub Pages | Stellt die fertige Website im Internet bereit. |
| Node.js und npm | Führen die Entwicklungswerkzeuge aus und installieren Abhängigkeiten. Die Website selbst benötigt kein Node.js-Backend. |

## So funktioniert die Seite

Die Navigation führt mit animiertem Scrollen zu den Abschnitten. Leistungen und beispielhafte Kundenstimmen werden in Karussells angezeigt. Auf dem Desktop sind mehrere Karten sichtbar, auf dem Smartphone jeweils eine.

„Termin vereinbaren“ führt zum Kontaktbereich. Das Formular prüft die Pflichtfelder und bereitet über `mailto:` eine Nachricht im E-Mail-Programm vor. Besucher senden diese dort selbst ab. Es gibt keinen direkten Formularversand und keine Datenbank.

„Route planen“ öffnet Google Maps mit der angezeigten Adresse. Die Calendly-Schaltfläche ist für eine externe Terminbuchung vorbereitet; der Buchungslink ist noch nicht hinterlegt. Rechtliche Links und Social-Media-Ziele sind Platzhalter. Texte und Kundenstimmen dienen als Beispiele.

## Gestaltung

Ruhige Grüntöne mit der Markenfarbe `#00a98e`, das bereitgestellte AlsterCloud-Logo und eine responsive Darstellung für Desktop, Tablet und Smartphone.

## Lokal starten

Voraussetzung: Node.js 22 und npm.

```bash
npm install
npm run dev
```

| Befehl | Aufgabe |
|---|---|
| `npm run build` | Produktionsversion erstellen |
| `npm run preview` | Produktionsversion lokal ansehen |
| `npm test` | Rendering, interne Linkziele und Formularstruktur prüfen |

[Kurzer Projektüberblick](docs/projektbrief.md)

## Bildnachweise

Die Illustrationen wurden mit KI generiert. Das AlsterCloud-Logo wurde bereitgestellt.

## Lizenz

© 2026 AlsterCloud. Alle Rechte vorbehalten.

Eine Nutzung, Vervielfältigung oder Weitergabe ist nur mit Zustimmung der jeweiligen Rechteinhaber gestattet.

---

Entwickelt von [AlsterCloud](https://www.alstercloud.de/).
