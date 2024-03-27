import { ProductRepository } from "../repositories/product.repository.js";
import { SupplierRepository } from "../repositories/supplier.repository.js";
import { SaleRepository } from "../repositories/sale.repository.js";
import { ProductInfoRepository } from "../repositories/productInfo.repository.js";

export class ProductService {
  constructor() {
    this._productRepository = new ProductRepository();
    this._supplierRepository = new SupplierRepository();
    this._saleRepository = new SaleRepository();
    this._productInfoRepository = new ProductInfoRepository();
  }

  async getProducts() {
    const products = await this._productRepository.getProducts();

    return products;
  }

  async getProductById(id) {
    const product = await this._productRepository.getProductById(id);

    const productInfo = await this._productInfoRepository.getProductInfo(id);

    const productWithInfo = {
      ...product,
      ...productInfo,
    };

    return productWithInfo;
  }

  async create(dataProduct) {
    const supplierExists = await this._supplierRepository.getSupplierById(
      dataProduct.supplierid
    );

    if (!supplierExists) {
      throw new Error("Supplier not exists");
    }

    const product = await this._productRepository.create(dataProduct);

    return product;
  }

  async updateProduct(id, dataProduct) {
    const supplierExists = await this._supplierRepository.getSupplierById(
      dataProduct.supplierid
    );

    if (!supplierExists) {
      throw new Error("Supplier not exists");
    }

    const productUpdated = await this._productRepository.updateProductById(
      id,
      dataProduct
    );

    return productUpdated;
  }

  async deleteProduct(id) {
    const productSaleExists = await this._saleRepository.getSalesByProductId(
      id
    );

    if (productSaleExists.length > 0) {
      throw new Error(
        "It is not possible to delete the product, it contains sales!"
      );
    }

    await this._productRepository.deleteProductById(id);
  }

  async getProductsInfo() {
    const productsInfos = await this._productInfoRepository.getProductsInfo();

    return productsInfos;
  }

  async createProductInfo(productInfoData) {
    const productInfo = await this._productInfoRepository.createProductInfo(
      productInfoData
    );

    return productInfo;
  }

  async updateProductInfo(productId, productInfoData) {
    const productInfoUpdated =
      await this._productInfoRepository.updateProductInfo(
        productId,
        productInfoData
      );

    return productInfoUpdated;
  }

  async deleteProductInfo(productId) {
    await this._productInfoRepository.deleteProductInfo(productId);
  }

  async createReviewProductInfo(productId, review) {
    const newReview = await this._productInfoRepository.createReviewProductInfo(
      productId,
      review
    );

    return newReview;
  }

  async deleteReviewProductInfo(productId, indexReview) {
    const newReview = await this._productInfoRepository.deleteReviewProductInfo(
      productId,
      indexReview
    );

    return newReview;
  }
}
