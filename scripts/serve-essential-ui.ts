#!/usr/bin/env bun
// Serves src/accidents/view/essential-ui: the exact same essence-view app
// (render functions in src/accidents/view/essence, composition root
// src/index.essence.ts) -- unchanged -- with a minimal stylesheet layered
// on top instead of zero styling. main.ts here just imports essence-view's
// own main.ts, so this really is "the essence-view, plus CSS," not a
// fork of it. main.js is rebuilt fresh on every request, no watch
// process, just refresh the page.

import { fileURLToPath } from "node:url";
import { noCacheHeaders } from "./no-cache-headers";

const dir = new URL("../src/accidents/view/essential-ui/", import.meta.url);
const port = 4324;

Bun.serve({
  port,
  async fetch(req) {
    const { pathname } = new URL(req.url);

    if (pathname === "/" || pathname === "/index.html") {
      return new Response(Bun.file(new URL("index.html", dir)), {
        headers: noCacheHeaders,
      });
    }

    if (pathname === "/styles.css") {
      return new Response(Bun.file(new URL("styles.css", dir)), {
        headers: { "Content-Type": "text/css", ...noCacheHeaders },
      });
    }

    if (pathname === "/main.js") {
      const result = await Bun.build({
        entrypoints: [fileURLToPath(new URL("main.ts", dir))],
        format: "esm",
      });
      if (!result.success) {
        console.error(result.logs.join("\n"));
        return new Response("Build failed — see terminal.", { status: 500 });
      }
      const [output] = result.outputs;
      return new Response(await output.text(), {
        headers: { "Content-Type": "application/javascript", ...noCacheHeaders },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Essential UI: http://localhost:${port}`);
