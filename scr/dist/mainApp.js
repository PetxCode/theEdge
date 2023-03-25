"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorDefiner_1 = require("./utils/error/errorDefiner");
const errorHandlers_1 = require("./utils/error/errorHandlers");
const HTTP_1 = require("./utils/constants/HTTP");
const AdminRoutes_1 = __importDefault(require("./routers/AdminRoutes"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
const oAuthRoute_1 = __importDefault(require("./routers/oAuthRoute"));
const mainApp = (app) => {
    app
        .use(express_1.default.json())
        .use((0, cors_1.default)())
        .use((0, cookie_session_1.default)({
        name: `${process.env.SESSION_NAME}`,
        keys: [`${process.env.SESSION_KEY}`],
        maxAge: 2 * 60 * 60 * 100,
    }))
        .use(function (req, res, next) {
        if (req.session && !req.session.regenerate) {
            req.session.regenerate = (cb) => {
                cb();
            };
        }
        if (req.session && !req.session.save) {
            req.session.save = (cb) => {
                cb();
            };
        }
        next();
    })
        .use(passport_1.default.initialize())
        .use(passport_1.default.session())
        .use("/api/admin", AdminRoutes_1.default)
        .use("/", oAuthRoute_1.default)
        .all("*", (req, res, next) => {
        next(new errorDefiner_1.mainAppErrorHandler({
            message: `This route ${req.originalUrl} doesn't exist`,
            status: HTTP_1.HTTP.NOT_FOUND,
            name: "Route Error",
            isSuccess: false,
        }));
    })
        .use(errorHandlers_1.errorHandler);
};
exports.mainApp = mainApp;
//# sourceMappingURL=mainApp.js.map