# NLP Studio Untar

Microsite bahan ajar Natural Language Processing 4 SKS untuk mahasiswa S1 Teknik Informatika Universitas Tarumanagara.

## Isi paket

- `index.html`: antarmuka, silabus, asesmen, proyek, dan kumpulan studi kasus.
- `config.js`: konfigurasi alamat repository sumber untuk tombol Google Colab.
- `content.js`: struktur modul, praktikum, contoh kode, latihan, dan referensi.
- `theory.js`: uraian teori lengkap seluruh pertemuan.
- `case-studies.js`: isi delapan studi kasus, tujuan eksperimen, metrik, dan tombol notebook.
- `notebooks/`: 25 notebook, terdiri dari pertemuan 1–16, studi kasus terintegrasi, dan delapan studi kasus tambahan.

Kumpulan studi kasus mencakup chatbot dengan guardrail XNLI dan LLM, fine-tuning LoRA/QLoRA, perbandingan strategi chunking pada RAG, hybrid RAG, analisis sentimen, NER, peringkasan, dan semantic search. Notebook dirancang sebagai baseline yang dapat diperluas menjadi eksperimen proyek akhir.

Tidak ada database atau proses build. Website dapat dibuka langsung dengan browser atau dilayani oleh server web statis.

## Menjalankan secara lokal

Cara paling sederhana adalah membuka `index.html`. Untuk pengujian yang menyerupai server:

```bash
python -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## Deploy ke server Untar atau cPanel

1. Buat folder pada document root, misalnya `public_html/nlp`.
2. Unggah seluruh isi folder microsite, termasuk semua file JavaScript dan folder `notebooks`.
3. Pastikan permission file dapat dibaca web server, umumnya `644`.
4. Buka `https://domain.ac.id/nlp/`.
5. Uji modul, tombol salin kode, tautan sumber, pencetakan, dan tampilan ponsel.

Contoh Nginx bila memiliki akses konfigurasi server:

```nginx
server {
    listen 443 ssl;
    server_name nlp.domain.ac.id;
    root /var/www/nlp-untar;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Untuk Apache, menaruh file pada document root sudah cukup. HTTPS, domain, backup, dan access log mengikuti kebijakan infrastruktur Untar.

## Konfigurasi repository dan Google Colab

Setelah repository dibuat, buka `config.js` dan ubah:

```javascript
const SITE_CONFIG = {
  githubOwner: "nama-akun-github",
  githubRepo: "nlp-studio-untar",
  githubBranch: "main"
};
```

Perubahan ini mengaktifkan tombol **Jalankan di Google Colab** pada seluruh modul. Microsite tidak menampilkan tombol untuk membuka notebook di GitHub. Path notebook tidak perlu diubah selama folder `notebooks` dipertahankan.

Notebook yang dibuka di Colab merupakan salinan sesi kerja dan tidak mengubah file asli. Mahasiswa perlu memilih **File → Save a copy in Drive** untuk menyimpan hasilnya.

Jika microsite dipublikasikan sebagai GitHub Pages dengan pola `OWNER.github.io/REPOSITORY`, website mencoba mendeteksi owner dan repository secara otomatis. Konfigurasi manual tetap disarankan, terutama bila memakai custom domain.

## Deploy ke GitHub Pages

1. Buat repository dan unggah seluruh isi folder microsite, termasuk folder `notebooks`.
2. Buka **Settings → Pages**.
3. Pilih **Deploy from a branch**, branch `main`, folder `/root`.
4. Simpan dan tunggu URL Pages aktif.

## Deploy ke Netlify atau Vercel

- Impor repository atau unggah folder situs.
- Build command: kosong.
- Output/publish directory: root proyek (`.`).
- Aktifkan HTTPS dan custom domain bila diperlukan.

## Integrasi dengan LMS

Situs ini tidak memiliki autentikasi atau database. Penanda progres memakai `localStorage`, sehingga hanya tersimpan pada browser mahasiswa dan tidak boleh dipakai sebagai bukti nilai.

Implementasi yang disarankan:

- Materi dan contoh kode: website ini.
- Kuis bernilai, UTS/UAS pilihan ganda: LMS Untar/Moodle.
- Pengumpulan program dan artikel: assignment pada LMS atau repository Git.
- Nilai dan deadline: gradebook LMS.
- Video dan notebook: tautkan dari setiap modul bila sudah tersedia.

Jika di masa depan diperlukan login, sinkronisasi progres, forum, analytics mahasiswa, atau submission langsung, tambahkan backend terautentikasi atau bungkus materi sebagai paket yang kompatibel dengan LMS. Hindari menyimpan data pribadi dan nilai di JavaScript sisi pengguna.

## Pemeliharaan materi

- Edit materi per pertemuan pada objek `moduleContent` di `content.js`.
- Edit kumpulan studi kasus pada `case-studies.js`.
- Edit urutan semester dan aktivitas pada array `lessons` di `index.html`.
- Setelah perubahan, uji seluruh modul dan pastikan tidak ada error JavaScript.
- Gunakan version control dan deploy preview sebelum memperbarui website produksi.

## Sumber utama

- Dive into Deep Learning: https://d2l.ai/
- Deep Learning with Python: https://deeplearningwithpython.io/chapters/

Materi pada microsite adalah penjelasan ulang dan contoh pembelajaran yang disusun untuk mata kuliah. Tautan ke bab sumber tersedia pada setiap modul.
