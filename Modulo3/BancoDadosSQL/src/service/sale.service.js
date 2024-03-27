import { SaleRepository } from "../repositories/sale.repository.js";
import { ClientRepository } from "../repositories/client.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class SaleService {
  constructor() {
    this._saleRepository = new SaleRepository();
    this._clientRepository = new ClientRepository();
    this._productRepository = new ProductRepository();
  }

  async getSales({ productid, supplierid }) {
    if (productid) {
      return await this._saleRepository.getSalesByProductId(productid);
    }

    if (supplierid) {
      return await this._saleRepository.getSalesBySupplierId(supplierid);
    }

    return await this._saleRepository.getSales();
  }

  async getSaleById(id) {
    const client = await this._saleRepository.getSaleById(id);

    return client;
  }

  async create({ value, data, clientid, productid }) {
    const clientExists = await this._clientRepository.getClientById(clientid);

    let error = "";

    if (!clientExists) {
      error += "Client not exists!";
    }

    const productExists = await this._productRepository.getProductById(
      productid
    );

    if (!productExists) {
      error += "Product not exits!";
    }

    if (error) {
      throw new Error(error);
    }

    if (productExists.stock < 0) {
      throw new Error("Product unavailable for sale!");
    }

    const productUpdated = {
      ...productExists,
      stock: productExists.stock - 1,
    };

    this._productRepository.updateProductById(productid, productUpdated);

    const sale = await this._saleRepository.create({
      value,
      data,
      clientid,
      productid,
    });

    return sale;
  }

  async updateSaleById(id, { value, data, clientid }) {
    const clientExists = await this._clientRepository.getClientById(clientid);

    if (!clientExists) {
      throw new Error("Client not exists!");
    }

    const saleUpdated = await this._saleRepository.updateSaleById(id, {
      value,
      data,
      clientid,
    });

    return saleUpdated;
  }

  async deleteSaleById(id) {
    const sale = await this._saleRepository.getSaleById(id);

    if (!sale) {
      throw new Error("Sale not exists!");
    }

    const productExists = await this._productRepository.getProductById(
      sale.productid
    );

    const productUpdated = {
      ...productExists,
      stock: productExists.stock + 1,
    };

    await this._productRepository.updateProductById(
      productExists.productid,
      productUpdated
    );

    await this._saleRepository.deleteSaleById(id);
  }
}
