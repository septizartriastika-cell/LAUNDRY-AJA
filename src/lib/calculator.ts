// Fungsi perhitungan berat ditagih (minimum charge) dan estimasi total biaya laundry.

import {
  ADD_ON_SERVICES,
  AddOnService,
  DELIVERY_ADDON_ID,
  PERFUME_ADDON_ID,
  SERVICE_PACKAGES,
  ServicePackage,
  STORE_CONFIG,
} from '../config.ts';

export interface OrderCalculationInput {
  selectedPackage: ServicePackage | undefined;
  actualWeightKg: number | null;
  selectedAddOnIds: string[];
  minimumChargeKg?: number;
  addOnServices?: AddOnService[];
}

export interface OrderEstimate {
  isValidWeight: boolean;
  actualWeightKg: number;
  billedWeightKg: number;
  isMinimumChargeApplied: boolean;
  mainServiceCost: number;
  deliveryCost: number;
  perfumeCost: number;
  totalAddOnCost: number;
  totalEstimate: number;
}

export function parseWeightInput(rawWeight: string): number | null {
  const trimmed = rawWeight.trim();
  if (!trimmed || !/^\d+([.,]\d+)?$/.test(trimmed)) {
    return null;
  }

  const parsed = Number(trimmed.replace(',', '.'));
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

export function calculateBilledWeight(
  actualWeightKg: number,
  minimumChargeKg = STORE_CONFIG.minimumChargeKg,
): { billedWeightKg: number; isMinimumChargeApplied: boolean } {
  const isMinimumChargeApplied = actualWeightKg < minimumChargeKg;
  const billedWeightKg = Math.max(minimumChargeKg, actualWeightKg);
  return { billedWeightKg, isMinimumChargeApplied };
}

export function calculateAddOnCost(
  addOn: AddOnService,
  billedWeightKg: number,
): number {
  if (addOn.pricingType === 'flat') {
    return addOn.price;
  }
  return Math.round(billedWeightKg * addOn.price);
}

export function calculateOrderEstimate({
  selectedPackage,
  actualWeightKg,
  selectedAddOnIds,
  minimumChargeKg = STORE_CONFIG.minimumChargeKg,
  addOnServices = ADD_ON_SERVICES,
}: OrderCalculationInput): OrderEstimate {
  if (!selectedPackage || actualWeightKg === null || actualWeightKg <= 0) {
    return {
      isValidWeight: false,
      actualWeightKg: 0,
      billedWeightKg: 0,
      isMinimumChargeApplied: false,
      mainServiceCost: 0,
      deliveryCost: 0,
      perfumeCost: 0,
      totalAddOnCost: 0,
      totalEstimate: 0,
    };
  }

  const { billedWeightKg, isMinimumChargeApplied } = calculateBilledWeight(
    actualWeightKg,
    minimumChargeKg,
  );

  const mainServiceCost = Math.round(billedWeightKg * selectedPackage.pricePerKg);

  const deliveryService = addOnServices.find((item) => item.id === DELIVERY_ADDON_ID);
  const perfumeService = addOnServices.find((item) => item.id === PERFUME_ADDON_ID);

  const deliveryCost =
    deliveryService && selectedAddOnIds.includes(DELIVERY_ADDON_ID)
      ? calculateAddOnCost(deliveryService, billedWeightKg)
      : 0;

  const perfumeCost =
    perfumeService && selectedAddOnIds.includes(PERFUME_ADDON_ID)
      ? calculateAddOnCost(perfumeService, billedWeightKg)
      : 0;

  const totalAddOnCost = deliveryCost + perfumeCost;
  const totalEstimate = mainServiceCost + totalAddOnCost;

  return {
    isValidWeight: true,
    actualWeightKg,
    billedWeightKg,
    isMinimumChargeApplied,
    mainServiceCost,
    deliveryCost,
    perfumeCost,
    totalAddOnCost,
    totalEstimate,
  };
}

export function getActiveServicePackages(): ServicePackage[] {
  return SERVICE_PACKAGES.filter((pkg) => pkg.isActive);
}
