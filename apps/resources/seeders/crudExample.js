/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('crud_example', [
      {
        crud_example_id: '424323423423erwerewr23423rewr',
        crud_example_name: 'hello world 1'
      },
      {
        crud_example_id: 'fdsftr23453523erwerewr23423ererre443',
        crud_example_name: 'hello world 2'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('crud_example', null, {})
  }
}
