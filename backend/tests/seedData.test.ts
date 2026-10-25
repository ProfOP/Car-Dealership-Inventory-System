import { describe, expect, it } from 'vitest';
import { DEMO_VEHICLES, seedDemoVehicles } from '../prisma/seedData.js';

describe('demo inventory seed', () => {
  it('adds missing samples while preserving existing records and remaining idempotent', async () => {
    const records = [{ make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 24000, quantity: 0 }];
    const client = {
      vehicle: {
        findFirst: async ({ where }: { where: { make: string; model: string } }) =>
          records.find((record) => record.make === where.make && record.model === where.model),
        create: async ({ data }: { data: (typeof DEMO_VEHICLES)[number] }) => {
          records.push({ ...data });
          return data;
        },
      },
    };

    expect(await seedDemoVehicles(client)).toBe(DEMO_VEHICLES.length);
    expect(records[0]).toEqual({ make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 24000, quantity: 0 });
    expect(records).toHaveLength(DEMO_VEHICLES.length + 1);
    expect(await seedDemoVehicles(client)).toBe(0);
    expect(records).toHaveLength(DEMO_VEHICLES.length + 1);
  });
});
