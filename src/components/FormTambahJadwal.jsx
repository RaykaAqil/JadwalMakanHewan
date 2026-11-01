import { useState } from 'react';

/**
 * Komponen FormTambahJadwal
 * Merupakan Controlled Component untuk menginput data jadwal makan baru.
 * Didesain menggunakan Tailwind CSS utility classes.
 * @param {Object} props
 * @param {Function} props.onTambahJadwal - Callback saat jadwal baru disubmit
 */
function FormTambahJadwal({ onTambahJadwal }) {
  // State untuk setiap input (Controlled Component)
  const [namaHewan, setNamaHewan] = useState('');
  const [jenisHewan, setJenisHewan] = useState('Kucing');
  const [waktuMakan, setWaktuMakan] = useState('');
  const [jenisMakanan, setJenisMakanan] = useState('');
  const [porsi, setPorsi] = useState('');
  const [status, setStatus] = useState('Belum Diberi Makan');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input sederhana
    if (!namaHewan.trim() || !waktuMakan.trim() || !jenisMakanan.trim()) {
      setErrorMsg('Mohon lengkapi Nama Hewan, Waktu Makan, dan Jenis Makanan!');
      return;
    }

    // Buat objek data jadwal makan baru
    const dataBaru = {
      namaHewan: namaHewan.trim(),
      jenisHewan,
      waktuMakan,
      jenisMakanan: jenisMakanan.trim(),
      porsi: porsi.trim() ? porsi.trim() : '1 Porsi Standar',
      status,
    };

    // Kirim data ke komponen induk (App.jsx)
    onTambahJadwal(dataBaru);

    // Reset input form ke nilai awal
    setNamaHewan('');
    setJenisHewan('Kucing');
    setWaktuMakan('');
    setJenisMakanan('');
    setPorsi('');
    setStatus('Belum Diberi Makan');
    setErrorMsg('');
  };

  return (
    <aside className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <div className="border-b border-slate-100 pb-4 mb-5">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          Tambah Jadwal Makan
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Isi formulir di bawah untuk menambahkan pengingat makan baru.
        </p>
      </div>

      {/* Pesan Kesalahan / Validasi jika ada field kosong */}
      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3 rounded-xl mb-4 flex items-center gap-2" role="alert">
          <span>⚠️</span> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nama Hewan */}
        <div>
          <label htmlFor="namaHewan" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
            Nama Hewan <span className="text-rose-500">*</span>
          </label>
          <input
            id="namaHewan"
            type="text"
            className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 transition-all duration-150 placeholder:text-slate-400"
            placeholder="Contoh: Mimi, Bobi, Milo"
            value={namaHewan}
            onChange={(e) => setNamaHewan(e.target.value)}
          />
        </div>

        {/* Input Jenis Hewan & Waktu Makan (2 Kolom) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="jenisHewan" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              Jenis Hewan <span className="text-rose-500">*</span>
            </label>
            <select
              id="jenisHewan"
              className="w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 transition-all duration-150"
              value={jenisHewan}
              onChange={(e) => setJenisHewan(e.target.value)}
            >
              <option value="Kucing">🐱 Kucing</option>
              <option value="Anjing">🐶 Anjing</option>
              <option value="Burung">🦜 Burung</option>
              <option value="Kelinci">🐰 Kelinci</option>
              <option value="Hamster">🐹 Hamster</option>
              <option value="Ikan">🐠 Ikan</option>
              <option value="Lainnya">🐾 Lainnya</option>
            </select>
          </div>

          <div>
            <label htmlFor="waktuMakan" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              Waktu Makan <span className="text-rose-500">*</span>
            </label>
            <input
              id="waktuMakan"
              type="time"
              className="w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 transition-all duration-150"
              value={waktuMakan}
              onChange={(e) => setWaktuMakan(e.target.value)}
            />
          </div>
        </div>

        {/* Input Jenis Makanan */}
        <div>
          <label htmlFor="jenisMakanan" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
            Jenis Makanan <span className="text-rose-500">*</span>
          </label>
          <input
            id="jenisMakanan"
            type="text"
            className="w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 transition-all duration-150 placeholder:text-slate-400"
            placeholder="Contoh: Whiskas Tuna / Royal Canin"
            value={jenisMakanan}
            onChange={(e) => setJenisMakanan(e.target.value)}
          />
        </div>

        {/* Input Takaran / Porsi & Status Awal */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="porsi" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              Takaran / Porsi
            </label>
            <input
              id="porsi"
              type="text"
              className="w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 transition-all duration-150 placeholder:text-slate-400"
              placeholder="Contoh: 1 sachet"
              value={porsi}
              onChange={(e) => setPorsi(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              Status Awal
            </label>
            <select
              id="status"
              className="w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-teal-600 focus:ring-3 focus:ring-teal-500/15 transition-all duration-150"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Belum Diberi Makan">Belum Diberi Makan</option>
              <option value="Sudah Diberi Makan">Sudah Diberi Makan</option>
            </select>
          </div>
        </div>

        {/* Tombol Simpan */}
        <button
          type="submit"
          id="btn-tambah-jadwal"
          className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-150 shadow-sm shadow-teal-700/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <span>+</span> Simpan Jadwal Makan
        </button>
      </form>
    </aside>
  );
}

export default FormTambahJadwal;
