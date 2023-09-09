/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional, UUIDV4 } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface CrudExampleAttributes extends ZygoteAttributes {
  crudExampleId: string
  crudExampleName: string
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type CrudExampleCreationAttributes = Optional<
  CrudExampleAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

// We need to declare an interface for our model that is basically what our class would be

interface CrudExampleInstance
  extends Model<CrudExampleAttributes, CrudExampleCreationAttributes>,
    CrudExampleAttributes {}

export const CrudExampleModel = sequelize.define<CrudExampleInstance>(
  'crud_example',
  {
    ...ZygoteModel,
    crudExampleId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: UUIDV4()
    },
    crudExampleName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'crud_example',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
  }
)
