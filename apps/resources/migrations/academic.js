"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("crud_example", {
			...ZygoteModel,
			crudExampleId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			crudExampleName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("crud_example");
	},
};
