import React from "react";

export const legalNotices = {
  imprint: {
    title: "Impressum",
    content: (
      <>
        <p className="dialog-note">
          Beispieltext für diese Arbeitsprobe. Die folgenden Unternehmensangaben
          sind fiktiv.
        </p>
        <h3>Angaben zum Anbieter</h3>
        <p>
          Bestatter Musterunternehmen
          <br />
          Musterstraße 1<br />
          12345 Musterstadt
        </p>
        <h3>Kontakt</h3>
        <p>
          Telefon: 01234 567890
          <br />
          E-Mail: kontakt@beispiel.de
        </p>
        <h3>Verantwortlich für die Inhalte</h3>
        <p>Max Mustermann, Anschrift wie oben.</p>
        <p>
          Für eine echte Veröffentlichung werden diese Musterangaben durch die
          vollständigen Angaben des Betreibers ersetzt.
        </p>
      </>
    ),
  },
  contactPrivacy: {
    title: "Datenschutz bei Kontaktanfragen",
    content: (
      <>
        <p className="dialog-note">
          Beispieltext für diese Arbeitsprobe; keine vollständige
          Datenschutzerklärung.
        </p>
        <h3>Welche Angaben werden verwendet?</h3>
        <p>
          Das Formular verwendet Ihren Namen, Ihre E-Mail-Adresse, Ihr Anliegen
          und Ihre Nachricht. Eine Telefonnummer können Sie freiwillig angeben.
          Diese Angaben dienen dazu, Ihre Anfrage zu beantworten und Sie auf
          dem gewünschten Weg zu kontaktieren.
        </p>
        <h3>Wie wird Ihre Anfrage versendet?</h3>
        <p>
          Das Formular bereitet eine E-Mail mit Ihren Angaben in Ihrem eigenen
          E-Mail-Programm vor. Erst wenn Sie die Nachricht dort absenden,
          wird sie an den angegebenen Kontakt übermittelt. Die Anwendung
          speichert Ihre Eingaben nicht in einer eigenen Datenbank.
        </p>
        <h3>Nach dem Versand</h3>
        <p>
          Die versendete Nachricht wird über die beteiligten E-Mail-Anbieter
          verarbeitet und kann im Postfach des Empfängers gespeichert werden.
          Für die Bearbeitung und Aufbewahrung der Anfrage ist der Empfänger
          verantwortlich.
        </p>
        <p>
          Vor einer echten Veröffentlichung werden die Angaben zum
          Verantwortlichen, zur Speicherdauer und zu Ihren Datenschutzrechten
          ergänzt.
        </p>
      </>
    ),
  },
  privacy: {
    title: "Datenschutz & Cookies",
    content: (
      <>
        <p className="dialog-note">
          Beispieltext für diese Arbeitsprobe; keine vollständige
          Datenschutzerklärung.
        </p>
        <h3>Beim Besuch dieser Website</h3>
        <p>
          Diese Hinweise betreffen die Nutzung der Website und Ihre
          Privatsphäre beim Surfen. Die Seite wird über GitHub Pages
          bereitgestellt. Dabei können technische Verbindungsdaten wie Ihre
          IP-Adresse beim Hosting-Anbieter verarbeitet werden.
        </p>
        <h3>Externe Dienste</h3>
        <p>
          Schriften werden über Google Fonts geladen. „Route planen“ öffnet
          Google Maps. Eine spätere Terminbuchung über Calendly führt zu einem
          externen Anbieter.
        </p>
        <h3>Cookies</h3>
        <p>
          Die Arbeitsprobe bindet im Anwendungscode keine Analyse- oder
          Marketing-Cookies ein. Ihre Cookie-Auswahl wird lokal in diesem
          Browser gespeichert und kann jederzeit geändert werden. Bei externen
          Diensten gelten die dortigen Datenschutzhinweise.
        </p>
        <p>
          Vor einer echten Veröffentlichung werden Angaben zum Verantwortlichen,
          zum Hosting, zur Verarbeitung und zu Ihren Rechten ergänzt.
        </p>
      </>
    ),
  },
  credits: {
    title: "Bildnachweise",
    content: (
      <>
        <h3>Illustrationen</h3>
        <p>
          Die Bilder dieser Arbeitsprobe wurden mit KI generiert. Dazu gehören
          die Kapellenillustration im Startbereich, der dekorative Engel und die illustrative
          Standortkarte.
        </p>
        <h3>Logo</h3>
        <p>Das AlsterCloud-Logo wurde für diese Arbeitsprobe bereitgestellt.</p>
        <h3>Symbole</h3>
        <p>
          Die Bibliotheksicons stammen aus Phosphor Icons. Die Standortkarte
          dient der Gestaltung und ersetzt keine genaue Wegbeschreibung. Nutzen
          Sie dafür „Route planen“.
        </p>
      </>
    ),
  },
};
