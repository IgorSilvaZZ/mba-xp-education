import { Brand } from "../interfaces/Brand.interface";

interface BrandPerQuantityModels {
    [numberModels: number]: Brand[];
}

export function drawsBrand(nameBrand: string, brandList: Brand[], countBrand: number) {
    const draws = brandList.filter((item) => item.models.length === countBrand && item.brand !== nameBrand).map(item => item.brand);
    
    if (draws.length > 0) {
        return [ ...draws, nameBrand ];
    } else {
        return nameBrand;
    }
}

export function getBrandLimit(limit: number, brandList: Brand[]) {
    const brandListLimit: Brand[] = [];

    for (let i = 0; i < limit; i++) {
        const brand = brandList[i];

        brandListLimit.push(brand);
    }

    return brandListLimit;
}

// Agrupando os modelos por quantidade para saber quais deles tem a mesma quantidad ou nao
// Caso tenha a mesma quantidade de modelos eles são desempatados por ordem alfabetica a partir do nome
export function groupForQuantityModels(brandListLimit: Brand[]) {
    const brandPerQuantityModels: BrandPerQuantityModels = {};

    brandListLimit.forEach((brand) => {
        const quantityModels = brand.models.length;

        if (!brandPerQuantityModels[quantityModels]) {
            brandPerQuantityModels[quantityModels] = []
        }

        brandPerQuantityModels[quantityModels].push(brand);

        if (brandPerQuantityModels[quantityModels].length > 1) {
            brandPerQuantityModels[quantityModels].sort((a, b) => a.brand < b.brand ? -1 : a.brand > b.brand ? 1 : 0);
        }
    });

    return brandPerQuantityModels;
}