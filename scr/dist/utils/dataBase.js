"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const AdminEntity_1 = require("../model/AdminEntity/AdminEntity");
require("reflect-metadata");
const LecturerEntity_1 = require("../model/AdminEntity/LecturerEntity");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false,
    entities: [AdminEntity_1.AdminEntity, LecturerEntity_1.LecturerEntity],
});
//# sourceMappingURL=dataBase.js.map