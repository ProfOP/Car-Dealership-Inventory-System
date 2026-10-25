import { describe, expect, it } from 'vitest';
import { vehicleService } from '../src/services/vehicleService.js';
describe('vehicle service validation', () => { it('rejects an inverted price range', async () => { await expect(vehicleService.search({ minPrice: 50, maxPrice: 10 })).rejects.toMatchObject({ status: 400 }); }); });
