import bcrypt from 'bcryptjs';
import { prisma } from '../src/db.js';
import { env } from '../src/config/env.js';
const adminPasswordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
await prisma.user.upsert({ where: { email: env.ADMIN_EMAIL }, update: { role: 'ADMIN', passwordHash: adminPasswordHash }, create: { email: env.ADMIN_EMAIL, passwordHash: adminPasswordHash, role: 'ADMIN' } });
if (await prisma.vehicle.count() === 0) await prisma.vehicle.createMany({ data: [
  { make: 'Toyota', model: 'Camry', category: 'Sedan', price: 28500, quantity: 12 }, { make: 'Honda', model: 'Civic', category: 'Sedan', price: 24900, quantity: 8 }, { make: 'BMW', model: 'X5', category: 'SUV', price: 62500, quantity: 5 }, { make: 'Ford', model: 'Mustang', category: 'Sports', price: 55000, quantity: 3 }, { make: 'Tesla', model: 'Model 3', category: 'Electric', price: 42000, quantity: 7 }, { make: 'Chevrolet', model: 'Silverado', category: 'Truck', price: 48500, quantity: 6 }
] });
await prisma.$disconnect();
