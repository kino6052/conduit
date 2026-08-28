#!/usr/bin/env bun
// Serves src/index.essential-dependencies.ts's app -- same real view and
// composeApp as scripts/serve-app.ts, wired to essential (in-memory)
// dependencies instead of browser-backed ones. main-essential-dependencies.ts
// is rebuilt fresh on every request to /main-essential-dependencies.js, no
// watch process, just refresh the page.

import { fileURLToPath } from "node:url";
import { noCacheHeaders } from "./no-cache-headers";

const appDir = new URL("../src/accidents/view/react/", import.meta.url);
const port = 4322;

Bun.serve({
  port,
  async fetch(req) {
    const { pathname } = new URL(req.url);

    if (pathname === "/" || pathname === "/index.html") {
      return new Response(Bun.file(new URL("index-essential-dependencies.html", appDir)), {
        headers: noCacheHeaders,
      });
    }

    if (pathname === "/styles.css") {
      return new Response(Bun.file(new URL("styles.css", appDir)), {
        headers: { "Content-Type": "text/css", ...noCacheHeaders },
      });
    }

    if (pathname === "/main-essential-dependencies.js") {
      const result = await Bun.build({
        entrypoints: [fileURLToPath(new URL("main-essential-dependencies.ts", appDir))],
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

console.log(`Essential-dependencies app: http://localhost:${port}`);
