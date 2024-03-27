import { ProductService } from "../service/product.service.js";

export class ProductController {
  constructor() {
    this._productService = new ProductService();
  }

  async get(req, res, next) {
    try {
      const products = await this._productService.getProducts();

      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const product = await this._productService.getProductById(id);

      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const { name, description, value, stock, supplierId } = req.body;

    try {
      if (!name || !description || !value || !stock || !supplierId) {
        throw new Error(
          "Name, Description, Value, Stock and SupplierId is required!"
        );
      }

      const dataProduct = {
        name,
        description,
        value,
        stock,
        supplierid: supplierId,
      };

      const product = await this._productService.create(dataProduct);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name, description, value, stock, supplierId } = req.body;

    try {
      if (!id) {
        throw new Error("Id is required!");
      }

      if (!name || !description || !value || !stock || !supplierId) {
        throw new Error(
          "Name, Description, Value, Stock and SupplierId is required!"
        );
      }

      const dataProduct = {
        name,
        description,
        value,
        stock,
        supplierid: supplierId,
      };

      const productUpdated = await this._productService.updateProduct(
        id,
        dataProduct
      );

      return res.json(productUpdated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await this._productService.deleteProduct(id);

      return res.end();
    } catch (error) {
      next(error);
    }
  }
}
