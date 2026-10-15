import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { config } from './config';
import './styles.css';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo eget magna fermentum iaculis. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

function Testimonials() {
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const pageCount = desktop ? 2 : 4;
  useEffect(() => {
    const media = window.matchMedia('(min-width: 721px)');
    const update = () => { setDesktop(media.matches); setActive(0); };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [ready, setReady] = useState(false);
  const startedRotation = useRef(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    const timer = window.setTimeout(() => setReady(true), 3000);
    return () => { window.clearTimeout(timer); media.removeEventListener('change', update); };
  }, []);
  const running = ready && !paused && !hovered && !focused && !reduced;
  useEffect(() => {
    if (!running) return;
    // Show the first change after the initial three-second introduction.
    if (!startedRotation.current) {
      setActive(index => (index + 1) % pageCount);
      startedRotation.current = true;
    }
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % pageCount);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [running, pageCount]);
  return <div className="testimonial-carousel" role="region" aria-roledescription="Karussell" aria-label="Kundenstimmen – vier Platzhalter"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="carousel-viewport">
      <div className="carousel-track" style={{ transform: 'translateX(-' + active * 100 + '%)' }} aria-live="off">
        {Array.from({ length: pageCount }, (_, page) => <div className="carousel-slide" key={page} role="group" aria-roledescription="Folie" aria-label={(page + 1) + ' von ' + pageCount} aria-hidden={page !== active}>
          <div className="testimonial-pair">{Array.from({ length: desktop ? 2 : 1 }, (_, position) => {
            const number = page * (desktop ? 2 : 1) + position + 1;
            return <figure key={number}><span className="quote-mark" aria-hidden="true">“</span><blockquote>{lorem}</blockquote><figcaption>Lorem Ipsum {number} <span>— Platzhalter</span></figcaption></figure>;
          })}</div>
        </div>)}
      </div>
    </div>
    <div className="carousel-controls">
      <button type="button" onClick={() => { setPaused(true); setActive(index => (index + pageCount - 1) % pageCount); }} aria-label="Vorherige Kundenstimme">←</button>
      <div className="carousel-dots">{Array.from({ length: pageCount }, (_, index) => <button type="button" key={index} aria-label={'Kundenstimme ' + (index + 1)} aria-current={active === index ? 'true' : undefined} onClick={() => { setPaused(true); setActive(index); }}><span/></button>)}</div>
      <button type="button" onClick={() => { setPaused(true); setActive(index => (index + 1) % pageCount); }} aria-label="Nächste Kundenstimme">→</button>
      {!reduced && <button type="button" className="carousel-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Automatischen Wechsel starten' : 'Automatischen Wechsel pausieren'}>{paused ? 'Abspielen' : 'Pause'}</button>}
      <span className="carousel-count" role="status" aria-live={running ? 'off' : 'polite'}>{active + 1} / {pageCount}</span>
    </div>
  </div>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState('');
  const dialog = useRef(null);
  const previousFocus = useRef(null);

  const scrollFrame = useRef(0);
  useEffect(() => {
    const cancel = () => cancelAnimationFrame(scrollFrame.current);
    const cancelOnKey = (event) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancel();
    };
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('keydown', cancelOnKey);
    return () => {
      cancel();
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancelOnKey);
    };
  }, []);
  function navigate(event, id) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    cancelAnimationFrame(scrollFrame.current);
    setMenu(false);
    scrollFrame.current = requestAnimationFrame(() => {
      const start = window.scrollY;
      const offset = document.querySelector('header').getBoundingClientRect().height + 24;
      const end = Math.max(0, Math.min(start + target.getBoundingClientRect().top - offset,
        document.documentElement.scrollHeight - window.innerHeight));
      const distance = end - start;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = reduced ? 0 : Math.min(1600, Math.max(1100, Math.abs(distance) * 0.65));
      let started;
      function finish() {
        if (window.location.hash !== '#' + id) window.history.pushState(null, '', '#' + id);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
      function step(time) {
        started ??= time;
        const progress = duration ? Math.min((time - started) / duration, 1) : 1;
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
        if (progress < 1) scrollFrame.current = requestAnimationFrame(step);
        else finish();
      }
      scrollFrame.current = requestAnimationFrame(step);
    });
  }

  function contact(type) {
    const target = type === 'phone' ? config.phone : config.calendly;
    if (target) {
      if (type === 'phone') window.location.href = 'tel:' + target.replace(/[^+\d]/g, '');
      else if (/^https:\/\//.test(target)) window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }
    previousFocus.current = document.activeElement;
    setNotice(type === 'phone' ? 'Die Telefonnummer wird für die finale Version ergänzt.' : 'Der Calendly-Link wird für die finale Version ergänzt.');
    dialog.current.showModal();
  }
  const CTA = ({ secondary = false }) => <button className={secondary ? 'button secondary' : 'button'} onClick={() => contact(secondary ? 'phone' : 'booking')}>{secondary ? 'Jetzt anrufen ↗' : 'Termin vereinbaren ↗'}</button>;
  return <>
    <a className="skip" href="#main">Zum Inhalt</a>
    <header><a className="brand" href="#start" aria-label="AlsterCloud – Startseite"><img className="brand-logo" src="./AlsterCloud-Logo.png" alt="AlsterCloud" width="1000" height="841"/></a>
      <button className="menu" aria-label={menu ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>
        <svg className="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path className="menu-line-top" d="M4 7h16"/><path className="menu-line-middle" d="M4 12h16"/><path className="menu-line-bottom" d="M4 17h16"/>
        </svg>
      </button>
      <nav id="navigation" className={menu ? 'open' : ''} aria-label="Hauptnavigation">{[['ablauf','Ablauf'],['zusammenarbeit','Zusammenarbeit'],['kontakt','Kontakt']].map(([id, label]) => <a key={id} href={'#'+id} onClick={(event) => navigate(event, id)}>{label}</a>)}<CTA /></nav>
    </header>
    <main id="main">
      <section className="hero section" id="start"><div><p className="eyebrow">BESTATTUNG & VORSORGE</p><h1>In schweren Zeiten.<br/><span>An Ihrer Seite.</span></h1><p className="lead">{lorem}</p><div className="actions"><CTA/><CTA secondary/></div><p className="fine">Bestattung · Vorsorge · Persönliches Gespräch</p></div><div className="hero-art"><img src="./placeholder.svg" width="600" height="660" alt="" fetchPriority="high"/><div className="art-caption"><span aria-hidden="true">✳</span><p>Raum für Abschied.<br/><strong>Zeit für Erinnerung.</strong></p></div></div></section>
      <div className="trust-strip" aria-label="Themen"><span>ABSCHIED</span><span>ERINNERUNG</span><span>BEGLEITUNG</span><span>VORSORGE</span></div>
      <section className="section process" id="ablauf"><div className="section-heading"><p className="eyebrow">01 / ABLAUF</p><h2>Den Abschied gestalten.<br/>Schritt für Schritt.</h2><p>{lorem}</p></div><div className="steps">{['Erstes Gespräch', 'Persönliche Wünsche', 'Abschied & Begleitung'].map((title, index) => <article key={title}><span className="number">0{index + 1}</span><h3>{title}</h3><p>{lorem}</p><span className="step-line" aria-hidden="true">↗</span></article>)}</div><div className="section-action"><CTA/></div></section>
      <section className="quotes section"><p className="eyebrow">02 / KUNDENSTIMMEN · PLATZHALTER</p><h2>Worte der Erinnerung und Verbundenheit.</h2><Testimonials/></section>
      <section className="section collaboration" id="zusammenarbeit"><div className="section-heading"><p className="eyebrow">03 / ZUSAMMENARBEIT</p><h2>Ein persönlicher Abschied.<br/><span>Ein bleibendes Andenken.</span></h2><p>{lorem}</p><CTA/></div><div className="features">{['Bestattungsarten', 'Trauerfeier & Erinnerung', 'Bestattungsvorsorge'].map((title, index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{lorem}</p></div></article>)}</div></section>
      <section className="contact section" id="kontakt"><p className="eyebrow">04 / KONTAKT</p><h2>Der erste Schritt:<br/>Ein persönliches Gespräch.</h2><p>{lorem}</p><div className="actions"><CTA/><CTA secondary/></div><p><a href={"tel:" + config.phone}>040 60 94 39 46</a></p><p><a href="mailto:mail@alstercloud.de">mail@alstercloud.de</a></p></section>
    </main>
    <footer><a className="brand" href="#start" aria-label="AlsterCloud – Startseite"><img className="brand-logo" src="./AlsterCloud-Logo.png" alt="AlsterCloud" width="1000" height="841" loading="lazy"/></a><p>AlsterCloud © 2026 Alle Rechte vorbehalten.</p><a href="#kontakt">Kontakt ↑</a></footer>
    <dialog ref={dialog} onClose={() => previousFocus.current?.focus()} aria-labelledby="notice-title"><h2 id="notice-title">Vorschau</h2><p>{notice}</p><form method="dialog"><button className="button">Schließen</button></form></dialog>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
