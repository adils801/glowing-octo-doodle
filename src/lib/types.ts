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
  location?: {
    latitude: number;
    longitude: number;
  };
  fuelType: FuelType;
  pricePerLiter: number;
  quantity: number;
  amount: number;
  meterReading: number;
  average: number | null;
}
