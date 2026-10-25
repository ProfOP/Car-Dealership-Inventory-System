export const DEMO_VEHICLES = [
  { make: 'Maruti Suzuki', model: 'Swift', category: 'Hatchback', price: 750000, quantity: 8 },
  { make: 'Maruti Suzuki', model: 'Baleno', category: 'Hatchback', price: 920000, quantity: 6 },
  { make: 'Hyundai', model: 'Creta', category: 'SUV', price: 1450000, quantity: 5 },
  { make: 'Hyundai', model: 'Verna', category: 'Sedan', price: 1350000, quantity: 4 },
  { make: 'Tata', model: 'Nexon', category: 'SUV', price: 1150000, quantity: 7 },
  { make: 'Tata', model: 'Punch', category: 'SUV', price: 850000, quantity: 9 },
  { make: 'Mahindra', model: 'XUV700', category: 'SUV', price: 2200000, quantity: 3 },
  { make: 'Mahindra', model: 'Scorpio N', category: 'SUV', price: 1950000, quantity: 4 },
  { make: 'Honda', model: 'City', category: 'Sedan', price: 1450000, quantity: 5 },
  { make: 'Toyota', model: 'Innova Hycross', category: 'MPV', price: 2800000, quantity: 2 },
  { make: 'Toyota', model: 'Fortuner', category: 'SUV', price: 4200000, quantity: 1 },
  { make: 'Kia', model: 'Seltos', category: 'SUV', price: 1600000, quantity: 6 },
  { make: 'Volkswagen', model: 'Virtus', category: 'Sedan', price: 1550000, quantity: 3 },
  { make: 'Skoda', model: 'Slavia', category: 'Sedan', price: 1500000, quantity: 0 },
  { make: 'MG', model: 'Hector', category: 'SUV', price: 1900000, quantity: 0 },
] as const;

type VehicleSeedClient = {
  vehicle: {
    findFirst(args: { where: { make: string; model: string } }): Promise<unknown>;
    create(args: { data: (typeof DEMO_VEHICLES)[number] }): Promise<unknown>;
  };
};

/** Add only missing demo make/model pairs; existing records remain untouched. */
export async function seedDemoVehicles(client: VehicleSeedClient) {
  let added = 0;
  for (const vehicle of DEMO_VEHICLES) {
    const existing = await client.vehicle.findFirst({
      where: { make: vehicle.make, model: vehicle.model },
    });
    if (!existing) {
      await client.vehicle.create({ data: vehicle });
      added += 1;
    }
  }
  return added;
}
