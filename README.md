# Jadwal Makan Hewan

Aplikasi manajemen jadwal makan hewan peliharaan dengan frontend React + Vite dan backend NestJS + Prisma + PostgreSQL.

## Deskripsi

Memungkinkan pengguna menambah, melihat, mengubah status, dan menghapus jadwal makan hewan peliharaan. Data tersimpan di PostgreSQL sehingga tetap ada setelah server restart.

## Struktur Proyek

```
jadwalmakanhewan/
├── src/                  # Frontend React + Vite
│   ├── components/       # Komponen UI
│   ├── config/api.js     # Konfigurasi URL backend
│   └── App.jsx           # State & logic (fetch ke backend)
└── backend/              # Backend NestJS
    ├── src/
    │   ├── jadwal/       # Module CRUD jadwal
    │   ├── prisma/       # PrismaService & PrismaModule
    │   └── main.ts       # Entry point (port 3001)
    └── prisma/
        └── schema.prisma # Model JadwalMakan
```

## Cara Setup & Menjalankan

### Prasyarat
- Node.js 18+
- PostgreSQL (running di localhost:5432)

### 1. Setup Backend

```bash
cd backend

# Salin konfigurasi environment
cp .env.example .env
# Edit .env: isi DATABASE_URL dengan password PostgreSQL kamu

# Install dependencies
npm install

# Buat database (jalankan di psql atau pgAdmin):
# CREATE DATABASE jadwalhewan;

# Jalankan migrasi Prisma
npx prisma migrate deploy

# Jalankan backend (development)
npm run start:dev

# Atau production (setelah build)
npm run build
npm run start
```

Backend berjalan di: **http://localhost:3001**

### 2. Setup Frontend

```bash
# Di root folder (jadwalmakanhewan/)
npm install
npm run dev
```

Frontend berjalan di: **http://localhost:5173**

---

## Daftar Endpoint Backend

Base URL: `http://localhost:3001`

| Method | Endpoint              | Deskripsi                              |
|--------|-----------------------|----------------------------------------|
| GET    | `/jadwal`             | Ambil semua jadwal makan               |
| GET    | `/jadwal/statistik`   | Statistik count (total/sudah/belum)    |
| GET    | `/jadwal/:id`         | Ambil satu jadwal berdasarkan ID       |
| POST   | `/jadwal`             | Tambah jadwal baru                     |
| PUT    | `/jadwal/:id`         | Update jadwal (termasuk toggle status) |
| DELETE | `/jadwal/:id`         | Hapus jadwal                           |

### Contoh Body POST `/jadwal`

```json
{
  "namaHewan": "Ubi",
  "jenisHewan": "Kucing",
  "waktuMakan": "07:00",
  "jenisMakanan": "Whiskas Wet Food Tuna",
  "porsi": "1 sachet (85g)",
  "status": "Belum Diberi Makan"
}
```

### Contoh Response GET `/jadwal/statistik`

```json
{
  "total": 4,
  "sudah": 2,
  "belum": 2
}
```
