// Komponen katalog pilihan paket layanan utama laundry (FT-01).

import { Check } from 'lucide-react';
import { ServicePackage } from '../config.ts';
import { formatRupiah } from '../lib/format.ts';

interface PackageCatalogProps {
  packages: ServicePackage[];
  selectedPackageId: string;
  onSelectPackage: (packageId: string) => void;
  errorMessage?: string;
}

export function PackageCatalog({
  packages,
  selectedPackageId,
  onSelectPackage,
  errorMessage,
}: PackageCatalogProps) {
  return (
    <section
      aria-labelledby="heading-packages"
      className="bg-white rounded-2xl p-4 sm:p-6"
    >
      <h2
        id="heading-packages"
        className="text-lg font-semibold text-neutral-900 mb-4"
      >
        Pilih Paket Layanan
      </h2>

      <div
        role="radiogroup"
        aria-labelledby="heading-packages"
        className="grid grid-cols-1 gap-3"
      >
        {packages.map((pkg) => {
          const isSelected = pkg.id === selectedPackageId;
          return (
            <button
              key={pkg.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectPackage(pkg.id)}
              className={`w-full text-left rounded-xl border p-4 min-h-[44px] transition-transform duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-base font-semibold text-neutral-900">
                      {pkg.name}
                    </span>
                    <span className="text-sm text-neutral-600">
                      Estimasi {pkg.estimatedDays} hari
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">
                    {pkg.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-base font-semibold tabular-nums whitespace-nowrap ${
                      isSelected ? 'text-blue-700' : 'text-neutral-900'
                    }`}
                  >
                    {formatRupiah(pkg.pricePerKg)} / kg
                  </span>
                  <span
                    aria-hidden="true"
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-blue-700 bg-blue-700 text-white'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="mt-3 text-sm text-red-800 bg-red-50 rounded-xl px-3 py-2"
        >
          {errorMessage}
        </p>
      )}
    </section>
  );
}
