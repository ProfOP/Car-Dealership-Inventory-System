import { prisma } from '../db.js';
import type { Prisma } from '@prisma/client';

export const vehicleRepository = {
  list: (where: Prisma.VehicleWhereInput = {}) => prisma.vehicle.findMany({ where, orderBy: { id: 'asc' } }),
  findById: (id: number) => prisma.vehicle.findUnique({ where: { id } }),
  create: (data: Prisma.VehicleCreateInput) => prisma.vehicle.create({ data }),
  update: (id: number, data: Prisma.VehicleUpdateInput) => prisma.vehicle.update({ where: { id }, data }),
  delete: (id: number) => prisma.vehicle.delete({ where: { id } }),
  purchase: async (id: number, quantity: number) => prisma.$transaction(async (tx) => {
    const changed = await tx.$executeRaw`UPDATE Vehicle SET quantity = quantity - ${quantity}, updatedAt = CURRENT_TIMESTAMP WHERE id = ${id} AND quantity >= ${quantity}`;
    if (changed !== 1) return null;
    return tx.vehicle.findUnique({ where: { id } });
  }),
  restock: (id: number, quantity: number) => prisma.vehicle.update({ where: { id }, data: { quantity: { increment: quantity } } })
};
