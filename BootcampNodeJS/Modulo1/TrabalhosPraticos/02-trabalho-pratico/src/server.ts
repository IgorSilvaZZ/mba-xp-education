import express from 'express';
import { solicitationsRouter } from './solicitations.routes';

const app = express();

app.use(express.json());

app.use('/solicitations', solicitationsRouter);

app.listen(3333, () => console.log('🚀 Server is Running!'))