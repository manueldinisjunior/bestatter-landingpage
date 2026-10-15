import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { config } from './config';
import './styles.css';
import { Phone, EnvelopeSimple, MapPin, NavigationArrow, ArrowUp, FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo eget magna fermentum iaculis. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const exampleNames = ['Anna Müller', 'Thomas Schmidt', 'Sabine Schneider', 'Michael Fischer', 'Claudia Weber', 'Andreas Hoffmann'];
const exampleTexts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante, etiam sit amet orci eget eros.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Pellentesque auctor neque nec urna, aenean viverra rhoncus pede.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  "Curabitur ullamcorper ultricies nisi. Nam eget dui, etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
  "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum, aenean imperdiet.",
  "Integer tincidunt. Cras dapibus, vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet."
];
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
  const pointer = useRef(null);
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [restart, setRestart] = useState(0);
  const pageCount = exampleNames.length;
  const displayedIndexes = Array.from({ length: desktop ? 2 : 1 }, (_, offset) => (active + offset) % pageCount);
  const wordCount = displayedIndexes.reduce((total, index) => total + exampleTexts[index].split(/\s+/).length, 0);
  const readingDelay = Math.max(6000, Math.ceil(wordCount / 180 * 60000) + 1500);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 721px)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const layout = () => { setDesktop(desktopMedia.matches); setActive(0); };
    const motion = () => setReduced(motionMedia.matches);
    layout(); motion();
    desktopMedia.addEventListener('change', layout);
    motionMedia.addEventListener('change', motion);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(root.current);
    return () => {
      observer.disconnect();
      desktopMedia.removeEventListener('change', layout);
      motionMedia.removeEventListener('change', motion);
    };
  }, []);
  useEffect(() => {
    if (!visible || paused) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden && !pointer.current) setActive(index => (index + 1) % pageCount);
      else setRestart(value => value + 1);
    }, Math.max(readingDelay, restart ? 5000 : 4000));
    return () => window.clearTimeout(timer);
  }, [visible, paused, active, pageCount, restart, readingDelay]);
  function go(direction) {
    setActive(index => (index + direction + pageCount) % pageCount);
    setRestart(value => value + 1);
  }
  function finishDrag(event) {
    if (!pointer.current || pointer.current.id !== event.pointerId) return;
    const distance = event.clientX - pointer.current.x;
    pointer.current = null;
    if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1);
    else setRestart(value => value + 1);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return <div ref={root} className="testimonial-carousel paged-carousel" role="region" aria-roledescription="Karussell" aria-label="Kundenstimmen – sechs Beispiele">
    <div className="carousel-viewport"
      onPointerDown={event => {
        if (event.button !== 0 || !event.isPrimary) return;
        pointer.current = { id: event.pointerId, x: event.clientX };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={finishDrag}
      onPointerCancel={() => { pointer.current = null; setRestart(value => value + 1); }}
      onLostPointerCapture={() => { pointer.current = null; }}>
      <div className="carousel-track" style={{ transform: 'translateX(-' + active * 100 + '%)', transition: reduced ? 'none' : undefined }} aria-live="off">
        {Array.from({ length: pageCount }, (_, page) => <div className="carousel-slide" key={page} aria-hidden={page !== active} role="group" aria-label={(page + 1) + ' von ' + pageCount}>
          <div className="testimonial-pair">{Array.from({ length: desktop ? 2 : 1 }, (_, offset) => {
            const index = (page + offset) % pageCount;
            return <figure key={exampleNames[index]}><span className="quote-mark"><Icon name="quote" size={32}/></span><blockquote>{exampleTexts[index]}</blockquote><figcaption>{exampleNames[index]} <span>— Beispiel</span></figcaption></figure>;
          })}</div>
        </div>)}
      </div>
    </div>
    <div className="carousel-controls">
      <button type="button" onClick={() => go(-1)} aria-label="Vorherige Kundenstimme"><Icon name="left"/></button>
      <div className="carousel-dots">{Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" aria-label={'Ansicht ' + (index + 1)} aria-current={index === active ? 'true' : undefined} onClick={() => { setActive(index); setRestart(value => value + 1); }}><span/></button>)}</div>
      <button type="button" onClick={() => go(1)} aria-label="Nächste Kundenstimme"><Icon name="right"/></button>
      <button type="button" className="carousel-pause" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Abspielen' : 'Pause'}</button>
    </div>
  </div>;
}


const funeralServices = ['Erdbestattung', 'Feuerbestattung', 'Seebestattung', 'Bestattungsvorsorge', 'Trauerfeier', 'Allgemeine Beratung'];
function ContactForm() {
  const [status, setStatus] = useState('');
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get('name')}\nE-Mail: ${data.get('email')}\nTelefon: ${data.get('phone') || '–'}\nAnliegen: ${data.get('service')}\n\n${data.get('message')}`;
    window.location.href = `mailto:mail@alstercloud.de?subject=${encodeURIComponent('Kontaktanfrage – ' + data.get('service'))}&body=${encodeURIComponent(body)}`;
    setStatus('Die Nachricht wurde für Ihr E-Mail-Programm vorbereitet. Bitte senden Sie sie dort ab.');
  }
  return <form className="contact-form" onSubmit={submit}>
    <h3>Schreiben Sie uns</h3>
    <div className="form-grid">
      <label>Ihr Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" placeholder="Max Mustermann" required maxLength={100}/></label>
      <label>Ihre E-Mail-Adresse <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" placeholder="max@beispiel.de" required maxLength={200}/></label>
      <label>Telefonnummer <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="040 123 45 67" maxLength={40}/></label>
      <label>Wobei dürfen wir Sie unterstützen? <span aria-hidden="true">*</span><select name="service" required defaultValue=""><option value="" disabled>Bitte wählen</option>{funeralServices.map(service => <option key={service}>{service}</option>)}</select></label>
      <label className="full-field">Ihre Nachricht <span aria-hidden="true">*</span><textarea name="message" required rows={4} minLength={10} maxLength={4000} placeholder="Ihre Nachricht an uns …"/></label>
    </div>
    <label className="privacy-check"><input type="checkbox" required/><span>Ich habe die <a href="https://www.alstercloud.de/datenschutz/" target="_blank" rel="noreferrer">Datenschutzerklärung</a> gelesen.</span></label>
    <button type="submit" className="button">Nachricht senden <Icon name="arrow" size={18}/></button>
    <p className="form-note">Öffnet Ihr E-Mail-Programm. Mit * markierte Felder sind Pflichtfelder.</p>
    <p className="form-status" role="status">{status}</p>
  </form>;
}
function LocationSection() {
  const [mapVisible, setMapVisible] = useState(false);
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=AlsterCloud+Winterhuder+Weg+31+22085+Hamburg';
  return <section className="location-section section" id="standort" aria-labelledby="location-title">
    <p className="eyebrow">05 / STANDORT</p><h2 id="location-title">Hier finden Sie uns</h2>
    <div className="location-grid">
      <div className="location-map">{mapVisible ? <iframe title="Karte: Winterhuder Weg 31, Hamburg" src="https://maps.google.com/maps?q=AlsterCloud%20Winterhuder%20Weg%2031%2022085%20Hamburg&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/> : <div className="map-consent"><MapPin size={36} weight="light" aria-hidden="true"/><h3>Unser Standort in Hamburg</h3><p>Winterhuder Weg 31, 22085 Hamburg</p><button className="button" onClick={() => setMapVisible(true)}>Google Maps laden</button><p className="map-notice">Beim Laden der Karte wird eine Verbindung zu Google hergestellt.</p><a href={mapsUrl} target="_blank" rel="noreferrer">Direkt in Google Maps öffnen</a></div>}</div>
      <div className="location-details"><h3>Bestatter</h3><address><div><MapPin size={24} aria-hidden="true"/><span>Winterhuder Weg 31<br/>22085 Hamburg</span></div><a href="tel:+494060943946"><Phone size={24} aria-hidden="true"/>040 60 94 39 46</a><a href="mailto:mail@alstercloud.de"><EnvelopeSimple size={24} aria-hidden="true"/>mail@alstercloud.de</a></address><a className="button secondary" href={mapsUrl} target="_blank" rel="noreferrer"><NavigationArrow size={20} aria-hidden="true"/>Route planen <Icon name="arrow" size={18}/></a></div>
    </div>
  </section>;
}
function SiteFooter() {
  const [notice, setNotice] = useState('');
  return <footer className="site-footer">
    <div className="footer-top"><a className="brand footer-brand" href="#start" aria-label="Bestatter – Startseite"><img className="brand-symbol" src="./favicon.svg" alt="" width="56" height="56"/><span>BESTATTER</span></a>
      <div className="footer-social"><h3>Folgen Sie uns</h3><div className="social-links">{[['Facebook', FacebookLogo], ['Instagram', InstagramLogo], ['LinkedIn', LinkedinLogo]].map(([label, SocialIcon]) => <button key={label} type="button" aria-label={label} onClick={() => setNotice('Der ' + label + '-Link wird für die finale Version ergänzt.')}><SocialIcon size={23} weight="regular" aria-hidden="true"/></button>)}</div><p className="footer-status" role="status">{notice}</p></div>
    </div>
    <div className="footer-bottom"><p>Bestatter © 2026 Alle Rechte vorbehalten.</p><nav aria-label="Footer"><a href="https://www.alstercloud.de/impressum/" target="_blank" rel="noreferrer">Impressum</a><a href="https://www.alstercloud.de/datenschutz/" target="_blank" rel="noreferrer">Datenschutz &amp; Cookies</a><button type="button" className="footer-link" onClick={() => setNotice('Bildnachweise: AlsterCloud-Logo bereitgestellt durch AlsterCloud. Landschaftsgrafik: projektinterner Platzhalter. Kartenmaterial bei Aktivierung: Google Maps.')}>Bildnachweise</button><a href="#kontakt">Kontakt</a></nav><a className="back-to-top" href="#start" aria-label="Zur Startsektion"><ArrowUp size={20} aria-hidden="true"/><span>Nach oben</span></a></div>
  </footer>;
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
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    cancelAnimationFrame(scrollFrame.current);
    setMenu(false);
    scrollFrame.current = requestAnimationFrame(() => {
      const scroller = document.scrollingElement || document.documentElement;
      const start = scroller.scrollTop;
      const offset = document.querySelector('header').getBoundingClientRect().height + 24;
      const end = Math.max(0, Math.min(start + target.getBoundingClientRect().top - offset,
        document.documentElement.scrollHeight - window.innerHeight));
      const distance = end - start;
      const duration = Math.min(2200, Math.max(1600, Math.abs(distance) * 0.8));
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
        scroller.scrollTop = start + distance * eased;
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
  function handleAnchorClick(event) {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || anchor.classList.contains('skip')) return;
    const id = anchor.getAttribute('href').slice(1);
    if (id) navigate(event, id);
  }
  return <div onClickCapture={handleAnchorClick}>
    <a className="skip" href="#main">Zum Inhalt</a>
    <header className={scrolled ? 'is-scrolled' : undefined}><a className="brand" href="#start" aria-label="Bestatter – Startseite"><img className="brand-symbol" src="./favicon.svg" alt="" width="48" height="48"/><span>BESTATTER</span></a>
      <button className="menu" aria-label={menu ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>
        <svg className="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path className="menu-line-top" d="M4 7h16"/><path className="menu-line-middle" d="M4 12h16"/><path className="menu-line-bottom" d="M4 17h16"/>
        </svg>
      </button>
      <nav id="navigation" className={menu ? 'open' : ''} aria-label="Hauptnavigation">{[['ablauf','Ablauf'],['zusammenarbeit','Zusammenarbeit'],['kontakt','Kontakt']].map(([id, label]) => <a key={id} href={'#'+id}>{label}</a>)}<CTA /></nav>
    </header>
    <main id="main">
      <section className="hero section" id="start"><div><p className="eyebrow">BESTATTUNG & VORSORGE</p><h1>In schweren Zeiten.<br/><span>An Ihrer Seite.</span></h1><p className="lead">{lorem}</p><div className="actions"><CTA/><CTA secondary/></div><p className="fine">Bestattung · Vorsorge · Persönliches Gespräch</p></div><div className="hero-art"><img src="./placeholder.svg" width="600" height="660" alt="" fetchPriority="high"/><div className="art-caption"><span><Icon name="heart" size={32}/></span><p>Raum für Abschied.<br/><strong>Zeit für Erinnerung.</strong></p></div></div></section>
      <div className="trust-strip" aria-label="Themen"><span>ABSCHIED</span><span>ERINNERUNG</span><span>BEGLEITUNG</span><span>VORSORGE</span></div>
      <section className="section process" id="ablauf"><div className="section-heading"><p className="eyebrow">01 / ABLAUF</p><h2>Den Abschied gestalten.<br/>Schritt für Schritt.</h2><p>{lorem}</p></div><div className="steps">{['Erstes Gespräch', 'Persönliche Wünsche', 'Abschied & Begleitung'].map((title, index) => <article key={title}><span className="number">0{index + 1}</span><h3>{title}</h3><p>{lorem}</p><span className="step-line"><Icon name="arrow" size={24}/></span></article>)}</div><div className="section-action"><CTA/></div></section>
      <section className="quotes section"><p className="eyebrow">02 / KUNDENSTIMMEN · PLATZHALTER</p><h2>Worte der Erinnerung und Verbundenheit.</h2><Testimonials/></section>
      <section className="section collaboration" id="zusammenarbeit"><div className="section-heading"><p className="eyebrow">03 / ZUSAMMENARBEIT</p><h2>Ein persönlicher Abschied.<br/><span>Ein bleibendes Andenken.</span></h2><p>{lorem}</p><CTA/></div><div className="features">{['Bestattungsarten', 'Trauerfeier & Erinnerung', 'Bestattungsvorsorge'].map((title, index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{lorem}</p></div></article>)}</div></section>
      <section className="contact-cta" id="kontakt" aria-labelledby="contact-title"><div className="section contact-cta-grid"><div className="contact-pitch"><p className="eyebrow">PERSÖNLICHE BERATUNG</p><h2 id="contact-title">Lassen Sie<br/>uns sprechen.</h2><p>{lorem}</p><div className="contact-reassurance"><Icon name="heart" size={36}/><span>Wir sind für Sie da –<br/>mit Herz und Verständnis.</span></div><div className="actions"><CTA/><CTA secondary/></div></div><ContactForm/></div></section>
      <LocationSection/>
    </main>
    <SiteFooter/>
    <dialog ref={dialog} onClose={() => previousFocus.current?.focus()} aria-labelledby="notice-title"><h2 id="notice-title">Vorschau</h2><p>{notice}</p><form method="dialog"><button className="button">Schließen</button></form></dialog>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
