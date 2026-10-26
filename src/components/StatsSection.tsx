import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Star, Zap, TrendingUp, BarChart2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { StorageService } from '../services/storageService';

export const StatsSection: React.FC = () => {
  const analytics = StorageService.getAnalytics();

  return (
    <section className="py-12 bg-white border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 tracking-wider uppercase mb-1">
              <TrendingUp className="w-4 h-4" /> Transparansi Kinerja Wilayah RW 04
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Statistik Real-Time Pelayanan Warga
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Akumulasi penanganan pengaduan lingkungan dari 15 Rukun Tetangga (RT 01 s.d. RT 15) Malaka Sari.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Sinkronisasi Otomatis Terhubung</span>
          </div>
        </div>

        {/* 6 Visual Stat Cards (Eye-Catching Pristine White Glow) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Card 1: Total */}
          <div className="card-white-glow rounded-2xl p-4">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold">Total Masuk</span>
              <BarChart2 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
              {analytics.total}
            </div>
            <div className="mt-2 text-[11px] text-slate-500 font-medium">
              Laporan terdaftar
            </div>
          </div>

          {/* Card 2: Selesai */}
          <div className="card-white-glow rounded-2xl p-4 border-emerald-200/80">
            <div className="flex items-center justify-between text-emerald-700 mb-2">
              <span className="text-xs font-bold">Tuntas Ditangani</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 tabular-nums">
              {analytics.selesai}
            </div>
            <div className="mt-2 text-[11px] text-emerald-700 font-bold">
              {analytics.persentaseSelesai}% Penyelesaian
            </div>
          </div>

          {/* Card 3: Diproses */}
          <div className="card-white-glow rounded-2xl p-4 border-blue-200/80">
            <div className="flex items-center justify-between text-blue-700 mb-2">
              <span className="text-xs font-bold">Sedang Diproses</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 tabular-nums">
              {analytics.diproses}
            </div>
            <div className="mt-2 text-[11px] text-blue-700 font-medium">
              Pengerjaan lapangan
            </div>
          </div>

          {/* Card 4: Menunggu */}
          <div className="card-white-glow rounded-2xl p-4 border-amber-200/80">
            <div className="flex items-center justify-between text-amber-700 mb-2">
              <span className="text-xs font-bold">Menunggu Cek</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 tabular-nums">
              {analytics.menunggu}
            </div>
            <div className="mt-2 text-[11px] text-amber-700 font-medium">
              Antrean verifikasi
            </div>
          </div>

          {/* Card 5: Respon Cepat */}
          <div className="card-white-glow rounded-2xl p-4 border-teal-200/80">
            <div className="flex items-center justify-between text-teal-700 mb-2">
              <span className="text-xs font-bold">Respon Cepat</span>
              <Zap className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-teal-600 tabular-nums">
              {analytics.rataRataResponJam} Jam
            </div>
            <div className="mt-2 text-[11px] text-teal-700 font-medium">
              Rata-rata tanggapan
            </div>
          </div>

          {/* Card 6: Kepuasan Warga */}
          <div className="card-white-glow rounded-2xl p-4 border-purple-200/80">
            <div className="flex items-center justify-between text-purple-700 mb-2">
              <span className="text-xs font-bold">Kepuasan Warga</span>
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-600 tabular-nums">
              {analytics.indeksKepuasan} / 5
            </div>
            <div className="mt-2 text-[11px] text-purple-700 font-medium">
              Indeks ulasan warga
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
