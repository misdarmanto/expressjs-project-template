"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("user", [
			{
				user_id: "8b5e175f-5370-4419-8974-b8b0dce5b5ec",
				user_name: "Zaki T.Telekomunikasi",
				user_email: "Zaki.mahasiswa@mail.com",
				user_role: "student",
			},
			{
				user_id: "93df0b9a-8497-41d5-9f8c-370806253b09",
				user_name: "Akademik",
				user_email: "academic@itera.ac.id",
				user_role: "academic",
			},
			{
				user_id: "e44f033b-856b-40e0-946c-166dba272644",
				user_name: "LP3M",
				user_email: "lp3m@itera.ac.id",
				user_role: "lp3m",
			},
			{
				user_id: "9e9a3381-7459-476b-a72e-8ab053da9e99",
				user_name: "JTPI",
				user_email: "jtpi@itera.ac.id",
				user_role: "department",
			},
			{
				user_id: "4181f385-6386-4f48-9a07-bf039af11175",
				user_name: "JTIK",
				user_email: "jtik@itera.ac.id",
				user_role: "department",
			},
			{
				user_id: "ed697f88-a372-442d-bc39-3772f544bdb5",
				user_name: "SAINS",
				user_email: "sains@itera.ac.id",
				user_role: "department",
			},
			{
				user_id: "b1491aae-9753-4bde-9934-2c8fb987d8c8",
				user_name: "Prodi Teknik Geomatika",
				user_email: "T.Geomatika.prodi@mail.com",
				user_role: "studyProgram",
			},
			{
				user_id: "30b3c037-7d11-4a60-a039-ab09b007fd94",
				user_name: "Prodi Matematika",
				user_email: "Matematika.prodi@mail.com",
				user_role: "studyProgram",
			},
			{
				user_id: "8db52aa9-b4f4-4909-97d3-43638d48ce2a",
				user_name: "Prodi T.Telekomunikasi",
				user_email: "TT.prodi@mail.com",
				user_role: "studyProgram",
			},
			{
				user_id: "8cd17bb9-d727-4578-99c5ssadsa",
				user_name: "Yono T.Geomatika",
				user_email: "Yono.mahasiswa@mail.com",
				user_role: "student",
			},
			{
				user_id: "8cd17bb9-d727-4578-99c5-a223296d55b8",
				user_name: "Eka Matematika",
				user_email: "eka.mahasiswa@mail.com",
				user_role: "student",
			},
			{
				user_id: "46cbc5cd-8f15-4777-a7c1-84767ec2342f",
				user_name: "Budi T.Telekomunikasi",
				user_email: "budi.mahasiswa@mail.com",
				user_role: "student",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("user", null, {});
	},
};
