/**
 * Komponen StatSummary
 * Menampilkan ringkasan metrik statistik: Total Jadwal, Sudah Diberi Makan, dan Belum Diberi Makan.
@param {Object} props
@param {number} props.total - Jumlah seluruh jadwal
@param {number} props.sudah - Jumlah hewan yang sudah diberi makan
@param {number} props.belum - Jumlah hewan yang belum diberi makan
 */
function StatSummary({ total = 0, sudah = 0, belum = 0 }) {
  const persentaseSudah = total > 0 ? Math.round((sudah / total) * 100) : 0;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8" aria-label="Ringkasan Statistik Jadwal">
      {/* Kartu 1: Total Jadwal */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0 border border-blue-100">
          📋
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500">Total Jadwal</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{total}</span>
          <span className="text-xs text-slate-400 font-medium">Jadwal tercatat</span>
        </div>
      </div>

      {/* Kartu 2: Sudah Diberi Makan */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0 border border-emerald-100">
          ✅
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500">Sudah Diberi Makan</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{sudah}</span>
          <span className="text-xs text-emerald-600 font-medium">{persentaseSudah}% terpenuhi</span>
        </div>
      </div>

      {/* Kartu 3: Belum Diberi Makan */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0 border border-amber-100">
          ⏳
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500">Belum Diberi Makan</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">{belum}</span>
          <span className="text-xs text-amber-600 font-medium">Perlu perhatian</span>
        </div>
      </div>
    </section>
  );
}

export default StatSummary;
