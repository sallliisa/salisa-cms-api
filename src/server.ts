import { config } from "./config/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import Logging from "./library/Logging";
import articleRoutes from "./routes/Article";

const router = express();
mongoose
  .connect(config.mongo.uri, {
    dbName: config.mongo.dbname,
    user: config.mongo.username,
    pass: config.mongo.password,
  })
  .then(() => {
    Logging.info("Connected to MongoDB"), StartServer();
  })
  .catch((error) => Logging.error(error));

const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incoming | Method: [${req.method}] | URL: [${req.url}] | IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      Logging.info(
        `Outgoing | Method: [${req.method}] | URL: [${req.url}] | IP: [${req.socket.remoteAddress}]`
      );
    });
    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  router.use("/api", articleRoutes);

  router.get("/ping", (req, res, next) => {
    res.status(200).json({
      message: "pong",
    });
  });

  http
    .createServer(router)
    .listen(config.server.dev_port, "127.0.0.1", () =>
      Logging.info(`Server is running on ${config.server.dev_port}`)
    );
};
