import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Download, Printer, User, MapPin, Calendar, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { PROFIL_RW04 } from '../data/initialData';
import { triggerGlobalToast } from './NotificationToast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SuratPengantarModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [jenisSurat, setJenisSurat] = useState('KTP / e-KTP Baru / Rusak');
  const [namaLengkap, setNamaLengkap] = useState('Budi Santoso');
  const [nik, setNik] = useState('3175081234560004');
  const [noKK, setNoKK] = useState('3175089876540001');
  const [alamat, setAlamat] = useState('Jl. Teratai No. 14');
  const [rt, setRt] = useState('RT 04');
  const [keperluan, setKeperluan] = useState('Penggantian fisik blanko e-KTP yang rusak/patah ke Kelurahan Malaka Sari');
  const [noWa, setNoWa] = useState('081289123456');

  const [generatedSurat, setGeneratedSurat] = useState<{
    noSurat: string;
    tanggal: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const noSurat = `470/${Math.floor(100 + Math.random() * 900)}/RW.04/MS/${new Date().getFullYear()}`;
    const tanggal = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    setGeneratedSurat({ noSurat, tanggal });

    triggerGlobalToast({
      tipe: 'success',
      judul: 'Permohonan Surat Diterima',
      pesan: `Surat Pengantar ${jenisSurat} Nomor ${noSurat} berhasil dibuat dan diarsipkan di sekretariat RW 04.`
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Layanan Surat Pengantar RT/RW Digital
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Layanan mandiri warga RW 04 Kelurahan Malaka Sari, Duren Sawit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {generatedSurat ? (
          /* PREVIEW SURAT HASIL GENERASI */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-serif shadow-inner">
              
              {/* Kop Surat */}
              <div className="text-center pb-4 border-b-2 border-slate-900 dark:border-slate-300 mb-6">
                <h4 className="font-bold text-sm tracking-widest uppercase">
                  RUKUN WARGA 04 KELURAHAN MALAKA SARI
                </h4>
                <p className="text-xs tracking-wider">
                  KECAMATAN DUREN SAWIT - KOTA ADMINISTRASI JAKARTA TIMUR
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                  Sekretariat: {PROFIL_RW04.sekretariat} • Telp: {PROFIL_RW04.teleponSekretariat}
                </p>
              </div>

              {/* Judul Surat */}
              <div className="text-center mb-6">
                <h5 className="font-bold text-base uppercase underline underline-offset-4">
                  SURAT PENGANTAR
                </h5>
                <p className="text-xs font-mono mt-0.5">
                  Nomor: {generatedSurat.noSurat}
                </p>
              </div>

              {/* Isi Surat */}
              <div className="space-y-3 text-xs leading-relaxed">
                <p>
                  Yang bertanda tangan di bawah ini Pengurus Rukun Warga 04 Kelurahan Malaka Sari, Kecamatan Duren Sawit, Jakarta Timur menerangkan bahwa:
                </p>

                <div className="grid grid-cols-3 gap-y-1.5 pl-4 py-2 border-l-2 border-teal-500 font-sans text-xs">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Nama Lengkap</span>
                  <span className="col-span-2 font-bold text-slate-900 dark:text-white">: {namaLengkap}</span>

                  <span className="font-medium text-slate-500 dark:text-slate-400">NIK (No. KTP)</span>
                  <span className="col-span-2 font-mono">: {nik}</span>

                  <span className="font-medium text-slate-500 dark:text-slate-400">Nomor Kartu Keluarga</span>
                  <span className="col-span-2 font-mono">: {noKK}</span>

                  <span className="font-medium text-slate-500 dark:text-slate-400">Alamat Domisili</span>
                  <span className="col-span-2">: {alamat}, {rt} RW 04 Malaka Sari</span>

                  <span className="font-medium text-slate-500 dark:text-slate-400">Keperluan</span>
                  <span className="col-span-2 font-semibold text-teal-700 dark:text-teal-300">: {keperluan}</span>
                </div>

                <p className="pt-2">
                  Orang tersebut di atas adalah benar-benar warga yang bertempat tinggal di lingkungan kami dan berkelakuan baik. Surat pengantar ini diberikan untuk dipergunakan sebagaimana mestinya.
                </p>
              </div>

              {/* Tanda Tangan */}
              <div className="pt-8 flex justify-end font-sans text-xs">
                <div className="text-center w-52">
                  <p>Jakarta, {generatedSurat.tanggal}</p>
                  <p className="font-bold mt-1">Ketua RW 04 Malaka Sari</p>
                  <div className="h-16 flex items-center justify-center text-teal-600 dark:text-teal-400 italic text-[11px]">
                    [Tertanda &amp; Terverifikasi Digital]
                  </div>
                  <p className="font-bold underline">{PROFIL_RW04.ketuaRW}</p>
                </div>
              </div>

            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Nomor surat resmi telah teregistrasi di database RW 04.
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Cetak Surat
                </button>
                <button
                  type="button"
                  onClick={() => setGeneratedSurat(null)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
                >
                  Buat Surat Baru
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* FORM PERMOHONAN */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Jenis Pengantar yang Dibutuhkan <span className="text-rose-500">*</span>
              </label>
              <select
                value={jenisSurat}
                onChange={(e) => setJenisSurat(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="KTP / e-KTP Baru / Rusak / Hilang">Surat Pengantar KTP (Baru / Rusak / Hilang)</option>
                <option value="Kartu Keluarga (KK) Baru / Perubahan Data">Surat Pengantar Kartu Keluarga (KK)</option>
                <option value="Keterangan Domisili Tempat Tinggal">Surat Keterangan Domisili Warga</option>
                <option value="Keterangan Catatan Kepolisian (SKCK)">Surat Pengantar Pengurusan SKCK</option>
                <option value="Keterangan Belum Menikah / Nikah">Surat Keterangan Status Pernikahan</option>
                <option value="Keterangan Kelahiran / Kematian">Surat Keterangan Kelahiran / Kematian</option>
                <option value="Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM Bantuan)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Pemohon <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  placeholder="Sesuai KTP"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor Induk Kependudukan (NIK) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  placeholder="16 Digit NIK"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Wilayah RT <span className="text-rose-500">*</span>
                </label>
                <select
                  value={rt}
                  onChange={(e) => setRt(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {Array.from({ length: 15 }, (_, i) => {
                    const code = `RT ${String(i + 1).padStart(2, '0')}`;
                    return <option key={code} value={code}>{code}</option>;
                  })}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Alamat Rumah Sesuai Domisili <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Contoh: Jl. Teratai No. 14"
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tujuan &amp; Keperluan Spesifik Surat <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                placeholder="Jelaskan instansi yang dituju dan keperluannya..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 rounded-2xl border border-teal-200/80 dark:border-teal-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Informasi Layanan Gratis Bebas Pungli
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Seluruh pelayanan administrasi di lingkungan RW 04 Malaka Sari adalah <strong>GRATIS (Rp 0,-)</strong>. Surat digital ini sah diverifikasi oleh Ketua RW 04 untuk diserahkan ke Kelurahan Malaka Sari atau Polsek Duren Sawit.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Terbitkan Surat Pengantar
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
