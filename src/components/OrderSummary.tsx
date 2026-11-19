// Komponen ringkasan estimasi real-time dan tombol kirim WhatsApp (FT-04 & FT-06).

import { CheckCircle2, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import {
  ESTIMATE_DISCLAIMER_TEXT,
  ServicePackage,
} from '../config.ts';
import { OrderEstimate } from '../lib/calculator.ts';
import { formatRupiah, formatWeight } from '../lib/format.ts';

interface OrderSummaryProps {
  selectedPackage: ServicePackage | undefined;
  estimate: OrderEstimate;
  isDeliverySelected: boolean;
  isPerfumeSelected: boolean;
  isMobileBreakdownOpen: boolean;
  onToggleMobileBreakdown: () => void;
  lastWhatsAppUrl: string | null;
}

function BreakdownRows({
  selectedPackage,
  estimate,
  isDeliverySelected,
  isPerfumeSelected,
}: {
  selectedPackage: ServicePackage | undefined;
  estimate: OrderEstimate;
  isDeliverySelected: boolean;
  isPerfumeSelected: boolean;
}) {
  return (
    <dl className="space-y-3 text-sm">
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-neutral-600">Paket Layanan</dt>
        <dd className="font-medium text-neutral-900 text-right">
          {selectedPackage ? `${selectedPackage.name}` : '-'}
        </dd>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-neutral-600">Berat Aktual</dt>
        <dd className="font-medium text-neutral-900 tabular-nums text-right">
          {estimate.isValidWeight ? `${formatWeight(estimate.actualWeightKg)} kg` : '-'}
        </dd>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-neutral-600">
          Berat Ditagih
          {estimate.isValidWeight && estimate.isMinimumChargeApplied
            ? ' (Minimum 3 kg)'
            : ''}
        </dt>
        <dd className="font-medium text-neutral-900 tabular-nums text-right">
          {estimate.isValidWeight ? `${formatWeight(estimate.billedWeightKg)} kg` : '-'}
        </dd>
      </div>

      <div className="border-t border-neutral-200 pt-3 flex items-baseline justify-between gap-4">
        <dt className="text-neutral-600">
          Biaya Utama
          {selectedPackage ? ` (${formatRupiah(selectedPackage.pricePerKg)}/kg)` : ''}
        </dt>
        <dd className="font-medium text-neutral-900 tabular-nums text-right">
          {formatRupiah(estimate.mainServiceCost)}
        </dd>
      </div>

      {isDeliverySelected && (
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-neutral-600">Antar-Jemput</dt>
          <dd className="font-medium text-neutral-900 tabular-nums text-right">
            {formatRupiah(estimate.deliveryCost)}
          </dd>
        </div>
      )}

      {isPerfumeSelected && (
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-neutral-600">Pewangi Premium</dt>
          <dd className="font-medium text-neutral-900 tabular-nums text-right">
            {formatRupiah(estimate.perfumeCost)}
          </dd>
        </div>
      )}
    </dl>
  );
}

export function OrderSummary({
  selectedPackage,
  estimate,
  isDeliverySelected,
  isPerfumeSelected,
  isMobileBreakdownOpen,
  onToggleMobileBreakdown,
  lastWhatsAppUrl,
}: OrderSummaryProps) {
  return (
    <>
      <aside
        aria-labelledby="heading-summary-desktop"
        className="hidden lg:block bg-white rounded-2xl p-6 lg:sticky lg:top-8"
      >
        <h2
          id="heading-summary-desktop"
          className="text-lg font-semibold text-blue-950 mb-4"
        >
          Ringkasan Estimasi
        </h2>

        <BreakdownRows
          selectedPackage={selectedPackage}
          estimate={estimate}
          isDeliverySelected={isDeliverySelected}
          isPerfumeSelected={isPerfumeSelected}
        />

        <div className="border-t border-neutral-200 mt-4 pt-4 flex items-baseline justify-between gap-4">
          <span className="text-base font-semibold text-blue-950">
            Total Estimasi
          </span>
          <span className="text-3xl font-semibold text-blue-950 tabular-nums">
            {formatRupiah(estimate.totalEstimate)}
          </span>
        </div>

        <p className="text-sm text-neutral-600 mt-3">
          {ESTIMATE_DISCLAIMER_TEXT}
        </p>

        <button
          type="submit"
          form="laundry-order-form"
          className="mt-6 w-full min-h-[44px] rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-medium text-base px-4 py-3 flex items-center justify-center gap-2 transition-transform duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>Kirim Pesanan ke WhatsApp</span>
        </button>

        {lastWhatsAppUrl && (
          <div
            role="status"
            className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p>Pesan pesanan siap dikirim ke WhatsApp toko.</p>
                <a
                  href={lastWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 font-semibold underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                  Buka WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </aside>

      <div
        aria-label="Ringkasan biaya dan kirim pesanan"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]"
      >
        {isMobileBreakdownOpen && (
          <div className="px-4 pt-4 pb-3 border-b border-neutral-200 max-h-[55vh] overflow-y-auto">
            <BreakdownRows
              selectedPackage={selectedPackage}
              estimate={estimate}
              isDeliverySelected={isDeliverySelected}
              isPerfumeSelected={isPerfumeSelected}
            />
            <p className="text-sm text-neutral-600 mt-3 pt-3 border-t border-neutral-200">
              {ESTIMATE_DISCLAIMER_TEXT}
            </p>
            {lastWhatsAppUrl && (
              <div
                role="status"
                className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p>Pesan pesanan siap dikirim ke WhatsApp toko.</p>
                    <a
                      href={lastWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 font-semibold underline"
                    >
                      Buka WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="px-4 pt-1 pb-2 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-sm text-neutral-600 shrink-0">Estimasi</span>
              <span className="text-xl font-semibold text-blue-950 tabular-nums truncate">
                {formatRupiah(estimate.totalEstimate)}
              </span>
            </div>

            <button
              type="button"
              onClick={onToggleMobileBreakdown}
              aria-expanded={isMobileBreakdownOpen}
              className="min-h-[44px] px-3 rounded-xl text-sm font-medium text-blue-950 hover:bg-blue-50 flex items-center gap-1 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
            >
              <span>Rincian</span>
              {isMobileBreakdownOpen ? (
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>

          <button
            type="submit"
            form="laundry-order-form"
            className="w-full min-h-[44px] rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-medium text-base px-4 py-2 flex items-center justify-center gap-2 transition-transform duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Kirim Pesanan ke WhatsApp</span>
          </button>
        </div>
      </div>
    </>
  );
}
