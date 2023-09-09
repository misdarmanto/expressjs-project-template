/* eslint-disable @typescript-eslint/indent */
import moment from 'moment'
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface AdminAttributes extends ZygoteAttributes {
  adminId: string
  adminName: string
  adminEmail: string
  adminPassword: string
  adminCreatedBy: string
  adminRole: 'admin' | 'superAdmin'
}

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type AdminCreationAttributes = Optional<AdminAttributes, 'id' | 'createdAt' | 'updatedAt'>

// We need to declare an interface for our model that is basically what our class would be
interface AdminInstance
  extends Model<AdminAttributes, AdminCreationAttributes>,
    AdminAttributes {}

export const AdminModel = sequelize.define<AdminInstance>(
  'admin',
  {
    ...ZygoteModel,
    adminId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    adminName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    adminEmail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    adminPassword: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    adminCreatedBy: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    adminRole: {
      type: DataTypes.ENUM('admin', 'superAdmin'),
      allowNull: true,
      defaultValue: 'admin'
    }
  },
  {
    ...sequelize,
    timestamps: false,
    tableName: 'admin',
    deletedAt: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB',
    hooks: {
      beforeCreate: (record, options) => {
        const now = moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss')
        record.createdAt = now
        record.updatedAt = null
      },
      beforeUpdate: (record, options) => {
        const now = moment().add(7, 'hours').format('YYYY-MM-DD HH:mm:ss')
        record.updatedAt = now
      }
    }
  }
)
