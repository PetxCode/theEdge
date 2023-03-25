import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { AdminEntity } from "../model/AdminEntity/AdminEntity";
import "reflect-metadata";
import { LecturerEntity } from "../model/AdminEntity/LecturerEntity";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.POSTGRES_PORT!),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [AdminEntity, LecturerEntity],
});


