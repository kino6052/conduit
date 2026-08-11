#!/usr/bin/env bun
// Serves src/app the same way scripts/serve-essence-view.ts serves
// src/essence-view: main.ts is rebuilt fresh on every request to /main.js,
// no watch process, just refresh the page.

import { fileURLToPath } from "node:url";

const appDir = new URL("../src/app/", import.meta.url);
const port = 4322;

Bun.serve({
  port,
  async fetch(req) {
    const { pathname } = new URL(req.url);

    if (pathname === "/" || pathname === "/index.html") {
      return new Response(Bun.file(new URL("index.html", appDir)));
    }

    if (pathname === "/styles.css") {
      return new Response(Bun.file(new URL("styles.css", appDir)), {
        headers: { "Content-Type": "text/css" },
      });
    }

    if (pathname === "/main.js") {
      const result = await Bun.build({
        entrypoints: [fileURLToPath(new URL("main.ts", appDir))],
        format: "esm",
      });
      if (!result.success) {
        console.error(result.logs.join("\n"));
        return new Response("Build failed — see terminal.", { status: 500 });
      }
      const [output] = result.outputs;
      return new Response(await output.text(), {
        headers: { "Content-Type": "application/javascript" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`App: http://localhost:${port}`);
