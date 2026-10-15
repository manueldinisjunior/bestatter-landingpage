# 01 Produktanforderungen

Stand: 16.10.2026. Arbeitsgrundlage aus dem aktuellen Code und den Projektentscheidungen; keine zusätzliche Kundenfreigabe behauptet.

## Ziel und Zielgruppe

Die Arbeitsprobe zeigt einen ruhigen, responsiven Onepager für ein Bestattungsunternehmen. Angehörige und Menschen mit Interesse an Vorsorge sollen Leistungen verstehen und Kontakt aufnehmen können. Die Hauptaktion ist „Termin vereinbaren“ und führt zur Kontaktsektion.

## Umfang und Abnahme

| ID | Funktion | Abnahmekriterium | Stand |
|---|---|---|---|
| P01 | Navigation | Ablauf, Leistungen, Zusammenarbeit und Kontakt per animiertem Scrollen erreichbar; mobiles Menü schließt vor der Zielberechnung | Implementiert; visuelle Abnahme offen |
| P02 | Seitenaufbau | Start → 01 Ablauf → 02 Leistungen → 03 Kundenstimmen → 04 Zusammenarbeit → 05 Kontakt → 06 Standort → Footer | Implementiert |
| P03 | Leistungen | Erdbestattung, Feuerbestattung, Seebestattung, Bestattungsvorsorge, Trauerfeier und Allgemeine Beratung sichtbar | Implementiert |
| P04 | Karussells | Leistungen: drei Karten am Desktop, eine mobil; Kundenstimmen: zwei bzw. eine; Fortschritt um eine Karte alle sechs Sekunden bei Sichtbarkeit; Pfeile, Punkte und Wischen | Implementiert; Interaktionen im Browser prüfen |
| P05 | Bewertungen | Beispielstimmen mit 4, 4,5 oder 5 Sternen; passende volle, halbe und leere Sterne; keine sichtbare Bewertungszahl | Implementiert; als Beispiele gekennzeichnet |
| P06 | Kontaktformular | Pflichtfelder Name, E-Mail, Anliegen, Nachricht und Checkbox; Telefonnummer optional; ungültige Eingaben verhindern Versandvorbereitung | Implementiert mit Browservalidierung |
| P07 | Nachricht | Gültige Eingaben erzeugen eine vorbereitete E-Mail; Status erklärt den nötigen Versand im E-Mail-Programm | Implementiert; kein direkter Formularversand |
| P08 | Termin | Alle „Termin vereinbaren“-Links führen zu Kontakt; Calendly-Schaltfläche öffnet bei hinterlegter HTTPS-Adresse die Buchung | Link fehlt; aktuell Hinweisdialog |
| P09 | Standort | Angezeigte Adresse und Google-Maps-Ziel stimmen überein; Route öffnet in neuer Registerkarte | Implementiert; externe Auflösung prüfen |
| P10 | Footer | Original-Logo, soziale Aktionen, Impressum, Datenschutz & Cookies, Bildnachweise, Kontakt und animiertes „Nach oben“ | Teilweise Platzhalter |

## Grenzen

Kein CMS, Nutzerkonto, Zahlungsprozess, Backend oder Kundendatenbestand. Texte und Kundenstimmen sind Beispiele; die Karte ist illustrativ. Der Original-Logo bleibt erhalten. Eine echte Unternehmensseite benötigt bestätigte Inhalte, erreichbare Kontaktziele und rechtliche Texte.

## Offene Entscheidungen

- Calendly-Adresse und Social-Media-Profile bereitstellen.
- E-Mail-Empfänger, Telefonnummer und Geschäftsadresse vor echtem Einsatz bestätigen.
- Direkten Formularversand nur mit gesonderter technischer und organisatorischer Entscheidung ergänzen.
- Produktionsinhalte und rechtliche Seiten liefern; keine Texte oder Freigaben erfinden.
