const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./src/helpers/errorHandlers");
require("dotenv").config();

const foldersRouter = require("./src/routes/api/folders");
const sourcesRouter = require("./src/routes/api/sources");
const authRouter = require("./src/routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(
  cors({
    origin: `${process.env.APPHOST}`,
    methods: "GET,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/folders", foldersRouter);
app.use("/api/sources", sourcesRouter);

app.use(errorHandler);

module.exports = app;
