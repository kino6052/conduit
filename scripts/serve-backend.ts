#!/usr/bin/env bun
// Thin launcher, same shape as the other scripts/serve-*.ts files: all
// the real logic lives in src/accidents/backend/server.ts, this just
// picks a port and a database file and starts it.

import { fileURLToPath } from "node:url";
import { createBackendServer } from "../src/accidents/backend/server";

const port = 4325;
const dbPath = fileURLToPath(new URL("../data/conduit.sqlite", import.meta.url));

createBackendServer(dbPath, port);

console.log(`Backend: http://localhost:${port} (db: ${dbPath})`);
