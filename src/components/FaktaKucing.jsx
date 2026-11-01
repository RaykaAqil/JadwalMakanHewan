import { useState, useEffect } from 'react';

/**
 * Komponen FaktaKucing
 * Mengambil dan menampilkan data fakta kucing dari API eksternal (Cat Facts API)
 * Menerapkan 3 kondisi AJAX: Loading, Success, dan Error serta interaksi tombol "Coba Lagi".
 */
const API_URL = 'https://catfact.ninja/facts?limit=5';

function FaktaKucing() {
  // State manajemen AJAX
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data dari API (dapat dipanggil kembali saat retry / refresh)
  const fetchFacts = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Eksekusi request HTTP GET menggunakan fetch()
      const response = await fetch(API_URL);

      // 2. Validasi status respons HTTP
      if (!response.ok) {
        throw new Error(`Gagal menghubungi server API (Status: ${response.status})`);
      }

      // 3. Parsing data JSON
      const result = await response.json();

      // 4. Simpan array fakta kucing ke dalam state
      if (result && Array.isArray(result.data)) {
        setFacts(result.data);
      } else {
        throw new Error('Format data yang diterima tidak sesuai.');
      }
    } catch (err) {
      // Tangani kemungkinan kegagalan request (koneksi terputus, endpoint salah, dsb)
      setError(err.message || 'Terjadi kesalahan saat mengambil fakta kucing.');
    } finally {
      // Hentikan status loading
      setLoading(false);
    }
  };

  // Panggil API saat komponen pertama kali dimuat (Mount)
  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Gagal menghubungi server API (Status: ${response.status})`);
        }
        const result = await response.json();
        if (!ignore) {
          if (result && Array.isArray(result.data)) {
            setFacts(result.data);
          } else {
            throw new Error('Format data yang diterima tidak sesuai.');
          }
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Terjadi kesalahan saat mengambil fakta kucing.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="mb-8" aria-label="Fakta Menarik Seputar Kucing">
      {/* ========================================================
          KONDISI A: LOADING STATE
          ======================================================== */}
      {loading && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* Spinner Animasi */}
            <div
              className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"
              role="status"
              aria-label="Loading"
            ></div>
            <p className="text-base font-bold text-slate-800">
              Sedang mengambil fakta menarik...
            </p>
            <p className="text-xs text-slate-500">
              Menghubungi API publik CatFact Ninja secara asinkron (AJAX)...
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          KONDISI C: ERROR STATE
          ======================================================== */}
      {!loading && error && (
        <div className="bg-white border border-rose-200 rounded-2xl p-6 sm:p-8 shadow-sm text-center">
          <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl border border-rose-100">
              ⚠️
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Data Gagal Dimuat
            </h3>
            <p className="text-sm text-rose-600 font-medium">
              {error}
            </p>
            <p className="text-xs text-slate-500">
              Pastikan perangkat terhubung ke internet atau periksa ketersediaan server API.
            </p>
            {/* Tombol Interaksi: Coba Lagi */}
            <button
              type="button"
              onClick={fetchFacts}
              className="mt-2 inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>🔄</span> Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          KONDISI B: SUCCESS STATE
          ======================================================== */}
      {!loading && !error && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm">
          {/* Header Bagian Fakta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center text-xl shrink-0 border border-teal-200/60">
                🐱
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  Fakta Menarik Seputar Kucing
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Informasi edukatif yang dimuat langsung dari Cat Facts API
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span>✅</span> 5 Fakta Berhasil Dimuat
              </span>

              <button
                type="button"
                onClick={fetchFacts}
                title="Perbarui fakta kucing"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-teal-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
              >
                <span>🔄</span> Perbarui
              </button>
            </div>
          </div>

          {/* Render List Fakta menggunakan .map() dengan Key Unik */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facts.map((item, index) => (
              <div
                key={`cat-fact-${index}`}
                className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between hover:bg-white hover:shadow-sm transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200/70 px-2 py-0.5 rounded-md">
                      Fakta #{index + 1}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {item.length} karakter
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    &ldquo;{item.fact}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default FaktaKucing;
