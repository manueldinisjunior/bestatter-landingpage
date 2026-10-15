# 05 Datenschema und Datenfluss

## Entscheidung: aktuell keine Datenbank

Die Anwendung führt keine Kundentabelle und besitzt keine Anmeldung oder serverseitige Speicherung. Für diese statische Arbeitsprobe ist kein Datenbankschema erforderlich. Dieses Dokument hält stattdessen fest, welche Eingaben verarbeitet werden und wohin sie gelangen.

## Formularschema

| Feld | Pflicht | Prüfung im Browser | Verwendung |
|---|---|---|---|
| `name` | Ja | Maximal 100 Zeichen | E-Mail-Text |
| `email` | Ja | Typ E-Mail; maximal 200 Zeichen | E-Mail-Text |
| `phone` | Nein | Typ Telefon; maximal 40 Zeichen | E-Mail-Text |
| `service` | Ja | Auswahl aus sechs Leistungen | Betreff und E-Mail-Text |
| `message` | Ja | 10–4000 Zeichen | E-Mail-Text |
| Datenschutz-Checkbox | Ja | Muss aktiviert sein | Browservalidierung; wird nicht als Nachweis gespeichert |

Leistungswerte: Erdbestattung, Feuerbestattung, Seebestattung, Bestattungsvorsorge, Trauerfeier und Allgemeine Beratung.

## Lebenszyklus und Zugriff

1. Eingaben stehen zunächst in Formularfeldern im Browser; die Anwendung schreibt sie nicht in Local Storage, Session Storage oder eine Datenbank.
2. Nach erfolgreicher Browservalidierung erstellt JavaScript eine `mailto:`-URL mit Betreff und Nachricht.
3. Das Betriebssystem bzw. E-Mail-Programm erhält die Angaben. Die App bestätigt nur die Vorbereitung.
4. Erst der Nutzer sendet die Nachricht im E-Mail-Programm. Dessen Entwürfe und gesendete Nachrichten unterliegen den dortigen Einstellungen.
5. Empfänger ist aktuell `mail@alstercloud.de`. Wer Zugriff auf dieses Postfach hat und wann Nachrichten gelöscht werden, ist im Projekt nicht dokumentiert und muss vom Betreiber bestätigt werden.

Die App kann die weitere Speicherung im E-Mail-Programm oder beim Empfänger nicht steuern. Freitext kann sensible Angaben enthalten; keine echten Kundendaten für Tests verwenden.

## Weitere Datenflüsse

- Google Fonts: Browser lädt externe Schriftdateien; Angaben dazu gehören in die spätere Datenschutzerklärung. Selbsthosting ist noch nicht umgesetzt.
- Google Maps: Routenlink übergibt die Geschäftsadresse. Ein möglicher Startort wird anschließend von Google bzw. dem Nutzer bestimmt.
- Calendly: Aktuell kein Link. Bei Aktivierung verarbeitet der externe Anbieter Buchungsdaten; Zuständigkeiten vorher klären.
- Hosting: GitHub Pages liefert öffentliche Dateien aus. Infrastrukturprotokolle des Anbieters sind von der fehlenden App-Datenbank zu unterscheiden.
- Beispielbewertungen und Services sind öffentliche statische Inhalte, keine Kundenakten.

## Vor direktem Formularversand festlegen

Separater Erweiterungsumfang: Servervalidierung, sicherer Versand, Spam-Schutz, Zugriffsrollen, Aufbewahrung/Löschung, Fehler- und Wiederholungsverhalten sowie Betreiberzuständigkeit. Falls Speicherung nötig wird, erst dann Tabellen und Berechtigungen definieren. Keine fiktiven Tabellen als bereits implementiert darstellen.
