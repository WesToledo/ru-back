const express = require("express");

require("dotenv").config();

const authMiddleware = require("./src/app/middleware/auth");

const log = require("./src/app/controllers/log.controller");

//Auth
const rootRouter = express.Router();
rootRouter.post("/create", log.create);

module.exports = {
  rootRouter,
  userRouter,
  classRouter,
  questionaryRouter,
  answerRouter,
};
