// Konfigurasi data bisnis toko laundry dan aturan bawaan aplikasi.

export interface StoreConfig {
  storeName: string;
  whatsappNumber: string;
  minimumChargeKg: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  pricePerKg: number;
  estimatedDays: number;
  description: string;
  isActive: boolean;
}

export type AddOnPricingType = 'flat' | 'per_billed_kg';

export interface AddOnService {
  id: string;
  name: string;
  pricingType: AddOnPricingType;
  price: number;
  description: string;
}

export const STORE_CONFIG: StoreConfig = {
  storeName: 'LAUNDRY AJA',
  whatsappNumber: '6281234567890',
  minimumChargeKg: 3.0,
};

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'L01',
    name: 'Cuci Lipat',
    pricePerKg: 6000,
    estimatedDays: 3,
    description: 'Pakaian dicuci bersih, dikeringkan, lalu dilipat rapi.',
    isActive: true,
  },
  {
    id: 'L02',
    name: 'Cuci Setrika',
    pricePerKg: 8000,
    estimatedDays: 3,
    description: 'Pakaian dicuci bersih, dikeringkan, lalu disetrika rapi.',
    isActive: true,
  },
  {
    id: 'L03',
    name: 'Cuci Setrika Ekspres',
    pricePerKg: 15000,
    estimatedDays: 1,
    description: 'Layanan cuci dan setrika prioritas selesai dalam sehari.',
    isActive: true,
  },
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: 'T01',
    name: 'Antar-Jemput',
    pricingType: 'flat',
    price: 10000,
    description: 'Tarif tetap per pesanan, radius maksimal 5 km.',
  },
  {
    id: 'T02',
    name: 'Pewangi Premium',
    pricingType: 'per_billed_kg',
    price: 2000,
    description: 'Tambahan pewangi khusus sesuai berat tertagih.',
  },
];

export const DEFAULT_PACKAGE_ID = 'L01';

export const DELIVERY_ADDON_ID = 'T01';
export const PERFUME_ADDON_ID = 'T02';

export const WEIGHT_LIMITS = {
  min: 0.1,
  max: 100,
  stepQuick: 0.5,
  minQuickStep: 0.5,
  defaultWeight: '3',
} as const;

export const VALIDATION_RULES = {
  minCustomerNameLength: 2,
} as const;

export const DEFAULT_PICKUP_TEXT = 'Antar Sendiri ke Toko';

export const ESTIMATE_DISCLAIMER_TEXT =
  'Nominal ini merupakan estimasi awal. Berat pasti ditimbang ulang saat pakaian diterima di toko.';
