import fs from 'fs/promises';
import { join } from 'path';

import { Brand } from '../interfaces/Brand.interface';

export const getBrandListFile = async (): Promise<Brand[]> => {
    const data = await fs.readFile(join(__dirname, '..', 'files', 'car-list.json'), "utf-8");

    const carList = JSON.parse(data) as Brand[];   

    return carList;
}