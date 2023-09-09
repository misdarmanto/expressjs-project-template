/* eslint-disable @typescript-eslint/no-var-requires */
const Sequelize = require('sequelize')

const ZygoteModel = {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: true
  },
  deleted: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
}

module.exports = { ZygoteModel }
