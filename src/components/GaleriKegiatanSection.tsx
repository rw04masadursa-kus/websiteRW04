import React, { useState } from 'react';
import { GALERI_DATA } from '../data/initialData';
import { GaleriFoto } from '../types';
import { Camera, Calendar, MapPin, X, ZoomIn, Filter } from 'lucide-react';

export const GaleriKegiatanSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<GaleriFoto | null>(null);

  const categories = ['Semua', 'PKK', 'Jumantik', 'Dasawisma', 'Gotong Royong', 'Peringatan'];

  const filteredPhotos = selectedCategory === 'Semua'
    ? GALERI_DATA
    : GALERI_DATA.filter(p => p.kategori === selectedCategory);

  return (
    <section id="galeri-kegiatan" className="py-20 bg-white transition-colors border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/80 mb-2 shadow-sm">
              <Camera className="w-3.5 h-3.5" />
              Dokumentasi Warga RW 04
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Galeri Foto Kegiatan &amp; Kebersamaan
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Potret semangat gotong royong, aksi kebersihan lingkungan, posyandu, dan kemeriahan warga RW 04 Malaka Sari.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid in Pure White Glow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group cursor-pointer card-white-glow rounded-3xl overflow-hidden"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={photo.gambarUrl}
                  alt={photo.judul}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 text-slate-900 backdrop-blur shadow-sm">
                  {photo.kategori}
                </span>

                <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-900 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-[11px] text-slate-200 mb-1">
                    <Calendar className="w-3 h-3 text-teal-300" />
                    <span>{photo.tanggal}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3 text-teal-300" />
                    <span className="truncate">{photo.lokasi}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h4 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
                  {photo.judul}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {photo.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden animate-in zoom-in-95">
              
              <div className="relative h-80 sm:h-96 w-full bg-slate-950">
                <img
                  src={activePhoto.gambarUrl}
                  alt={activePhoto.judul}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    {activePhoto.kategori}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" /> {activePhoto.tanggal}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {activePhoto.lokasi}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {activePhoto.judul}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {activePhoto.deskripsi}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setActivePhoto(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
                  >
                    Tutup Pratinjau
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
