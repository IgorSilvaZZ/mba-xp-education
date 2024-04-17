import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import { AppErrors } from '../errors/AppErrors';

const app = express();

app.use(express.json());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppErrors) {
        return res.status(error.statusCode).json({
            message: error.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${error.message}`
    })
});

export { app }