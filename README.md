# YouApp

YouApp adalah aplikasi chat berbasis web yang menggunakan **NestJS** sebagai backend, **MongoDB** sebagai database, dan **RabbitMQ** untuk sistem microservices. Aplikasi ini memiliki fitur-fitur seperti autentikasi dengan JWT, pengelolaan pengguna, serta layanan chat real-time menggunakan WebSocket.

## Fitur

- **Autentikasi JWT**: Pengguna dapat membuat akun, login, dan mendapatkan token untuk mengakses API yang dilindungi.
- **Chat Real-Time**: Menggunakan WebSocket dan RabbitMQ untuk mengirim dan menerima pesan secara real-time.
- **Pengelolaan Pengguna**: Pengguna dapat memperbarui profil mereka dan melihat data profil mereka.
- **Swagger API Docs**: Dokumentasi API yang dapat diakses melalui Swagger UI.

## Prasyarat

Pastikan Anda sudah menginstal Docker di mesin Anda. Jika belum, Anda dapat mengunduh dan menginstal Docker dari [sini](https://www.docker.com/products/docker-desktop).

## Cara Menjalankan Aplikasi dengan Docker

### 1. Clone Repository

```bash
git clone https://github.com/username/youapp.git
cd youapp

### 2. Bangun dan Jalankan Docker Compose, socket.io dan nestjs.
docker-compose up --build
node socket-client.js
npm start


### 3. Akses Aplikasi
Setelah aplikasi berjalan, Anda dapat mengaksesnya melalui:

Swagger API Docs: Akses melalui http://localhost:8080/api-docs untuk melihat dokumentasi API.
Aplikasi Backend: Akses melalui http://localhost:8080.
gunakan juga postman untuk hasil lebih baik.

### 4. Struktur Proyek
src/
auth/: Modul untuk autentikasi dan pembuatan token JWT.
users/: Modul untuk pengelolaan pengguna dan profil.
chat/: Modul untuk layanan chat real-time.
common/: Modul yang berisi utilitas seperti guard, pipes, dan filter.
app.module.ts: Modul utama aplikasi yang mengatur semua dependensi.
main.ts: Titik masuk aplikasi.


### Lisensi
MIT License. Lihat LICENSE untuk informasi lebih lanjut.