import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../utils/database';
import Brand from './brand';

export interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  brandId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> 
  implements ProductAttributes {
  public id!: string;
  public name!: string;
  public price!: number;
  public description!: string | undefined;
  public image!: string | undefined;
  public brandId!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    brandId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'brands',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['name', 'brandId'],
        name: 'products_name_brandId_unique',
      },
    ],
  }
);

Product.belongsTo(Brand, { foreignKey: 'brandId', as: 'brand' });
Brand.hasMany(Product, { foreignKey: 'brandId', as: 'products' });

export default Product;