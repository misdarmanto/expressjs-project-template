/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admin', [
      {
        admin_id: 'b1894f1e-f6ca-43f8-b8af-efcd8b5fdfbd',
        admin_name: 'Super Admin',
        admin_email: 'superadmin@mail.com',
        admin_password: '91f284ea6cc6f77fb50743f8eb925e3d5e198a9a',
        admin_created_by: 'Super Admin',
        admin_role: 'superAdmin'
      },
      {
        admin_id: '1e92f201-1963-4cb5-8ac2-cb703c737564',
        admin_name: 'Admin',
        admin_email: 'admin@mail.com',
        admin_password: '91f284ea6cc6f77fb50743f8eb925e3d5e198a9a',
        admin_created_by: 'Super Admin',
        admin_role: 'superAdmin'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admin', null, {})
  }
}
