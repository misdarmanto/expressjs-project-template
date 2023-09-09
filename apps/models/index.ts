import dotenv from 'dotenv'
import { type Options, Sequelize } from 'sequelize'
import { CONFIG } from '../configs'
dotenv.config()

const dataBaseConfig: Options | any = CONFIG.dataBase.development

export const sequelize = new Sequelize(dataBaseConfig)
