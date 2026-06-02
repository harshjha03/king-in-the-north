import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
};

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || '/', `http://${req.headers.host}`);
    const relativePath = requestUrl.pathname === '/'
      ? 'index.html'
      : decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '');
    const target = path.resolve(root, relativePath);

    if (!target.startsWith(root + path.sep) && target !== root) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    const data = await fs.readFile(target);
    res.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(target).toLowerCase()] || 'application/octet-stream',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://cloud.umami.is https://www.googletagmanager.com https://www.google-analytics.com; object-src 'none'; frame-ancestors 'none';",
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio running at http://127.0.0.1:${port}/`);
});
