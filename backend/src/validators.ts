import { z } from 'zod';

export const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(6).max(100) });
export const vehicleSchema = z.object({ make: z.string().trim().min(1).max(80), model: z.string().trim().min(1).max(80), category: z.string().trim().min(1).max(50), price: z.coerce.number().nonnegative(), quantity: z.coerce.number().int().nonnegative() });
export const quantitySchema = z.object({ quantity: z.coerce.number().int().positive().max(100000) });
export const searchSchema = z.object({ make: z.string().optional(), model: z.string().optional(), category: z.string().optional(), minPrice: z.coerce.number().nonnegative().optional(), maxPrice: z.coerce.number().nonnegative().optional() });
