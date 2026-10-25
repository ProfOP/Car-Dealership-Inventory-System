import { prisma } from '../db.js';
export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email: email.toLowerCase() } }),
  create: (data: { email: string; passwordHash: string; role?: 'USER' | 'ADMIN' }) => prisma.user.create({ data })
};
