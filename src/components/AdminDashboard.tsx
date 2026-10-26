import React, { useState } from 'react';
import { Pengaduan, StatusPengaduan, WhatsAppNotificationLog, UserSession } from '../types';
import { StorageService } from '../services/storageService';
import { createWhatsAppWebLink, generatePesanWA } from '../services/whatsappService';
import { triggerGlobalToast } from './NotificationToast';
import { 
  ShieldCheck, AlertTriangle, Clock, CheckCircle2, XCircle, Search, 
  Filter, MessageCircle, ExternalLink, Download, Printer, BarChart3, 
  MapPin, UserCheck, Layers, RefreshCw, Send, Check, CloudCheck, Eye
} from 'lucide-react';

interface Props {
  pengaduanList: Pengaduan[];
  currentUser: UserSession;
  onSelectReportToMap?: (item: Pengaduan) => void;
  onSwitchToWarga: () => void;
  onOpenApiSync: () => void;
}

export const AdminDashboard: React.FC<Props> = ({
  pengaduanList,
  currentUser,
  onSelectReportToMap,
  onSwitchToWarga,
  onOpenApiSync
}) => {
  const [activeTab, setActiveTab] = useState<'laporan' | 'analitik' | 'whatsapp_logs' | 'sync'>('laporan');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRT, setFilterRT] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state for verification modal
  const [editingItem, setEditingItem] = useState<Pengaduan | null>(null);
  const [formStatus, setFormStatus] = useState<StatusPengaduan>('diproses');
  const [formTanggapan, setFormTanggapan] = useState('');
  const [formPetugas, setFormPetugas] = useState(currentUser.nama || 'Pengurus RW 04');
  const [formFotoBukti, setFormFotoBukti] = useState('');
  const [sendWA, setSendWA] = useState(true);

  const analytics = StorageService.getAnalytics();
  const waLogs = StorageService.getWhatsAppLogs();

  // Filter complaints
  const filteredList = pengaduanList.filter((item) => {
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchRT = filterRT === 'all' || item.lokasi.rt === filterRT;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || 
      item.judul.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.namaPelapor.toLowerCase().includes(q) ||
      item.lokasi.alamat.toLowerCase().includes(q);
    return matchStatus && matchRT && matchSearch;
  });

  const handleOpenEdit = (item: Pengaduan) => {
    setEditingItem(item);
    setFormStatus(item.status === 'menunggu' ? 'diproses' : item.status);
    setFormTanggapan(item.tanggapanAdmin || '');
    setFormPetugas(item.namaPetugasAdmin || currentUser.nama || 'H. Bambang Sugiarto (Ketua RW 04)');
    setFormFotoBukti(item.fotoBuktiPenyelesaian || '');
  };

  const handleSaveVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = StorageService.updateStatus(
      editingItem.id,
      formStatus,
      formTanggapan.trim(),
      formPetugas.trim(),
      formFotoBukti.trim()
    );

    if (updated) {
      const waMsg = generatePesanWA(
        updated,
        formStatus === 'selesai' ? 'status_selesai' : formStatus === 'diproses' ? 'status_diproses' : 'status_ditolak',
        formTanggapan.trim()
      );
      const waLink = createWhatsAppWebLink(updated.noHpPelapor, waMsg);

      triggerGlobalToast({
        tipe: 'whatsapp',
        judul: `Status #${updated.id} Diperbarui: ${formStatus.toUpperCase()}`,
        pesan: `Notifikasi WhatsApp dikirimkan ke ${updated.namaPelapor} (${updated.noHpPelapor}).`,
        waLink
      });

      setEditingItem(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Tanggal', 'Judul', 'Kategori', 'RT', 'Alamat', 'Pelapor', 'No WhatsApp', 'Status', 'Tanggapan'];
    const rows = pengaduanList.map(p => [
      p.id,
      `"${p.createdAt}"`,
      `"${p.judul.replace(/"/g, '""')}"`,
      p.kategori,
      p.lokasi.rt,
      `"${p.lokasi.alamat.replace(/"/g, '""')}"`,
      `"${p.namaPelapor.replace(/"/g, '""')}"`,
      `"${p.noHpPelapor}"`,
      p.status,
      `"${(p.tanggapanAdmin || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_pengaduan_rw04_malakasari_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 border border-teal-500/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Panel Kendali Pengurus RW 04 Malaka Sari
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Dashboard Manajemen Pengaduan Warga
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Otoritas verifikasi, penugasan regu PPSU/Pokja RW, monitoring tren pengaduan spasial, dan integrasi notifikasi WhatsApp terpusat.
              </p>
              
              {/* User badge */}
              <div className="mt-3 flex items-center gap-2 text-xs text-teal-200">
                <UserCheck className="w-4 h-4 text-teal-400" />
                <span>Login sebagai: <strong>{currentUser.nama}</strong> ({currentUser.rt})</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Firebase Firestore Sync Aktif
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onOpenApiSync}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                Integrasi API Satu Data
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Ekspor CSV
              </button>

              <button
                onClick={onSwitchToWarga}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md transition-all"
              >
                Lihat Sebagai Warga
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-3 border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block font-medium">Total Laporan</span>
              <span className="text-2xl font-extrabold text-white mt-0.5 block">{analytics.total}</span>
              <span className="text-[10px] text-teal-300">Semua RT 01 - 15</span>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-3 border border-slate-700/50">
              <span className="text-[11px] text-amber-300 block font-medium">Menunggu Verifikasi</span>
              <span className="text-2xl font-extrabold text-amber-400 mt-0.5 block">{analytics.menunggu}</span>
              <span className="text-[10px] text-amber-200/80">Perlu tindakan admin</span>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-3 border border-slate-700/50">
              <span className="text-[11px] text-blue-300 block font-medium">Sedang Diproses</span>
              <span className="text-2xl font-extrabold text-blue-400 mt-0.5 block">{analytics.diproses}</span>
              <span className="text-[10px] text-blue-200/80">Dalam pengerjaan PPSU/Pokja</span>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-3 border border-slate-700/50">
              <span className="text-[11px] text-emerald-300 block font-medium">Tuntas Ditangani</span>
              <span className="text-2xl font-extrabold text-emerald-400 mt-0.5 block">{analytics.selesai}</span>
              <span className="text-[10px] text-emerald-300 font-semibold">{analytics.persentaseSelesai}% Penyelesaian</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-6">
          <button
            onClick={() => setActiveTab('laporan')}
            className={`pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'laporan'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Verifikasi &amp; Tanggapi Pengaduan ({pengaduanList.length})
          </button>

          <button
            onClick={() => setActiveTab('analitik')}
            className={`pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'analitik'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard Analitik Tren Bulanan
          </button>

          <button
            onClick={() => setActiveTab('whatsapp_logs')}
            className={`pb-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'whatsapp_logs'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Log WhatsApp Terkirim ({waLogs.length})
          </button>
        </div>

        {/* TAB 1: DAFTAR & VERIFIKASI PENGADUAN */}
        {activeTab === 'laporan' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari ID tiket, pelapor, atau alamat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Status filter */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Status:</span>
                {(['all', 'menunggu', 'diproses', 'selesai', 'ditolak'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      filterStatus === st
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'Semua' : st}
                  </button>
                ))}
              </div>

              {/* RT select */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">RT:</span>
                <select
                  value={filterRT}
                  onChange={(e) => setFilterRT(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">Semua RT</option>
                  {Array.from({ length: 15 }, (_, i) => {
                    const code = `RT ${String(i + 1).padStart(2, '0')}`;
                    return <option key={code} value={code}>{code}</option>;
                  })}
                </select>
              </div>

            </div>

            {/* Complaint List Table / Cards */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                      <th className="py-3 px-4 font-semibold">No. Tiket &amp; Tanggal</th>
                      <th className="py-3 px-4 font-semibold">Judul &amp; Kategori</th>
                      <th className="py-3 px-4 font-semibold">Lokasi RT</th>
                      <th className="py-3 px-4 font-semibold">Pelapor &amp; WhatsApp</th>
                      <th className="py-3 px-4 font-semibold">Status Saat Ini</th>
                      <th className="py-3 px-4 font-semibold text-right">Aksi Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredList.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          Tidak ada pengaduan yang sesuai filter.
                        </td>
                      </tr>
                    ) : (
                      filteredList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                          
                          {/* Tiket */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-mono font-bold text-teal-600 dark:text-teal-400 block">
                              {item.id}
                            </span>
                            <span className="text-[11px] text-slate-400 block mt-0.5">
                              {item.createdAt.substring(0, 16)}
                            </span>
                          </td>

                          {/* Judul & Kategori */}
                          <td className="py-3.5 px-4 min-w-[220px]">
                            <span className="font-bold text-slate-900 dark:text-white block line-clamp-1">
                              {item.judul}
                            </span>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                              {item.kategori.replace('_', ' ')}
                            </span>
                            {item.prioritas === 'darurat' && (
                              <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                DARURAT
                              </span>
                            )}
                          </td>

                          {/* Lokasi */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                              {item.lokasi.rt}
                            </span>
                            <span className="text-[11px] text-slate-400 block max-w-[180px] truncate" title={item.lokasi.alamat}>
                              {item.lokasi.alamat}
                            </span>
                          </td>

                          {/* Pelapor */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-medium text-slate-800 dark:text-slate-200 block">
                              {item.isAnonim ? 'Anonim (Dirahasiakan)' : item.namaPelapor}
                            </span>
                            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                              <MessageCircle className="w-3 h-3" />
                              {item.noHpPelapor}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              item.status === 'selesai'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                                : item.status === 'diproses'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300'
                                : item.status === 'ditolak'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                            }`}>
                              {item.status === 'selesai' && <CheckCircle2 className="w-3 h-3" />}
                              {item.status === 'diproses' && <Clock className="w-3 h-3" />}
                              {item.status === 'menunggu' && <AlertTriangle className="w-3 h-3" />}
                              {item.status === 'ditolak' && <XCircle className="w-3 h-3" />}
                              {item.status.toUpperCase()}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              {onSelectReportToMap && (
                                <button
                                  onClick={() => onSelectReportToMap(item)}
                                  title="Lihat Titik di Peta"
                                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                                >
                                  <MapPin className="w-3.5 h-3.5" />
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleOpenEdit(item)}
                                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs shadow-sm transition-all"
                              >
                                Verifikasi &amp; Respon
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ANALITIK TREN BULANAN */}
        {activeTab === 'analitik' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Monthly Trend Chart */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-teal-600" />
                    Tren Masuk vs Penyelesaian Pengaduan Bulanan (Tahun 2026)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Visualisasi perbandingan volume keluhan warga yang masuk dan tuntas ditangani oleh tim RW 04 Malaka Sari.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-blue-500"></span>
                    <span className="text-slate-600 dark:text-slate-300">Laporan Masuk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500"></span>
                    <span className="text-slate-600 dark:text-slate-300">Laporan Selesai</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Representation */}
              <div className="h-64 flex items-end gap-2 sm:gap-4 pt-8 pb-4 px-2 border-b border-slate-200 dark:border-slate-800">
                {analytics.monthlyTrend.map((m, idx) => {
                  const maxVal = 32;
                  const masukHeight = Math.max(12, Math.round((m.masuk / maxVal) * 100));
                  const selesaiHeight = Math.max(12, Math.round((m.selesai / maxVal) * 100));

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        {/* Masuk Bar */}
                        <div
                          style={{ height: `${masukHeight}%` }}
                          className="w-1/2 max-w-[20px] bg-blue-500/80 hover:bg-blue-600 rounded-t-md transition-all relative"
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-slate-900 text-white px-1.5 py-0.5 rounded shadow whitespace-nowrap transition-opacity pointer-events-none z-10">
                            {m.masuk} Laporan
                          </span>
                        </div>
                        {/* Selesai Bar */}
                        <div
                          style={{ height: `${selesaiHeight}%` }}
                          className="w-1/2 max-w-[20px] bg-emerald-500/80 hover:bg-emerald-600 rounded-t-md transition-all relative"
                        >
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-emerald-700 text-white px-1.5 py-0.5 rounded shadow whitespace-nowrap transition-opacity pointer-events-none z-10">
                            {m.selesai} Selesai
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2">
                        {m.bulan}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Breakdown Grid: RT and Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Distribution per RT */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Sebaran Pengaduan per Wilayah RT (RT 01 - RT 15)
                </h4>
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2">
                  {Object.entries(analytics.rtCount).map(([rtName, count]) => {
                    const percentage = analytics.total > 0 ? Math.round((count / analytics.total) * 100) : 0;
                    return (
                      <div key={rtName} className="text-xs">
                        <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                          <span>{rtName} Malaka Sari</span>
                          <span className="font-mono text-slate-500">{count} laporan ({percentage}%)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percentage}%` }}
                            className="h-full bg-teal-500 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Distribution per Category */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Pengaduan Berdasarkan Kategori Permasalahan
                </h4>
                <div className="space-y-4">
                  {Object.entries(analytics.kategoriCount).map(([catKey, count]) => {
                    const percentage = analytics.total > 0 ? Math.round((count / analytics.total) * 100) : 0;
                    const labels: Record<string, string> = {
                      drainase: 'Drainase & Saluran Air',
                      kebersihan: 'Sampah & Kebersihan',
                      pju_fasum: 'PJU & Fasilitas Umum',
                      jumantik_kesehatan: 'Jumantik & Demam Berdarah',
                      keamanan: 'Keamanan Lingkungan',
                      administrasi: 'Pelayanan Surat RT/RW',
                      lainnya: 'Lain-lain'
                    };

                    return (
                      <div key={catKey} className="text-xs">
                        <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                          <span className="capitalize">{labels[catKey] || catKey}</span>
                          <span className="font-mono text-slate-500">{count} kasus ({percentage}%)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percentage}%` }}
                            className="h-full bg-indigo-500 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: LOG NOTIFIKASI WHATSAPP */}
        {activeTab === 'whatsapp_logs' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm animate-in fade-in space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  Riwayat Notifikasi Real-Time WhatsApp Pelapor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Mendokumentasikan setiap pesan WhatsApp otomatis yang dikirimkan ke nomor pelapor saat status berubah.
                </p>
              </div>

              <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                Total Terkirim: {waLogs.length} Pesan
              </div>
            </div>

            <div className="space-y-3">
              {waLogs.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  Belum ada riwayat pengiriman notifikasi WhatsApp.
                </div>
              ) : (
                waLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="space-y-1 text-xs flex-1">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-bold text-teal-600 dark:text-teal-400">
                          {log.pengaduanId}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 dark:text-slate-300 font-semibold">
                          {log.namaPenerima} ({log.noHp})
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed mt-2">
                        {log.pesan}
                      </div>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                        <Check className="w-3 h-3" /> Berhasil Terkirim
                      </span>

                      <a
                        href={createWhatsAppWebLink(log.noHp, log.pesan)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-all"
                      >
                        Buka di WhatsApp <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VERIFICATION & RESPONSE MODAL */}
        {editingItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
              
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    {editingItem.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Verifikasi &amp; Tanggapan Resmi RW 04
                  </h3>
                </div>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVerification} className="p-6 space-y-4">
                
                {/* Laporan context preview */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {editingItem.judul}
                  </div>
                  <div className="text-slate-500">
                    Lokasi: {editingItem.lokasi.rt} - {editingItem.lokasi.alamat}
                  </div>
                  <div className="text-slate-500">
                    Pelapor: {editingItem.namaPelapor} ({editingItem.noHpPelapor})
                  </div>
                </div>

                {/* Status select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ubah Status Penanganan <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as StatusPengaduan)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  >
                    <option value="menunggu">🟡 Menunggu Verifikasi</option>
                    <option value="diproses">🔵 Sedang Diproses / Pengerjaan</option>
                    <option value="selesai">🟢 Selesai Tuntas Ditangani</option>
                    <option value="ditolak">🔴 Ditolak / Dilimpahkan Kelurahan</option>
                  </select>
                </div>

                {/* Tanggapan Admin */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggapan Resmi Pengurus RW 04 <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Contoh: Laporan telah dicek oleh Pokja RW 04. Regu PPSU telah membersihkan saluran air dan mengangkat sedimen..."
                    value={formTanggapan}
                    onChange={(e) => setFormTanggapan(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Petugas PIC */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Petugas / Pengurus Piket
                  </label>
                  <input
                    type="text"
                    value={formPetugas}
                    onChange={(e) => setFormPetugas(e.target.value)}
                    placeholder="Contoh: H. Bambang (Ketua RW 04) / Tim PPSU"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                {/* Foto bukti pengerjaan */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Lampiran Foto Bukti Penyelesaian (Opsional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://... URL Foto Dokumentasi Selesai"
                      value={formFotoBukti}
                      onChange={(e) => setFormFotoBukti(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormFotoBukti('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80');
                      }}
                      className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 font-medium text-slate-600 dark:text-slate-300"
                    >
                      Preset
                    </button>
                  </div>
                </div>

                {/* Automated WhatsApp Notice Toggle */}
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs space-y-1">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-emerald-900 dark:text-emerald-300">
                    <input
                      type="checkbox"
                      checked={sendWA}
                      onChange={(e) => setSendWA(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    Kirim Notifikasi Real-time Otomatis ke WhatsApp Pelapor
                  </label>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 pl-6">
                    Pelapor ({editingItem.noHpPelapor}) akan menerima pesan WhatsApp dengan format resmi RW 04 Malaka Sari.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-all"
                  >
                    <Send className="w-3.5 h-3.5" /> Simpan &amp; Notifikasi
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
