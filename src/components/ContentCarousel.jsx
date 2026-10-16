import React from "react";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export default function ContentCarousel({
  items,
  renderCard: Card,
  desktopCount = 2,
  label,
  className = "",
}) {
  const root = useRef(null);
  const pointer = useRef(null);
  const nextDelay = useRef(4000);
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const [visible, setVisible] = useState(false);
  const [restart, setRestart] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const pageCount = items.length;
  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 721px)");
    const layout = () => {
      setDesktop(desktopMedia.matches);
      setActive(0);
    };
    layout();
    desktopMedia.addEventListener("change", layout);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(root.current);
    return () => {
      observer.disconnect();
      desktopMedia.removeEventListener("change", layout);
    };
  }, []);
  useEffect(() => {
    if (!visible) {
      nextDelay.current = 4000;
      return;
    }
    if (hovered || focused) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden && !pointer.current) {
        nextDelay.current = 5000;
        setActive((index) => (index + 1) % pageCount);
      } else setRestart((value) => value + 1);
    }, nextDelay.current);
    return () => window.clearTimeout(timer);
  }, [visible, active, pageCount, restart, hovered, focused]);
  function go(direction) {
    nextDelay.current = 5000;
    setActive((index) => (index + direction + pageCount) % pageCount);
    setRestart((value) => value + 1);
  }
  function finishDrag(event) {
    if (!pointer.current || pointer.current.id !== event.pointerId) return;
    const distance = event.clientX - pointer.current.x;
    pointer.current = null;
    if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1);
    else setRestart((value) => value + 1);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return (
    <div
      ref={root}
      className={"testimonial-carousel paged-carousel " + className}
      role="region"
      aria-roledescription="Karussell"
      aria-label={label}
      onFocusCapture={(event) => {
        // Keyboard focus pauses reading; mouse clicks must not stop rotation.
        setFocused(event.target.matches(":focus-visible"));
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
          return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          go(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div
        className="carousel-viewport"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={(event) => {
          if (event.button !== 0 || !event.isPrimary) return;
          pointer.current = { id: event.pointerId, x: event.clientX };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={finishDrag}
        onPointerCancel={() => {
          pointer.current = null;
          setRestart((value) => value + 1);
        }}
        onLostPointerCapture={() => {
          pointer.current = null;
        }}
      >
        <div
          className="carousel-track"
          style={{
            transform: "translateX(-" + active * 100 + "%)",
          }}
          aria-live="off"
        >
          {Array.from({ length: pageCount }, (_, page) => (
            <div
              className="carousel-slide"
              key={page}
              aria-hidden={page !== active}
              inert={page !== active}
              role="group"
              aria-label={page + 1 + " von " + pageCount}
            >
              <div
                className="testimonial-pair"
                style={{ "--carousel-columns": desktopCount }}
              >
                {Array.from(
                  { length: desktop ? desktopCount : 1 },
                  (_, offset) => {
                    const index = (page + offset) % pageCount;
                    return <Card key={index} item={items[index]} />;
                  },
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={label + ": Zurück"}
        >
          <Icon name="left" />
        </button>
        <div className="carousel-dots">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={"Ansicht " + (index + 1)}
              aria-current={index === active ? "true" : undefined}
              onClick={() => {
                nextDelay.current = 5000;
                setActive(index);
                setRestart((value) => value + 1);
              }}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={label + ": Weiter"}
        >
          <Icon name="right" />
        </button>
      </div>
    </div>
  );
}
