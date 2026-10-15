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
    <header><a className="brand" href="#start" aria-label="Bestatter – Startseite"><span className="brand-icon" aria-hidden="true">✳</span>{config.name}<small>LOREM IPSUM DOLOR</small></a>
      <button className="menu" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>Menü {menu ? '−' : '+'}</button>
      <nav id="navigation" className={menu ? 'open' : ''} aria-label="Hauptnavigation">{[['ablauf','Ablauf'],['zusammenarbeit','Zusammenarbeit'],['kontakt','Kontakt']].map(([id, label]) => <a key={id} href={'#'+id} onClick={() => setMenu(false)}>{label}</a>)}<CTA /></nav>
    </header>
    <main id="main">
      <section className="hero section" id="start"><div><p className="eyebrow">BESTATTER · LOREM IPSUM</p><h1>Lorem ipsum dolor.<br/><span>Sit amet consectetur.</span></h1><p className="lead">{lorem}</p><div className="actions"><CTA/><CTA secondary/></div><p className="fine">Lorem ipsum dolor sit amet · Consectetur adipiscing elit</p></div><div className="hero-art"><img src="./placeholder.svg" width="600" height="660" alt="" fetchPriority="high"/><div className="art-caption"><span aria-hidden="true">✳</span><p>Lorem ipsum dolor.<br/><strong>Consectetur adipiscing elit.</strong></p></div></div></section>
      <div className="trust-strip" aria-label="Platzhalter für Vertrauenselemente"><span>LOREM IPSUM</span><span>DOLOR SIT AMET</span><span>CONSECTETUR</span><span>ADIPISCING ELIT</span></div>
      <section className="section process" id="ablauf"><div className="section-heading"><p className="eyebrow">01 / ABLAUF</p><h2>Lorem ipsum dolor.<br/>Schritt für Schritt.</h2><p>{lorem}</p></div><div className="steps">{['01','02','03'].map((n) => <article key={n}><span className="number">{n}</span><h3>Lorem ipsum dolor</h3><p>{lorem}</p><span className="step-line" aria-hidden="true">↗</span></article>)}</div><div className="section-action"><CTA/></div></section>
      <section className="quotes section"><p className="eyebrow">02 / KUNDENSTIMMEN · PLATZHALTER</p><h2>Lorem ipsum dolor sit amet.</h2><div className="quote-grid">{[1,2].map(n => <figure key={n}><span className="quote-mark" aria-hidden="true">“</span><blockquote>{lorem}</blockquote><figcaption>Lorem Ipsum <span>— Platzhalter</span></figcaption></figure>)}</div></section>
      <section className="section collaboration" id="zusammenarbeit"><div className="section-heading"><p className="eyebrow">03 / ZUSAMMENARBEIT</p><h2>Lorem ipsum.<br/><span>Dolor sit amet.</span></h2><p>{lorem}</p><CTA/></div><div className="features">{['01','02','03'].map(n => <article key={n}><span>{n}</span><div><h3>Lorem ipsum dolor</h3><p>{lorem}</p></div></article>)}</div></section>
      <section className="contact section" id="kontakt"><p className="eyebrow">04 / KONTAKT</p><h2>Lorem ipsum dolor.<br/>Sit amet consectetur.</h2><p>{lorem}</p><div className="actions"><CTA/><CTA secondary/></div></section>
    </main>
    <footer><a className="brand" href="#start">{config.name}</a><p>Arbeitsprobe · Inhalte und Kontaktdaten sind Platzhalter.</p><a href="#kontakt">Kontakt ↑</a></footer>
    <dialog ref={dialog} onClose={() => previousFocus.current?.focus()} aria-labelledby="notice-title"><h2 id="notice-title">Vorschau</h2><p>{notice}</p><form method="dialog"><button className="button">Schließen</button></form></dialog>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
