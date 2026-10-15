import React from "react";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  NavigationArrow,
} from "@phosphor-icons/react";
import { config, routeUrl } from "../config";

export default function LocationSection() {
  return (
    <section
      className="location-section section"
      id="standort"
      aria-labelledby="location-title"
    >
      <p className="eyebrow">06 / STANDORT</p>
      <h2 id="location-title">Hier finden Sie uns</h2>
      <div className="location-grid">
        <div className="location-map">
          <img
            className="location-map-image"
            src="./bestatter-map.webp"
            alt="Illustrative Standortkarte"
            width="1774"
            height="887"
            loading="lazy"
          />
        </div>
        <div className="location-details">
          <h3>{config.name}</h3>
          <address>
            <div>
              <MapPin size={24} aria-hidden="true" />
              <span>
                {config.address.street}
                <br />
                {config.address.city}
              </span>
            </div>
            <a href={"tel:" + config.phone}>
              <Phone size={24} aria-hidden="true" />
              {config.phoneDisplay}
            </a>
            <a href={"mailto:" + config.email}>
              <EnvelopeSimple size={24} aria-hidden="true" />
              {config.email}
            </a>
          </address>
          <a
            className="button secondary"
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Route planen
            <NavigationArrow size={20} aria-hidden="true" style={{ transform: "rotate(90deg)" }} />
          </a>
        </div>
      </div>
    </section>
  );
}
