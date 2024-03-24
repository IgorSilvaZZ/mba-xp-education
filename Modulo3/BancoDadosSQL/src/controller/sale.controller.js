import { SaleService } from "../service/sale.service.js";

export class SaleController {
  constructor() {
    this.saleService = new SaleService();
  }

  async get(req, res, next) {
    try {
      const clients = await this.saleService.getSales();

      return res.json(clients);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const clients = await this.saleService.getSaleById(id);

      return res.json(clients);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const { value, date, clientId, productId } = req.body;

    try {
      if (!value || !date || !clientId || !productId) {
        throw new Error("Value, Date, ClientId and ProductId is required!");
      }

      const dataSale = {
        value,
        date,
        clientId,
        productId,
      };

      const sale = await this.saleService.create(dataSale);

      res.status(201).json(sale);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { value, date, clientId, productId } = req.body;

    try {
      if (!id) {
        throw new Error("Id is required!");
      }

      if (!value || !date || !clientId || !productId) {
        throw new Error("Value, Date, ClientId and ProductId is required!");
      }

      const dataSale = {
        value,
        date,
        clientId,
        productId,
      };

      const saleUpdated = await this.saleService.updateSaleById(id, dataSale);

      return res.json(saleUpdated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await this.saleService.deleteSaleById(id);

      return res.end();
    } catch (error) {
      next(error);
    }
  }
}
