# 03 App Flow

## Hauptweg

Start → Ablauf verstehen → Leistungen ansehen → Beispielstimmen lesen → Zusammenarbeit kennenlernen → Kontakt aufnehmen. Standort und Footer folgen darunter. Alle Bereiche sind Teil derselben Seite.

## Aktionen und Folgezustände

| Aktion | Ergebnis | Sonderfall |
|---|---|---|
| Logo oder „Nach oben“ | Animierter Scroll zu `#start` | Manuelles Scrollen kann Animation abbrechen |
| Mobile Menüschaltfläche | Navigation öffnen oder schließen; `aria-expanded` aktualisieren | Geöffnete Navigation kann bei geringer Höhe scrollen |
| Menülink | Menü schließen, Höhe neu messen, zum gewählten Abschnitt scrollen, Fokus setzen und URL-Hash aktualisieren | Modifizierte Klicks behalten normales Linkverhalten |
| Zusammenarbeit mobil | „04 / ZUSAMMENARBEIT“ mit 40 px Abstand unter geschlossenem Header ausrichten | Reales Mobilgerät noch prüfen |
| „Termin vereinbaren“ | Zu `#kontakt` scrollen | Öffnet selbst kein Calendly |
| „Jetzt anrufen“ / Telefonnummer | `tel:` an konfigurierte Nummer | Ohne passende Telefon-App kann das Gerät nicht wählen |
| Karussellpfeil / Punkt / Wischen | Eine Position oder gewählte Ansicht anzeigen; Timer neu starten | Nach letzter Position zurück zur ersten |
| Automatischer Kartenwechsel | Nach sechs Sekunden bei Sichtbarkeit eine Position weiter | Bei verborgenem Tab oder aktivem Ziehen kein Fortschritt; kein Pause-Button |
| Formular unvollständig | Browser zeigt Validierungsfehler; keine E-Mail vorbereiten | Nachricht mindestens 10 Zeichen |
| Formular gültig | Anliegen und Nachricht an E-Mail-Programm übergeben; Hinweis „Bitte senden Sie sie dort ab“ | Kein Programm eingerichtet: keine zuverlässige Erkennung, kein bestätigter Versand |
| Calendly-Schaltfläche | Konfigurierte HTTPS-Buchungsseite in neuer Registerkarte | Aktuell leer: Hinweisdialog; Schließen führt Fokus zurück |
| „Route planen“ | Google Maps-Routenplanung nach Winterhuder Weg 31, 22085 Hamburg | Internet und externe Adressauflösung erforderlich |
| E-Mail im Standort | E-Mail-Programm an `mail@alstercloud.de` öffnen | Kein eingerichtetes Programm: Übergabe kann scheitern |
| Social-Schaltfläche | Hinweis, dass Profil-Link noch ergänzt wird | Keine echten Profile hinterlegt |
| Impressum / Datenschutz | Aktuell ohne Navigation | Vor echtem Einsatz durch vollständige Ziele ersetzen |
| Bildnachweise | Hinweis „Die Bilder dieser Arbeitsprobe wurden mit KI generiert.“ | Logo bleibt bereitgestelltes Asset |
| Kontakt im Footer | Animierter Scroll zu Kontakt | Wie übrige interne Links |

## Prüffälle vor Abnahme

1. Mobile Navigation von Start und aus dem Footer öffnen; Zusammenarbeit anklicken und Endposition vergleichen.
2. Jeden Termin-CTA prüfen; alle müssen zu Kontakt führen.
3. Formular mit leeren, ungültigen und gültigen Daten prüfen; niemals tatsächlichen Versand behaupten.
4. Karussells per Maus, Touch und Tastatur bedienen; Wechsel nach sechs Sekunden beobachten.
5. Dialog öffnen, mit Schaltfläche und Escape schließen; Fokus muss zurückkehren.
6. Google-Maps-Link auf korrektes Ziel und neue Registerkarte prüfen.

## Bekannte Lücken

Native Vor-/Zurück-Navigation über geänderte Hashes sowie direkte Hash-Aufrufe benötigen Browserprüfung. Reduzierte Bewegung deaktiviert die Karten-Transition, aktuell aber nicht deren automatischen Wechsel oder den eigenen Scroll-Animator. Das ist vor einer Barrierefreiheitsabnahme zu entscheiden und zu beheben.
