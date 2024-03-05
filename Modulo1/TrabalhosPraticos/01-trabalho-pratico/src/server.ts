import express from 'express';

import { routesBrand } from './routes';

const app = express();

app.use(express.json());

app.use('/marcas', routesBrand);

app.listen(3333, () => console.log('🚀 Server is Running!!'))