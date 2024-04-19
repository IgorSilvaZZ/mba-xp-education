import { Router } from 'express';

import { authorController } from '../../../factories/author.factory';

const authorRouter = Router();

authorRouter.get('/', (req, res) => {
  return authorController.get(req, res);
});

authorRouter.get('/:id', (req, res) => {
  return authorController.getById(req, res);
});

authorRouter.post('/', (req, res) => {
  return authorController.create(req, res);
});

authorRouter.put('/:id', (req, res) => {
  return authorController.update(req, res);
});

authorRouter.delete('/:id', (req, res) => {
  return authorController.delete(req, res);
});

export { authorRouter };
