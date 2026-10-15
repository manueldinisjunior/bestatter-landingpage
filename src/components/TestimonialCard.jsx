import React from "react";
import { Star, StarHalf } from "@phosphor-icons/react";
import Icon from "./Icon";

function Rating({ value }) {
  return (
    <span
      className="testimonial-rating"
      role="img"
      aria-label={
        "Beispielbewertung: " +
        String(value).replace(".", ",") +
        " von 5 Sternen"
      }
    >
      <span className="rating-stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) =>
          value >= index + 1 ? (
            <Star key={index} size={18} weight="fill" />
          ) : value >= index + 0.5 ? (
            <StarHalf key={index} size={18} weight="fill" />
          ) : (
            <Star key={index} size={18} />
          ),
        )}
      </span>
    </span>
  );
}
export default function TestimonialCard({ item }) {
  return (
    <figure>
      <span className="quote-mark">
        <Icon name="quote" size={32} />
      </span>
      <blockquote>{item.text}</blockquote>
      <figcaption>
        <span className="testimonial-author">
          {item.name}
          <small>Beispiel</small>
        </span>
        <Rating value={item.rating} />
      </figcaption>
    </figure>
  );
}
