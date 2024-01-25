Aplikasi Berbagi File dengan Node.js dan MongoDB
Aplikasi ini adalah sistem sederhana untuk berbagi file yang dibangun menggunakan Node.js, Express, dan MongoDB. Pengguna dapat mengunggah file, melindunginya dengan kata sandi opsional, dan mendownloadnya dengan kata sandi yang sesuai.
Prasyarat
Sebelum menjalankan aplikasi, pastikan Anda telah menginstal hal-hal berikut:
•	Node.js
•	MongoDB Community Server
Memulai
1.	Klon repositori:\
git clone https://github.com/username/repo.git cd file-sharing-app 
2.	Pasang dependensi:
npm install 
3.	Buat file konfigurasi bernama .env di root proyek dan berikan URL koneksi MongoDB. Contoh:
MONGODB_URI=mongodb://localhost:27017/file-sharing-app
Ganti URL dengan string koneksi MongoDB Anda.
4.	Jalankan aplikasi:
npm start 
Aplikasi akan berjalan di http://localhost:3000.
Penggunaan
Mengunggah File
1.	Buka http://localhost:3000 di browser.
2.	Pilih file yang akan diunggah.
3.	(Opsional) Tentukan kata sandi untuk melindungi file.
4.	Klik tombol "Share" untuk mengunggah file.
Mendownload File
1.	Dapatkan link unduhan setelah mengunggah file.
2.	Buka link tersebut di browser.
3.	(Opsional) Masukkan kata sandi yang digunakan saat mengunggah.
4.	Klik tombol "Download" untuk mengunduh file.
Fitur
•	Pengunggahan file dengan kata sandi opsional.
•	Perlindungan dengan kata sandi saat mengunduh file.

