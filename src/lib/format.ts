// Fungsi pemformatan angka Rupiah dan berat desimal untuk seluruh aplikasi.

export function formatThousands(value: number): string {
  const rounded = Math.round(value);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatRupiah(amount: number): string {
  return `Rp ${formatThousands(amount)}`;
}

export function formatWeight(weightKg: number): string {
  const normalized = Number(weightKg.toFixed(2));
  return normalized.toString().replace('.', ',');
}
