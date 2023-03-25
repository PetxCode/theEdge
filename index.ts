import express, { Application } from "express";
import mongoose from "mongoose";
import { mainApp } from "./mainApp";
import { AppDataSource } from "./utils/dataBase";
import dotenv from "dotenv";
import { mainAppErrorHandler } from "./utils/error/errorDefiner";
import "reflect-metadata";
import { HTTP } from "./utils/constants/HTTP";
dotenv.config();

const port: number = parseInt(process.env.APP_PORT!);

const app: Application = express();

const url: string = process.env.MONGODB_STRING!;

mainApp(app);

const server = app.listen(port, () => {
  console.log("");
  console.log("server is ready to connect🚀🚁🚀🚀");

  // mongoose
  //   .connect(url)
  //   .then(() => {
  //     console.log("db connected");
  //   })
  //   .catch((err) => {
  //     new mainAppErrorHandler({
  //       message: `Unable to connect to MongoDB Database`,
  //       status: HTTP.BAD_GATEWAY,
  //       name: "mongodb connection Error",
  //       isSuccess: false,
  //     });
  //   });

  AppDataSource.initialize()
    .then(async () => {
      console.log("postgres database connected");
    })
    .catch((err) => {
      console.log(err);
    });
});

process.on("uncaughtException", (error: Error) => {
  console.log("stop here: uncaughtException");
  console.log(error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("stop here: unhandledRejection");
  console.log(reason);

  server.close(() => {
    process.exit(1);
  });
});