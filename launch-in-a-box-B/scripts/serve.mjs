#!/usr/bin/env node
/* Serves the built site (dist/) the way Vercel will: same files, same headers.
   npm start                → http://localhost:3000
   PORT=8080 npm start      → another port
   node scripts/serve.mjs . → serve the source folder instead, without building */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = resolve(ROOT, process.argv[2] || "dist");
const PORT = +process.env.PORT || 3000;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
const HEADERS = { "X-Robots-Tag": "noindex, nofollow, noarchive", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" };

if (!existsSync(join(DIR, "index.html"))) {
  console.error(`No index.html in ${DIR}. Run npm run build first.`);
  process.exit(1);
}
createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = normalize(join(DIR, path));
  if (file !== DIR && !file.startsWith(DIR + sep)) { res.writeHead(403, HEADERS).end("Forbidden"); return }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { res.writeHead(404, { ...HEADERS, "Content-Type": "text/plain; charset=utf-8" }).end("Not found"); return }
  res.writeHead(200, { ...HEADERS, "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
  res.end(req.method === "HEAD" ? undefined : readFileSync(file));
}).listen(PORT, () => console.log(`Doc Desk: http://localhost:${PORT}  (serving ${DIR})`));
