// Fungsi validasi formulir pemesanan sebelum membuat pesan WhatsApp.

import {
  DELIVERY_ADDON_ID,
  ServicePackage,
  VALIDATION_RULES,
  WEIGHT_LIMITS,
} from '../config.ts';
import { parseWeightInput } from './calculator.ts';

export type OrderFormField = 'package' | 'weight' | 'customerName' | 'pickupAddress';

export interface OrderValidationInput {
  selectedPackage: ServicePackage | undefined;
  weightInput: string;
  selectedAddOnIds: string[];
  customerName: string;
  pickupAddress: string;
}

export interface OrderValidationErrors {
  package?: string;
  weight?: string;
  customerName?: string;
  pickupAddress?: string;
}

export interface OrderValidationResult {
  isValid: boolean;
  errors: OrderValidationErrors;
  firstErrorField: OrderFormField | null;
}

export function validateOrderForm(
  input: OrderValidationInput,
): OrderValidationResult {
  const errors: OrderValidationErrors = {};

  if (!input.selectedPackage) {
    errors.package = 'Pilih salah satu paket layanan terlebih dahulu.';
  }

  const parsedWeight = parseWeightInput(input.weightInput);
  if (parsedWeight === null || parsedWeight < WEIGHT_LIMITS.min) {
    errors.weight = 'Masukkan estimasi berat lebih dari 0 kg, contoh: 2,5.';
  } else if (parsedWeight > WEIGHT_LIMITS.max) {
    errors.weight = 'Berat maksimal untuk satu pesanan adalah 100 kg, contoh: 12,5.';
  }

  const trimmedName = input.customerName.trim();
  if (trimmedName.length < VALIDATION_RULES.minCustomerNameLength) {
    errors.customerName = 'Isi nama Anda minimal 2 huruf, contoh: Budi Santoso.';
  }

  const isDeliverySelected = input.selectedAddOnIds.includes(DELIVERY_ADDON_ID);
  const trimmedAddress = input.pickupAddress.trim();
  if (isDeliverySelected && trimmedAddress.length === 0) {
    errors.pickupAddress = 'Alamat penjemputan wajib diisi, contoh: Jl. Melati No. 12.';
  }

  const orderedFields: OrderFormField[] = [
    'package',
    'weight',
    'customerName',
    'pickupAddress',
  ];
  const firstErrorField =
    orderedFields.find((field) => Boolean(errors[field])) ?? null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}
