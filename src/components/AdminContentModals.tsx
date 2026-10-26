import React, { useState } from 'react';
import { KegiatanRW, GaleriFoto, PengumumanRW } from '../types';
import { StorageService } from '../services/storageService';
import { triggerGlobalToast } from './NotificationToast';
import { X, Sparkles, Plus, Image, Calendar, MapPin, Bell, Send } from 'lucide-react';

/* ---------------- MODAL TAMBAH KEGIATAN RW ---------------- */
interface ModalKegiatanProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ModalTambahKegiatan: React.FC<ModalKegiatanProps> = ({ isOpen, onClose, onSuccess }) => {
  const [judul, setJudul] = useState('');
  const [divisi, setDivisi] = useState<KegiatanRW['divisi']>('PKK');
  const [jadwal, setJadwal] = useState('Setiap Rabu, Pukul 15.00 WIB');
  const [lokasi, setLokasi] = useState('Aula Balai Warga RW 04');
  const [deskripsi, setDeskripsi] = useState('');
  const [status, setStatus] = useState<KegiatanRW['status']>('Rutin');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !deskripsi.trim()) {
      alert('Mohon lengkapi judul dan deskripsi kegiatan.');
      return;
    }

    StorageService.saveKegiatan({
      judul: judul.trim(),
      divisi,
      jadwal: jadwal.trim(),
      lokasi: lokasi.trim(),
      deskripsi: deskripsi.trim(),
      status
    });

    triggerGlobalToast({
      tipe: 'success',
      judul: 'Kegiatan Berhasil Ditambahkan',
      pesan: `Agenda "${judul}" telah diterbitkan secara dinamis ke landing page RW 04.`
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-white-glow rounded-3xl max-w-lg w-full p-6 sm:p-8 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Tambah Agenda Kegiatan RW 04
              </h3>
              <p className="text-xs text-slate-500">Khusus Pengurus / Admin RW</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Divisi / Lembaga Penyelenggara <span className="text-rose-500">*</span>
            </label>
            <select
              value={divisi}
              onChange={(e) => setDivisi(e.target.value as any)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              <option value="PKK">TP PKK RW 04 (Pokja I - IV)</option>
              <option value="Dasawisma">Dasawisma Carik Jakarta</option>
              <option value="Jumantik">Jumantik Mandiri (G1R1J &amp; PSN)</option>
              <option value="Posyandu">Posyandu Balita &amp; Lansia Cempaka</option>
              <option value="Siskamling">Siskamling &amp; Trantib</option>
              <option value="Karang Taruna">Karang Taruna Sub-Unit RW 04</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama / Judul Kegiatan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Senam Sehat Lansia &amp; Cek Kolesterol Gratis"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jadwal Pelaksanaan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={jadwal}
                onChange={(e) => setJadwal(e.target.value)}
                placeholder="Contoh: Minggu, 08.00 WIB"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Pelaksanaan
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              >
                <option value="Rutin">Rutin Berkala</option>
                <option value="Mendatang">Agenda Mendatang</option>
                <option value="Selesai">Telah Selesai</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Lokasi Acara <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              placeholder="Contoh: Aula Balai Warga RW 04"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Singkat Acara <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Jelaskan tujuan kegiatan dan siapa saja yang diharapkan hadir..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Simpan Kegiatan Baru
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------- MODAL TAMBAH FOTO GALERI ---------------- */
interface ModalGaleriProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ModalTambahGaleri: React.FC<ModalGaleriProps> = ({ isOpen, onClose, onSuccess }) => {
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState<GaleriFoto['kategori']>('Gotong Royong');
  const [tanggal, setTanggal] = useState('25 Oktober 2026');
  const [lokasi, setLokasi] = useState('Area RT 04 & RT 05 Malaka Sari');
  const [gambarUrl, setGambarUrl] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !deskripsi.trim()) {
      alert('Mohon lengkapi judul dan deskripsi dokumentasi.');
      return;
    }

    StorageService.saveGaleri({
      judul: judul.trim(),
      kategori,
      tanggal: tanggal.trim(),
      lokasi: lokasi.trim(),
      gambarUrl: gambarUrl.trim() || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
      deskripsi: deskripsi.trim()
    });

    triggerGlobalToast({
      tipe: 'success',
      judul: 'Foto Galeri Diterbitkan',
      pesan: `Dokumentasi "${judul}" telah ditambahkan ke galeri warga.`
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-white-glow rounded-3xl max-w-lg w-full p-6 sm:p-8 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Unggah Dokumentasi Foto Warga
              </h3>
              <p className="text-xs text-slate-500">Khusus Pengurus / Admin RW</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kategori Kegiatan <span className="text-rose-500">*</span>
            </label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value as any)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              <option value="PKK">TP PKK RW 04</option>
              <option value="Dasawisma">Dasawisma Carik</option>
              <option value="Jumantik">Jumantik Mandiri</option>
              <option value="Gotong Royong">Gotong Royong &amp; Kerja Bakti</option>
              <option value="Peringatan">Peringatan Hari Besar &amp; Festival</option>
              <option value="Warga">Kegiatan Sosial Warga Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Dokumentasi <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Kerja Bakti Pengangkatan Sedimen Kali RW 04"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tanggal Kegiatan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                placeholder="Contoh: 25 Oktober 2026"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lokasi RT <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Contoh: Jl. Teratai RT 04"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              URL Foto Kegiatan (atau pilih contoh preset)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={gambarUrl}
                onChange={(e) => setGambarUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={() => setGambarUrl('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80')}
                className="px-3 py-2 text-xs bg-slate-100 rounded-xl text-slate-700 font-semibold hover:bg-slate-200 shrink-0"
              >
                Preset
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Dokumentasi <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Ceritakan momen kegiatan..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Publikasikan Foto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------- MODAL BUAT PENGUMUMAN RW ---------------- */
interface ModalPengumumanProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ModalTambahPengumuman: React.FC<ModalPengumumanProps> = ({ isOpen, onClose, onSuccess }) => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [prioritas, setPrioritas] = useState<PengumumanRW['prioritas']>('penting');
  const [author, setAuthor] = useState('H. Bambang Sugiarto (Ketua RW 04)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) {
      alert('Mohon lengkapi judul dan isi pengumuman.');
      return;
    }

    StorageService.savePengumuman({
      judul: judul.trim(),
      isi: isi.trim(),
      prioritas,
      author: author.trim()
    });

    triggerGlobalToast({
      tipe: 'success',
      judul: 'Pengumuman Resmi Diterbitkan',
      pesan: `Warta "${judul}" kini tampil di bagian atas portal RW 04.`
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-white-glow rounded-3xl max-w-lg w-full p-6 sm:p-8 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Siarkan Warta &amp; Pengumuman RW 04
              </h3>
              <p className="text-xs text-slate-500">Tampil otomatis di landing page warga</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tingkat Kepentingan <span className="text-rose-500">*</span>
            </label>
            <select
              value={prioritas}
              onChange={(e) => setPrioritas(e.target.value as any)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              <option value="penting">🟠 Penting (Pemberitahuan Wajib)</option>
              <option value="info">🔵 Informasi Umum / Rutin</option>
              <option value="darurat">🔴 Darurat / Siaga Cuaca Ekstrem</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Pengumuman <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Jadwal Pengambilan Kartu Bansos &amp; Sembako"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Isi Informasi Pengumuman <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              placeholder="Tuliskan detail waktu, syarat, dan lokasi..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pengirim / Pejabat yang Mengumumkan
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Siarkan Pengumuman
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
