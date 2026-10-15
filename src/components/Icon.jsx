import React from "react";
export default function Icon({ name, size = 20 }) {
  const paths = {
    arrow: "M7 17 17 7M7 7h10v10",
    left: "m14 6-6 6 6 6",
    right: "m10 6 6 6-6 6",
    heart:
      "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
    quote: "M4 11h5v8H3v-7c0-5 2-7 6-7M15 11h5v8h-6v-7c0-5 2-7 6-7",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
