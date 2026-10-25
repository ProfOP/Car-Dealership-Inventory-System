import { Router } from 'express';
import { credentialsSchema } from '../validators.js';
import { authService } from '../services/authService.js';
const router = Router();
router.post('/register', async (req, res, next) => { try { const body = credentialsSchema.parse(req.body); res.status(201).json(await authService.register(body.email, body.password)); } catch (e) { next(e); } });
router.post('/login', async (req, res, next) => { try { const body = credentialsSchema.parse(req.body); res.json(await authService.login(body.email, body.password)); } catch (e) { next(e); } });
export default router;
