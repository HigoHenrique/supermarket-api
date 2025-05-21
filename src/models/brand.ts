import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../utils/database';

export interface BrandAttributes {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BrandCreationAttributes extends Optional<BrandAttributes, 'id'> {}

class Brand extends Model<BrandAttributes, BrandCreationAttributes> 
  implements BrandAttributes {
  public id!: string;
  public name!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Brand.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: 'brands',
    timestamps: true,
  }
);

export default Brand;