# Keputusan Desain — LaundryCalc & Catalog

Dokumen ini mencatat keputusan desain yang disetujui pengguna serta token visual aplikasi.

## Keputusan Pengguna

| Keputusan | Pilihan Terpilih |
| :--- | :--- |
| Kesan visual | Ramah dan hangat (`Plus Jakarta Sans`) |
| Warna aksen | Biru (`blue`) |
| Sapaan pengguna | Anda |
| Susunan halaman | Satu halaman bergulir |
| Posisi aksi utama | Bar menempel di bawah layar pada ponsel; panel ringkasan kanan pada desktop |
| Gambar | Tanpa gambar (fokus pada tipografi, tarif, dan keterbacaan cepat) |

## Token Visual

- **Huruf:** `Plus Jakarta Sans` (ketebalan 400, 500, 600) dipasang lokal lewat `@fontsource/plus-jakarta-sans`. Angka harga dan berat memakai `tabular-nums`.
- **Latar & Permukaan:**
  - Latar halaman: `bg-neutral-50`
  - Kartu & panel: `bg-white`
  - Garis tepi input, tabel, dan pemisah: `border-neutral-200`
  - Sudut kartu: `rounded-2xl`; tombol dan input: `rounded-xl`
  - Bayangan hanya pada bar ringkasan melayang di ponsel: `shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`
- **Warna Teks & Aksen:**
  - Teks utama: `text-neutral-900`
  - Teks pendukung: `text-neutral-600`
  - Placeholder: `text-neutral-500`
  - Tombol utama: `bg-blue-700`, hover `hover:bg-blue-800`, teks putih
  - Teks aksen: `text-blue-700`
  - Elemen terpilih: garis tepi `border-blue-700` dan latar `bg-blue-50`
  - Status peringatan (*minimum charge*): `bg-amber-50` dengan teks `text-amber-800`
  - Status error validasi: `bg-red-50` dengan teks `text-red-800`
  - Status berhasil (konfirmasi tautan WhatsApp): `bg-emerald-50` dengan teks `text-emerald-800`
- **Aksesibilitas & Tata Letak:**
  - Area sentuh seluruh tombol, kartu pilihan, dan kotak centang minimal `44 × 44 px`.
  - Ukuran teks minimal `14 px`; teks di dalam kolom input minimal `16 px`.
  - Aksi utama selalu terlihat tanpa menggulir pada layar `360 × 740 px`.
