import React from "react";
import { useState } from "react";
import { config } from "../config";
import { services } from "../content";
import Icon from "./Icon";

const funeralServices = services.map((service) => service.title);
export default function ContactForm({ onOpenPrivacy }) {
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get("name")}\nE-Mail: ${data.get("email")}\nTelefon: ${data.get("phone") || "–"}\nAnliegen: ${data.get("service")}\n\n${data.get("message")}`;
    window.location.href = `mailto:${config.email}?subject=${encodeURIComponent("Kontaktanfrage – " + data.get("service"))}&body=${encodeURIComponent(body)}`;
    setStatus(
      "Die Nachricht wurde für Ihr E-Mail-Programm vorbereitet. Bitte senden Sie sie dort ab.",
    );
  }
  return (
    <form
      className="contact-form"
      aria-labelledby="form-title"
      aria-describedby="form-note"
      onSubmit={submit}
    >
      <h3 id="form-title">Schreiben Sie uns</h3>
      <div className="form-grid">
        <label>
          Ihr Name <span aria-hidden="true">*</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Max Mustermann"
            required
            maxLength={100}
          />
        </label>
        <label>
          Ihre E-Mail-Adresse <span aria-hidden="true">*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="max@beispiel.de"
            required
            maxLength={200}
          />
        </label>
        <label>
          Telefonnummer <span className="optional">(optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="040 123 45 67"
            maxLength={40}
          />
        </label>
        <label>
          Wobei dürfen wir Sie unterstützen? <span aria-hidden="true">*</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>
              Bitte wählen
            </option>
            {funeralServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <label className="full-field">
          Ihre Nachricht <span aria-hidden="true">*</span>
          <textarea
            name="message"
            required
            rows={4}
            minLength={10}
            maxLength={4000}
            placeholder="Ihre Nachricht an uns …"
          />
        </label>
      </div>
      <div className="privacy-check">
        <input
          id="privacy-ack"
          type="checkbox"
          required
          aria-labelledby="privacy-ack-label"
        />
        <span id="privacy-ack-label">
          <label htmlFor="privacy-ack">Ich habe die </label>
          <button
            type="button"
            className="footer-link"
            aria-haspopup="dialog"
            onClick={(event) => {
              event.preventDefault();
              onOpenPrivacy();
            }}
          >
            Datenschutzerklärung
          </button>
          <label htmlFor="privacy-ack"> gelesen.</label>
        </span>
      </div>
      <button type="submit" className="button">
        Nachricht senden <Icon name="arrow" size={18} />
      </button>
      <p className="form-note" id="form-note">
        Mit * markierte Felder sind Pflichtfelder.
      </p>
      <p className="form-status" role="status">
        {status}
      </p>
    </form>
  );
}
