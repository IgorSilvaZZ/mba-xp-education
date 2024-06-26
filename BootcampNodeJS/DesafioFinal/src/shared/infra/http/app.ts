import express, { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import 'express-async-errors';

import { connectMongo } from '../mongoose';

import { AppErrors } from '../../errors/AppErrors';

import { authenticate } from './middlewares/ensureAuthenticate';
import { limitAccess } from './middlewares/limitAccess';

import { clientRouter } from './routes/client.routes';
import { authorRouter } from './routes/author.routes';
import { bookRouter } from './routes/book.routes';
import { saleRouter } from './routes/sale.routes';

const app = express();

app.use(express.json());

connectMongo();

app.use(authenticate);
app.use(limitAccess);

app.use('/client', clientRouter);
app.use('/author', authorRouter);
app.use('/book', bookRouter);
app.use('/sale', saleRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json(error.issues);
  } else if (error instanceof AppErrors) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  });
});

export { app };
