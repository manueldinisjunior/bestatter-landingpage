# Bestatter Landingpage

Responsive Onepager für ein Bestattungsunternehmen. Die Seite wurde als Arbeitsprobe nach dem Briefing von AlsterCloud umgesetzt.

[Live-Demo](https://manueldinisjunior.github.io/bestatter-landingpage/)

## Überblick

Die Seite stellt Leistungen, Ablauf und Kontaktmöglichkeiten vor. Die Gestaltung verwendet die Markenfarbe `#00a98e`, das bereitgestellte AlsterCloud-Logo sowie PT Sans und Bebas Neue.

Der Aufbau folgt einer klaren Reihenfolge: Start, Ablauf, Leistungen, Kundenstimmen, Zusammenarbeit, Kontakt und Standort.

## Funktionen

- Sticky Navigation mit animiertem Scrollen zu den Abschnitten
- Leistungs- und Kundenstimmen-Karussells mit automatischem Wechsel, Pfeilen und Wischgesten
- Kontaktformular mit Leistungsauswahl und Pflichtfeldprüfung
- Telefon- und E-Mail-Links sowie Google-Maps-Routenplanung
- Vorbereitete Calendly-Anbindung und Zurück-nach-oben-Funktion
- Responsive Layouts und Unterstützung für reduzierte Bewegung

## Technische Umsetzung

| Technologie | Einsatz |
|---|---|
| React und JSX | Seitenstruktur, wiederverwendbare Komponenten und Zustände für Menü und Karussells |
| JavaScript | Navigation, Kartenwechsel und Vorbereitung der Kontaktanfrage |
| CSS | Layout, Typografie, responsive Darstellung und Animationen |
| Vite | Lokaler Entwicklungsserver und optimierter Produktionsbuild |
| Phosphor Icons | Symbole für Aktionen, Leistungen und Bewertungen |
| Google Fonts | Bereitstellung von PT Sans und Bebas Neue |
| Git und GitHub | Versionsverwaltung und Quellcode-Repository |
| GitHub Actions und Pages | Automatische Tests, Build und Veröffentlichung |
| Node.js und npm | Ausführung der Entwicklungswerkzeuge und Installation der Abhängigkeiten |

Die Anwendung ist als statisches Frontend ohne Backend und Datenbank aufgebaut. Komponenten, Inhalte und Kontaktangaben sind getrennt organisiert.

## Entwicklung

Voraussetzungen: Node.js 22 und npm.

```bash
npm install
npm run dev
```

| Befehl | Beschreibung |
|---|---|
| `npm test` | Rendering, interne Linkziele und Formularstruktur prüfen |
| `npm run build` | Produktionsbuild erstellen |
| `npm run preview` | Produktionsbuild lokal ansehen |

Änderungen auf `main` werden über GitHub Actions geprüft, gebaut und auf GitHub Pages veröffentlicht.

## Stand der Arbeitsprobe

Das Kontaktformular bereitet eine E-Mail im lokalen E-Mail-Programm vor. Der Versand erfolgt dort durch den Besucher. Der Calendly-Link ist noch nicht konfiguriert. Impressum und Datenschutz sind als Beispieltexte in Popups umgesetzt. Cookie-Einstellungen lassen sich lokal speichern; Analyse und Marketing sind nicht eingebunden. Social-Media-Ziele sind Platzhalter. Texte und Kundenstimmen sind Beispiele.

[Projektüberblick](docs/projektbrief.md)

## Bildnachweise

Die Illustrationen wurden mit KI generiert. Das AlsterCloud-Logo wurde bereitgestellt.

## Lizenz

Für dieses Repository wurde keine Open-Source-Lizenz vergeben. Das bereitgestellte AlsterCloud-Logo bleibt Eigentum des jeweiligen Rechteinhabers.

Eine Nutzung, Vervielfältigung oder Weitergabe ist nur mit Zustimmung der jeweiligen Rechteinhaber gestattet.

---

Entwickelt von [Manuel Dinis Júnior](https://manueldinisjunior.de/) als Arbeitsprobe für AlsterCloud.
