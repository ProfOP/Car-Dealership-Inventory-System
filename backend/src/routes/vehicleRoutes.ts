import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { quantitySchema, searchSchema, vehicleSchema } from '../validators.js';
import { vehicleService } from '../services/vehicleService.js';
const router = Router();
function parseId(raw: string | string[]) { const value = Array.isArray(raw) ? raw[0] : raw; const id = Number(value); if (!Number.isSafeInteger(id) || id < 1) throw Object.assign(new Error('Invalid vehicle identifier'), { status: 400 }); return id; }
router.use(requireAuth);
router.get('/', async (_req, res, next) => { try { res.json(await vehicleService.list()); } catch (e) { next(e); } });
router.get('/search', async (req, res, next) => { try { res.json(await vehicleService.search(searchSchema.parse(req.query))); } catch (e) { next(e); } });
router.get('/:id', async (req, res, next) => { try { res.json(await vehicleService.get(parseId(req.params.id))); } catch (e) { next(e); } });
router.post('/', requireRole('ADMIN'), async (req, res, next) => { try { res.status(201).json(await vehicleService.create(vehicleSchema.parse(req.body))); } catch (e) { next(e); } });
router.put('/:id', requireRole('ADMIN'), async (req, res, next) => { try { res.json(await vehicleService.update(parseId(req.params.id), vehicleSchema.parse(req.body))); } catch (e) { next(e); } });
router.delete('/:id', requireRole('ADMIN'), async (req, res, next) => { try { await vehicleService.remove(parseId(req.params.id)); res.status(204).send(); } catch (e) { next(e); } });
router.post('/:id/purchase', async (req, res, next) => { try { const quantity = req.body?.quantity === undefined ? 1 : quantitySchema.parse({ quantity: req.body.quantity }).quantity; res.json(await vehicleService.purchase(parseId(req.params.id), quantity)); } catch (e) { next(e); } });
router.post('/:id/restock', requireRole('ADMIN'), async (req, res, next) => { try { const quantity = quantitySchema.parse({ quantity: req.query.quantity ?? req.body?.quantity }).quantity; res.json(await vehicleService.restock(parseId(req.params.id), quantity)); } catch (e) { next(e); } });
export default router;
