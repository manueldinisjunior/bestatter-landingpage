# 06 Implementierungsplan und Abnahme

Stand: 16.10.2026. Die Website existiert bereits. Dieser Plan trennt vorhandene Umsetzung, offene Prüfung und spätere Erweiterungen. Er behauptet keine rückwirkende Freigabe.

| Phase | Ergebnis | Abnahmebedingung | Stand |
|---|---|---|---|
| 1 Anforderungen | Produktumfang und technische Basis dokumentiert | Dokumente 01–02 vom Projektverantwortlichen geprüft | Entwurf erstellt; Bestätigung offen |
| 2 Wege und Design | Klickverhalten, Branding, Typografie und responsive Regeln festgehalten | Dokumente 03–04 geprüft; bekannte Abweichungen ausdrücklich akzeptiert oder beauftragt | Entwurf erstellt; visuelle Prüfung offen |
| 3 Daten | Formularfelder, E-Mail-Übergabe und externe Dienste erfasst | Betreiber bestätigt Empfänger, Zugriff und Aufbewahrung; zukünftige Versandlösung separat entschieden | Dokument 05 erstellt; Betreiberangaben offen |
| 4 Bestehende Oberfläche | Sechs Inhaltsabschnitte, Karussells, Kontakt und Footer | Desktop und mobile Hauptwege funktionieren ohne abgeschnittene Inhalte | Code vorhanden; Browserabnahme offen |
| 5 Integrationen und Inhalte | Calendly, Profile, Rechtsseiten und finale Inhalte | Reale Ziele bestätigt; keine versehentlich aktiven Platzhalter | Teilweise offen; Maps-Link vorhanden |
| 6 Abschluss | Prüfung und dokumentierte Übergabe | Build, Browserprüfungen und Projektfreigabe abgeschlossen | Nicht abgeschlossen |

## Nächste Arbeitspakete in Reihenfolge

1. Browserprüfung ermöglichen und die bereits implementierten Hauptwege nach Dokument 03 prüfen. Mobile Zusammenarbeit, Kontakt und Leistungen mit den Referenzen vergleichen.
2. Entscheidungen zu Bewegungsreduktion und fehlender Unterbrechbarkeit der Karussells treffen; notwendige Bedienbarkeit umsetzen. Frühere Vorgabe „kein Pause-Button“ bei der Lösung berücksichtigen.
3. Kontaktangaben und Calendly-Ziel bestätigen; Social-Ziele und rechtliche Texte liefern lassen.
4. Direkten Formularversand nur bei erweitertem Auftrag implementieren; Datenregeln davor festlegen.
5. Auf kleinen und großen Displays prüfen: Navigation, Formularfehler, lange Inhalte, Touch, Fokus, Zoom und fehlende externe Dienste.
6. Build und abschließende Prüfung dokumentieren; historische QA-Aussagen bei neuer Prüfung ersetzen.

## Prüfmatrix

| Bereich | Methode | Erforderlicher Nachweis |
|---|---|---|
| Produktion | `npm run build` | Erfolgreicher Build des jeweiligen Code-Stands |
| Hauptwege | Desktopbrowser und mobiles Gerät | Klickziele, Scroll-Endpositionen und sichtbare Inhalte |
| Karussells | Warten, Pfeile, Punkte, Wischen | Sechs-Sekunden-Wechsel, eine Position, passende Kartenanzahl |
| Formular | Ungültige und gültige Beispieldaten | Validierung, vorbereitete E-Mail, ehrlicher Status |
| Zugänglichkeit | Tastatur, Zoom, reduzierte Bewegung | Erreichbare Aktionen, sichtbarer Fokus, nutzbare Inhalte |
| Externe Ziele | Kontrollierter Klick | Adresse, Telefonnummer und Buchungsziel stimmen |
| Veröffentlichung | GitHub-Actions-Lauf und Live-Seite | Deployment erfolgreich; veröffentlichte Version geprüft |

## Änderungen und Freigaben

Neue Funktionen zuerst im Produktdokument ergänzen; technische und Datenfolgen in den zugehörigen Dokumenten aktualisieren. Freigaben mit Datum und Entscheidung erfassen, nicht voraussetzen. Bereits ausdrücklich beauftragte Änderungen brauchen keine erneute Routinebestätigung. Neue Infrastruktur oder zusätzliche Datenverarbeitung separat entscheiden.
