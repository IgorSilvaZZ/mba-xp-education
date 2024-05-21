import { Brand } from './interfaces/Brand.interface';

import { drawsBrand, getBrandLimit, groupForQuantityModels } from './utils/brandUtils';
import { getBrandListFile } from './utils/getBrandListFile';

export class BrandServices {

    async getBrandMaxModels() {
        const brandList = await getBrandListFile();

        let firstNameMaxModel = "";

        let brandMax = Number.MIN_VALUE;

        // Forma mais reduzida de pegar o maior numero de modelos
        /* const arrayReduce = brandList.reduce((currentBrand, nextBrand) => {
            return currentBrand.models.length > nextBrand.models.length ? currentBrand : nextBrand;
        }); */

        for (let item of brandList) {
            const quantityModels = item.models.length;
            const brandName = item.brand;
        
            if (quantityModels > brandMax) {
              brandMax = quantityModels;
              firstNameMaxModel = brandName;
            }
        }

        const brands = drawsBrand(firstNameMaxModel, brandList, brandMax);
        
        return brands
    }

    async getBrandMinModels() {
        const brandList = await getBrandListFile();

        let firstNameMinModel = "";

        let brandMin = Number.MAX_VALUE;

        for (let item of brandList) {
            const quantityModels = item.models.length;
            const brandName = item.brand;
        
            if (quantityModels < brandMin) {
                brandMin = quantityModels;
                firstNameMinModel = brandName;
            }
        }

        const brands = drawsBrand(firstNameMinModel, brandList, brandMin);

        return brands;
    }

    async getBrandMaxToLimit(limitBrand: number) {
        const brandList = await getBrandListFile();

        const result: Brand[] = [];

        // Colocando a lista em forma decrescente
        const sortBrandList = brandList.sort((a, b) => b.models.length - a.models.length);

        const brandListLimit = getBrandLimit(limitBrand, sortBrandList);

        const brandPerQuantityModels = groupForQuantityModels(brandListLimit);

        // Ordenando esse lista agrupada em ordem descrescente e por fim guardando em uma lista de resultado
        Object.keys(brandPerQuantityModels).sort((a, b) => parseInt(b) - parseInt(a)).forEach((quantity) => {
            result.push(...brandPerQuantityModels[Number(quantity)]);
        })

        const listFormatted = result.map(item => `${item.brand} - ${item.models.length}`);

        return listFormatted;
    }

    async getBrandMinToLimit(limitBrand: number) {
        const brandList = await getBrandListFile();
        
        const result: Brand[] = [];

        // Colocando a lista em forma crescente
        const sortBrandList = brandList.sort((a, b) => a.models.length - b.models.length);

        const brandListLimit = getBrandLimit(limitBrand, sortBrandList);

        const brandPerQuantityModels = groupForQuantityModels(brandListLimit);

        Object.keys(brandPerQuantityModels).sort((a, b) => parseInt(a) - parseInt(b)).forEach((quantity) => {
            result.push(...brandPerQuantityModels[Number(quantity)]);
        });

        const listFormatted = result.map(item => `${item.brand} - ${item.models.length}`);

        return listFormatted;
    }

    async getBrandByName(name: string) {
        const brandList = await getBrandListFile();

        const brandByName = brandList.find(item => item.brand.toLowerCase() === name.toLowerCase());

        if (!brandByName) {
            return []
        }

        return brandByName.models;
    }

}
