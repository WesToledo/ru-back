const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors);

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const log = require("./src/app/controllers/log.controller");

const OCUPATION_MAX = 300;
let lotation = 0;

io.on("connection", async (socket) => {
  console.log("a user connected");

  const { logs } = await log.get();

  console.log(
    "logs",
    logs.map((log) => log.ra)
  );

  console.log("lotation", lotation);

  const inner = logs.filter(({ type }) => type === 1).map((log) => log.ra);
  const out = logs.filter(({ type }) => type === 0).map((log) => log.ra);

  lotation = inner.filter((log) => !out.includes(log)).length;

  io.emit("setup", {
    lotation,
    spots: OCUPATION_MAX - lotation,
    ocupation: (100 * (lotation / OCUPATION_MAX)).toFixed(0),
  });

  socket.on("get-in", async ({ ra }) => {
    const response = await log.create({ ra, type: 1 });

    console.log("get-in");

    lotation += 1;

    console.log("lotation", lotation);

    io.emit("return-in", response);
    io.emit("lotation-update", {
      lotation,
      spots: OCUPATION_MAX - lotation,
      ocupation: (100 * (lotation / OCUPATION_MAX)).toFixed(0),
    });
  });

  socket.on("get-out", async ({ ra }) => {
    const response = await log.create({ ra, type: 0 });

    console.log("get-out");

    console.log("lotation", lotation);

    lotation -= 1;
    io.emit("return-out", response);
    io.emit("lotation-update", {
      lotation,
      spots: OCUPATION_MAX - lotation,
      ocupation: (100 * (lotation / OCUPATION_MAX)).toFixed(0),
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT || 3333, () => {
  console.log("listening on *:3000");
});
