import { SupplierRepository } from "../repositories/supplier.repository.js";

export class SupplierService {
  constructor() {
    this._supplierRepository = new SupplierRepository();
  }

  async getSuppliers() {
    const suppliers = await this._supplierRepository.getSuppliers();

    return suppliers;
  }

  async getSupplierById(id) {
    const supplier = await this._supplierRepository.getSupplierById(id);

    return supplier;
  }

  async create(dataSupplier) {
    const supplier = await this._supplierRepository.create(dataSupplier);

    return supplier;
  }

  async updateSupplier(id, dataSupplier) {
    const supplierUpdated = await this._supplierRepository.updateSupplierById(
      id,
      dataSupplier
    );

    return supplierUpdated;
  }

  async deleteSupplier(id) {
    await this._supplierRepository.deleteSupplierById(id);
  }
}
