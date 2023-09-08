import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import { ZygoteAttributes, ZygoteModel } from "./zygote";

export interface AcademicAttributes extends ZygoteAttributes {
	academicId: string;
	academicName: string;
	academicEmail: string;
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type AcademicCreationAttributes = Optional<
	AcademicAttributes,
	"id" | "createdOn" | "modifiedOn"
>;

// We need to declare an interface for our model that is basically what our class would be
interface AcademicInstance
	extends Model<AcademicAttributes, AcademicCreationAttributes>,
		AcademicAttributes {}

export const AcademicModel = sequelize.define<AcademicInstance>(
	"academic",
	{
		...ZygoteModel,
		academicId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		academicName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		academicEmail: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		...sequelize,
		timestamps: false,
		tableName: "academic",
		deletedAt: false,
		paranoid: true,
		underscored: true,
		freezeTableName: true,
		engine: "InnoDB",
	}
);
