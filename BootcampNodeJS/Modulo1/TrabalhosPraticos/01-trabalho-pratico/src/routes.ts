import { Router } from 'express';
import { BrandController } from './brand.controller';

const routesBrand = Router();

const brandController = new BrandController();

routesBrand.get('/maisModelos', brandController.getMaxModelsByBrand);
routesBrand.get('/menosModelos', brandController.getMinModelsByBrand);
routesBrand.get('/listaMaisModelos/:limit', brandController.getMaxModelsByLimit);
routesBrand.get('/listaMenosModelos/:limit', brandController.getMinModelsByLimit);
routesBrand.post('/listaModelos', brandController.getBrandByName);

export { routesBrand }