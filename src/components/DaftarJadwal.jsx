import { useState } from 'react';
import KartuJadwal from './KartuJadwal';

/**
 * Komponen DaftarJadwal
 * Menampung dan merender list jadwal menggunakan iterasi .map() dari array data.
 * Memiliki fitur conditional rendering apabila data jadwal masih kosong.
 * Didesain menggunakan Tailwind CSS utility classes.
 * @param {Object} props
 * @param {Array} props.jadwalList - Array daftar objek jadwal makan hewan
 * @param {Function} props.onToggleStatus - Handler untuk mengubah status makan
 * @param {Function} props.onHapus - Handler untuk menghapus jadwal
 */
function DaftarJadwal({ jadwalList, onToggleStatus, onHapus }) {
  // State untuk filter tampilan (Semua, Belum Makan, Sudah Makan)
  const [filter, setFilter] = useState('Semua');

  // Filter list sesuai opsi yang dipilih
  const filteredList = jadwalList.filter((item) => {
    if (filter === 'Belum Makan') return item.status === 'Belum Diberi Makan';
    if (filter === 'Sudah Makan') return item.status === 'Sudah Diberi Makan';
    return true; // 'Semua'
  });

  return (
    <section className="space-y-4">
      {/* Header Bagian Daftar & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Daftar Jadwal Makan</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Menampilkan {filteredList.length} dari total {jadwalList.length} jadwal
          </p>
        </div>

        {/* Filter Tab Kategori */}
        {jadwalList.length > 0 && (
          <div className="inline-flex self-start sm:self-auto bg-white p-1 rounded-full border border-slate-200/90 shadow-2xs" role="tablist">
            <button
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filter === 'Semua'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              onClick={() => setFilter('Semua')}
            >
              Semua ({jadwalList.length})
            </button>
            <button
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filter === 'Belum Makan'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              onClick={() => setFilter('Belum Makan')}
            >
              Belum Makan
            </button>
            <button
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filter === 'Sudah Makan'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              onClick={() => setFilter('Sudah Makan')}
            >
              Sudah Makan
            </button>
          </div>
        )}
      </div>

      {/* CONDITIONAL RENDERING: 
          1. Jika array utama jadwalList kosong, tampilkan teks wajib sesuai tugas:
             "Belum ada data jadwal makan hewan."
      */}
      {jadwalList.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl mb-3">
            🥣
          </div>
          <p className="text-base font-bold text-slate-800 mb-1">
            Belum ada data jadwal makan hewan.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
            Silakan tambahkan jadwal makan baru melalui formulir di samping untuk mulai memantau nutrisi hewan.
          </p>
        </div>
      ) : filteredList.length === 0 ? (
        /* Jika filter tidak menghasilkan data */
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl mb-3">
            🔍
          </div>
          <p className="text-base font-bold text-slate-800 mb-1">
            Tidak ada jadwal makan untuk filter &quot;{filter}&quot;.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
            Coba pilih filter &quot;Semua&quot; untuk melihat seluruh jadwal makan hewan.
          </p>
        </div>
      ) : (
        /* 2. Jika ada data, lakukan render list dengan .map() dan unique key */
        <div className="grid grid-cols-1 gap-4">
          {filteredList.map((item) => (
            <KartuJadwal
              key={item.id}
              jadwal={item}
              onToggleStatus={onToggleStatus}
              onHapus={onHapus}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DaftarJadwal;
