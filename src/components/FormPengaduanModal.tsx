import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { KategoriPengaduan, LokasiKoordinat, Pengaduan, UserSession } from '../types';
import { StorageService } from '../services/storageService';
import { triggerGlobalToast } from './NotificationToast';
import { createWhatsAppWebLink, generatePesanWA } from '../services/whatsappService';
import { 
  X, MapPin, Upload, AlertCircle, CheckCircle2, MessageCircle, 
  Send, ShieldCheck, Sparkles, Copy, ExternalLink, Zap
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onSuccess: (newPengaduan: Pengaduan) => void;
}

const KATEGORI_OPTIONS: { id: KategoriPengaduan; label: string; icon: string; desc: string }[] = [
  { id: 'drainase', label: 'Drainase & Banjir', icon: '🌊', desc: 'Saluran air mampet, gorong-gorong, sedimentasi lumpur' },
  { id: 'kebersihan', label: 'Kebersihan & Sampah', icon: '🗑️', desc: 'Tumpukan sampah liar, gerobak sampah, daun kering' },
  { id: 'pju_fasum', label: 'PJU & Fasilitas Umum', icon: '💡', desc: 'Lampu jalan padam, jalan berlubang, pohon rindang rapuh' },
  { id: 'jumantik_kesehatan', label: 'Jumantik & Nyamuk DBD', icon: '🦟', desc: 'Genangan jentik nyamuk, permohonan abate, fogging' },
  { id: 'keamanan', label: 'Keamanan & Ketertiban', icon: '🛡️', desc: 'Portal rusak, ronda malam, parkir liar, kebisingan' },
  { id: 'administrasi', label: 'Pelayanan & Administrasi', icon: '📄', desc: 'Surat pengantar RT/RW, data kependudukan, bansos' },
  { id: 'lainnya', label: 'Lain-lain', icon: '📌', desc: 'Keluhan lingkungan umum lainnya' }
];

export const FormPengaduanModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccess
}) => {
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState<KategoriPengaduan>('drainase');
  const [prioritas, setPrioritas] = useState<'rendah' | 'sedang' | 'tinggi' | 'darurat'>('sedang');
  const [selectedRT, setSelectedRT] = useState(currentUser.rt.startsWith('RT') ? currentUser.rt : 'RT 04');
  const [alamat, setAlamat] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [namaPelapor, setNamaPelapor] = useState(currentUser.nama || 'Budi Santoso');
  const [noHpPelapor, setNoHpPelapor] = useState('081289123456');
  const [isAnonim, setIsAnonim] = useState(false);
  const [fotoUrl, setFotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map coordinates state
  const [koordinat, setKoordinat] = useState<LokasiKoordinat>({
    lat: -6.2315,
    lng: 106.9285,
    alamat: 'Jl. Malaka Raya, Depan Balai RW 04',
    rt: 'RT 04'
  });

  // Success state modal
  const [createdPengaduan, setCreatedPengaduan] = useState<Pengaduan | null>(null);

  const miniMapContainerRef = useRef<HTMLDivElement>(null);
  const miniMapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Quick Preset Helper for effortless user-friendly testing
  const applyPreset = (type: 'drainase' | 'pju' | 'jumantik') => {
    if (type === 'drainase') {
      setJudul('Saluran Air Tersumbat Sedimen Lumpur Pasca Hujan');
      setKategori('drainase');
      setPrioritas('tinggi');
      setSelectedRT('RT 04');
      setAlamat('Jl. Teratai Depan Rumah No. 18 RT 04');
      setDeskripsi('Saluran air tersumbat endapan pasir dan sampah daun kering. Jika hujan deras air meluber ke jalan utama.');
      setFotoUrl('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80');
      setKoordinat({ lat: -6.2318, lng: 106.9279, alamat: 'Jl. Teratai RT 04', rt: 'RT 04' });
      markerRef.current?.setLatLng([-6.2318, 106.9279]);
      miniMapInstanceRef.current?.setView([-6.2318, 106.9279], 16);
    } else if (type === 'pju') {
      setJudul('Lampu PJU Padam di Pertigaan Menuju Lapangan');
      setKategori('pju_fasum');
      setPrioritas('sedang');
      setSelectedRT('RT 07');
      setAlamat('Jl. Anggrek Ujung Dekat Portal Siskamling');
      setDeskripsi('Lampu penerangan jalan umum mati total sejak kemarin lusa. Kondisi jalan sangat gelap di malam hari.');
      setFotoUrl('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80');
      setKoordinat({ lat: -6.2325, lng: 106.9268, alamat: 'Jl. Anggrek RT 07', rt: 'RT 07' });
      markerRef.current?.setLatLng([-6.2325, 106.9268]);
      miniMapInstanceRef.current?.setView([-6.2325, 106.9268], 16);
    } else {
      setJudul('Temuan Genangan Jentik Nyamuk di Drum Bekas Kosong');
      setKategori('jumantik_kesehatan');
      setPrioritas('tinggi');
      setSelectedRT('RT 02');
      setAlamat('Halaman Kosong Samping Jl. Dahlia Blok C');
      setDeskripsi('Ada drum penampung air hujan yang tidak ditutup dan dipenuhi jentik nyamuk. Mohon kader Jumantik memeriksa.');
      setFotoUrl('https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80');
      setKoordinat({ lat: -6.2309, lng: 106.9295, alamat: 'Jl. Dahlia RT 02', rt: 'RT 02' });
      markerRef.current?.setLatLng([-6.2309, 106.9295]);
      miniMapInstanceRef.current?.setView([-6.2309, 106.9295], 16);
    }
  };

  // Initialize mini picker map
  useEffect(() => {
    if (!isOpen || !miniMapContainerRef.current) return;

    const timer = setTimeout(() => {
      if (!miniMapInstanceRef.current && miniMapContainerRef.current) {
        const miniMap = L.map(miniMapContainerRef.current, {
          center: [-6.2315, 106.9285],
          zoom: 16
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap'
        }).addTo(miniMap);

        const pinIcon = L.divIcon({
          className: 'custom-picker-pin',
          html: `
            <div style="background-color: #0d9488; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">
              📍
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 28]
        });

        const initialMarker = L.marker([-6.2315, 106.9285], {
          icon: pinIcon,
          draggable: true
        }).addTo(miniMap);

        markerRef.current = initialMarker;

        initialMarker.on('dragend', (e) => {
          const latlng = e.target.getLatLng();
          setKoordinat((prev) => ({
            ...prev,
            lat: Number(latlng.lat.toFixed(6)),
            lng: Number(latlng.lng.toFixed(6))
          }));
        });

        miniMap.on('click', (e) => {
          const { lat, lng } = e.latlng;
          initialMarker.setLatLng([lat, lng]);
          setKoordinat((prev) => ({
            ...prev,
            lat: Number(lat.toFixed(6)),
            lng: Number(lng.toFixed(6))
          }));
        });

        miniMapInstanceRef.current = miniMap;
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      if (miniMapInstanceRef.current) {
        miniMapInstanceRef.current.remove();
        miniMapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!judul.trim() || !deskripsi.trim() || !alamat.trim()) {
      alert('Mohon lengkapi judul, alamat, dan deskripsi keluhan Anda.');
      return;
    }

    setIsSubmitting(true);

    try {
      const saved = StorageService.savePengaduan({
        judul: judul.trim(),
        deskripsi: deskripsi.trim(),
        kategori,
        lokasi: {
          lat: koordinat.lat,
          lng: koordinat.lng,
          alamat: alamat.trim(),
          rt: selectedRT
        },
        fotoUrl: fotoUrl.trim() || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
        namaPelapor: isAnonim ? 'Warga RW 04 (Anonim)' : (namaPelapor.trim() || 'Warga RW 04'),
        noHpPelapor: noHpPelapor.trim(),
        isAnonim,
        prioritas
      });

      const waMsg = generatePesanWA(saved, 'laporan_diterima');
      const waLink = createWhatsAppWebLink(saved.noHpPelapor, waMsg);

      triggerGlobalToast({
        tipe: 'whatsapp',
        judul: `Pengaduan #${saved.id} Diterima`,
        pesan: `Notifikasi WhatsApp resmi RW 04 otomatis disiapkan ke nomor ${saved.noHpPelapor}. Status: Menunggu Verifikasi.`,
        waLink
      });

      setCreatedPengaduan(saved);
      onSuccess(saved);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan pengaduan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTicket = (ticketId: string) => {
    navigator.clipboard.writeText(ticketId);
    alert(`Nomor Tiket ${ticketId} berhasil disalin ke clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {createdPengaduan ? (
          /* SUCCESS STATE */
          <div className="p-8 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Pengaduan Berhasil Dikirim!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-md mx-auto">
              Laporan Anda langsung masuk ke antrean verifikasi pengurus RW 04 Malaka Sari.
            </p>

            <div className="my-6 p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Nomor Tiket Pelacakan Anda</span>
                <button
                  onClick={() => handleCopyTicket(createdPengaduan.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" /> Salin Tiket
                </button>
              </div>
              <div className="text-xl font-mono font-extrabold text-teal-600 dark:text-teal-400 mt-2">
                {createdPengaduan.id}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                <strong>{createdPengaduan.judul}</strong> ({createdPengaduan.lokasi.rt} - {createdPengaduan.lokasi.alamat})
              </div>
            </div>

            {/* Real-time WhatsApp Notification Box */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-left mb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-bold text-emerald-900 dark:text-emerald-300">
                    Notifikasi Otomatis WhatsApp Pelapor
                  </div>
                  <p className="text-emerald-800 dark:text-emerald-400 mt-1">
                    Konfirmasi penerimaan telah disiapkan otomatis ke nomor <strong>{createdPengaduan.noHpPelapor}</strong>.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={createWhatsAppWebLink(
                        createdPengaduan.noHpPelapor,
                        generatePesanWA(createdPengaduan, 'laporan_diterima')
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-all"
                    >
                      Buka Pesan di WhatsApp Web <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setCreatedPengaduan(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90"
              >
                Selesai &amp; Tutup
              </button>
            </div>
          </div>
        ) : (
          /* INPUT FORM */
          <div>
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
                  <Sparkles className="w-3.5 h-3.5" /> Formulir Cepat Warga
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Lapor Permasalahan Lingkungan RW 04
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Testing Bar */}
            <div className="px-6 pt-4 pb-2 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Contoh Cepat:
              </span>
              <button
                type="button"
                onClick={() => applyPreset('drainase')}
                className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition-colors"
              >
                🌊 Saluran Mampet (RT 04)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('pju')}
                className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
              >
                💡 Lampu PJU Mati (RT 07)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('jumantik')}
                className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
              >
                🦟 Jentik Nyamuk (RT 02)
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Category Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Kategori Masalah <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {KATEGORI_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setKategori(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        kategori === opt.id
                          ? 'border-teal-500 bg-teal-50/80 dark:bg-teal-950/40 text-teal-950 dark:text-teal-200 shadow-sm ring-1 ring-teal-500'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-lg mb-1">{opt.icon}</div>
                      <div className="text-xs font-bold truncate">{opt.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Judul & Prioritas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Judul Pengaduan Singkat <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Saluran Air Mampet di Depan Gang 3"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tingkat Urgensi
                  </label>
                  <select
                    value={prioritas}
                    onChange={(e) => setPrioritas(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  >
                    <option value="rendah">🟢 Rendah (Biasa)</option>
                    <option value="sedang">🟡 Sedang (Standar)</option>
                    <option value="tinggi">🟠 Tinggi (Penting)</option>
                    <option value="darurat">🔴 Darurat (Segera)</option>
                  </select>
                </div>
              </div>

              {/* RT & Alamat */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Wilayah RT <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedRT}
                    onChange={(e) => setSelectedRT(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  >
                    {Array.from({ length: 15 }, (_, i) => {
                      const code = `RT ${String(i + 1).padStart(2, '0')}`;
                      return (
                        <option key={code} value={code}>
                          {code} - RW 04 Malaka Sari
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Alamat Lengkap / Patokan Lokasi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jl. Teratai No. 12 dekat Pos Ronda"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>

              {/* Interactive Location Picker Map */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    Pilih Titik Presisi di Peta (Koordinat Otomatis)
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    Lat: {koordinat.lat}, Lng: {koordinat.lng}
                  </span>
                </div>
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                  <div ref={miniMapContainerRef} className="h-44 w-full bg-slate-100 dark:bg-slate-800" />
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>💡 Klik titik mana saja pada peta atau geser pin hijau untuk koordinat akurat</span>
                    <button
                      type="button"
                      onClick={() => {
                        setKoordinat({
                          lat: -6.2315,
                          lng: 106.9285,
                          alamat: 'Balai RW 04 Malaka Sari',
                          rt: selectedRT
                        });
                        markerRef.current?.setLatLng([-6.2315, 106.9285]);
                        miniMapInstanceRef.current?.setView([-6.2315, 106.9285], 16);
                      }}
                      className="text-teal-600 dark:text-teal-400 font-medium hover:underline"
                    >
                      Reset ke Balai RW
                    </button>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Lengkap Permasalahan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan detail masalah, sudah berapa lama terjadi, dan dampaknya terhadap warga sekitar..."
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>

              {/* Foto Bukti */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Lampiran Foto Bukti Kejadian
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://... URL Foto Bukti"
                    value={fotoUrl}
                    onChange={(e) => setFotoUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFotoUrl('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80');
                    }}
                    className="px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0 font-medium"
                  >
                    Gunakan Foto Contoh
                  </button>
                </div>
                {fotoUrl && (
                  <div className="mt-2 h-24 w-36 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={fotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Data Pelapor & WhatsApp */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Identitas Pelapor &amp; Saluran Notifikasi WhatsApp
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Nama Pelapor
                    </label>
                    <input
                      type="text"
                      disabled={isAnonim}
                      value={isAnonim ? 'Disamarkan (Anonim)' : namaPelapor}
                      onChange={(e) => setNamaPelapor(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center justify-between">
                      <span>Nomor WhatsApp Aktif <span className="text-rose-500">*</span></span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Notifikasi Real-time</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081289123456"
                      value={noHpPelapor}
                      onChange={(e) => setNoHpPelapor(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAnonim}
                      onChange={(e) => setIsAnonim(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      Rahasiakan identitas saya kepada publik (Mode Anonim)
                    </span>
                  </label>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  * Nomor WhatsApp Anda hanya digunakan untuk pengiriman status penanganan resmi RW 04 Malaka Sari.
                </p>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pengaduan'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
