import React from "react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  UsersThree,
  ShieldCheck,
  Leaf,
  Heart,
  Handshake,
  CalendarBlank,
  Phone,
} from "@phosphor-icons/react";
import { config } from "./config";
import { lorem, services, testimonials } from "./content";
import Icon from "./components/Icon";
import CTA from "./components/CTA";
import ContentCarousel from "./components/ContentCarousel";
import TestimonialCard from "./components/TestimonialCard";
import ServiceCard from "./components/ServiceCard";
import ContactForm from "./components/ContactForm";
import LocationSection from "./components/LocationSection";
import SiteFooter from "./components/SiteFooter";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("start");
      const header = document.querySelector("header");
      if (!hero || !header) return;
      setScrolled(
        hero.getBoundingClientRect().bottom <=
          header.getBoundingClientRect().bottom,
      );
    };
    update();
    const header = document.querySelector("header");
    const measureHeader = () => {
      if (header)
        document.documentElement.style.setProperty(
          "--header-height",
          header.getBoundingClientRect().height + "px",
        );
    };
    measureHeader();
    const headerObserver = new ResizeObserver(measureHeader);
    if (header) headerObserver.observe(header);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      headerObserver.disconnect();
      document.documentElement.style.removeProperty("--header-height");
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const dialog = useRef(null);
  const previousFocus = useRef(null);

  const menuButton = useRef(null);
  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menu]);

  const scrollFrame = useRef(0);
  useEffect(() => {
    const cancel = () => cancelAnimationFrame(scrollFrame.current);
    const cancelOnKey = (event) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        cancel();
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancelOnKey);
    return () => {
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancelOnKey);
    };
  }, []);
  function navigate(event, id) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button > 0
    )
      return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    cancelAnimationFrame(scrollFrame.current);
    // Measure the collapsed header, not the expanded mobile navigation.
    flushSync(() => setMenu(false));
    const headerHeight = document
      .querySelector("header")
      .getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      "--header-height",
      headerHeight + "px",
    );
    scrollFrame.current = requestAnimationFrame(() => {
      const scroller = document.scrollingElement || document.documentElement;
      const start = scroller.scrollTop;
      const frameSection = ["kontakt", "zusammenarbeit", "leistungen"].includes(
        id,
      );
      const mobileCollaboration =
        id === "zusammenarbeit" &&
        window.matchMedia("(max-width: 720px)").matches;
      const offset =
        document.querySelector("header").getBoundingClientRect().height +
        (mobileCollaboration ? 40 : frameSection ? 0 : 24);
      const scrollAnchor = mobileCollaboration
        ? target.querySelector(".eyebrow") || target
        : id === "start" || frameSection
          ? target
          : target.querySelector(".eyebrow, h2") || target;
      const end = Math.max(
        0,
        Math.min(
          start + scrollAnchor.getBoundingClientRect().top - offset,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
      const distance = end - start;
      const duration = Math.min(1800, Math.max(1300, Math.abs(distance) * 0.65));
      let started;
      function finish() {
        if (window.location.hash !== "#" + id)
          window.history.pushState(null, "", "#" + id);
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
      function step(time) {
        started ??= time;
        const progress = duration
          ? Math.min((time - started) / duration, 1)
          : 1;
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        scroller.scrollTop = start + distance * eased;
        if (progress < 1) scrollFrame.current = requestAnimationFrame(step);
        else finish();
      }
      scrollFrame.current = requestAnimationFrame(step);
    });
  }

  function contact(type) {
    const target = type === "phone" ? config.phone : config.calendly;
    if (target) {
      if (type === "phone")
        window.location.href = "tel:" + target.replace(/[^+\d]/g, "");
      else if (/^https:\/\//.test(target))
        window.open(target, "_blank", "noopener,noreferrer");
      return;
    }
    previousFocus.current = document.activeElement;
    setNotice(
      type === "phone"
        ? "Die Telefonnummer wird für die finale Version ergänzt."
        : "Der Calendly-Link wird für die finale Version ergänzt.",
    );
    dialog.current.showModal();
  }
  function handleAnchorClick(event) {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || anchor.classList.contains("skip")) return;
    const id = anchor.getAttribute("href").slice(1);
    if (id) navigate(event, id);
  }
  return (
    <div onClickCapture={handleAnchorClick}>
      <a className="skip" href="#main">
        Zum Inhalt
      </a>
      <header className={scrolled ? "is-scrolled" : undefined}>
        <a className="brand" href="#start" aria-label="Startseite">
          <img
            className="brand-logo"
            src="./AlsterCloud-Logo.png"
            alt="AlsterCloud"
            width="1000"
            height="841"
          />
        </a>
        <button
          ref={menuButton}
          type="button"
          className="menu"
          aria-label={menu ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          <svg
            className="menu-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path className="menu-line-top" d="M4 7h16" />
            <path className="menu-line-middle" d="M4 12h16" />
            <path className="menu-line-bottom" d="M4 17h16" />
          </svg>
        </button>
        <nav
          id="navigation"
          className={menu ? "open" : ""}
          aria-label="Hauptnavigation"
        >
          {[
            ["ablauf", "Ablauf"],
            ["leistungen", "Leistungen"],
            ["zusammenarbeit", "Zusammenarbeit"],
            ["kontakt", "Kontakt"],
          ].map(([id, label]) => (
            <a key={id} href={"#" + id}>
              {label}
            </a>
          ))}
          <CTA />
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero section" id="start">
          <div>
            <p className="eyebrow">BESTATTUNG & VORSORGE</p>
            <h1>
              In schweren Zeiten.
              <br />
              <span>An Ihrer Seite.</span>
            </h1>
            <p className="lead">{lorem}</p>
            <div className="actions">
              <CTA />
              <CTA secondary onPhone={() => contact("phone")} />
            </div>
            <p className="fine">
              Bestattung · Vorsorge · Persönliches Gespräch
            </p>
          </div>
          <div className="hero-art">
            <img
              className="hero-angel"
              src="./hero-angel.webp"
              alt=""
              aria-hidden="true"
              width="480"
              height="320"
            />
            <img
              src="./placeholder.svg"
              width="600"
              height="660"
              alt=""
              fetchPriority="high"
            />
            <div className="art-caption">
              <span>
                <Heart size={32} aria-hidden="true" />
              </span>
              <p>
                Raum für Abschied.
                <br />
                <strong>Zeit für Erinnerung.</strong>
              </p>
            </div>
          </div>
        </section>
        <div className="trust-strip trust-benefits" aria-label="Unsere Werte">
          {[
            [UsersThree, "Persönlich für Sie da"],
            [ShieldCheck, "Vertrauensvoll & diskret"],
            [Leaf, "Individuelle Gestaltung"],
            [Heart, "Langjährige Erfahrung"],
          ].map(([BenefitIcon, label]) => (
            <span key={label}>
              <BenefitIcon size={28} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
        <section className="section process" id="ablauf">
          <div className="section-heading">
            <p className="eyebrow">01 / ABLAUF</p>
            <h2>
              Den Abschied gestalten.
              <br />
              Schritt für Schritt.
            </h2>
            <p>{lorem}</p>
          </div>
          <div className="steps">
            {[
              "Erstes Gespräch",
              "Persönliche Wünsche",
              "Abschied & Begleitung",
            ].map((title, index) => (
              <article key={title}>
                <span className="number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{lorem}</p>
                <span className="step-line">
                  <Icon name="arrow" size={24} />
                </span>
              </article>
            ))}
          </div>
          <div className="section-action">
            <CTA />
          </div>
        </section>
        <section
          className="section services-section"
          id="leistungen"
          aria-labelledby="services-title"
        >
          <p className="eyebrow">02 / LEISTUNGEN</p>
          <h2 id="services-title">Unsere Leistungen.</h2>
          <ContentCarousel
            items={services}
            renderCard={ServiceCard}
            desktopCount={3}
            label="Bestattungsleistungen"
            className="services-carousel"
          />
        </section>
        <section className="quotes section">
          <p className="eyebrow">03 / KUNDENSTIMMEN</p>
          <h2>Worte der Erinnerung und Verbundenheit.</h2>
          <ContentCarousel
            items={testimonials}
            renderCard={TestimonialCard}
            label="Kundenstimmen – sechs Beispiele"
          />
        </section>
        <section className="section collaboration" id="zusammenarbeit">
          <div className="section-heading">
            <p className="eyebrow">04 / ZUSAMMENARBEIT</p>
            <h2>
              Persönlich. Einfühlsam.
              <br />
              Für Sie da.
            </h2>
            <p>{lorem}</p>
            <CTA />
          </div>
          <div className="features">
            {[
              [Handshake, "Individuelle Begleitung"],
              [Heart, "Transparente Abläufe"],
              [UsersThree, "Langfristige Unterstützung"],
            ].map(([FeatureIcon, title]) => (
              <article key={title}>
                <FeatureIcon size={40} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{lorem}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="contact-cta"
          id="kontakt"
          aria-labelledby="contact-title"
        >
          <div className="section contact-cta-grid">
            <div className="contact-pitch">
              <p className="eyebrow">05 / KONTAKT</p>
              <h2 id="contact-title">
                Lassen Sie
                <br />
                uns sprechen.
              </h2>
              <p>{lorem}</p>
              <a className="contact-phone" href={"tel:" + config.phone}>
                <Phone size={32} aria-hidden="true" />
                <span>{config.phoneDisplay}</span>
              </a>
              <div className="actions">
                <button
                  type="button"
                  className="button calendly-button"
                  onClick={() => contact("booking")}
                >
                  <CalendarBlank size={24} aria-hidden="true" />
                  Termin über Calendly buchen
                </button>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
        <LocationSection />
      </main>
      <SiteFooter />
      <dialog
        ref={dialog}
        onClose={() => previousFocus.current?.focus()}
        aria-labelledby="notice-title"
      >
        <h2 id="notice-title">Vorschau</h2>
        <p>{notice}</p>
        <form method="dialog">
          <button className="button">Schließen</button>
        </form>
      </dialog>
    </div>
  );
}
