import React from "react";
import Icon from "./Icon";

export default function CTA({ secondary = false, onPhone }) {
  return secondary ? (
    <button type="button" className="button secondary" onClick={onPhone}>
      Jetzt anrufen
      <Icon name="arrow" size={18} />
    </button>
  ) : (
    <a className="button" href="#kontakt">
      Termin vereinbaren
      <Icon name="arrow" size={18} />
    </a>
  );
}
