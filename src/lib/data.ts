import type { FuelPrice, FuelEntry, FuelType, Vehicle, Driver } from './types';

export const fuelPrices: FuelPrice[] = [
  { id: '1', name: 'Petrol', price: 279.79 },
  { id: '2', name: 'Diesel', price: 287.33 },
  { id: '3', name: 'HOBC', price: 330.12 },
];

export let fuelEntries: FuelEntry[] = [
  {
    id: '1',
    date: new Date('2024-07-15T08:30:00'),
    slipNumber: 'SN-001',
    vehicleNumber: 'ABC-123',
    driverName: 'John Doe',
    fuelType: 'Petrol',
    pricePerLiter: 279.79,
    quantity: 30,
    amount: 8393.7,
    meterReading: 150000,
    average: null,
  },
  {
    id: '2',
    date: new Date('2024-07-20T10:00:00'),
    slipNumber: 'SN-002',
    vehicleNumber: 'XYZ-789',
    driverName: 'Jane Smith',
    fuelType: 'Diesel',
    pricePerLiter: 287.33,
    quantity: 50,
    amount: 14366.5,
    meterReading: 20000,
    average: null,
  },
  {
    id: '3',
    date: new Date('2024-07-22T14:45:00'),
    slipNumber: 'SN-003',
    vehicleNumber: 'ABC-123',
    driverName: 'John Doe',
    fuelType: 'Petrol',
    pricePerLiter: 279.79,
    quantity: 35,
    amount: 9792.65,
    meterReading: 150450,
    average: 12.86,
  },
  {
    id: '4',
    date: new Date('2024-07-25T09:00:00'),
    slipNumber: 'SN-004',
    vehicleNumber: 'LHR-007',
    driverName: 'James Bond',
    fuelType: 'HOBC',
    pricePerLiter: 330.12,
    quantity: 40,
    amount: 13204.8,
    meterReading: 75000,
    average: null,
  },
  {
    id: '5',
    date: new Date('2024-07-28T18:00:00'),
    slipNumber: 'SN-005',
    vehicleNumber: 'XYZ-789',
    driverName: 'Jane Smith',
    fuelType: 'Diesel',
    pricePerLiter: 287.33,
    quantity: 55,
    amount: 15803.15,
    meterReading: 20650,
    average: 11.82,
  },
];

export let vehicles: Vehicle[] = [
  { id: '1', number: 'ABC-123', model: 'Toyota Corolla' },
  { id: '2', number: 'XYZ-789', model: 'Honda Civic' },
  { id: '3', number: 'LHR-007', model: 'Suzuki Alto' },
];

export let drivers: Driver[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'James Bond' },
];

export const addFuelEntry = (entry: Omit<FuelEntry, 'id'>): FuelEntry => {
  const newEntry = {
    ...entry,
    id: (fuelEntries.length + 1).toString(),
  };
  fuelEntries.unshift(newEntry);
  return newEntry;
}

export const updateFuelPrice = (name: FuelType, newPrice: number) => {
    const fuelToUpdate = fuelPrices.find(f => f.name === name);
    if(fuelToUpdate) {
        fuelToUpdate.price = newPrice;
    }
    return fuelToUpdate;
}

export const addVehicle = (vehicle: Omit<Vehicle, 'id'>): Vehicle => {
  const newVehicle = {
    ...vehicle,
    id: (vehicles.length + 1).toString(),
  };
  vehicles.unshift(newVehicle);
  return newVehicle;
};

export const addDriver = (driver: Omit<Driver, 'id'>): Driver => {
  const newDriver = {
    ...driver,
    id: (drivers.length + 1).toString(),
  };
  drivers.unshift(newDriver);
  return newDriver;
};
