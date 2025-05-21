import { col, fn, Op, where } from 'sequelize';
import Product from '../models/product';
import Brand from '../models/brand';
import { ProductCreationAttributes } from '../models/product';

interface FindAllParams {
  page?: number;
  pageSize?: number;
  search?: string;
  name?: string;
}

interface PaginatedResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class ProductRepository {

  async create(productData: ProductCreationAttributes): Promise<Product> {
    return await Product.create(productData);
  }

  async findAll({
    page = 1,
    pageSize = 10,
    search,
    name
  }: FindAllParams = {}): Promise<PaginatedResult> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const whereConditions: any = {};
    
    if (name) {
      whereConditions.name = { [Op.like]: `%${name}%` };
    }

    const searchConditions = search ? {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { '$brand.name$': { [Op.like]: `%${search}%` } }
      ]
    } : {};

    const where = { ...whereConditions, ...searchConditions };

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: Brand,
          as: 'brand',
          required: false,
        }
      ],
      limit,
      offset,
      distinct: true,
      order: [['name', 'ASC']]
    });

    return {
      products: rows,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize)
    };
  }

  async findById(id: string): Promise<Product | null> {
    return await Product.findByPk(id, {
      include: [
        {
          model: Brand,
          as: 'brand'
        }
      ]
    });
  }

async findByNameAndBrand(name: string, brandId: string): Promise<Product | null> {
  return await Product.findOne({
    where: {
      [Op.and]: [
        { brandId },
        where(fn('LOWER', col('name')), name.toLowerCase())
      ]
    }
  });
}
}

export default new ProductRepository();