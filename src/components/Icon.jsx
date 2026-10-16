import React from "react";
export default function Icon({ name, size = 20 }) {
  const paths = {
    arrow: "M7 17 17 7M7 7h10v10",
    left: "m14 6-6 6 6 6",
    right: "m10 6 6 6-6 6",
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
