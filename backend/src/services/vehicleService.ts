import { Prisma } from '@prisma/client';
import { vehicleRepository } from '../repositories/vehicleRepository.js';

const notFound = () => Object.assign(new Error('Vehicle not found'), { status: 404 });
export const vehicleService = {
  async get(id: number) { const vehicle = await vehicleRepository.findById(id); if (!vehicle) throw notFound(); return vehicle; },
  list: () => vehicleRepository.list(),
  async search(filters: { make?: string; model?: string; category?: string; minPrice?: number; maxPrice?: number }) {
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined && filters.minPrice > filters.maxPrice) throw Object.assign(new Error('minPrice cannot exceed maxPrice'), { status: 400 });
    // SQLite's LIKE operator is case-insensitive for ASCII text; avoiding Prisma's
    // provider-specific `mode` keeps this query portable across local/test databases.
    const contains = (value?: string) => value ? { contains: value } : undefined;
    return vehicleRepository.list({ make: contains(filters.make), model: contains(filters.model), category: contains(filters.category), price: { gte: filters.minPrice, lte: filters.maxPrice } });
  },
  async create(data: { make: string; model: string; category: string; price: number; quantity: number }) { return vehicleRepository.create(data); },
  async update(id: number, data: { make: string; model: string; category: string; price: number; quantity: number }) { if (!(await vehicleRepository.findById(id))) throw notFound(); return vehicleRepository.update(id, data); },
  async remove(id: number) { if (!(await vehicleRepository.findById(id))) throw notFound(); await vehicleRepository.delete(id); },
  async purchase(id: number, quantity: number) { const updated = await vehicleRepository.purchase(id, quantity); if (!updated) { if (!(await vehicleRepository.findById(id))) throw notFound(); throw Object.assign(new Error('Insufficient stock'), { status: 409 }); } return updated; },
  async restock(id: number, quantity: number) { if (!(await vehicleRepository.findById(id))) throw notFound(); return vehicleRepository.restock(id, quantity); }
};
