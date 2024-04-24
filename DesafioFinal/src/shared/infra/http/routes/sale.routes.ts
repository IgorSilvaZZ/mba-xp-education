import { Router } from 'express';

import { saleController } from '../../../factories/sale.factory';

const saleRouter = Router();

saleRouter.get('/', (req, res) => {
  return saleController.get(req, res);
});

saleRouter.get('/:id', (req, res) => {
  return saleController.getById(req, res);
});

saleRouter.get('/client/:clientId', (req, res) => {
  return saleController.getClientById(req, res);
});

saleRouter.get('/book/:bookId', (req, res) => {
  return saleController.getBookById(req, res);
});

saleRouter.get('/author/:authorId', (req, res) => {
  return saleController.getAuthorById(req, res);
});

saleRouter.post('/', (req, res) => {
  return saleController.create(req, res);
});

export { saleRouter };
