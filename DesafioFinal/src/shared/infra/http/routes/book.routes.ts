import { Router } from 'express';

import { bookController } from '../../../factories/book.factory';

const bookRouter = Router();

bookRouter.get('/', (req, res) => {
  return bookController.get(req, res);
});

bookRouter.get('/:id', (req, res) => {
  return bookController.getById(req, res);
});

bookRouter.get('/author/:authorId', (req, res) => {
  return bookController.getByAuthorId(req, res);
});

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

bookRouter.delete('/info/:bookInfoId', (req, res) => {
  return bookController.deleteBookInfo(req, res);
});

bookRouter.post('/:id/evaluation', (req, res) => {
  return bookController.createEvaluation(req, res);
});

bookRouter.delete('/:id/evaluation/:index', (req, res) => {
  return bookController.deleteEvaluation(req, res);
});

export { bookRouter };
