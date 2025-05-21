import productRepository from '../repositories/productRepository';
import brandService from './brandService';
import Product, { ProductCreationAttributes } from '../models/product';
import { AppError } from '../utils/error';

interface ProductCreateData {
  name: string;
  price: number;
  description?: string;
  image?: string;
  brandId: string;
}

interface ProductListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  name?: string;
}

interface PaginatedProductResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class ProductService {

  async createProduct(data: ProductCreateData): Promise<Product> {

    await brandService.getBrandById(data.brandId);

    const existingProduct = await productRepository.findByNameAndBrand(data.name, data.brandId);
    if (existingProduct) {
      throw new AppError('Já existe um produto com este nome para esta marca', 400);
    }

    if (data.price <= 0) {
      throw new AppError('O preço deve ser maior que zero', 400);
    }

    if (data.image) {
      try {

        Buffer.from(data.image.split(',')[1] || data.image, 'base64');
      } catch (error) {
        throw new AppError('A imagem fornecida não é um base64 válido', 400);
      }
    }

    return await productRepository.create(data as ProductCreationAttributes);
  }

  async listProducts(params: ProductListParams = {}): Promise<PaginatedProductResult> {
    return await productRepository.findAll(params);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }
    return product;
  }
}

export default new ProductService();