"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("crud_example", [
			{
				crudExampleName: "hello world 1",
			},
			{
				crudExampleName: "hello world 2",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("crud_example", null, {});
	},
};
