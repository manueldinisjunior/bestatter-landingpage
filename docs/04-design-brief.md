# 04 Design Brief

## Richtung und feste Grenzen

Ruhig, persönlich und übersichtlich; geeignet für Angehörige in einer belastenden Situation. Bestehendes Original-Logo unverändert nutzen. Den Namen „Bestatter“ für die Arbeitsprobe beibehalten. Illustrationen bleiben dekorativ und dürfen keine geografische Genauigkeit oder echte Kundenbelege vortäuschen.

## Farben und Typografie

| Element | Vorgabe / Ist-Stand |
|---|---|
| Markenakzent | `#00a98e` |
| Dunkelgrün | `#164d41` |
| Hintergrund | `#fafaf6` |
| Überschriften / Fließtext | Cormorant Garamond; Georgia als Ersatz |
| Navigation / Buttons / Abschnittslabels | Bebas Neue; sans-serif als Ersatz |
| Menülinks | 20 px, Großbuchstaben, kein zusätzlicher Buchstabenabstand |
| Gewünschter Bebas-Schriftgewicht | 300 im CSS; geladene Regular-Datei rendert weiterhin als 400 |
| H1 / H2 | 34–50 px / 28–36 px, abhängig von Fensterbreite |
| H3 | Überwiegend 20–24 px; einzelne Komponenten abweichend |
| Footerlinks / „Nach oben“ | Cormorant Garamond, 14 px |

Die Schrift des bildbasierten Logos lässt sich aus der PNG-Datei nicht verbindlich bestimmen. Bebas Neue ist eine visuelle Annäherung; keine exakte Übereinstimmung behaupten. Größen und Abstände sind in `src/styles.css` maßgeblich.

## Komponenten

- Header bleibt sticky. Nach Verlassen von Start erscheint die flächige Oberfläche mit durchgehender unterer Linie und 400-ms-Fade.
- Buttons zeigen eindeutige Aktionen; Icons bleiben konsistent. Der Zurück-nach-oben-Pfeil verwendet denselben hellgrünen Hover wie die Social-Buttons.
- Leistungs- und Bewertungskarten teilen dieselbe Karusselllogik. Keine sichtbaren Zahlen neben Bewertungssternen.
- Kontakt besteht aus Ansprache und Formular; Standort mit niedriger illustrativer Karte ist ein eigener Abschnitt.
- Formularhinweis: „Mit * markierte Felder sind Pflichtfelder.“
- Footerreihenfolge: Impressum → Datenschutz & Cookies → Bildnachweise → Kontakt.

## Responsive Verhalten

Desktop ab 721 px: Leistungen dreispaltig, Bewertungen zweispaltig. Bis 720 px: mobiles Menü, einspaltige Karten und Zusammenarbeit. Abschnitte 01–05 berücksichtigen die Bildschirmhöhe und den Header; bei längerem Inhalt dürfen sie wachsen. Inhalte nicht auf eine feste Höhe zuschneiden.

## Visuelle Abnahme

Offen: Originaldarstellung und Ersatzschrift bei fehlendem Font, Kontrast, Fokuszustände, lange deutsche Labels, mobile Tastatur, Zoom und schmale Displays. Kein visueller Browser-Pass wurde nachgewiesen. Bestehende `design-qa.md` enthält historische Beobachtungen und ist keine aktuelle Freigabe.
