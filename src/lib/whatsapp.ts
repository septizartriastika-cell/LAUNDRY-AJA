// Fungsi penyusun template pesan dan tautan deep-link WhatsApp dari PRD.

import {
  DEFAULT_PICKUP_TEXT,
  DELIVERY_ADDON_ID,
  PERFUME_ADDON_ID,
  ServicePackage,
  STORE_CONFIG,
} from '../config.ts';
import { OrderEstimate } from './calculator.ts';
import { formatThousands, formatWeight } from './format.ts';

export interface WhatsAppPayloadInput {
  selectedPackage: ServicePackage;
  estimate: OrderEstimate;
  selectedAddOnIds: string[];
  customerName: string;
  pickupAddress: string;
  specialNotes: string;
  whatsappNumber?: string;
}

export function buildWhatsAppMessage({
  selectedPackage,
  estimate,
  selectedAddOnIds,
  customerName,
  pickupAddress,
  specialNotes,
}: WhatsAppPayloadInput): string {
  const cleanName = customerName.trim();
  const isDeliverySelected = selectedAddOnIds.includes(DELIVERY_ADDON_ID);
  const isPerfumeSelected = selectedAddOnIds.includes(PERFUME_ADDON_ID);

  const deliveryLine = isDeliverySelected
    ? `Ya (+Rp ${formatThousands(estimate.deliveryCost)})`
    : 'Tidak';

  const perfumeLine = isPerfumeSelected
    ? `Ya (+Rp ${formatThousands(estimate.perfumeCost)})`
    : 'Tidak';

  const cleanAddress = isDeliverySelected
    ? pickupAddress.trim()
    : DEFAULT_PICKUP_TEXT;

  const cleanNotes = specialNotes.trim() || '-';

  return [
    'Halo Admin Laundry, saya ingin memesan layanan dengan rincian berikut:',
    '',
    `*Nama:* ${cleanName}`,
    `*Paket Layanan:* ${selectedPackage.name} (Rp ${formatThousands(selectedPackage.pricePerKg)}/kg)`,
    `*Estimasi Berat:* ${formatWeight(estimate.actualWeightKg)} kg (Berat Ditagih: ${formatWeight(estimate.billedWeightKg)} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryLine}`,
    `- Pewangi Premium: ${perfumeLine}`,
    '',
    `*Alamat Penjemputan:* ${cleanAddress}`,
    `*Catatan Khusus:* ${cleanNotes}`,
    '',
    `*Estimasi Total Biaya:* *Rp ${formatThousands(estimate.totalEstimate)}*`,
    '',
    '_(Catatan: Nominal di atas merupakan estimasi awal. Berat pasti akan ditimbang ulang saat pakaian diterima oleh kurir/kasir toko)._',
    '',
    'Mohon konfirmasi jadwal dan ketersediaannya. Terima kasih!',
  ].join('\n');
}

export function buildWhatsAppUrl(input: WhatsAppPayloadInput): string {
  const number = input.whatsappNumber ?? STORE_CONFIG.whatsappNumber;
  const message = buildWhatsAppMessage(input);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
