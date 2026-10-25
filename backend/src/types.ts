import type { Role } from '@prisma/client';

export type AuthUser = { id: number; email: string; role: Role };
export type VehicleDto = { id: number; make: string; model: string; category: string; price: number; quantity: number };
declare global { namespace Express { interface Request { user?: AuthUser } } }
