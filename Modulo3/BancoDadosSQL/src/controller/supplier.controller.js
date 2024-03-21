import { SupplierService } from "../service/supplier.service.js";

export class SupplierController {
  constructor() {
    this._supplierService = new SupplierService();
  }

  async get(req, res, next) {
    try {
      const suppliers = await this._supplierService.getSuppliers();

      return res.json(suppliers);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const supplier = await this._supplierService.getSupplierById(id);

      return res.json(supplier);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const { name, cnpj, phone, email, address } = req.body;

    try {
      if (!name || !cnpj || !phone || !email || !address) {
        throw new Error("Name, CNPJ, Phone, Email and Address is required!");
      }

      const dataSupplier = {
        name,
        cnpj,
        phone,
        email,
        address,
      };

      const supplier = await this._supplierService.create(dataSupplier);

      res.status(201).json(supplier);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name, cnpj, phone, email, address } = req.body;

    try {
      if (!id) {
        throw new Error("Id is required!");
      }

      if (!name || !cnpj || !phone || !email || !address) {
        throw new Error("Name, CNPJ, Phone, Email and Address is required!");
      }

      const dataSupplier = {
        name,
        cnpj,
        phone,
        email,
        address,
      };

      const supplierUpdated = await this._supplierService.updateSupplier(
        id,
        dataSupplier
      );

      return res.json(supplierUpdated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await this._supplierService.deleteSupplier(id);

      return res.end();
    } catch (error) {
      next(error);
    }
  }
}
