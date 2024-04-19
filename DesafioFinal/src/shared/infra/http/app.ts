import express, { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import 'express-async-errors';

import { connectMongo } from '../mongoose';

import { AppErrors } from '../../errors/AppErrors';

import { clientRouter } from './routes/client.routes';
import { authorRouter } from './routes/author.routes';

const app = express();

app.use(express.json());

connectMongo();

app.use('/client', clientRouter);
app.use('/author', authorRouter);

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
