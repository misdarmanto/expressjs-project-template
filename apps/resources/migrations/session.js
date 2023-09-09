/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('session', {
      ...ZygoteModel,
      session_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      session_admin_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      session: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      session_expired_on: {
        type: Sequelize.BIGINT,
        allowNull: true
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('session')
  }
}
