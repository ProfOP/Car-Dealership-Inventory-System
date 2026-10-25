import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';
describe('API security boundary', () => {
  it('requires authentication for inventory', async () => { const response = await request(app).get('/api/vehicles'); expect(response.status).toBe(401); });
  it('rejects invalid registration input', async () => { const response = await request(app).post('/api/auth/register').send({ email: 'invalid', password: 'short' }); expect(response.status).toBe(400); });
});
