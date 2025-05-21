import { Router } from 'express';
import productController from '../controllers/productController';
import { validateCreateProduct, validateListProducts, validateIdParam } from '../middlewares/validation';

const router = Router();

router.post('/', validateCreateProduct, productController.create);
router.get('/', validateListProducts, productController.listAll);
router.get('/:id', validateIdParam, productController.getById);

export default router;