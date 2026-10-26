import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Pengaduan, StatusPengaduan } from '../types';
import { MapPin, Filter, Layers, CheckCircle2, Clock, AlertTriangle, Eye, ShieldAlert, Sparkles, Navigation } from 'lucide-react';

interface Props {
  pengaduanList: Pengaduan[];
  onSelectPengaduan: (item: Pengaduan) => void;
  onOpenForm: () => void;
}

export const PetaPengaduanSection: React.FC<Props> = ({
  pengaduanList,
  onSelectPengaduan,
  onOpenForm
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRT, setFilterRT] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<Pengaduan | null>(null);

  const filteredReports = pengaduanList.filter((item) => {
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchRT = filterRT === 'all' || item.lokasi.rt === filterRT;
    return matchStatus && matchRT;
  });

  const createMarkerIcon = (status: StatusPengaduan) => {
    let color = '#0284c7'; // blue - diproses
    if (status === 'selesai') color = '#059669'; // green
    if (status === 'menunggu') color = '#d97706'; // amber
    if (status === 'ditolak') color = '#e11d48'; // red

    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 26 16 26s16-15.5 16-26c0-8.837-7.163-16-16-16z" fill="${color}" stroke="#ffffff" stroke-width="2.5"/>
        <circle cx="16" cy="16" r="6" fill="#ffffff" />
      </svg>
    `;

    return L.divIcon({
      className: 'custom-div-icon',
      html: svgIcon,
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -36]
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-6.2315, 106.9285],
        zoom: 16,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | RW 04 Malaka Sari'
      }).addTo(map);

      // RW Boundary Circle
      L.circle([-6.2315, 106.9285], {
        color: '#0d9488',
        fillColor: '#14b8a6',
        fillOpacity: 0.07,
        radius: 480,
        weight: 2,
        dashArray: '5, 8'
      }).addTo(map).bindTooltip('Wilayah Lingkungan RW 04 Malaka Sari');

      // Balai RW marker
      const balaiIcon = L.divIcon({
        className: 'balai-icon',
        html: `
          <div style="background-color: #ffffff; color: #0f172a; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; border: 2px solid #0d9488; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 4px; white-space: nowrap;">
            🏢 Balai Sekretariat RW 04
          </div>
        `,
        iconSize: [160, 32],
        iconAnchor: [80, 16]
      });

      L.marker([-6.2315, 106.9285], { icon: balaiIcon }).addTo(map)
        .bindPopup('<b>Balai Warga RW 04 Malaka Sari</b><br/>Jl. Malaka Raya No. 42 RT 05<br/>Pusat Pelayanan &amp; Posko Terpadu');

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!markersGroupRef.current || !mapInstanceRef.current) return;

    markersGroupRef.current.clearLayers();

    filteredReports.forEach((item) => {
      const marker = L.marker([item.lokasi.lat, item.lokasi.lng], {
        icon: createMarkerIcon(item.status)
      });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 text-slate-800 text-xs min-w-[200px] font-sans';
      popupContent.innerHTML = `
        <div style="font-size: 10px; font-weight: 700; color: #0d9488; text-transform: uppercase; margin-bottom: 2px;">
          ${item.lokasi.rt} • ${item.kategori.replace('_', ' ')}
        </div>
        <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px; line-height: 1.2;">
          ${item.judul}
        </div>
        <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">
          📍 ${item.lokasi.alamat}
        </div>
        <div style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-weight: 700; font-size: 10px; background-color: ${
          item.status === 'selesai' ? '#ecfdf5' : item.status === 'diproses' ? '#eff6ff' : '#fffbeb'
        }; color: ${
          item.status === 'selesai' ? '#047857' : item.status === 'diproses' ? '#1d4ed8' : '#b45309'
        }; border: 1px solid ${
          item.status === 'selesai' ? '#a7f3d0' : item.status === 'diproses' ? '#bfdbfe' : '#fde68a'
        }">
          Status: ${item.status.toUpperCase()}
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedItem(item);
      });

      markersGroupRef.current?.addLayer(marker);
    });
  }, [filteredReports]);

  return (
    <section id="peta-pengaduan" className="py-16 bg-white relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/80 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              Sistem Pelaporan Spasial Lingkungan
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Peta Sebaran Pengaduan RW 04 Malaka Sari
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              Pantau titik kejadian fasilitas umum, saluran air, dan temuan jentik di 15 RT secara visual.
              Diverifikasi otomatis dengan koordinat geografis presisi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenForm}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Lapor Kejadian Baru
            </button>
          </div>
        </div>

        {/* Filters Bar (Clean White Rounded Style) */}
        <div className="card-white-glow rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Filter className="w-4 h-4 text-teal-600" /> Filter:
            </div>
            {(['all', 'menunggu', 'diproses', 'selesai'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filterStatus === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st === 'all' ? 'Semua Laporan' : st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-600" /> Pilih RT:
            </label>
            <select
              value={filterRT}
              onChange={(e) => setFilterRT(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">Semua RT (RT 01 - RT 15)</option>
              {Array.from({ length: 15 }, (_, i) => {
                const rtCode = `RT ${String(i + 1).padStart(2, '0')}`;
                return (
                  <option key={rtCode} value={rtCode}>
                    {rtCode}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Map & Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Map Box */}
          <div className="lg:col-span-2 card-white-glow rounded-3xl overflow-hidden flex flex-col">
            <div className="relative h-[480px] w-full bg-slate-100">
              <div ref={mapContainerRef} className="h-full w-full" />
              
              {/* Map Legend Overlay in Pure White */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-lg z-20 text-xs">
                <div className="font-bold text-slate-900 mb-2">Legenda Status Titik</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="text-slate-700 font-medium">Menunggu</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-slate-700 font-medium">Diproses</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-700 font-medium">Selesai</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="text-slate-700 font-medium">Ditolak</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between font-medium">
              <span>Menampilkan {filteredReports.length} laporan aktif di peta</span>
              <span>Klik marker untuk info detail titik kejadian</span>
            </div>
          </div>

          {/* Quick Details Sidebar in Pure White */}
          <div className="card-white-glow rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  Detail Titik Terpilih
                </h3>
                {selectedItem && (
                  <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100">
                    {selectedItem.id}
                  </span>
                )}
              </div>

              {selectedItem ? (
                <div className="space-y-4 animate-in fade-in">
                  <div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      selectedItem.status === 'selesai'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : selectedItem.status === 'diproses'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {selectedItem.status === 'selesai' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {selectedItem.status === 'diproses' && <Clock className="w-3.5 h-3.5" />}
                      {selectedItem.status === 'menunggu' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {selectedItem.status.toUpperCase()}
                    </span>
                    <h4 className="font-bold text-lg text-slate-900 mt-2 leading-snug">
                      {selectedItem.judul}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {selectedItem.lokasi.rt} • {selectedItem.lokasi.alamat}
                    </p>
                  </div>

                  {selectedItem.fotoUrl && (
                    <div className="rounded-2xl overflow-hidden border border-slate-200 h-36 bg-slate-100">
                      <img
                        src={selectedItem.fotoUrl}
                        alt="Bukti Kejadian"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-700 border border-slate-100">
                    <span className="font-bold block text-slate-900 mb-1">Deskripsi Warga:</span>
                    {selectedItem.deskripsi}
                  </div>

                  {selectedItem.tanggapanAdmin && (
                    <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-3.5 text-xs">
                      <span className="font-bold block text-teal-900 mb-1">
                        Tanggapan Resmi RW 04:
                      </span>
                      <p className="text-teal-800">{selectedItem.tanggapanAdmin}</p>
                      {selectedItem.namaPetugasAdmin && (
                        <p className="text-[11px] text-teal-600 mt-1 italic font-medium">
                          Oleh: {selectedItem.namaPetugasAdmin}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => onSelectPengaduan(selectedItem)}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Lihat Progres Lengkap
                  </button>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400">
                  <MapPin className="w-10 h-10 mx-auto stroke-1 mb-2 text-slate-300" />
                  <p className="text-sm font-semibold text-slate-700">Belum ada titik yang dipilih</p>
                  <p className="text-xs mt-1 text-slate-500">Klik salah satu pin pada peta untuk melihat detail laporan</p>
                </div>
              )}
            </div>

            {/* Emergency Info Notice */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2.5 font-medium">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Untuk insiden darurat, hubungi Pos Kamling RW 04 segera.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
