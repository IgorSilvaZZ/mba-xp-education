import { Request, Response, NextFunction } from 'express';
import { AppErrors } from '../../../errors/AppErrors';

export const limitAccess = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const clientId = req.client.id;

  console.log(req.originalUrl);

  if (clientId !== 'admin_id') {
    if (
      (req.method === 'PUT' && req.originalUrl.startsWith('/client/')) ||
      (req.method === 'GET' &&
        ['/book/', '/book/author'].some(path =>
          req.originalUrl.startsWith(path),
        )) ||
      (req.method === 'POST' && req.originalUrl.startsWith('/sale/')) ||
      (req.method === 'GET' && req.originalUrl.startsWith('/sale/')) ||
      (req.method === 'GET' &&
        req.originalUrl.startsWith('/book/:bookId/evaluation'))
    ) {
      next();
    } else {
      throw new AppErrors('Forbidden', 404);
    }
  } else {
    next();
  }
};
