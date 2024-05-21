import { Router } from 'express';
import { SolicitationsController } from './solicitations.controller';

const solicitationsRouter = Router();

const solicitationsController = new SolicitationsController();

solicitationsRouter.get('/maxSolicitations', solicitationsController.getMaxSolicitations);
solicitationsRouter.get('/totalDeliveredProduct', solicitationsController.getTotalDeliveredProduct);
solicitationsRouter.get('/totalDelivered', solicitationsController.getTotalDeliveredByClient);
solicitationsRouter.get('/:id', solicitationsController.getById);
solicitationsRouter.post('/', solicitationsController.create);
solicitationsRouter.put('/:id', solicitationsController.update);
solicitationsRouter.patch('/:id', solicitationsController.updateDelivered);
solicitationsRouter.delete('/:id', solicitationsController.delete);

export { solicitationsRouter };