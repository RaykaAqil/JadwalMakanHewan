/**
 * Komponen Header
 * Menampilkan judul aplikasi "Jadwal Makan Hewan", logo/ikon, dan sub-judul deskriptif.
 */
function Header() {
  return (
    <header className="bg-gradient-to-r from-white via-white to-teal-50/50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 mb-7 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className="w-13 h-13 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center text-2xl shadow-sm border border-teal-200/60 shrink-0"
          aria-label="Ikon Makanan Hewan"
        >
          🐾
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Jadwal Makan Hewan
          </h1>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Kelola jadwal nutrisi dan pemberian pakan hewan kesayangan Anda tepat waktu
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
