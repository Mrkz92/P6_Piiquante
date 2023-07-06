const http = require("http");
const app = require("./app");
let { HTTP_PORT } = require("./managers/env");

if (!HTTP_PORT) console.warn("HTTP_PORT may be set in .env (default: 3000)");
HTTP_PORT ??= 3000;

app.set("port", HTTP_PORT);
const server = http.createServer(app);

server.on("listening", () => console.log(`Listenning on http://localhost:${HTTP_PORT}`));
server.listen(HTTP_PORT);
