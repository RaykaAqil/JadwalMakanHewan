import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatSummary from './components/StatSummary';
import FormTambahJadwal from './components/FormTambahJadwal';
import DaftarJadwal from './components/DaftarJadwal';
import FaktaKucing from './components/FaktaKucing';
import API_BASE_URL from './config/api';
import './App.css';

function App() {
  // State utama penyimpan daftar jadwal makan hewan (dari backend)
  const [jadwalList, setJadwalList] = useState([]);

  // Ambil semua jadwal dari backend saat mount
  const fetchJadwal = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/jadwal`);
      if (!res.ok) throw new Error('Gagal mengambil data');
      const data = await res.json();
      setJadwalList(data);
    } catch (err) {
      console.error('fetchJadwal error:', err);
    }
  }, []);

  useEffect(() => {
    fetchJadwal();
  }, [fetchJadwal]);

  // Handler: Menambahkan data baru ke backend lalu refresh
  const handleTambahJadwal = async (dataBaru) => {
    try {
      const res = await fetch(`${API_BASE_URL}/jadwal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataBaru),
      });
      if (!res.ok) throw new Error('Gagal menambah jadwal');
      await fetchJadwal();
    } catch (err) {
      console.error('handleTambahJadwal error:', err);
    }
  };

  // Handler: Toggle status antara 'Sudah Diberi Makan' dan 'Belum Diberi Makan'
  const handleToggleStatus = async (id) => {
    const item = jadwalList.find((j) => j.id === id);
    if (!item) return;
    const statusBaru =
      item.status === 'Sudah Diberi Makan'
        ? 'Belum Diberi Makan'
        : 'Sudah Diberi Makan';
    try {
      const res = await fetch(`${API_BASE_URL}/jadwal/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusBaru }),
      });
      if (!res.ok) throw new Error('Gagal update status');
      await fetchJadwal();
    } catch (err) {
      console.error('handleToggleStatus error:', err);
    }
  };

  // Handler: Menghapus data jadwal dari backend
  const handleHapusJadwal = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/jadwal/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Gagal menghapus jadwal');
      await fetchJadwal();
    } catch (err) {
      console.error('handleHapusJadwal error:', err);
    }
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
