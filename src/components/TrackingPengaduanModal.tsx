import React, { useState } from 'react';
import { Pengaduan } from '../types';
import { StorageService } from '../services/storageService';
import { createWhatsAppWebLink, generatePesanWA } from '../services/whatsappService';
import { 
  X, Search, CheckCircle2, Clock, AlertTriangle, XCircle, 
  MapPin, Shield, MessageCircle, Calendar, ArrowRight, ExternalLink 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialPengaduanId?: string;
  onOpenReport?: (item: Pengaduan) => void;
}

export const TrackingPengaduanModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialPengaduanId = '',
  onOpenReport
}) => {
  const [searchId, setSearchId] = useState(initialPengaduanId);
  const [searchedItem, setSearchedItem] = useState<Pengaduan | null>(() => {
    if (initialPengaduanId) {
      return StorageService.getPengaduanById(initialPengaduanId) || null;
    }
    return null;
  });
  const [hasSearched, setHasSearched] = useState(!!initialPengaduanId);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const found = StorageService.getPengaduanById(searchId.trim());
    setSearchedItem(found || null);
    setHasSearched(true);
  };

  const recentList = StorageService.getPengaduanList().slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <div>
            <div className="text-xs font-semibold text-teal-600 dark:text-teal-400">
              Pelacakan Terbuka Transparan
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Lacak Status Pengaduan Warga
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Masukkan Nomor Tiket (cth: RW04-2026-0042)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all shrink-0"
            >
              Lacak Tiket
            </button>
          </form>

          {/* Quick Select Buttons */}
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium mr-2">Contoh Tiket Cepat:</span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1 sm:mt-0">
              {recentList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSearchId(item.id);
                    setSearchedItem(item);
                    setHasSearched(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-300 hover:text-teal-600 text-xs font-mono font-medium border border-slate-200 dark:border-slate-700"
                >
                  {item.id} ({item.status})
                </button>
              ))}
            </div>
          </div>

          {/* Search Result */}
          {searchedItem ? (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Card Summary */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">
                    #{searchedItem.id}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    searchedItem.status === 'selesai'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : searchedItem.status === 'diproses'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : searchedItem.status === 'ditolak'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {searchedItem.status === 'selesai' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {searchedItem.status === 'diproses' && <Clock className="w-3.5 h-3.5" />}
                    {searchedItem.status === 'menunggu' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {searchedItem.status === 'ditolak' && <XCircle className="w-3.5 h-3.5" />}
                    STATUS: {searchedItem.status.toUpperCase()}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {searchedItem.judul}
                </h4>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {searchedItem.lokasi.rt} - {searchedItem.lokasi.alamat}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {searchedItem.createdAt}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/80">
                  {searchedItem.deskripsi}
                </p>

                {searchedItem.fotoUrl && (
                  <div className="mt-3">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1">Foto Bukti Pelapor:</span>
                    <img
                      src={searchedItem.fotoUrl}
                      alt="Foto Bukti"
                      className="w-full sm:w-64 h-36 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                )}
              </div>

              {/* Progress Timeline */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  Tahapan Penanganan Masalah
                </h5>
                <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                  
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 relative">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Laporan Terkirim &amp; Terdaftar
                      </div>
                      <div className="text-[11px] text-slate-500">{searchedItem.createdAt}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        Telah masuk ke sistem pusat RW 04 dan nomor tiket diterbitkan.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                      searchedItem.status !== 'menunggu'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-amber-500 text-white animate-pulse'
                    }`}>
                      {searchedItem.status !== 'menunggu' ? '✓' : '2'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Verifikasi &amp; Peninjauan Pengurus RW
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {searchedItem.status === 'menunggu'
                          ? 'Pengurus RW dan tim piket sedang meninjau validitas lokasi dan urgensi.'
                          : 'Laporan telah diverifikasi oleh Pengurus RW 04.'}
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                      searchedItem.status === 'selesai'
                        ? 'bg-emerald-500 text-white'
                        : searchedItem.status === 'diproses'
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                    }`}>
                      {searchedItem.status === 'selesai' ? '✓' : '3'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Tindak Lanjut Lapangan / Pengerjaan
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {searchedItem.status === 'diproses'
                          ? 'Regu teknis/Pokja RW atau PPSU Kelurahan sedang menangani di lokasi.'
                          : searchedItem.status === 'selesai'
                          ? 'Tindakan lapangan telah selesai dikerjakan.'
                          : 'Menunggu proses penugasan.'}
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-4 relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                      searchedItem.status === 'selesai'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                    }`}>
                      {searchedItem.status === 'selesai' ? '✓' : '4'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Penyelesaian &amp; Dokumentasi
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {searchedItem.status === 'selesai'
                          ? 'Laporan dituntaskan dan bukti pekerjaan diarsipkan secara terbuka.'
                          : 'Laporan belum tuntas sepenuhnya.'}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Official Admin Note Box */}
              {searchedItem.tanggapanAdmin && (
                <div className="p-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 dark:text-teal-300 mb-1.5">
                    <Shield className="w-4 h-4 text-teal-600" />
                    Tanggapan Resmi Pengurus RW 04 Malaka Sari
                  </div>
                  <p className="text-xs text-teal-800 dark:text-teal-200">
                    "{searchedItem.tanggapanAdmin}"
                  </p>
                  {searchedItem.namaPetugasAdmin && (
                    <div className="text-[11px] text-teal-700 dark:text-teal-400 mt-2 font-medium">
                      Ditangani oleh: {searchedItem.namaPetugasAdmin}
                    </div>
                  )}

                  {searchedItem.fotoBuktiPenyelesaian && (
                    <div className="mt-3">
                      <span className="text-[11px] font-semibold text-teal-800 dark:text-teal-300 block mb-1">
                        Foto Bukti Selesai:
                      </span>
                      <img
                        src={searchedItem.fotoBuktiPenyelesaian}
                        alt="Bukti Selesai"
                        className="w-full sm:w-64 h-36 object-cover rounded-xl border border-teal-200"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* WhatsApp direct notification trigger button */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={createWhatsAppWebLink(
                    searchedItem.noHpPelapor,
                    generatePesanWA(searchedItem, searchedItem.status === 'selesai' ? 'status_selesai' : 'status_diproses')
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Kirim Pesan WhatsApp Resmi
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onOpenReport && (
                  <button
                    onClick={() => {
                      onOpenReport(searchedItem);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-all"
                  >
                    Tampilkan di Peta RW <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ) : hasSearched ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <Search className="w-10 h-10 mx-auto stroke-1 mb-2 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tiket Tidak Ditemukan
              </p>
              <p className="text-xs mt-1">
                Periksa kembali nomor tiket yang Anda masukkan (contoh format: RW04-2026-0042).
              </p>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
              Masukkan nomor tiket pengaduan di atas untuk memantau progres penanganan secara transparan.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
