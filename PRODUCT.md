# Daftar Fitur Produk — LaundryCalc & Catalog

Dokumen ini merangkum daftar fitur dari PRD *LaundryCalc & Catalog* (MVP v0.1), prioritas, ketergantungan antarfitur, catatan pertanyaan yang telah diselesaikan, serta status pengerjaan.

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Katalog Paket Layanan | Must Have | - | Selesai |
| FT-02 | Input Berat & Info *Minimum Charge* | Must Have | - | Selesai |
| FT-03 | Pilihan *Add-On* Interaktif | Must Have | FT-01, FT-02 | Selesai |
| FT-04 | Ringkasan Estimasi *Real-Time* | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 (untuk kolom alamat kondisional) | Selesai |
| FT-06 | Tombol Kirim ke WhatsApp | Must Have | FT-01, FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Informasi Operasional & Disclaimer Lengkap | Should Have | - | Belum (Di luar cakupan tahap ini) |

## Keputusan Klarifikasi & Resolusi PRD

1. **Data toko contoh (Open Item PRD):** Memakai nama toko contoh *Laundry Bersih Sejahtera* dan nomor WhatsApp contoh `6281234567890` di `src/config.ts` agar siap diuji sebelum diganti nomor admin resmi toko.
2. **Kondisi awal kalkulator:** Berat awal disetel `3` kg dan paket pertama (**Cuci Lipat**) otomatis terpilih saat halaman dibuka.
3. **Rentang dan pembulatan angka berat:** Input berat menerima desimal dengan titik maupun koma dari `0,1` kg hingga `100` kg. Tombol cepat `+/-` mengubah berat per `0,5` kg, sementara pengetikan langsung mendukung ketelitian `0,1` kg. Hasil perkalian rupiah dibulatkan ke bilangan bulat terdekat (`Math.round`).
4. **Cakupan tahap ini:** Spesifikasi dan implementasi dikerjakan sampai **FT-06**. Catatan penyangkalan estimasi tetap ditampilkan pada ringkasan biaya (**FT-04**) dan pesan WhatsApp (**FT-06**) sesuai aturan risiko PRD.
