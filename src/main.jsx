import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { config } from './config';
import './styles.css';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo eget magna fermentum iaculis. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
function App() {
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState('');
  const dialog = useRef(null);
  const previousFocus = useRef(null);
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
    <header><a className="brand" href="#start" aria-label="AlsterCloud – Startseite"><span className="brand-icon" aria-hidden="true">✳</span>{config.name}<small>BESTATTUNGEN · ARBEITSPROBE</small></a>
      <button className="menu" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>Menü {menu ? '−' : '+'}</button>
      <nav id="navigation" className={menu ? 'open' : ''} aria-label="Hauptnavigation">{[['ablauf','Ablauf'],['zusammenarbeit','Zusammenarbeit'],['kontakt','Kontakt']].map(([id, label]) => <a key={id} href={'#'+id} onClick={() => setMenu(false)}>{label}</a>)}<CTA /></nav>
    </header>
    <main id="main">
      <section className="hero section" id="start"><div><p className="eyebrow">BESTATTUNG & VORSORGE</p><h1>In schweren Zeiten.<br/><span>An Ihrer Seite.</span></h1><p className="lead">{lorem}</p><div className="actions"><CTA/><CTA secondary/></div><p className="fine">Bestattung · Vorsorge · Persönliches Gespräch</p></div><div className="hero-art"><img src="./placeholder.svg" width="600" height="660" alt="" fetchPriority="high"/><div className="art-caption"><span aria-hidden="true">✳</span><p>Raum für Abschied.<br/><strong>Zeit für Erinnerung.</strong></p></div></div></section>
      <div className="trust-strip" aria-label="Themen"><span>ABSCHIED</span><span>ERINNERUNG</span><span>BEGLEITUNG</span><span>VORSORGE</span></div>
      <section className="section process" id="ablauf"><div className="section-heading"><p className="eyebrow">01 / ABLAUF</p><h2>Den Abschied gestalten.<br/>Schritt für Schritt.</h2><p>{lorem}</p></div><div className="steps">{['Erstes Gespräch', 'Persönliche Wünsche', 'Abschied & Begleitung'].map((title, index) => <article key={title}><span className="number">0{index + 1}</span><h3>{title}</h3><p>{lorem}</p><span className="step-line" aria-hidden="true">↗</span></article>)}</div><div className="section-action"><CTA/></div></section>
      <section className="quotes section"><p className="eyebrow">02 / KUNDENSTIMMEN · PLATZHALTER</p><h2>Worte der Erinnerung und Verbundenheit.</h2><div className="quote-grid">{[1,2].map(n => <figure key={n}><span className="quote-mark" aria-hidden="true">“</span><blockquote>{lorem}</blockquote><figcaption>Lorem Ipsum <span>— Platzhalter</span></figcaption></figure>)}</div></section>
      <section className="section collaboration" id="zusammenarbeit"><div className="section-heading"><p className="eyebrow">03 / ZUSAMMENARBEIT</p><h2>Ein persönlicher Abschied.<br/><span>Ein bleibendes Andenken.</span></h2><p>{lorem}</p><CTA/></div><div className="features">{['Bestattungsarten', 'Trauerfeier & Erinnerung', 'Bestattungsvorsorge'].map((title, index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{lorem}</p></div></article>)}</div></section>
      <section className="contact section" id="kontakt"><p className="eyebrow">04 / KONTAKT</p><h2>Der erste Schritt:<br/>Ein persönliches Gespräch.</h2><p>{lorem}</p><div className="actions"><CTA/><CTA secondary/></div><p><a href={"tel:" + config.phone}>040 60 94 39 46</a></p></section>
    </main>
    <footer><a className="brand" href="#start">{config.name}</a><p>Arbeitsprobe für AlsterCloud · Keine echte Bestatter-Website.</p><a href="#kontakt">Kontakt ↑</a></footer>
    <dialog ref={dialog} onClose={() => previousFocus.current?.focus()} aria-labelledby="notice-title"><h2 id="notice-title">Vorschau</h2><p>{notice}</p><form method="dialog"><button className="button">Schließen</button></form></dialog>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
