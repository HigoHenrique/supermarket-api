import { col, fn, where } from 'sequelize';
import Brand from '../models/brand';

export class BrandRepository {

  async create(brandData: { name: string }): Promise<Brand> {
    return await Brand.create(brandData);
  }

  async findAll(): Promise<Brand[]> {
    return await Brand.findAll({
      order: [['name', 'ASC']]
    });
  }

  async findById(id: string): Promise<Brand | null> {
    return await Brand.findByPk(id);
  }

  // async findByName(name: string): Promise<Brand | null> {
  //   return await Brand.findOne({
  //     where: { name }
  //   });
  // }

  async findByName(name: string): Promise<Brand | null> {
  return await Brand.findOne({
    where: where(fn('LOWER', col('name')), name.toLowerCase())
  });
}
}

export default new BrandRepository();