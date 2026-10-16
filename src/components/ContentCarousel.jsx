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
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
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
    if (hovered || focused || dragging) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden && !pointer.current) {
        nextDelay.current = 5000;
        setActive((index) => (index + 1) % pageCount);
      } else setRestart((value) => value + 1);
    }, nextDelay.current);
    return () => window.clearTimeout(timer);
  }, [visible, active, pageCount, restart, hovered, focused, dragging]);
  function go(direction) {
    nextDelay.current = 5000;
    setActive((index) => (index + direction + pageCount) % pageCount);
    setRestart((value) => value + 1);
  }
  function resetDrag() {
    pointer.current = null;
    setDragOffset(0);
    setDragging(false);
    setRestart((value) => value + 1);
  }
  function moveDrag(event) {
    const gesture = pointer.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const distance = event.clientX - gesture.x;
    const vertical = event.clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.max(Math.abs(distance), Math.abs(vertical)) < 6) return;
      if (Math.abs(vertical) > Math.abs(distance)) {
        resetDrag();
        return;
      }
      gesture.horizontal = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    const width = event.currentTarget.clientWidth || 320;
    // Resist at either end instead of exposing an empty track.
    const atEdge = (active === 0 && distance > 0) ||
      (active === pageCount - 1 && distance < 0);
    const offset = atEdge ? distance * 0.2 : distance;
    setDragOffset(Math.max(-width, Math.min(width, offset)));
  }
  function finishDrag(event) {
    const gesture = pointer.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const distance = event.clientX - gesture.x;
    const vertical = event.clientY - gesture.y;
    const width = event.currentTarget.clientWidth || 320;
    const elapsed = Math.max(1, performance.now() - gesture.time);
    const flick = Math.abs(distance) > 16 && Math.abs(distance) / elapsed > 0.5;
    resetDrag();
    if (Math.abs(distance) > Math.abs(vertical) &&
        (Math.abs(distance) > Math.min(80, width * 0.18) || flick)) {
      go(distance < 0 ? 1 : -1);
    }
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
        className={"carousel-viewport" + (dragging ? " is-dragging" : "")}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={(event) => {
          if (event.button !== 0 || !event.isPrimary || pointer.current) return;
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            time: performance.now(),
            horizontal: false,
          };
        }}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={resetDrag}
        onLostPointerCapture={() => {
          if (pointer.current) resetDrag();
        }}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(calc(-${active * 100}% + ${dragOffset}px))`,
            transition: dragging ? "none" : undefined,
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
