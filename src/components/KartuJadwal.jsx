/**
 * Komponen KartuJadwal
 * Menampilkan detail satu jadwal makan hewan berdasarkan data yang diterima via props.
 * Didesain menggunakan Tailwind CSS utility classes.
@param {Object} props
@param {Object} props.jadwal - Data entitas jadwal makan
@param {number|string} props.jadwal.id - Identifier unik jadwal
@param {string} props.jadwal.namaHewan - Nama hewan peliharaan
@param {string} props.jadwal.jenisHewan - Jenis hewan (Kucing, Anjing, dll)
@param {string} props.jadwal.waktuMakan - Jam pemberian makan (format HH:mm)
@param {string} props.jadwal.jenisMakanan - Nama/merek pakan
@param {string} [props.jadwal.porsi] - Takaran porsi pakan
@param {string} props.jadwal.status - Status makan ("Sudah Diberi Makan" | "Belum Diberi Makan")
@param {Function} props.onToggleStatus - Fungsi toggle status
@param {Function} props.onHapus - Fungsi hapus data jadwal
 */
function KartuJadwal({ jadwal, onToggleStatus, onHapus }) {
  const { id, namaHewan, jenisHewan, waktuMakan, jenisMakanan, porsi, status } = jadwal;

  // Ikon hewan sesuai jenisnya
  const petIcons = {
    Kucing: '🐱',
    Anjing: '🐶',
    Burung: '🦜',
    Kelinci: '🐰',
    Hamster: '🐹',
    Ikan: '🐠',
    Lainnya: '🐾',
  };

  const iconHewan = petIcons[jenisHewan] || '🐾';
  const isSudahMakan = status === 'Sudah Diberi Makan';

  return (
    <article
      className={`bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden ${isSudahMakan ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-amber-500'
        }`}
      data-id={id}
    >
      {/* Header Kartu: Avatar, Nama, Jenis, dan Status Badge */}
      <div className="flex justify-between items-start mb-3.5">
        <div className="flex items-center gap-3.5">
          <div
            className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl border border-slate-200/70 shrink-0"
            aria-label={`Ikon ${jenisHewan}`}
          >
            {iconHewan}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {namaHewan}
            </h3>
            <span className="inline-block text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-1">
              {jenisHewan}
            </span>
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${isSudahMakan
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
        >
          <span>{isSudahMakan ? '✅' : '⏳'}</span>
          <span>{status}</span>
        </div>
      </div>

      {/* Detail Waktu & Makanan */}
      <div className="bg-slate-50/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border border-slate-100">
        <div
          className="font-bold text-xs sm:text-sm text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 inline-flex items-center gap-1.5 w-fit shadow-xs"
          title="Waktu Makan"
        >
          <span>🕒</span>
          <span>{waktuMakan} WIB</span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-xs sm:text-sm text-slate-800">
            {jenisMakanan}
          </span>
          {porsi && (
            <span className="text-xs text-slate-500 mt-0.5">
              Porsi: {porsi}
            </span>
          )}
        </div>
      </div>

      {/* Tombol Interaksi: Ubah Status & Hapus */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => onToggleStatus(id)}
          title={isSudahMakan ? 'Ubah status menjadi Belum Makan' : 'Tandai sudah diberi makan'}
          className={`flex-1 py-2 px-3.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${isSudahMakan
              ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
              : 'border-emerald-200 bg-emerald-50/90 hover:bg-emerald-100 text-emerald-700'
            }`}
        >
          {isSudahMakan ? (
            <>
              <span>↩️</span> Tandai Belum Makan
            </>
          ) : (
            <>
              <span>✨</span> Tandai Sudah Makan
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onHapus(id)}
          title={`Hapus jadwal untuk ${namaHewan}`}
          aria-label={`Hapus jadwal untuk ${namaHewan}`}
          className="w-9 h-9 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors flex items-center justify-center text-sm cursor-pointer shrink-0"
        >
          🗑️
        </button>
      </div>
    </article>
  );
}

export default KartuJadwal;
