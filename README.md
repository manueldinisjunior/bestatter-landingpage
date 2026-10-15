# Bestatter Landingpage

Responsive Onepager für ein Bestattungsunternehmen, erstellt als Arbeitsprobe nach dem Briefing von AlsterCloud. Ziel ist die Kontaktaufnahme per Telefon, Terminanfrage oder Nachricht.

[Live-Demo](https://manueldinisjunior.github.io/bestatter-landingpage/)

## Designanforderungen

- Corporate Color: `#00a98e`
- Schriftarten: PT Sans und Bebas Neue gemäß Briefing
- Bereitgestelltes AlsterCloud-Logo
- Ruhige Gestaltung mit klarer Struktur und großzügigen Abständen
- Responsive Darstellung für Desktop, Tablet und Smartphone
- Lorem Ipsum für längere Texte und beispielhafte Kundenstimmen

## Funktionen

- Sticky Navigation mit animiertem Scrollen
- Testimonials mit automatischem Wechsel, Pfeilen und Wischgesten
- Kontaktformular mit Auswahl typischer Bestattungsleistungen
- Terminbuchung über Calendly vorgesehen
- Telefon- und E-Mail-Kontakt
- Illustrative Standortkarte und Zurück-nach-oben-Button

Über das Kontaktformular sollen Besucher Dienstleistungen anfragen oder weitere Informationen erhalten können. Dazu wählen sie ein Anliegen aus und geben ihre Kontaktdaten sowie eine Nachricht ein.

Der Button „Termin vereinbaren“ ist für die Terminbuchung über Calendly vorgesehen. Besucher sollen dort einen freien Termin für ein persönliches Gespräch auswählen und buchen können.

In dieser Arbeitsprobe wird die Nachricht zum Versand im E-Mail-Programm vorbereitet. Eine direkte Übermittlung über das Formular ist noch nicht eingerichtet.

Telefon und Calendly-Link werden in `src/config.js` konfiguriert. Der Calendly-Link ist derzeit noch nicht hinterlegt. Rechtliche Links und Routenplanung sind Platzhalter; Kundenstimmen sind Beispiele.

## Tech Stack

- React – Komponenten und Interaktionen
- Vite – Entwicklung und Produktionsbuild
- CSS – Layout, responsive Darstellung und Animationen
- Phosphor Icons – Icons
- GitHub Actions und GitHub Pages – Build und Hosting

## Lokal starten

Voraussetzung: Node.js 22 und npm.

```bash
npm install
npm run dev
```

Produktionsbuild und lokale Vorschau:

```bash
npm run build
npm run preview
```

Änderungen auf `main` werden über GitHub Actions für GitHub Pages gebaut und veröffentlicht.

## Bildnachweise

Die KI-generierten Illustrationen ergänzen das bereitgestellte AlsterCloud-Logo.

## Lizenz

© 2026 AlsterCloud. Alle Rechte vorbehalten.

Eine Nutzung, Vervielfältigung oder Weitergabe ist nur mit Zustimmung der jeweiligen Rechteinhaber gestattet. Verwendete Open-Source-Abhängigkeiten unterliegen ihren eigenen Lizenzen.

---

Entwickelt von AlsterCloud.
