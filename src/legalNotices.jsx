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
  privacy: {
    title: "Datenschutz & Cookies",
    content: (
      <>
        <p className="dialog-note">
          Beispieltext für diese Arbeitsprobe; keine vollständige
          Datenschutzerklärung.
        </p>
        <h3>Kontaktanfragen</h3>
        <p>
          Das Formular bereitet Ihre Angaben und Nachricht in Ihrem
          E-Mail-Programm vor. Sie entscheiden dort, ob Sie die Nachricht
          absenden. Die Anwendung speichert Ihre Eingaben nicht in einer eigenen
          Datenbank.
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
          Marketing-Cookies ein. Bei externen Diensten gelten die dortigen
          Datenschutzhinweise.
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
          die Landschaftsillustration, der dekorative Engel und die illustrative
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
