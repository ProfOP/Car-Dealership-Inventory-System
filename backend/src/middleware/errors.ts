import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
export const notFoundHandler: RequestHandler = (_req, res) => res.status(404).json({ error: 'Route not found' });
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => { if (error instanceof ZodError) return res.status(400).json({ error: 'Validation failed', details: error.flatten().fieldErrors }); const status = Number(error.status) || 500; return res.status(status).json({ error: status === 500 ? 'Internal server error' : error.message }); };
