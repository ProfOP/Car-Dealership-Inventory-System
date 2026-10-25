import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env.js';
import type { AuthUser } from '../types.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) { const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined; if (!token) return res.status(401).json({ error: 'Authentication required' }); try { req.user = jwt.verify(token, env.JWT_SECRET) as AuthUser; next(); } catch { return res.status(401).json({ error: 'Invalid or expired token' }); } }
export function requireRole(role: 'ADMIN') { return (req: Request, res: Response, next: NextFunction) => req.user?.role === role ? next() : res.status(403).json({ error: 'Admin access required' }); }
