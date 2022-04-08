const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const log = require("./src/app/controllers/log.controller");

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("get-in", async ({ ra }) => {
    const response = await log.create({ ra, type: 1 });

    io.emit("return-in", response);
  });

  socket.on("get-out", async ({ ra }) => {
    const response = await log.create({ ra, type: 0 });

    io.emit("return-in", response);
  });
});

server.listen(process.env.PORT || 3333, () => {
  console.log("listening on *:3000");
});
