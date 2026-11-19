// Komponen input estimasi berat cucian dan info minimum charge 3 kg (FT-02).

import { RefObject } from 'react';
import { AlertCircle, Info, Minus, Plus } from 'lucide-react';
import { STORE_CONFIG, WEIGHT_LIMITS } from '../config.ts';
import { formatWeight } from '../lib/format.ts';

interface WeightInputProps {
  weightInput: string;
  onWeightChange: (nextValue: string) => void;
  onStepWeight: (delta: number) => void;
  isMinimumChargeApplied: boolean;
  isValidWeight: boolean;
  errorMessage?: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function WeightInput({
  weightInput,
  onWeightChange,
  onStepWeight,
  isMinimumChargeApplied,
  isValidWeight,
  errorMessage,
  inputRef,
}: WeightInputProps) {
  const minChargeFormatted = formatWeight(STORE_CONFIG.minimumChargeKg);

  return (
    <section
      aria-labelledby="heading-weight"
      className="bg-white rounded-2xl p-4 sm:p-6"
    >
      <h2
        id="heading-weight"
        className="text-lg font-semibold text-blue-950 mb-4"
      >
        Estimasi Berat Cucian
      </h2>

      <div>
        <label
          htmlFor="weight-input"
          className="block text-sm font-medium text-neutral-900 mb-2"
        >
          Berat perkiraan (kg)
        </label>

        <div className="flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => onStepWeight(-WEIGHT_LIMITS.stepQuick)}
            aria-label="Kurangi berat 0,5 kg"
            className="min-w-[44px] min-h-[44px] px-3 rounded-xl border border-neutral-200 bg-white text-blue-950 hover:bg-blue-50 active:scale-[0.98] transition-transform duration-150 ease-out motion-reduce:transition-none flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="relative flex-1">
            <input
              ref={inputRef}
              id="weight-input"
              name="weightKg"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={weightInput}
              onChange={(event) => onWeightChange(event.target.value)}
              placeholder="Contoh: 3"
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={
                errorMessage ? 'weight-error weight-helper' : 'weight-helper'
              }
              className={`w-full min-h-[44px] rounded-xl border px-4 py-2 pr-12 text-base text-neutral-900 tabular-nums placeholder:text-neutral-500 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
                errorMessage ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-600">
              kg
            </span>
          </div>

          <button
            type="button"
            onClick={() => onStepWeight(WEIGHT_LIMITS.stepQuick)}
            aria-label="Tambah berat 0,5 kg"
            className="min-w-[44px] min-h-[44px] px-3 rounded-xl border border-neutral-200 bg-white text-blue-950 hover:bg-blue-50 active:scale-[0.98] transition-transform duration-150 ease-out motion-reduce:transition-none flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p id="weight-helper" className="text-sm text-neutral-600 mt-2">
          Gunakan titik atau koma untuk angka desimal.
        </p>

        {errorMessage && (
          <div
            id="weight-error"
            role="alert"
            className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isValidWeight && isMinimumChargeApplied && (
          <div
            role="status"
            className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800"
          >
            <Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              Berat di bawah {minChargeFormatted} kg tetap dihitung{' '}
              {minChargeFormatted} kg sesuai batas minimum toko.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
