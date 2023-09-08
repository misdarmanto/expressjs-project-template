"use strict";

const { ZygoteModel } = require("../zygote");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user", {
			...ZygoteModel,
			user_id: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_role: {
				type: Sequelize.ENUM(
					"student",
					"studyProgram",
					"department",
					"lp3m",
					"academic"
				),
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("user");
	},
};
