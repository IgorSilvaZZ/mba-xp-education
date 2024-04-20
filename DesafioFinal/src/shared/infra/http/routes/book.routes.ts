import { Router } from 'express';

import { bookController } from '../../../factories/book.factory';

const bookRouter = Router();

bookRouter.post('/', (req, res) => {
  return bookController.create(req, res);
});

bookRouter.put('/:id', (req, res) => {
  return bookController.update(req, res);
});

bookRouter.post('/info', (req, res) => {
  return bookController.createBookInfo(req, res);
});

bookRouter.put('/info/:bookInfoId', (req, res) => {
  return bookController.updateBookInfo(req, res);
});

export { bookRouter };
