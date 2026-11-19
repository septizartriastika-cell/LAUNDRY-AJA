// Komponen utama aplikasi satu halaman LaundryCalc & Catalog (FT-01 s.d. FT-06).

import { FormEvent, useMemo, useRef, useState } from 'react';
import { AddOnSelector } from './components/AddOnSelector.tsx';
import { CustomerForm } from './components/CustomerForm.tsx';
import { OrderSummary } from './components/OrderSummary.tsx';
import { PackageCatalog } from './components/PackageCatalog.tsx';
import { WeightInput } from './components/WeightInput.tsx';
import {
  ADD_ON_SERVICES,
  DEFAULT_PACKAGE_ID,
  DELIVERY_ADDON_ID,
  PERFUME_ADDON_ID,
  STORE_CONFIG,
  WEIGHT_LIMITS,
} from './config.ts';
import {
  calculateOrderEstimate,
  getActiveServicePackages,
  parseWeightInput,
} from './lib/calculator.ts';
import { formatWeight } from './lib/format.ts';
import { OrderValidationErrors, validateOrderForm } from './lib/validation.ts';
import { buildWhatsAppUrl } from './lib/whatsapp.ts';

export default function App() {
  const activePackages = useMemo(() => getActiveServicePackages(), []);

  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    activePackages.some((pkg) => pkg.id === DEFAULT_PACKAGE_ID)
      ? DEFAULT_PACKAGE_ID
      : activePackages[0]?.id ?? '',
  );
  const [weightInput, setWeightInput] = useState<string>(WEIGHT_LIMITS.defaultWeight);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [errors, setErrors] = useState<OrderValidationErrors>({});
  const [isMobileBreakdownOpen, setIsMobileBreakdownOpen] = useState<boolean>(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null);

  const selectedPackage = useMemo(
    () => activePackages.find((pkg) => pkg.id === selectedPackageId),
    [activePackages, selectedPackageId],
  );

  const parsedWeight = useMemo(() => parseWeightInput(weightInput), [weightInput]);

  const estimate = useMemo(
    () =>
      calculateOrderEstimate({
        selectedPackage,
        actualWeightKg: parsedWeight,
        selectedAddOnIds,
      }),
    [selectedPackage, parsedWeight, selectedAddOnIds],
  );

  const isDeliverySelected = selectedAddOnIds.includes(DELIVERY_ADDON_ID);
  const isPerfumeSelected = selectedAddOnIds.includes(PERFUME_ADDON_ID);

  function handleSelectPackage(packageId: string) {
    setSelectedPackageId(packageId);
    setLastWhatsAppUrl(null);
    if (errors.package) {
      setErrors((prev) => ({ ...prev, package: undefined }));
    }
  }

  function handleWeightChange(nextValue: string) {
    setWeightInput(nextValue);
    setLastWhatsAppUrl(null);
    if (errors.weight) {
      setErrors((prev) => ({ ...prev, weight: undefined }));
    }
  }

  function handleStepWeight(delta: number) {
    const current = parsedWeight ?? 0;
    const rawNext = current + delta;
    const lowerBound =
      delta < 0 ? WEIGHT_LIMITS.minQuickStep : WEIGHT_LIMITS.min;
    const clamped = Math.min(
      WEIGHT_LIMITS.max,
      Math.max(lowerBound, rawNext),
    );
    const rounded = Math.round(clamped * 10) / 10;
    setWeightInput(formatWeight(rounded));
    setLastWhatsAppUrl(null);
    if (errors.weight) {
      setErrors((prev) => ({ ...prev, weight: undefined }));
    }
  }

  function handleToggleAddOn(addOnId: string) {
    setLastWhatsAppUrl(null);
    setSelectedAddOnIds((prev) => {
      const exists = prev.includes(addOnId);
      const next = exists
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId];

      if (addOnId === DELIVERY_ADDON_ID && exists && errors.pickupAddress) {
        setErrors((prevErrors) => ({ ...prevErrors, pickupAddress: undefined }));
      }
      return next;
    });
  }

  function handleCustomerNameChange(value: string) {
    setCustomerName(value);
    setLastWhatsAppUrl(null);
    if (errors.customerName) {
      setErrors((prev) => ({ ...prev, customerName: undefined }));
    }
  }

  function handlePickupAddressChange(value: string) {
    setPickupAddress(value);
    setLastWhatsAppUrl(null);
    if (errors.pickupAddress) {
      setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
    }
  }

  function handleSpecialNotesChange(value: string) {
    setSpecialNotes(value);
    setLastWhatsAppUrl(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateOrderForm({
      selectedPackage,
      weightInput,
      selectedAddOnIds,
      customerName,
      pickupAddress,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setLastWhatsAppUrl(null);

      if (validation.firstErrorField === 'weight') {
        weightInputRef.current?.focus();
      } else if (validation.firstErrorField === 'customerName') {
        nameInputRef.current?.focus();
      } else if (validation.firstErrorField === 'pickupAddress') {
        addressInputRef.current?.focus();
      }
      return;
    }

    if (!selectedPackage || !estimate.isValidWeight) {
      return;
    }

    setErrors({});
    const waUrl = buildWhatsAppUrl({
      selectedPackage,
      estimate,
      selectedAddOnIds,
      customerName,
      pickupAddress,
      specialNotes,
    });

    setLastWhatsAppUrl(waUrl);
    setIsMobileBreakdownOpen(true);

    const anchor = document.createElement('a');
    anchor.href = waUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.click();
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white text-balance">
            {STORE_CONFIG.storeName}
          </h1>
          <p className="text-base text-blue-100 mt-1">
            Laundry AJA, Ngapain Nyuci?
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-36 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <form
            id="laundry-order-form"
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 space-y-6"
          >
            <PackageCatalog
              packages={activePackages}
              selectedPackageId={selectedPackageId}
              onSelectPackage={handleSelectPackage}
              errorMessage={errors.package}
            />

            <WeightInput
              weightInput={weightInput}
              onWeightChange={handleWeightChange}
              onStepWeight={handleStepWeight}
              isMinimumChargeApplied={estimate.isMinimumChargeApplied}
              isValidWeight={estimate.isValidWeight}
              errorMessage={errors.weight}
              inputRef={weightInputRef}
            />

            <AddOnSelector
              addOns={ADD_ON_SERVICES}
              selectedAddOnIds={selectedAddOnIds}
              billedWeightKg={estimate.billedWeightKg}
              isValidWeight={estimate.isValidWeight}
              onToggleAddOn={handleToggleAddOn}
            />

            <CustomerForm
              customerName={customerName}
              pickupAddress={pickupAddress}
              specialNotes={specialNotes}
              isDeliverySelected={isDeliverySelected}
              errors={errors}
              onCustomerNameChange={handleCustomerNameChange}
              onPickupAddressChange={handlePickupAddressChange}
              onSpecialNotesChange={handleSpecialNotesChange}
              nameInputRef={nameInputRef}
              addressInputRef={addressInputRef}
            />
          </form>

          <div className="lg:col-span-5">
            <OrderSummary
              selectedPackage={selectedPackage}
              estimate={estimate}
              isDeliverySelected={isDeliverySelected}
              isPerfumeSelected={isPerfumeSelected}
              isMobileBreakdownOpen={isMobileBreakdownOpen}
              onToggleMobileBreakdown={() =>
                setIsMobileBreakdownOpen((prev) => !prev)
              }
              lastWhatsAppUrl={lastWhatsAppUrl}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
