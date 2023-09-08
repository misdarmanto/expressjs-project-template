import dotenv from "dotenv";
dotenv.config();
import { Options, Sequelize } from "sequelize";
import { CONFIG } from "../configs";

const dataBaseConfig: Options | any = CONFIG.dataBase.development;

export const sequelize = new Sequelize(dataBaseConfig);
