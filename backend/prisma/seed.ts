import bcrypt from 'bcryptjs';
import { prisma } from '../src/db.js';
import { env } from '../src/config/env.js';
import { seedDemoVehicles } from './seedData.js';
const adminPasswordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
await prisma.user.upsert({ where: { email: env.ADMIN_EMAIL }, update: { role: 'ADMIN', passwordHash: adminPasswordHash }, create: { email: env.ADMIN_EMAIL, passwordHash: adminPasswordHash, role: 'ADMIN' } });
const added = await seedDemoVehicles(prisma);
console.log(`Demo inventory seed complete: ${added} vehicle(s) added.`);
await prisma.$disconnect();
