import { Router } from 'express';

import { authorController } from '../../../factories/author.factory';

const authorRouter = Router();

authorRouter.post('/', (req, res) => {
  return authorController.create(req, res);
});

export { authorRouter };
