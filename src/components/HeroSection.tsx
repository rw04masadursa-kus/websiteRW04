import React, { useState } from 'react';
import { 
  ShieldCheck, MapPin, Search, ArrowRight, MessageCircle, 
  Sparkles, CheckCircle2, Activity, Users, HeartHandshake, FileText, PhoneCall
} from 'lucide-react';
import { PROFIL_RW04 } from '../data/initialData';

interface Props {
  onOpenForm: () => void;
  onOpenTracking: (id?: string) => void;
  onOpenSurat: () => void;
  onOpenApiSync: () => void;
  totalPengaduan: number;
  selesaiPengaduan: number;
}

export const HeroSection: React.FC<Props> = ({
  onOpenForm,
  onOpenTracking,
  onOpenSurat,
  onOpenApiSync,
  totalPengaduan,
  selesaiPengaduan
}) => {
  const [quickTicketInput, setQuickTicketInput] = useState('');

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTicketInput.trim()) {
      onOpenTracking(quickTicketInput.trim());
    } else {
      onOpenTracking();
    }
  };

  return (
    <section className="relative overflow-hidden pristine-white-canvas pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-100">
      
      {/* Eye-catching radiant ambient lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-teal-400/10 via-emerald-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400/8 via-teal-300/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & Welcome */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-teal-800 border border-teal-200/80 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Portal Resmi RW 04 Kelurahan Malaka Sari, Duren Sawit</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Pelayanan Cepat,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500">
                Warga Guyub Rukun
              </span>, Lingkungan Nyaman.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              Sinergi terpadu <strong className="text-slate-900 font-semibold">TP PKK, Dasawisma Carik, dan Kader Jumantik Mandiri</strong>. Sampaikan pengaduan fasilitas umum berbasis peta koordinat presisi dan terima pembaruan status resmi secara real-time via WhatsApp.
            </p>

            {/* Quick Search Ticket Input Bar */}
            <form onSubmit={handleQuickTrack} className="flex gap-2 max-w-lg bg-white p-2 rounded-2xl border border-slate-200 shadow-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ketik Nomor Tiket (cth: RW04-2026-0042)..."
                  value={quickTicketInput}
                  onChange={(e) => setQuickTicketInput(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0"
              >
                Cek Progres
              </button>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenForm}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                + Buat Pengaduan Warga
              </button>

              <button
                onClick={onOpenSurat}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 text-slate-800 font-semibold text-sm shadow-sm transition-all hover:-translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-teal-600" />
                Surat Pengantar Digital
              </button>

              <a
                href="#peta-pengaduan"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-600 py-2 px-3"
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                Buka Peta Spasial
              </a>
            </div>

            {/* Micro proof metrics */}
            <div className="pt-3 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">98.6%</span>
                <span className="text-xs text-slate-500 block font-medium">Bebas Jentik (ABJ)</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">15 RT</span>
                <span className="text-xs text-slate-500 block font-medium">Aktif Malaka Sari</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 tabular-nums">&lt; 2.4 Jam</span>
                <span className="text-xs text-slate-500 block font-medium">Rata-rata Respon</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-teal-600">WhatsApp</span>
                <span className="text-xs text-slate-500 block font-medium">Notifikasi Otomatis</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Community & WhatsApp Card */}
          <div className="lg:col-span-5">
            <div className="card-white-glow rounded-3xl p-6 sm:p-7 relative overflow-hidden">
              
              {/* Header card with Balai RW status */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xl border border-teal-100">
                    🏢
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Pusat Pelayanan Balai RW 04
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Jl. Malaka Raya No. 42 RT 05 / RW 04
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Pelayanan Aktif
                </span>
              </div>

              {/* Realistic WhatsApp Chat Bubble Preview (Eye-Catching) */}
              <div className="mt-5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Notifikasi WhatsApp Resmi RW 04</span>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-mono">
                    Real-time
                  </span>
                </div>

                {/* Simulated WA Message Bubble */}
                <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-emerald-200 shadow-sm text-xs space-y-1 text-slate-800">
                  <p className="font-semibold text-teal-700 text-[11px]">
                    📢 UPDATE STATUS PENGADUAN #RW04-2026-0042
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    "Halo Bpk. Budi Santoso, laporan Anda mengenai <strong>Saluran Air Tersumbat</strong> saat ini <strong>DIPROSES</strong> oleh regu PPSU &amp; Pokja RW 04."
                  </p>
                  <div className="text-[10px] text-slate-400 text-right flex items-center justify-end gap-1 pt-1">
                    <span>14:15 WIB</span>
                    <span className="text-emerald-600 font-bold">✓✓</span>
                  </div>
                </div>
                
                <p className="text-[10px] text-emerald-700 mt-2 italic text-center font-medium">
                  Pelapor tidak perlu bolak-balik menanyakan progres, notifikasi terkirim otomatis!
                </p>
              </div>

              {/* Quick Agenda Highlights */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-amber-500" /> PSN 3M Plus Jumantik
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Jumat, 08.00 WIB</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-2">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" /> Posyandu Balita &amp; Lansia
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Tgl 12 tiap bulan</span>
                </div>
              </div>

              {/* Sambutan Singkat Ketua RW */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
                  alt="Ketua RW 04"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500 shrink-0"
                />
                <div className="text-xs">
                  <p className="italic text-slate-600">
                    "Mari rawat kebersihan dan kekeluargaan di 15 RT RW 04 Malaka Sari."
                  </p>
                  <p className="font-bold text-slate-900 text-[11px] mt-0.5">
                    {PROFIL_RW04.ketuaRW}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 User-Friendly Quick Action Tiles (Pure White Glowing Style) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Tile 1: Buat Pengaduan */}
          <div
            onClick={onOpenForm}
            className="cursor-pointer card-white-glow rounded-2xl p-5 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-3 border border-teal-100 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Lapor Keluhan Warga
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Saluran mampet, tumpukan sampah, lampu jalan mati, atau jentik nyamuk.
            </p>
            <div className="mt-3 text-xs font-semibold text-teal-600 flex items-center gap-1">
              Buka Formulir <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 2: Lacak Tiket */}
          <div
            onClick={() => onOpenTracking()}
            className="cursor-pointer card-white-glow rounded-2xl p-5 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3 border border-blue-100 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Lacak Status Pengaduan
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Ketahui sejauh mana pengerjaan dan tanggapan resmi dari tim piket RW 04.
            </p>
            <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
              Cek Tiket Saya <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 3: Surat Pengantar */}
          <div
            onClick={onOpenSurat}
            className="cursor-pointer card-white-glow rounded-2xl p-5 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3 border border-emerald-100 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Surat Pengantar RT/RW
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Layanan digital pengurusan e-KTP, KK, Domisili, dan SKCK bebas pungli.
            </p>
            <div className="mt-3 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              Buat Surat Online <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 4: Kontak Cepat Pengurus */}
          <a
            href="https://wa.me/6281284040404?text=Halo%20Pengurus%20RW%2004%20Malaka%20Sari,%20saya%20warga%20ingin%20bertanya%20mengenai..."
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer card-white-glow rounded-2xl p-5 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3 border border-purple-100 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Hubungi Sekretariat RW 04
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Layanan konsultasi warga langsung ke nomor resmi WhatsApp Balai RW.
            </p>
            <div className="mt-3 text-xs font-semibold text-purple-600 flex items-center gap-1">
              Chat WhatsApp <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};
