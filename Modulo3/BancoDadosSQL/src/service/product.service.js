import { ProductRepository } from "../repositories/product.repository.js";
import { SupplierRepository } from "../repositories/supplier.repository.js";
import { SaleRepository } from "../repositories/sale.repository.js";

export class ProductService {
  constructor() {
    this._productRepository = new ProductRepository();
    this._supplierRepository = new SupplierRepository();
    this._saleRepository = new SaleRepository();
  }

  async getProducts() {
    const products = await this._productRepository.getProducts();

    return products;
  }

  async getProductById(id) {
    const product = await this._productRepository.getProductById(id);

    return product;
  }

  async create(dataProduct) {
    const supplierExists = await this._supplierRepository.getSupplierById(
      dataProduct.supplierId
    );

    if (!supplierExists) {
      throw new Error("Supplier not exists");
    }

    const product = await this._productRepository.create(dataProduct);

    return product;
  }

  async updateProduct(id, dataProduct) {
    const supplierExists = await this._supplierRepository.getSupplierById(
      dataProduct.supplierId
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

    if (!productSaleExists) {
      throw new Error("Product error in delete!");
    }

    await this._productRepository.deleteProductById(id);
  }
}
