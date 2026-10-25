import bcrypt from 'bcryptjs';
import request from 'supertest';
import { beforeAll, beforeEach, afterAll, describe, expect, it } from 'vitest';
import { app } from '../../src/app.js';
import { prisma } from '../../src/db.js';

const admin = { email: 'qa-admin@example.com', password: 'AdminPass123' };
const user = { email: 'qa-user@example.com', password: 'UserPass123' };
let adminToken = '';
let userToken = '';

async function login(credentials: typeof admin) {
  const response = await request(app).post('/api/auth/login').send(credentials);
  expect(response.status).toBe(200);
  return response.body.token as string;
}
function auth(token: string) { return { Authorization: `Bearer ${token}` }; }
async function createVehicle(overrides: Partial<{ make: string; model: string; category: string; price: number; quantity: number }> = {}) {
  return prisma.vehicle.create({ data: { make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 24000, quantity: 5, ...overrides } });
}

beforeAll(async () => {
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: [
    { email: admin.email, passwordHash: await bcrypt.hash(admin.password, 4), role: 'ADMIN' },
    { email: user.email, passwordHash: await bcrypt.hash(user.password, 4), role: 'USER' }
  ] });
  adminToken = await login(admin);
  userToken = await login(user);
});
beforeEach(async () => { await prisma.vehicle.deleteMany(); });
afterAll(async () => { await prisma.$disconnect(); });

describe('authentication and authorization', () => {
  it('registers a User and never accepts a client-supplied Admin role', async () => {
    const response = await request(app).post('/api/auth/register').send({ email: 'new@example.com', password: 'Password123', role: 'ADMIN' });
    expect(response.status).toBe(201);
    expect(response.body.role).toBe('ROLE_USER');
    expect(response.body).not.toHaveProperty('passwordHash');
    expect(await prisma.user.findUnique({ where: { email: 'new@example.com' } })).toMatchObject({ role: 'USER' });
  });
  it('rejects duplicate, invalid, incomplete, and weak registrations', async () => {
    expect((await request(app).post('/api/auth/register').send(admin)).status).toBe(409);
    expect((await request(app).post('/api/auth/register').send({ email: 'bad', password: 'Password123' })).status).toBe(400);
    expect((await request(app).post('/api/auth/register').send({ email: 'missing@example.com' })).status).toBe(400);
    expect((await request(app).post('/api/auth/register').send({ email: 'weak@example.com', password: 'short' })).status).toBe(400);
  });
  it('logs in successfully and rejects incorrect or unknown credentials', async () => {
    const response = await request(app).post('/api/auth/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ email: user.email, role: 'ROLE_USER' });
    expect(response.body).not.toHaveProperty('passwordHash');
    expect((await request(app).post('/api/auth/login').send({ ...user, password: 'wrongpass' })).status).toBe(401);
    expect((await request(app).post('/api/auth/login').send({ email: 'none@example.com', password: user.password })).status).toBe(401);
  });
  it('enforces missing, malformed, invalid, and expired JWTs', async () => {
    expect((await request(app).get('/api/vehicles')).status).toBe(401);
    expect((await request(app).get('/api/vehicles').set('Authorization', 'Token abc')).status).toBe(401);
    expect((await request(app).get('/api/vehicles').set('Authorization', 'Bearer abc')).status).toBe(401);
    expect((await request(app).get('/api/vehicles').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjF9.invalid')).status).toBe(401);
  });
  it('allows users to read and purchase but rejects Admin-only mutations', async () => {
    const vehicle = await createVehicle();
    expect((await request(app).get('/api/vehicles').set(auth(userToken))).status).toBe(200);
    expect((await request(app).post('/api/vehicles').set(auth(userToken)).send({ make: 'Ford', model: 'Fiesta', category: 'Sedan', price: 10000, quantity: 1 })).status).toBe(403);
    expect((await request(app).delete(`/api/vehicles/${vehicle.id}`).set(auth(userToken))).status).toBe(403);
    expect((await request(app).post(`/api/vehicles/${vehicle.id}/restock?quantity=1`).set(auth(userToken))).status).toBe(403);
  });
});

describe('vehicle management and search', () => {
  it('creates, reads, updates, and deletes vehicles as Admin', async () => {
    const payload = { make: 'Ford', model: 'Mustang', category: 'Sports', price: 55000, quantity: 2 };
    const created = await request(app).post('/api/vehicles').set(auth(adminToken)).send(payload);
    expect(created.status).toBe(201);
    expect(created.body).toMatchObject(payload);
    expect((await request(app).get(`/api/vehicles/${created.body.id}`).set(auth(userToken))).body).toMatchObject(payload);
    const updated = await request(app).put(`/api/vehicles/${created.body.id}`).set(auth(adminToken)).send({ ...payload, quantity: 4 });
    expect(updated.status).toBe(200);
    expect(updated.body.quantity).toBe(4);
    expect((await request(app).delete(`/api/vehicles/${created.body.id}`).set(auth(adminToken))).status).toBe(204);
    expect((await request(app).get(`/api/vehicles/${created.body.id}`).set(auth(adminToken))).status).toBe(404);
  });
  it('rejects invalid vehicle data, missing vehicles, and malformed identifiers', async () => {
    const invalid = { make: '', model: 'X', category: 'SUV', price: -1, quantity: -2 };
    expect((await request(app).post('/api/vehicles').set(auth(adminToken)).send(invalid)).status).toBe(400);
    expect((await request(app).post('/api/vehicles').set(auth(adminToken)).send({ make: 'X' })).status).toBe(400);
    expect((await request(app).get('/api/vehicles/99999').set(auth(userToken))).status).toBe(404);
    expect((await request(app).get('/api/vehicles/not-an-id').set(auth(userToken))).status).toBe(400);
  });
  it('supports make, model, category, price, combined, and empty-result searches', async () => {
    await createVehicle({ make: 'Toyota', model: 'Camry', category: 'Sedan', price: 30000 });
    await createVehicle({ make: 'Honda', model: 'Civic', category: 'Sedan', price: 25000 });
    await createVehicle({ make: 'BMW', model: 'X5', category: 'SUV', price: 65000 });
    const search = (query: Record<string, string>) => request(app).get('/api/vehicles/search').query(query).set(auth(userToken));
    expect((await search({ make: 'toyota' })).body).toHaveLength(1);
    expect((await search({ model: 'Civic' })).body).toHaveLength(1);
    expect((await search({ category: 'suv' })).body).toHaveLength(1);
    expect((await search({ minPrice: '26000' })).body).toHaveLength(2);
    expect((await search({ maxPrice: '26000' })).body).toHaveLength(1);
    expect((await search({ make: 'Toyota', category: 'Sedan', minPrice: '29000', maxPrice: '31000' })).body).toHaveLength(1);
    expect((await search({ make: 'does-not-exist' })).body).toHaveLength(0);
    expect((await search({ minPrice: '40000', maxPrice: '1' })).status).toBe(400);
  });
});

describe('inventory persistence and concurrency', () => {
  it('persists purchases, rejects invalid or insufficient purchases, and never goes negative', async () => {
    const vehicle = await createVehicle({ quantity: 2 });
    expect((await request(app).post(`/api/vehicles/${vehicle.id}/purchase`).set(auth(userToken)).send({ quantity: 1 })).body.quantity).toBe(1);
    expect((await prisma.vehicle.findUnique({ where: { id: vehicle.id } }))?.quantity).toBe(1);
    expect((await request(app).post(`/api/vehicles/${vehicle.id}/purchase`).set(auth(userToken)).send({ quantity: 2 })).status).toBe(409);
    expect((await request(app).post(`/api/vehicles/${vehicle.id}/purchase`).set(auth(userToken)).send({ quantity: 0 })).status).toBe(400);
    expect((await request(app).post(`/api/vehicles/${vehicle.id}/purchase`).set(auth(userToken)).send({ quantity: -1 })).status).toBe(400);
    expect((await request(app).post('/api/vehicles/99999/purchase').set(auth(userToken)).send({ quantity: 1 })).status).toBe(404);
    expect((await request(app).post(`/api/vehicles/${vehicle.id}/purchase`).send({ quantity: 1 })).status).toBe(401);
  });
  it('persists Admin restocks and validates restock quantities', async () => {
    const vehicle = await createVehicle({ quantity: 1 });
    expect((await request(app).post(`/api/vehicles/${vehicle.id}/restock?quantity=4`).set(auth(adminToken))).body.quantity).toBe(5);
    expect((await prisma.vehicle.findUnique({ where: { id: vehicle.id } }))?.quantity).toBe(5);
    expect((await request(app).post(`/api/vehicles/${vehicle.id}/restock?quantity=-1`).set(auth(adminToken))).status).toBe(400);
    expect((await request(app).post('/api/vehicles/99999/restock?quantity=1').set(auth(adminToken))).status).toBe(404);
  });
  it('allows exactly stock successful concurrent purchases and rejects the rest', async () => {
    const vehicle = await createVehicle({ quantity: 3 });
    const responses = await Promise.all(Array.from({ length: 5 }, () => request(app).post(`/api/vehicles/${vehicle.id}/purchase`).set(auth(userToken)).send({ quantity: 1 })));
    expect(responses.filter((response) => response.status === 200)).toHaveLength(3);
    expect(responses.filter((response) => response.status === 409)).toHaveLength(2);
    expect((await prisma.vehicle.findUnique({ where: { id: vehicle.id } }))?.quantity).toBe(0);
  }, 20000);
});
