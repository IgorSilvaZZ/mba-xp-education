import { Router } from 'express';

import { bookController } from '../../../factories/book.factory';

const bookRouter = Router();

bookRouter.post('/', (req, res) => {
  return bookController.create(req, res);
});

bookRouter.post('/info', (req, res) => {
  return bookController.createBookInfo(req, res);
});

export { bookRouter };
