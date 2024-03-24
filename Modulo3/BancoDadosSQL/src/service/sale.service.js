import { SaleRepository } from "../repositories/sale.repository.js";
import { ClientRepository } from "../repositories/client.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class SaleService {
  constructor() {
    this._saleRepository = new SaleRepository();
    this._clientRepository = new ClientRepository();
    this._productRepository = new ProductRepository();
  }

  async getSales() {
    const sales = await this._saleRepository.getSales();

    return sales;
  }

  async getSaleById(id) {
    const client = await this._saleRepository.getSaleById(id);

    return client;
  }

  async create({ value, date, clientId, productId }) {
    const clientExists = await this._clientRepository.getClientById(clientId);

    let error = "";

    if (!clientExists) {
      error += "Client not exists!";
    }

    const productExists = await this._productRepository.getProductById(
      productId
    );

    if (!productExists) {
      error += "Product not exits!";
    }

    if (error) {
      throw new Error(error);
    }

    if (productExists.stock > 0) {
      throw new Error("Product unavailable for sale!");
    }

    const productUpdated = {
      ...productExists,
      stock: productExists.stock - 1,
    };

    this._productRepository.updateProductById(productId, productUpdated);

    const sale = await this._saleRepository.create({
      value,
      date,
      clientId,
      productId,
    });

    return sale;
  }

  async updateSaleById(id, dataSale) {
    const clientExists = await this._clientRepository.getClientById(clientId);

    let error = "";

    if (!clientExists) {
      error += "Client not exists!";
    }

    const productExists = await this._productRepository.getProductById(
      productId
    );

    if (!productExists) {
      error += "Product not exits!";
    }

    if (error) {
      throw new Error(error);
    }

    const saleUpdated = await this._saleRepository.updateSaleById(id, dataSale);

    return saleUpdated;
  }

  async deleteSaleById(id) {
    await this._saleRepository.deleteSaleById(id);
  }
}
