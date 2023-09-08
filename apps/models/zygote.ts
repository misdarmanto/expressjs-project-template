import { DataTypes, Sequelize } from "sequelize";

export const ZygoteModel = {
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	createdOn: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: Sequelize.fn("now"),
	},
	modifiedOn: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	deleted: {
		type: DataTypes.TINYINT,
		allowNull: false,
		defaultValue: 0,
	},
};

export interface ZygoteAttributes {
	id: number;
	createdOn: String;
	modifiedOn: String | null;
	deleted: number;
}
