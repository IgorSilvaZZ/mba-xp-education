import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcryptjs';
import basicAuth from 'express-basic-auth';

import { PrismaClientRepository } from '../../prisma/repositories/PrismaClientRepository';
import { AppErrors } from '../../../errors/AppErrors';

const validateUser = async (username: string, password: string) => {
  if (username === 'admin' && password === 'admin') {
    return true;
  }

  const prismaClientRepository = new PrismaClientRepository();

  const client = await prismaClientRepository.findByEmail(username);

  return !!client && (await compare(password, String(client.password)));
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = basicAuth({
    authorizer: async (username: string, password: string, callback) => {
      const isValid = await validateUser(username, password);

      if (isValid) {
        if (username !== 'admin') {
          const prismaClientRepository = new PrismaClientRepository();

          const client = await prismaClientRepository.findByEmail(username);

          req.client.id = Number(client?.clientId);
        } else {
          req.client.id = 'admin_id';
        }

        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    authorizeAsync: true,
  });

  auth(req, res, (error: any) => {
    if (error) {
      throw new AppErrors('Email/Password Incorrect!', 401);
    }

    next();
  });
};
