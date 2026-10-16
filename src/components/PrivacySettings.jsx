import React, { useState } from "react";
import { legalNotices } from "../legalNotices";

export const privacyStorageKey = "bestatter:privacy-choice:v1";

function readChoice() {
  try {
    const value = JSON.parse(localStorage.getItem(privacyStorageKey));
    return value?.version === 1 &&
      ["accepted", "rejected", "custom"].includes(value.choice)
      ? value.choice
      : null;
  } catch {
    return null;
  }
}

export default function PrivacySettings({ onClose }) {
  const [expanded, setExpanded] = useState(false);
  const [choice] = useState(readChoice);
  const [storageError, setStorageError] = useState(false);

  function save(nextChoice) {
    try {
      localStorage.setItem(
        privacyStorageKey,
        JSON.stringify({
          version: 1,
          choice: nextChoice,
          savedAt: new Date().toISOString(),
        }),
      );
      onClose();
    } catch {
      setStorageError(true);
    }
  }

  return (
    <div className="privacy-settings">
      <p>
        Sie bestimmen Ihre Cookie-Einstellungen. Diese Arbeitsprobe verwendet
        derzeit keine Analyse- oder Marketing-Cookies.
      </p>
      <p className="privacy-summary">
        Ihre Auswahl wird nur in diesem Browser gespeichert. Sie können sie
        jederzeit über „Datenschutz &amp; Cookies“ ändern. Schließen ohne
        Auswahl ändert nichts.
      </p>
      {choice && (
        <p className="privacy-saved" role="status">
          Gespeicherte Auswahl:{" "}
          {
            {
              accepted: "Alle akzeptiert",
              rejected: "Alle abgelehnt",
              custom: "Nur notwendige Einstellungen",
            }[choice]
          }
          .
        </p>
      )}
      <div className="privacy-actions">
        <button
          type="button"
          className="button secondary"
          onClick={() => save("accepted")}
        >
          Alle akzeptieren
        </button>
        <button
          type="button"
          className="button secondary"
          aria-expanded={expanded}
          aria-controls="privacy-options"
          onClick={() => setExpanded((value) => !value)}
        >
          Konfigurieren
        </button>
        <button
          type="button"
          className="button secondary"
          onClick={() => save("rejected")}
        >
          Alle ablehnen
        </button>
      </div>
      <div id="privacy-options" hidden={!expanded}>
        <h3>Cookie-Einstellungen</h3>
        <div className="privacy-category">
          <div>
            <strong>Notwendige Einstellungen</strong>
            <p>Speichert Ihre Auswahl auf diesem Gerät. Keine Profilbildung.</p>
          </div>
          <span className="privacy-badge">Immer aktiv</span>
        </div>
        <div className="privacy-category">
          <div>
            <strong>Analyse</strong>
            <p>In dieser Arbeitsprobe nicht eingebunden.</p>
          </div>
          <span className="privacy-badge">Nicht verwendet</span>
        </div>
        <div className="privacy-category">
          <div>
            <strong>Marketing</strong>
            <p>In dieser Arbeitsprobe nicht eingebunden.</p>
          </div>
          <span className="privacy-badge">Nicht verwendet</span>
        </div>
        <p className="privacy-summary">
          Da keine optionalen Cookies vorhanden sind, bleiben Analyse und
          Marketing bei jeder Auswahl deaktiviert.
        </p>
        <button
          type="button"
          className="button secondary privacy-save"
          onClick={() => save("custom")}
        >
          Auswahl speichern
        </button>
      </div>
      {storageError && (
        <p className="privacy-error" role="alert">
          Ihre Auswahl konnte in diesem Browser nicht gespeichert werden.
          Optionale Cookies bleiben deaktiviert. Sie können dieses Fenster
          schließen und die Seite weiter nutzen.
        </p>
      )}
      <details className="privacy-details">
        <summary>Datenschutzhinweise lesen</summary>
        {legalNotices.privacy.content}
      </details>
    </div>
  );
}
