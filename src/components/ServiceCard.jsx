import React from "react";
export default function ServiceCard({ item, cardId, held = false }) {
  const ServiceIcon = item.Icon;
  return (
    <article className={"service-card" + (held ? " is-held" : "")} data-carousel-card={cardId}>
      <ServiceIcon size={44} aria-hidden="true" />
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}
