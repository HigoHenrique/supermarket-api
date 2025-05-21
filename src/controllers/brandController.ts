import { Request, Response } from 'express';
import brandService from '../services/brandService';
import { handleError } from '../utils/error';

export class BrandController {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const brand = await brandService.createBrand(name);
      return res.status(201).json(brand);
    } catch (error) {
      const appError = handleError(error);
      return res.status(appError.statusCode).json({ error: appError.message });
    }
  }

  async listAll(req: Request, res: Response): Promise<Response> {
    try {
      const brands = await brandService.listAllBrands();
      return res.json(brands);
    } catch (error) {
      const appError = handleError(error);
      return res.status(appError.statusCode).json({ error: appError.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const brand = await brandService.getBrandById(id);
      return res.json(brand);
    } catch (error) {
      const appError = handleError(error);
      return res.status(appError.statusCode).json({ error: appError.message });
    }
  }
}

export default new BrandController();