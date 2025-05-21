import brandRepository from '../repositories/brandRepository';
import Brand from '../models/brand';
import { AppError } from '../utils/error';

export class BrandService {

  async createBrand(name: string): Promise<Brand> {

    const existingBrand = await brandRepository.findByName(name);
    if (existingBrand) {
      throw new AppError('Já existe uma marca com este nome', 400);
    }

    return await brandRepository.create({ name });
  }

  async listAllBrands(): Promise<Brand[]> {
    return await brandRepository.findAll();
  }

  async getBrandById(id: string): Promise<Brand> {
    const brand = await brandRepository.findById(id);
    if (!brand) {
      throw new AppError('Marca não encontrada', 404);
    }
    return brand;
  }
}

export default new BrandService();