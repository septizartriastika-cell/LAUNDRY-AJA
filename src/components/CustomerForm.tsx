// Komponen formulir data pemesan dan alamat penjemputan kondisional (FT-05).

import { RefObject } from 'react';
import { AlertCircle } from 'lucide-react';
import { OrderValidationErrors } from '../lib/validation.ts';

interface CustomerFormProps {
  customerName: string;
  pickupAddress: string;
  specialNotes: string;
  isDeliverySelected: boolean;
  errors: OrderValidationErrors;
  onCustomerNameChange: (value: string) => void;
  onPickupAddressChange: (value: string) => void;
  onSpecialNotesChange: (value: string) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
}

export function CustomerForm({
  customerName,
  pickupAddress,
  specialNotes,
  isDeliverySelected,
  errors,
  onCustomerNameChange,
  onPickupAddressChange,
  onSpecialNotesChange,
  nameInputRef,
  addressInputRef,
}: CustomerFormProps) {
  return (
    <section
      aria-labelledby="heading-customer"
      className="bg-white rounded-2xl p-4 sm:p-6"
    >
      <h2
        id="heading-customer"
        className="text-lg font-semibold text-blue-950 mb-4"
      >
        Data Pemesan
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="customer-name"
            className="block text-sm font-medium text-neutral-900 mb-2"
          >
            Nama Lengkap
          </label>
          <input
            ref={nameInputRef}
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(event) => onCustomerNameChange(event.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-required="true"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={errors.customerName ? 'name-error' : undefined}
            className={`w-full min-h-[44px] rounded-xl border px-4 py-2 text-base text-neutral-900 placeholder:text-neutral-500 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
              errors.customerName ? 'border-red-700' : 'border-neutral-200'
            }`}
          />
          {errors.customerName && (
            <div
              id="name-error"
              role="alert"
              className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{errors.customerName}</span>
            </div>
          )}
        </div>

        {isDeliverySelected && (
          <div>
            <label
              htmlFor="pickup-address"
              className="block text-sm font-medium text-neutral-900 mb-2"
            >
              Alamat Penjemputan
            </label>
            <textarea
              ref={addressInputRef}
              id="pickup-address"
              name="pickupAddress"
              rows={2}
              autoComplete="street-address"
              value={pickupAddress}
              onChange={(event) => onPickupAddressChange(event.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, dekat minimarket"
              aria-required="true"
              aria-invalid={Boolean(errors.pickupAddress)}
              aria-describedby={
                errors.pickupAddress ? 'address-error address-helper' : 'address-helper'
              }
              className={`w-full rounded-xl border px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
                errors.pickupAddress ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <p id="address-helper" className="text-sm text-neutral-600 mt-1">
              Sertakan patokan agar kurir mudah menemukan lokasi Anda.
            </p>
            {errors.pickupAddress && (
              <div
                id="address-error"
                role="alert"
                className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{errors.pickupAddress}</span>
              </div>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="special-notes"
            className="block text-sm font-medium text-neutral-900 mb-2"
          >
            Catatan Khusus (Opsional)
          </label>
          <textarea
            id="special-notes"
            name="specialNotes"
            rows={2}
            value={specialNotes}
            onChange={(event) => onSpecialNotesChange(event.target.value)}
            placeholder="Contoh: Pisahkan pakaian putih dan batik"
            aria-describedby="notes-helper"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          />
          <p id="notes-helper" className="text-sm text-neutral-600 mt-1">
            Opsional, misalnya instruksi pemisahan pakaian.
          </p>
        </div>
      </div>
    </section>
  );
}
