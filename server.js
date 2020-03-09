const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const SocketIOServer = require("./src/server/app");

const port = 8080;
let server = new SocketIOServer(port, app, http, io);

// server.initDb();

server.run();
server.initIO();
