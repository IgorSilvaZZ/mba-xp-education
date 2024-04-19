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

export { authorRouter };
