// Cache-Control: no-store on every response these dev servers send --
// main.js is rebuilt fresh on every request specifically so editing
// source and refreshing shows the change; a cached response silently
// defeats that. Discovered this session: a browser tab kept an old
// main.js around across several code changes, showing stale behavior
// with no error to explain why.
export const noCacheHeaders = { "Cache-Control": "no-store" };
