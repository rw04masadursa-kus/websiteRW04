import React, { useState, useEffect } from 'react';
import { PengumumanRW, UserSession } from '../types';
import { StorageService } from '../services/storageService';
import { triggerGlobalToast } from './NotificationToast';
import { 
  Bell, AlertCircle, Info, Flame, Plus, Trash2, 
  Calendar, CheckCircle2, ChevronRight, Megaphone 
} from 'lucide-react';

interface Props {
  currentUser?: UserSession;
  onOpenTambahPengumuman?: () => void;
}

export const PengumumanBanner: React.FC<Props> = ({ currentUser, onOpenTambahPengumuman }) => {
  const [pengumumanList, setPengumumanList] = useState<PengumumanRW[]>(() => StorageService.getPengumumanList());
  const [activeItem, setActiveItem] = useState<PengumumanRW | null>(null);

  useEffect(() => {
    const unsub = StorageService.subscribe(() => {
      setPengumumanList(StorageService.getPengumumanList());
    });
    return () => unsub();
  }, []);

  const handleDelete = (id: string, judul: string) => {
    if (confirm(`Hapus pengumuman "${judul}"?`)) {
      StorageService.deletePengumuman(id);
      triggerGlobalToast({
        tipe: 'info',
        judul: 'Pengumuman Dihapus',
        pesan: `Warta "${judul}" telah dihapus oleh Admin.`
      });
      if (activeItem?.id === id) setActiveItem(null);
    }
  };

  if (pengumumanList.length === 0 && currentUser?.role !== 'admin') {
    return null;
  }

  return (
    <section className="bg-white py-6 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner container */}
        <div className="bg-gradient-to-r from-teal-50/90 via-emerald-50/50 to-white rounded-3xl border border-teal-200/80 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-teal-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-sm">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    Warta &amp; Pengumuman Resmi Pengurus RW 04
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-600 text-white shadow-xs">
                    Live Broadcast
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Informasi terkini kegiatan lingkungan, bansos, dan arahan Kelurahan Malaka Sari
                </p>
              </div>
            </div>

            {/* Admin Add Button */}
            {currentUser?.role === 'admin' && onOpenTambahPengumuman && (
              <button
                onClick={onOpenTambahPengumuman}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all shrink-0 self-start md:self-auto"
              >
                <Plus className="w-3.5 h-3.5" /> Siarkan Pengumuman (Admin)
              </button>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {pengumumanList.map((item) => {
              const isPenting = item.prioritas === 'penting';
              const isDarurat = item.prioritas === 'darurat';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-teal-400 transition-all shadow-xs hover:shadow-sm flex flex-col justify-between relative group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                        isDarurat
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : isPenting
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-teal-50 text-teal-800 border border-teal-200'
                      }`}>
                        {isDarurat ? <Flame className="w-3 h-3 text-rose-600" /> : <Bell className="w-3 h-3 text-amber-600" />}
                        {item.prioritas}
                      </span>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{item.tanggal}</span>

                        {currentUser?.role === 'admin' && (
                          <button
                            onClick={() => handleDelete(item.id, item.judul)}
                            title="Hapus Pengumuman Ini"
                            className="ml-1 p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                      {item.judul}
                    </h4>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.isi}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium truncate max-w-[170px]">
                      Oleh: <strong>{item.author}</strong>
                    </span>
                    <button
                      onClick={() => setActiveItem(item)}
                      className="text-teal-700 hover:text-teal-900 font-bold inline-flex items-center gap-0.5"
                    >
                      Baca Lengkap <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Modal Detail Pengumuman */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Warta Resmi RW 04
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {activeItem.tanggal}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-4 leading-snug">
              {activeItem.judul}
            </h3>

            <div className="text-xs text-teal-800 font-medium mt-1 mb-4 flex items-center gap-1.5">
              <span>Disiarkan oleh:</span>
              <strong>{activeItem.author}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {activeItem.isi}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
