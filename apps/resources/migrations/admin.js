/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin', {
      ...ZygoteModel,
      admin_id: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      admin_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      admin_email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      admin_password: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      admin_created_by: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      admin_role: {
        type: Sequelize.ENUM('admin', 'superAdmin'),
        allowNull: true,
        defaultValue: 'admin'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admin')
  }
}
