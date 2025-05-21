import { Router } from 'express';
import brandController from '../controllers/brandController';
import { validateCreateBrand, validateIdParam } from '../middlewares/validation';

const router = Router();

router.post('/', validateCreateBrand, brandController.create);
router.get('/', brandController.listAll);
router.get('/:id', validateIdParam, brandController.getById);

export default router;