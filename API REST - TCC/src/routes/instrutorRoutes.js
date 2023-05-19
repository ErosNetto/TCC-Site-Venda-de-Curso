import { Router } from 'express';
import instrutorController from '../controllers/InstrutorController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// router.get('/', loginRequired, instrutorController.index);
router.post('/', loginRequired, instrutorController.store);
router.put('/:id', loginRequired, instrutorController.update);
router.get('/:id', loginRequired, instrutorController.show);
// router.delete('/:id', loginRequired, instrutorController.delete);

export default router;
