import { after, test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = fileURLToPath(new URL("../", import.meta.url));
const server = await createServer({
  root,
  configFile: false,
  server: { middlewareMode: true },
  appType: "custom",
});
after(() => server.close());
const { default: App } = await server.ssrLoadModule("/src/App.jsx");
const { config, routeUrl } = await server.ssrLoadModule("/src/config.js");
const html = renderToStaticMarkup(React.createElement(App));

test("page renders with one H1, unique IDs and working internal destinations", () => {
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.includes(target), `Missing destination: ${target}`);
  for (const id of [
    "start",
    "ablauf",
    "leistungen",
    "zusammenarbeit",
    "kontakt",
    "standort",
  ])
    assert.ok(ids.includes(id));
});

test("contact actions use the configured contact details and matching route address", () => {
  assert.ok(html.includes(`tel:${config.phone}`));
  assert.ok(html.includes(`mailto:${config.email}`));
  assert.equal(
    new URL(routeUrl).searchParams.get("destination"),
    `${config.address.street}, ${config.address.city}`,
  );
  assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'));
});

test("form exposes its title, required fields and all six service choices", () => {
  assert.ok(html.includes('aria-labelledby="form-title"'));
  assert.ok(html.includes('aria-describedby="form-note"'));
  for (const name of ["name", "email", "service", "message"]) {
    const element = html.match(new RegExp(`<[^>]+name="${name}"[^>]*>`))?.[0];
    assert.ok(element?.includes('required=""'), `${name} must be required`);
  }
  const options = [...html.matchAll(/<option[^>]*>([^<]+)<\/option>/g)].map(
    (match) => match[1],
  );
  assert.equal(options.length, 7); // Placeholder plus six service choices.
  assert.ok(options.includes("Trauerfeier"));
  assert.ok(options.includes("Allgemeine Beratung"));
});

test("carousels expose ratings and hide inactive copies from assistive technology", () => {
  for (const rating of ["4 von 5", "4,5 von 5", "5 von 5"])
    assert.ok(html.includes(rating));
  assert.equal(
    [...html.matchAll(/aria-hidden="true" inert="" role="group"/g)].length,
    10,
  );
  assert.equal(
    [...html.matchAll(/aria-roledescription="Karussell"/g)].length,
    2,
  );
});

test("footer information uses dialog buttons and labels example legal content", async () => {
  const { legalNotices } = await server.ssrLoadModule("/src/legalNotices.jsx");
  for (const title of ["Impressum", "Datenschutz &amp; Cookies", "Bildnachweise"]) {
    assert.ok(new RegExp(`<button[^>]*aria-haspopup="dialog"[^>]*>${title}</button>`).test(html), title);
  }
  for (const key of ["imprint", "privacy"]) {
    const body = renderToStaticMarkup(legalNotices[key].content);
    assert.ok(body.includes("Beispieltext"));
  }
  assert.ok(renderToStaticMarkup(legalNotices.credits.content).includes("AlsterCloud-Logo"));
});
