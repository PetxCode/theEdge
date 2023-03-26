"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const dataBase_1 = require("./utils/dataBase");
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
dotenv_1.default.config();
const port = parseInt(process.env.APP_PORT);
const app = (0, express_1.default)();
const url = process.env.MONGODB_STRING;
(0, mainApp_1.mainApp)(app);
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
    dataBase_1.AppDataSource.initialize()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("postgres database connected");
    }))
        .catch((err) => {
        console.log(err);
    });
});
process.on("uncaughtException", (error) => {
    console.log("stop here: uncaughtException");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("stop here: unhandledRejection");
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=index.js.map