import { useState } from 'react';
import Header from './components/Header';
import StatSummary from './components/StatSummary';
import FormTambahJadwal from './components/FormTambahJadwal';
import DaftarJadwal from './components/DaftarJadwal';
import FaktaKucing from './components/FaktaKucing';
import './App.css';

/**
 * Data Awal Realistis (Initial State)
 * Menggunakan data nyata untuk hewan peliharaan (bukan Lorem Ipsum / Dummy genetik)
 */
const INITIAL_DATA_JADWAL = [
  {
    id: 1,
    namaHewan: 'Mimi',
    jenisHewan: 'Kucing',
    waktuMakan: '07:00',
    jenisMakanan: 'Whiskas Wet Food Tuna',
    porsi: '1 sachet (85g)',
    status: 'Sudah Diberi Makan',
  },
  {
    id: 2,
    namaHewan: 'Bobi',
    jenisHewan: 'Anjing',
    waktuMakan: '12:00',
    jenisMakanan: 'Royal Canin Adult Kibbles',
    porsi: '1 mangkuk (150g)',
    status: 'Belum Diberi Makan',
  },
  {
    id: 3,
    namaHewan: 'Rio',
    jenisHewan: 'Burung',
    waktuMakan: '16:00',
    jenisMakanan: 'Milet & Biji Bunga Matahari',
    porsi: '2 sendok makan',
    status: 'Belum Diberi Makan',
  },
  {
    id: 4,
    namaHewan: 'Mochi',
    jenisHewan: 'Kelinci',
    waktuMakan: '08:30',
    jenisMakanan: 'Timothy Hay & Potongan Wortel',
    porsi: '1 mangkuk kecil',
    status: 'Sudah Diberi Makan',
  },
];

function App() {
  // State utama penyimpan daftar jadwal makan hewan
  const [jadwalList, setJadwalList] = useState(INITIAL_DATA_JADWAL);

  // Handler: Menambahkan data baru ke dalam state array
  const handleTambahJadwal = (dataBaru) => {
    const jadwalDenganId = {
      ...dataBaru,
      id: Date.now(), // Unique ID menggunakan timestamp
    };
    // Menambahkan item baru ke posisi paling depan (prepend)
    setJadwalList((prevList) => [jadwalDenganId, ...prevList]);
  };

  // Handler: Toggle status antara 'Sudah Diberi Makan' dan 'Belum Diberi Makan'
  const handleToggleStatus = (id) => {
    setJadwalList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          const statusBaru =
            item.status === 'Sudah Diberi Makan'
              ? 'Belum Diberi Makan'
              : 'Sudah Diberi Makan';
          return { ...item, status: statusBaru };
        }
        return item;
      })
    );
  };

  // Handler: Menghapus data jadwal dari state array
  const handleHapusJadwal = (id) => {
    setJadwalList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Hitung data ringkasan untuk StatSummary
  const total = jadwalList.length;
  const sudah = jadwalList.filter((item) => item.status === 'Sudah Diberi Makan').length;
  const belum = jadwalList.filter((item) => item.status === 'Belum Diberi Makan').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Header Aplikasi */}
      <Header />

      {/* 2. Ringkasan Statistik */}
      <StatSummary total={total} sudah={sudah} belum={belum} />

      {/* 3. Fitur: Fakta Menarik Seputar Kucing (AJAX / API Eksternal) */}
      <FaktaKucing />

      {/* 4. Area Konten Utama: Form Input & Daftar Jadwal */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah Data (Controlled Component) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
          <FormTambahJadwal onTambahJadwal={handleTambahJadwal} />
        </div>

        {/* Daftar Jadwal Makan (Render List & Conditional Rendering) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <DaftarJadwal
            jadwalList={jadwalList}
            onToggleStatus={handleToggleStatus}
            onHapus={handleHapusJadwal}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
