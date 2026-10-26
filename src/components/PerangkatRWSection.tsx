import React, { useState } from 'react';
import { 
  HeartHandshake, ShieldCheck, ClipboardList, Activity, 
  Shield, Calendar, MapPin, Users, Phone, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { KEGIATAN_DATA, PERANGKAT_DATA } from '../data/initialData';

export const PerangkatRWSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'semua' | 'PKK' | 'Dasawisma' | 'Jumantik' | 'Posyandu' | 'Siskamling'>('semua');

  const filteredKegiatan = activeTab === 'semua' 
    ? KEGIATAN_DATA 
    : KEGIATAN_DATA.filter((k) => k.divisi === activeTab);

  return (
    <section id="lembaga-rw" className="py-20 bg-slate-50/50 border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-teal-800 border border-teal-200/80 mb-3 shadow-sm">
            <Users className="w-3.5 h-3.5" />
            Lembaga Kemasyarakatan RW 04 Malaka Sari
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Aksi Nyata PKK, Dasawisma &amp; Jumantik
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Pilar utama pelayanan sosial dan kesehatan warga RW 04 Malaka Sari, bergerak aktif menjaga kesejahteraan, sanitasi, dan keamanan lingkungan.
          </p>
        </div>

        {/* 3 Main Pillar Cards in Pure White with Vibrant Accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* PKK Card */}
          <div className="card-white-glow rounded-3xl p-6 sm:p-7 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold mb-4 border border-emerald-100">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-extrabold text-slate-900">
                TP PKK RW 04
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Pokja I - IV
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Pemberdayaan perempuan, pelatihan UP2K kewirausahaan keluarga, pemanfaatan pekarangan lorong hijau hidroponik, dan pembinaan gizi seimbang balita.
            </p>
            <div className="border-t border-slate-100 pt-3.5 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pelatihan Olahan Pangan Sehat &amp; BKB</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ketahanan Lorong Sayur Hidroponik</span>
              </div>
            </div>
          </div>

          {/* Dasawisma Card */}
          <div className="card-white-glow rounded-3xl p-6 sm:p-7 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold mb-4 border border-blue-100">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-extrabold text-slate-900">
                Dasawisma Carik
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                42 Kelompok
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Ujung tombak pendataan Carik Jakarta terpadu untuk 840 KK, monitoring ibu hamil berisiko, pencegahan balita stunting, serta pilah sampah dari rumah.
            </p>
            <div className="border-t border-slate-100 pt-3.5 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Pemutakhiran Data Kependudukan Carik</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Monitoring Tumbuh Kembang Bayi Stunting</span>
              </div>
            </div>
          </div>

          {/* Jumantik Card */}
          <div className="card-white-glow rounded-3xl p-6 sm:p-7 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold mb-4 border border-amber-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-extrabold text-slate-900">
                Jumantik Mandiri
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                ABJ 98.6%
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Pemberantasan Sarang Nyamuk (PSN) 3M Plus secara konsisten setiap Jumat pagi, inspeksi tempat penampungan air, pembagian abate &amp; pemantauan ovitrap.
            </p>
            <div className="border-t border-slate-100 pt-3.5 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Gerakan 1 Rumah 1 Jumantik (G1R1J)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Bebas Jentik Demam Berdarah Dengue</span>
              </div>
            </div>
          </div>

        </div>

        {/* Schedule & Activities Table in Pure White */}
        <div className="card-white-glow rounded-3xl p-6 sm:p-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Agenda Kegiatan Rutin &amp; Mendatang Perangkat RW
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Jadwal resmi pertemuan, aksi lapangan, dan layanan kesehatan masyarakat.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {(['semua', 'PKK', 'Dasawisma', 'Jumantik', 'Posyandu', 'Siskamling'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKegiatan.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 flex flex-col justify-between hover:border-teal-400 transition-all hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                      {item.divisi}
                    </span>
                    <span className={`text-[10px] font-bold ${
                      item.status === 'Rutin' ? 'text-emerald-600' : 'text-blue-600'
                    }`}>
                      ● {item.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.judul}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{item.jadwal}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{item.lokasi}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Perangkat RW Team Roster in Pure White */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              Struktur Pengurus &amp; Koordinator Lembaga
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Melayani warga RW 04 Malaka Sari dengan integritas, dedikasi, dan keterbukaan.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PERANGKAT_DATA.map((p) => (
              <div
                key={p.id}
                className="card-white-glow rounded-2xl p-5 text-center"
              >
                <img
                  src={p.foto}
                  alt={p.nama}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-teal-500 shadow-sm mb-3"
                />
                <h4 className="font-bold text-sm text-slate-900 leading-tight">
                  {p.nama}
                </h4>
                <p className="text-xs text-teal-700 font-semibold mt-1">
                  {p.jabatan}
                </p>
                {p.kontak && (
                  <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1 font-mono font-medium">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    {p.kontak}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
