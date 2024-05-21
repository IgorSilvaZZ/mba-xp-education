import { Request, Response } from "express";
import { BrandServices } from "./brand.service";

export class BrandController {

    async getMaxModelsByBrand(req: Request, res: Response) {
        const brandServices = new BrandServices();

        try {
            const brandsMaxModels = await brandServices.getBrandMaxModels();

            return res.json(brandsMaxModels);
            
        } catch (error) {

            console.log(error);
            

            return res.status(400).json({ message: "Ocorreu algum erro ao tentar listar", error })
        }
    }

    async getMinModelsByBrand(req: Request, res: Response) {
        const brandServices = new BrandServices();

        try {
            const brandsMinModels = await brandServices.getBrandMinModels();

            return res.json(brandsMinModels);
            
        } catch (error) {
            return res.status(400).json({ message: "Ocorreu algum erro ao tentar listar", error })
        }
    }

    async getMaxModelsByLimit(req: Request, res: Response) {
        const { limit } = req.params;
        
        const brandServices = new BrandServices();

        try {
            const brandsMinModels = await brandServices.getBrandMaxToLimit(Number(limit));

            return res.json(brandsMinModels);
            
        } catch (error) {
            return res.status(400).json({ message: "Ocorreu algum erro ao tentar listar", error })
        }
    }

    async getMinModelsByLimit(req: Request, res: Response) {
        const { limit } = req.params;
        
        const brandServices = new BrandServices();

        try {
            const brandsMinModels = await brandServices.getBrandMinToLimit(Number(limit));

            return res.json(brandsMinModels);
            
        } catch (error) {
            return res.status(400).json({ message: "Ocorreu algum erro ao tentar listar", error })
        }
    }

    async getBrandByName(req: Request, res: Response) {
        const { nameBrand } = req.body;

        const brandServices = new BrandServices();

        try {
            const brandsByName = await brandServices.getBrandByName(String(nameBrand));
            
            return res.json(brandsByName);
            
        } catch (error) {
            console.log(error);

            return res.status(400).json({ message: "Ocorreu algum erro ao tentar listar", error })
        }
    }

}