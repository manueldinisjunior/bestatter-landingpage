import React from "react";
import { useState } from "react";
import {
  ArrowUp,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { config } from "../config";

export default function SiteFooter() {
  const [notice, setNotice] = useState("");
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="brand footer-brand" href="#start" aria-label="Startseite">
          <img
            className="brand-logo"
            src="./AlsterCloud-Logo.png"
            alt="AlsterCloud"
            width="1000"
            height="841"
            loading="lazy"
          />
        </a>
        <div className="footer-social">
          <h3>Folgen Sie uns</h3>
          <div className="social-links">
            {[
              ["Facebook", FacebookLogo],
              ["Instagram", InstagramLogo],
              ["LinkedIn", LinkedinLogo],
            ].map(([label, SocialIcon]) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() =>
                  setNotice(
                    "Der " +
                      label +
                      "-Link wird für die finale Version ergänzt.",
                  )
                }
              >
                <SocialIcon size={23} weight="regular" aria-hidden="true" />
              </button>
            ))}
          </div>
          <p className="footer-status" role="status">
            {notice}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{config.name} © 2026 Alle Rechte vorbehalten.</p>
        <nav aria-label="Footer">
          <a href="#" onClick={(event) => event.preventDefault()}>
            Impressum
          </a>
          <a href="#" onClick={(event) => event.preventDefault()}>
            Datenschutz &amp; Cookies
          </a>
          <button
            type="button"
            className="footer-link"
            onClick={() =>
              setNotice(
                "Die Bilder dieser Arbeitsprobe wurden mit KI generiert.",
              )
            }
          >
            Bildnachweise
          </button>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <a className="back-to-top" href="#start" aria-label="Zur Startsektion">
          <ArrowUp size={20} aria-hidden="true" />
          <span>Nach oben</span>
        </a>
      </div>
    </footer>
  );
}
