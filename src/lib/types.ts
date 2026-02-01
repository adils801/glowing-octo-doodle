export type FuelType = 'Petrol' | 'Diesel' | 'HOBC';

export interface FuelPrice {
  id: string;
  name: FuelType;
  price: number;
}

export interface FuelEntry {
  id: string;
  date: Date;
  slipNumber: string;
  vehicleNumber: string;
  driverName: string;
  fuelType: FuelType;
  pricePerLiter: number;
  quantity: number;
  amount: number;
  meterReading: number;
  average: number | null;
}

export interface Vehicle {
  id: string;
  number: string;
  model: string;
}

export interface Driver {
  id: string;
  name: string;
}
