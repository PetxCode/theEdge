import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { mainAppErrorHandler } from "./utils/error/errorDefiner";
import { errorHandler } from "./utils/error/errorHandlers";
import { HTTP } from "./utils/constants/HTTP";
import admin from "./routers/AdminRoutes";
import cookieSession from "cookie-session";
import passport from "passport";
import social from "./routers/oAuthRoute";

export const mainApp = (app: Application) => {
  app
    .use(express.json())
    .use(cors())

    .use(
      cookieSession({
        name: `${process.env.SESSION_NAME}`,
        keys: [`${process.env.SESSION_KEY}`],
        maxAge: 2 * 60 * 60 * 100,
      }),
    )

    .use(function (req: any, res: any, next: any) {
      if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb: any) => {
          cb();
        };
      }
      if (req.session && !req.session.save) {
        req.session.save = (cb: any) => {
          cb();
        };
      }
      next();
    })
    .use(passport.initialize())
    .use(passport.session())

    .use("/api/admin", admin)
    .use("/", social)

    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainAppErrorHandler({
          message: `This route ${req.originalUrl} doesn't exist`,
          status: HTTP.NOT_FOUND,
          name: "Route Error",
          isSuccess: false,
        }),
      );
    })

    .use(errorHandler);
};
