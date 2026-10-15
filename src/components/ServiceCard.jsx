import React from "react";
export default function ServiceCard({ item }) {
  const ServiceIcon = item.Icon;
  return (
    <article className="service-card">
      <ServiceIcon size={44} aria-hidden="true" />
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}
