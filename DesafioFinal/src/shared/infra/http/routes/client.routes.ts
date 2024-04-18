import { Router } from 'express';
import { clientController } from '../../../factories/client.factory';

const clientRouter = Router();

clientRouter.get('/', (req, res) => {
  return clientController.get(req, res);
});

clientRouter.get('/:id', (req, res) => {
  return clientController.getById(req, res);
});

clientRouter.post('/', (req, res) => {
  return clientController.create(req, res);
});

clientRouter.put('/:id', (req, res) => {
  return clientController.update(req, res);
});

clientRouter.delete('/:id', (req, res) => {
  return clientController.delete(req, res);
});

export { clientRouter };
