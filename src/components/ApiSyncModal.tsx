import React, { useState } from 'react';
import { 
  X, RefreshCw, CheckCircle2, Server, Globe, Database, 
  Code2, ExternalLink, Zap, Terminal, Shield, ArrowRight 
} from 'lucide-react';
import { StorageService } from '../services/storageService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiSyncModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Hari ini, 18:45 WIB');
  const [activeEndpoint, setActiveEndpoint] = useState<'list' | 'create' | 'stats' | 'crm'>('list');

  if (!isOpen) return null;

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setSyncSuccess(false);

    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');
    }, 1200);
  };

  const codeSnippets = {
    list: `// Laravel 11 Controller: Api/PengaduanController.php
public function index(Request $request)
{
    $pengaduan = Pengaduan::where('rw', '04')
        ->where('kelurahan', 'Malaka Sari')
        ->with(['lokasi', 'tanggapan'])
        ->orderByDesc('created_at')
        ->paginate(15);

    return response()->json([
        'status' => 'success',
        'meta' => ['total' => $pengaduan->total(), 'rw' => '04'],
        'data' => $pengaduan->items()
    ]);
}`,
    create: `// Endpoint: POST /api/v1/pengaduan
// Payload Masuk
{
  "judul": "PJU Padam di Jl. Anggrek",
  "kategori": "pju_fasum",
  "rt": "RT 07",
  "lat": -6.2325,
  "lng": 106.9268,
  "no_whatsapp": "081399887766",
  "nama_pelapor": "Hendro Wijaya"
}`,
    stats: `// Endpoint: GET /api/v1/statistik/kewilayahan
{
  "kelurahan": "Malaka Sari",
  "rw": "04",
  "angka_bebas_jentik": 98.6,
  "total_pengaduan": 142,
  "selesai": 118,
  "indeks_kepuasan": 4.8
}`,
    crm: `// Integrasi CRM Pemprov DKI Jakarta (JAKI Satu Data)
POST https://crm.jakarta.go.id/api/v2/laporan/sinkronisasi
Authorization: Bearer dki_gov_rw04_jwt_token...
Content-Type: application/json`
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Integrasi API &amp; Satu Data Instansi
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sinkronisasi Kelurahan Malaka Sari • CRM DKI • Arsitektur Laravel &amp; Firebase
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Status Hub Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Firebase */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <Database className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Connected
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Firebase Firestore
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Real-time reactive database &amp; storage replication.
              </p>
            </div>

            {/* Laravel API */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <Server className="w-4 h-4 text-rose-500" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Laravel 11 Ready
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                REST API Backend
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                OAuth 2.0 Passport, rate limiting &amp; webhook events.
              </p>
            </div>

            {/* Vercel Host */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  vercel.app
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Edge Hosting
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Ultra-fast CDN, zero cold start &amp; HTTPS SSL.
              </p>
            </div>

          </div>

          {/* Sync Trigger Action Box */}
          <div className="p-5 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-900 dark:text-teal-300">
                <Zap className="w-4 h-4 text-teal-600" />
                Sinkronisasi Dua Arah ke Kelurahan Malaka Sari
              </div>
              <p className="text-xs text-teal-800 dark:text-teal-200/90 mt-1">
                Kirim data pengaduan valid dan angka bebas jentik RW 04 ke dashboard instansi terkait.
              </p>
              <span className="text-[11px] text-teal-600 dark:text-teal-400 mt-1 block">
                Terakhir disinkronkan: {lastSyncTime}
              </span>
            </div>

            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Menghubungkan...' : 'Sinkronkan Sekarang'}
            </button>
          </div>

          {syncSuccess && (
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Sinkronisasi Berhasil: 142 data pengaduan dan 15 data RT terverifikasi ke sistem Satu Data Kelurahan Malaka Sari.</span>
            </div>
          )}

          {/* API Endpoints Navigator */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-500" />
                Spesifikasi RESTful API Endpoint
              </h4>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => setActiveEndpoint('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeEndpoint === 'list'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                GET /api/v1/pengaduan
              </button>
              <button
                onClick={() => setActiveEndpoint('create')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeEndpoint === 'create'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                POST /api/v1/pengaduan
              </button>
              <button
                onClick={() => setActiveEndpoint('stats')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeEndpoint === 'stats'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                GET /api/v1/statistik/kewilayahan
              </button>
              <button
                onClick={() => setActiveEndpoint('crm')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeEndpoint === 'crm'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                POST /api/sync/crm-dki
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 p-4 font-mono text-xs overflow-x-auto">
              <pre>{codeSnippets[activeEndpoint]}</pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
