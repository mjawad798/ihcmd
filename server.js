// Entry point for cPanel's "Setup Node.js App" (Phusion Passenger).
// Passenger spawns this file directly and expects it to start an HTTP
// server on process.env.PORT — it can't invoke `next start` itself, so
// this wraps Next's programmatic API the same way `next start` does
// internally. Requires `next build` to have already run (reads .next/).
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
    createServer((req, res) => {
        handle(req, res);
    }).listen(port, () => {
        console.log(`Server ready on port ${port}`);
    });
});
