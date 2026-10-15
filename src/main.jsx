import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { config } from './config';
import './styles.css';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo eget magna fermentum iaculis. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const exampleNames = ['Anna Müller', 'Thomas Schmidt', 'Sabine Schneider', 'Michael Fischer'];
function Icon({ name, size = 20 }) {
  const paths = {
    arrow: 'M7 17 17 7M7 7h10v10',
    left: 'm14 6-6 6 6 6',
    right: 'm10 6 6 6-6 6',
    heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
    quote: 'M4 11h5v8H3v-7c0-5 2-7 6-7M15 11h5v8h-6v-7c0-5 2-7 6-7'
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow}/></svg>;
}
function Testimonials() {
  const root = useRef(null);
  const track = useRef(null);
  const firstSet = useRef(null);
  const position = useRef(0);
  const resumeAt = useRef(0);
  const drag = useRef(null);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  function paint() {
    const width = firstSet.current?.getBoundingClientRect().width || 0;
    if (!width || !track.current) return;
    position.current = ((position.current % width) + width) % width;
    track.current.style.transform = 'translate3d(-' + (width + position.current) + 'px,0,0)';
  }
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) resumeAt.current = performance.now() + 3000;
    }, { threshold: 0.35 });
    observer.observe(root.current);
    const resize = new ResizeObserver(() => paint());
    resize.observe(root.current);
    return () => { observer.disconnect(); resize.disconnect(); media.removeEventListener('change', update); };
  }, []);
  useEffect(() => {
    let frame;
    let last;
    function tick(now) {
      const delta = last === undefined ? 0 : Math.min(now - last, 50);
      last = now;
      if (visible && !paused && !reduced && !drag.current && !document.hidden && now >= resumeAt.current) {
        position.current += delta * 0.035;
        paint();
      }
      frame = requestAnimationFrame(tick);
    }
    if (visible && !paused && !reduced) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, paused, reduced]);
  function startDrag(event) {
    if (event.button !== 0 || !event.isPrimary) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveDrag(event) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    if (!current.moved && Math.abs(dx) < 5) return;
    current.moved = true;
    setDragging(true);
    position.current -= dx;
    current.x = event.clientX;
    paint();
  }
  function stopDrag(event) {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    resumeAt.current = performance.now() + 5000;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function step(direction) {
    const width = root.current.getBoundingClientRect().width;
    position.current += direction * (width > 720 ? (width + 24) / 2 : width + 24);
    paint();
    resumeAt.current = performance.now() + 5000;
  }
  return <div ref={root} className="testimonial-carousel continuous-carousel" role="region" aria-roledescription="Karussell" aria-label="Kundenstimmen – vier Beispiele"
    onFocusCapture={() => setPaused(true)}>
    <div className={'carousel-viewport' + (dragging ? ' is-dragging' : '')}
      onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag}>
      <div ref={track} className="continuous-track" aria-live="off">
        {[0,1,2].map(copy => <div className="testimonial-set" ref={copy === 0 ? firstSet : undefined} key={copy} aria-hidden={copy !== 1}>
          {exampleNames.map(name => <figure key={name}><span className="quote-mark"><Icon name="quote" size={32}/></span><blockquote>{lorem}</blockquote><figcaption>{name} <span>— Beispiel</span></figcaption></figure>)}
        </div>)}
      </div>
    </div>
    <div className="carousel-controls">
      <button type="button" onClick={() => step(-1)} aria-label="Vorherige Kundenstimme"><Icon name="left"/></button>
      <button type="button" onClick={() => step(1)} aria-label="Nächste Kundenstimme"><Icon name="right"/></button>
      {!reduced && <button type="button" className="carousel-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Automatischen Lauf starten' : 'Automatischen Lauf pausieren'}>{paused ? 'Abspielen' : 'Pause'}</button>}
    </div>
  </div>;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
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
  const CTA = ({ secondary = false }) => <button className={secondary ? 'button secondary' : 'button'} onClick={() => contact(secondary ? 'phone' : 'booking')}>{secondary ? 'Jetzt anrufen' : 'Termin vereinbaren'}<Icon name="arrow" size={18}/></button>;
  return <>
    <a className="skip" href="#main">Zum Inhalt</a>
    <header className={scrolled ? 'is-scrolled' : undefined}><a className="brand" href="#start" aria-label="AlsterCloud – Startseite"><img className="brand-logo" src="./AlsterCloud-Logo.png" alt="AlsterCloud" width="1000" height="841"/></a>
      <button className="menu" aria-label={menu ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>
        <svg className="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path className="menu-line-top" d="M4 7h16"/><path className="menu-line-middle" d="M4 12h16"/><path className="menu-line-bottom" d="M4 17h16"/>
        </svg>
      </button>
      <nav id="navigation" className={menu ? 'open' : ''} aria-label="Hauptnavigation">{[['ablauf','Ablauf'],['zusammenarbeit','Zusammenarbeit'],['kontakt','Kontakt']].map(([id, label]) => <a key={id} href={'#'+id} onClick={(event) => navigate(event, id)}>{label}</a>)}<CTA /></nav>
    </header>
    <main id="main">
      <section className="hero section" id="start"><div><p className="eyebrow">BESTATTUNG & VORSORGE</p><h1>In schweren Zeiten.<br/><span>An Ihrer Seite.</span></h1><p className="lead">{lorem}</p><div className="actions"><CTA/><CTA secondary/></div><p className="fine">Bestattung · Vorsorge · Persönliches Gespräch</p></div><div className="hero-art"><img src="./placeholder.svg" width="600" height="660" alt="" fetchPriority="high"/><div className="art-caption"><span><Icon name="heart" size={32}/></span><p>Raum für Abschied.<br/><strong>Zeit für Erinnerung.</strong></p></div></div></section>
      <div className="trust-strip" aria-label="Themen"><span>ABSCHIED</span><span>ERINNERUNG</span><span>BEGLEITUNG</span><span>VORSORGE</span></div>
      <section className="section process" id="ablauf"><div className="section-heading"><p className="eyebrow">01 / ABLAUF</p><h2>Den Abschied gestalten.<br/>Schritt für Schritt.</h2><p>{lorem}</p></div><div className="steps">{['Erstes Gespräch', 'Persönliche Wünsche', 'Abschied & Begleitung'].map((title, index) => <article key={title}><span className="number">0{index + 1}</span><h3>{title}</h3><p>{lorem}</p><span className="step-line"><Icon name="arrow" size={24}/></span></article>)}</div><div className="section-action"><CTA/></div></section>
      <section className="quotes section"><p className="eyebrow">02 / KUNDENSTIMMEN · PLATZHALTER</p><h2>Worte der Erinnerung und Verbundenheit.</h2><Testimonials/></section>
      <section className="section collaboration" id="zusammenarbeit"><div className="section-heading"><p className="eyebrow">03 / ZUSAMMENARBEIT</p><h2>Ein persönlicher Abschied.<br/><span>Ein bleibendes Andenken.</span></h2><p>{lorem}</p><CTA/></div><div className="features">{['Bestattungsarten', 'Trauerfeier & Erinnerung', 'Bestattungsvorsorge'].map((title, index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{lorem}</p></div></article>)}</div></section>
      <section className="contact section" id="kontakt"><p className="eyebrow">04 / KONTAKT</p><h2>Der erste Schritt:<br/>Ein persönliches Gespräch.</h2><p>{lorem}</p><div className="actions"><CTA/><CTA secondary/></div><p><a href={"tel:" + config.phone}>040 60 94 39 46</a></p><p><a href="mailto:mail@alstercloud.de">mail@alstercloud.de</a></p></section>
    </main>
    <footer><a className="brand" href="#start" aria-label="AlsterCloud – Startseite"><img className="brand-logo" src="./AlsterCloud-Logo.png" alt="AlsterCloud" width="1000" height="841" loading="lazy"/></a><p>AlsterCloud © 2026 Alle Rechte vorbehalten.</p><a href="#kontakt">Kontakt <Icon name="arrow" size={16}/></a></footer>
    <dialog ref={dialog} onClose={() => previousFocus.current?.focus()} aria-labelledby="notice-title"><h2 id="notice-title">Vorschau</h2><p>{notice}</p><form method="dialog"><button className="button">Schließen</button></form></dialog>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
