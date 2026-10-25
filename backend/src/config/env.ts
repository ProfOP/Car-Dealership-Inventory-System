import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().min(16).default('development-only-change-this-secret'),
  PORT: z.coerce.number().int().positive().default(8080),
  FRONTEND_ORIGIN: z.string().default('http://localhost:5173'),
  ADMIN_EMAIL: z.string().email().default('admin@dealership.com'),
  ADMIN_PASSWORD: z.string().min(6).default('admin123')
});

export const env = schema.parse(process.env);
