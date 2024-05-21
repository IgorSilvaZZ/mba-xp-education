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
      const product = await this._productService.getProductById(Number(id));

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

  async getProductsInfo(req, res, next) {
    try {
      const productsInfos = await this._productService.getProductsInfo();

      return res.json(productsInfos);
    } catch (error) {
      next(error);
    }
  }

  async createProductInfo(req, res, next) {
    const { productId, category, width, height, depth, reviews } = req.body;

    try {
      if (!productId) {
        throw new Error("Field productId is required!");
      }

      const productInfo = await this._productService.createProductInfo({
        productId,
        category,
        width,
        height,
        depth,
        reviews,
      });

      return res.status(201).json(productInfo);
    } catch (error) {
      next(error);
    }
  }

  async updateProductInfo(req, res, next) {
    const { productId } = req.params;
    const { category, width, height, depth, reviews } = req.body;

    try {
      if (!productId) {
        throw new Error("Field productId is required!");
      }

      await this._productService.updateProductInfo(Number(productId), {
        category,
        width,
        height,
        depth,
        reviews,
      });

      return res.send();
    } catch (error) {
      next(error);
    }
  }

  async deleteProductInfo(req, res, next) {
    const { productId } = req.params;

    try {
      await this._productService.deleteProductInfo(Number(productId));

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async createReviewProductInfo(req, res, next) {
    const { productId } = req.params;
    const { review } = req.body;

    try {
      if (!productId || !review) {
        throw new Error("Field(s) productId and review is required!");
      }

      const newReview = await this._productService.createReviewProductInfo(
        Number(productId),
        review
      );

      return res.status(201).json(newReview);
    } catch (error) {
      next(error);
    }
  }

  async deleteReviewProductInfo(req, res, next) {
    const { productId, indexReview } = req.params;

    try {
      await this._productService.deleteReviewProductInfo(
        Number(productId),
        Number(indexReview)
      );

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
