# 🚀 Fullstack Todo App (Next.js + Nest.js + Docker)

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Aplikasi manajemen tugas (Todo List) fullstack yang terintegrasi menggunakan Docker.

- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** NestJS + Prisma ORM + SQLite
- **Infrastructure:** Docker & Docker Compose (Node 20 Alpine)

---

## 📋 Prasyarat (Prerequisites)

Pastikan di komputer Anda sudah terinstall:

- **Docker Desktop** (Pastikan statusnya _Running_).
- **Git** (Untuk clone repository).
- **Node.js v20 LTS** (Disarankan versi 20 sesuai environment Docker).
- **Yarn** (Package manager).

---

## 🛠️ Langkah Instalasi & Setup

Ikuti urutan langkah di bawah ini agar aplikasi berjalan lancar.

### 1. Setup Environment Variables

Kita perlu membuat file `.env` di masing-masing folder (Backend dan Frontend).

#### A. Setup Backend

Buat file baru di dalam folder `backend_todo/` bernama `.env`, lalu copy kode berikut:

```properties
# File: backend_todo/.env

# Koneksi Database SQLite
DATABASE_URL="file:./dev.db"

# Port Backend (Penting: Sesuai konfigurasi Docker)
PORT=3001
```

#### B. Setup Frontend

Buat file baru di dalam folder `frontend_todo/` bernama `.env`, lalu copy kode berikut:

```properties
# File: frontend_todo/.env

# URL API Backend (Diakses dari Browser user)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Dummy User ID
NEXT_PUBLIC_USER_ID=test-123
```

### 2. Menjalankan Aplikasi (Docker

Buka terminal di folder paling luar (root project yang ada file docker-compose.yml), lalu jalankan:

```properties
docker-compose up --build -d
```

| Flag      | Fungsi                                                        |
| :-------- | :------------------------------------------------------------ |
| `--build` | Memaksa build ulang image agar kode terbaru terbaca.          |
| `-d`      | Menjalankan container di background (terminal tidak _stuck_). |

_Estimasi waktu: 3-5 menit untuk build pertama kali._

#### Cara Mengakses

Setelah container berjalan (status _Running_), silakan buka link berikut di browser Anda:

| Aplikasi        | URL                                                      | Keterangan                   |
| :-------------- | :------------------------------------------------------- | :--------------------------- |
| **Frontend**    | [http://localhost:3000](http://localhost:3000)           | Tampilan Utama Aplikasi (UI) |
| **Backend API** | [http://localhost:3001/api/](http://localhost:3001/api/) | Cek data JSON langsung       |

#### Cara Mematikan

Jika ingin menghentikan aplikasi dan menghapus container yang sedang berjalan, jalankan perintah ini di terminal:

```bash
docker-compose down
```

## 📚 API Documentation

Base URL: `http://localhost:3001/api/todo`

### 1. List & Search Todos

Mengambil daftar tugas dengan dukungan fitur pencarian dan pagination.

- **URL:** `GET /api/todo`
- **Method:** `GET`
- **Query Parameters:**
  - `search` (optional): String untuk mencari judul tugas.
  - `page` (optional): Halaman ke berapa (Default: 1).
  - `limit` (optional): Jumlah item per halaman (Default: 10).

**Contoh Request:**

```http
GET http://localhost:3001/api/todo?search=docker&page=1&limit=5
```

---

### 2. Get Detail Todo

Mengambil satu data tugas berdasarkan ID.

- **URL:** `/api/todo/:id`
- **Method:** `GET`

**Contoh Request:**

```http
GET http://localhost:3001/api/todo/1
```

### 3. Create Todo

Membuat tugas baru.

- **URL:** `/api/todo`
- **Method:** `POST`
- **Content-Type:** `application/json`

**Body:**

```json
{
  "title": "Belajar Docker",
  "description": "Membuat container untuk Next.js dan NestJS"
}
```

### 4. Update Todo

Mengedit data tugas (Judul atau Deskripsi).

- **URL:** `/api/todo/:id`
- **Method:** `PATCH`
- **Content-Type:** `application/json`

**Body:**

```json
{
  "title": "Belajar Docker Compose",
  "description": "Update konfigurasi yaml"
}
```

### 5. Toggle Status

Mengubah status tugas (Switch `completed` true/false).

- **URL:** `/api/todo/:id/toggle`
- **Method:** `PATCH`

**Contoh Request:**

```http
PATCH http://localhost:3001/api/todo/1/toggle
```

### 6. Delete Todo

Menghapus tugas secara permanen.

- **URL:** `/api/todo/:id`
- **Method:** `DELETE`

**Contoh Request:**

```http
DELETE http://localhost:3001/api/todo/1
```

## 💡 Keputusan Teknis (Technical Decisions)

- **Dockerized Environment**
  Menggunakan `docker-compose` untuk menyatukan Frontend dan Backend dalam satu jaringan terisolasi, memastikan aplikasi berjalan sama di setiap mesin (dev/prod).

- **Next.js Standalone Output**
  Mengaktifkan fitur `output: 'standalone'` pada Next.js untuk mengurangi ukuran image Docker secara drastis (hanya menyertakan file yang dipakai), sehingga build lebih cepat dan ringan (~100MB).

- **Separation of Concerns**
  Logic bisnis dipisahkan dari UI menggunakan pattern **Service & Custom Hooks** (`useTodos`). Ini membuat kode React lebih bersih (clean code) dan mudah di-maintenance.

## 👥 Authors

- **[Supriadi](https://github.com/supriaditech)** - _Fullstack Developer_
  [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/supriaditech)
"# todo-list" 
