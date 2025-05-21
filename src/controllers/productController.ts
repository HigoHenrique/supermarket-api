import { Request, Response } from 'express';
import productService from '../services/productService';
import { handleError } from '../utils/error';

export class ProductController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, description, image, brandId } = req.body;
      const product = await productService.createProduct({
        name,
        price,
        description,
        image,
        brandId,
      });
      return res.status(201).json(product);
    } catch (error) {
      const appError = handleError(error);
      return res.status(appError.statusCode).json({ error: appError.message });
    }
  }

  async listAll(req: Request, res: Response): Promise<Response> {
    try {
      const { page, pageSize, search, name } = req.query;
      
      const result = await productService.listProducts({
        page: page ? parseInt(page as string, 10) : undefined,
        pageSize: pageSize ? parseInt(pageSize as string, 10) : undefined,
        search: search as string | undefined,
        name: name as string | undefined,
      });
      
      return res.json(result);
    } catch (error) {
      const appError = handleError(error);
      return res.status(appError.statusCode).json({ error: appError.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      return res.json(product);
    } catch (error) {
      const appError = handleError(error);
      return res.status(appError.statusCode).json({ error: appError.message });
    }
  }
}

export default new ProductController();