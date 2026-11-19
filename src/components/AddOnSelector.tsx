// Komponen pilihan layanan tambahan interaktif (FT-03).

import { Check } from 'lucide-react';
import { AddOnService } from '../config.ts';
import { calculateAddOnCost } from '../lib/calculator.ts';
import { formatRupiah } from '../lib/format.ts';

interface AddOnSelectorProps {
  addOns: AddOnService[];
  selectedAddOnIds: string[];
  billedWeightKg: number;
  isValidWeight: boolean;
  onToggleAddOn: (addOnId: string) => void;
}

export function AddOnSelector({
  addOns,
  selectedAddOnIds,
  billedWeightKg,
  isValidWeight,
  onToggleAddOn,
}: AddOnSelectorProps) {
  return (
    <section
      aria-labelledby="heading-addons"
      className="bg-white rounded-2xl p-4 sm:p-6"
    >
      <h2
        id="heading-addons"
        className="text-lg font-semibold text-blue-950 mb-4"
      >
        Layanan Tambahan
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {addOns.map((addOn) => {
          const isChecked = selectedAddOnIds.includes(addOn.id);
          const pricingLabel =
            addOn.pricingType === 'flat'
              ? `${formatRupiah(addOn.price)} / pesanan`
              : `${formatRupiah(addOn.price)} / kg ditagih`;

          const computedCost = isValidWeight
            ? calculateAddOnCost(addOn, billedWeightKg)
            : 0;

          return (
            <label
              key={addOn.id}
              htmlFor={`addon-${addOn.id}`}
              className={`flex items-start justify-between gap-4 rounded-xl border p-4 min-h-[44px] cursor-pointer transition-transform duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-900 ${
                isChecked
                  ? 'border-orange-700 bg-orange-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                id={`addon-${addOn.id}`}
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleAddOn(addOn.id)}
                className="sr-only"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-base font-semibold text-neutral-900">
                    {addOn.name}
                  </span>
                  <span className="text-sm font-medium text-neutral-600 tabular-nums">
                    {pricingLabel}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  {addOn.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-0.5">
                {isChecked && isValidWeight && (
                  <span className="text-sm font-semibold text-orange-700 tabular-nums whitespace-nowrap">
                    +{formatRupiah(computedCost)}
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                    isChecked
                      ? 'border-orange-700 bg-orange-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
