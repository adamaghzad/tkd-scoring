import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

http.createServer((request, response) => {
  const url = new URL(request.url || '/', 'http://localhost');
  if (url.pathname === '/' || url.pathname === '/tkd-scoring') {
    response.writeHead(302, { Location: '/tkd-scoring/' }); response.end(); return;
  }
  if (!url.pathname.startsWith('/tkd-scoring/')) { response.writeHead(404); response.end('Not found'); return; }
  let relative;
  try { relative = decodeURIComponent(url.pathname.slice('/tkd-scoring/'.length)); } catch { response.writeHead(400); response.end(); return; }
  if (relative.split('/').includes('..')) { response.writeHead(403); response.end(); return; }
  let filename = path.join(root, relative);
  if (existsSync(filename) && statSync(filename).isDirectory()) filename = path.join(filename, 'index.html');
  if (!existsSync(filename) && !path.extname(filename)) filename = path.join(filename, 'index.html');
  if (!existsSync(filename) || !statSync(filename).isFile()) { response.writeHead(404); response.end('Not found'); return; }
  response.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': filename.endsWith('.html') ? 'no-cache' : 'public, max-age=3600' });
  createReadStream(filename).pipe(response);
}).listen(port, '0.0.0.0', () => console.log(`Static product site: http://0.0.0.0:${port}/tkd-scoring/`));
