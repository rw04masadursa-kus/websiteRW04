import React from 'react';
import { PROFIL_RW04 } from '../data/initialData';
import { 
  Building2, Phone, Mail, MapPin, MessageCircle, 
  ExternalLink, ShieldCheck, HeartHandshake, Sparkles, Database, Globe 
} from 'lucide-react';

interface Props {
  onOpenForm: () => void;
  onOpenTracking: () => void;
  onOpenApiSync: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenForm, onOpenTracking, onOpenApiSync }) => {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Col 1 & 2: Identitas RW 04 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                04
              </div>
              <div>
                <h3 className="text-slate-900 font-extrabold text-lg tracking-tight">
                  RUKUN WARGA 04 MALAKA SARI
                </h3>
                <p className="text-xs text-teal-700 font-semibold">
                  Kecamatan Duren Sawit, Kota Jakarta Timur, DKI Jakarta
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Sistem pelayanan terpadu warga berbasis data spasial presisi. Mengintegrasikan pemberdayaan keluarga TP PKK, pendataan Dasawisma Carik, pencegahan DBD Jumantik Mandiri, dan penanganan pengaduan terbuka.
            </p>

            <div className="space-y-2 text-xs text-slate-600 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{PROFIL_RW04.sekretariat} (Kode Pos: {PROFIL_RW04.kodePos})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{PROFIL_RW04.teleponSekretariat} / WA: {PROFIL_RW04.whatsappSekretariat}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{PROFIL_RW04.email}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Layanan Warga */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Layanan Mandiri
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={onOpenForm} className="hover:text-teal-600 transition-colors font-medium">
                  + Buat Pengaduan Lingkungan
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-teal-600 transition-colors font-medium">
                  Lacak Status Nomor Tiket
                </button>
              </li>
              <li>
                <a href="#peta-pengaduan" className="hover:text-teal-600 transition-colors font-medium">
                  Peta Spasial Sebaran Masalah
                </a>
              </li>
              <li>
                <a href="#lembaga-rw" className="hover:text-teal-600 transition-colors font-medium">
                  Jadwal Posyandu &amp; PSN Jumantik
                </a>
              </li>
              <li>
                <a href="#galeri-kegiatan" className="hover:text-teal-600 transition-colors font-medium">
                  Galeri Foto Dokumentasi Warga
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Lembaga RW */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Lembaga &amp; Pokja
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>TP PKK RW 04 (Pokja I - IV)</li>
              <li>Kader Dasawisma Carik Jakarta</li>
              <li>Jumantik Mandiri (G1R1J)</li>
              <li>Posyandu Balita &amp; Lansia Cempaka</li>
              <li>Siskamling &amp; Satgas Banjir BKT</li>
              <li>Karang Taruna Sub-Unit RW 04</li>
            </ul>
          </div>

          {/* Col 5: Tautan Instansi & Stack */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Integrasi Sistem
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={onOpenApiSync} className="text-teal-600 font-semibold hover:underline flex items-center gap-1">
                  API Satu Data Kelurahan <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <a href="https://jakarta.go.id" target="_blank" rel="noreferrer" className="hover:text-teal-600 transition-colors flex items-center gap-1">
                  Portal Pemprov DKI Jakarta <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://jaki.jakarta.go.id" target="_blank" rel="noreferrer" className="hover:text-teal-600 transition-colors flex items-center gap-1">
                  Aplikasi JAKI (Jakarta Kini) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Database className="w-3.5 h-3.5 text-amber-500" /> Firebase Realtime Sync
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Globe className="w-3.5 h-3.5 text-blue-500" /> Hosting vercel.app
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; 2026 Pengurus RW 04 Kelurahan Malaka Sari, Duren Sawit, Jakarta Timur.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sistem Aktif 24/7
            </span>
            <span>Didukung Laravel 11 Backend &amp; Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
