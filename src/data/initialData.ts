import { Pengaduan, PerangkatRW, KegiatanRW, GaleriFoto, WhatsAppNotificationLog, PengumumanRW } from '../types';

export const PROFIL_RW04 = {
  nama: 'Rukun Warga 04',
  kelurahan: 'Kelurahan Malaka Sari',
  kecamatan: 'Kecamatan Duren Sawit',
  kota: 'Kota Administrasi Jakarta Timur',
  provinsi: 'DKI Jakarta',
  kodePos: '13460',
  sekretariat: 'Balai Warga RW 04, Jl. Malaka Raya No. 42 RT 05/RW 04, Malaka Sari',
  pusatKoordinat: { lat: -6.2315, lng: 106.9285 },
  jumlahRT: 15,
  jumlahKK: 840,
  jumlahJiwa: 2950,
  luasWilayah: '18.4 Hektar',
  ketuaRW: 'H. Bambang Sugiarto, S.E.',
  teleponSekretariat: '(021) 8660-0404',
  whatsappSekretariat: '+6281284040404',
  email: 'rw04.malakasari@dki.go.id'
};

export const INITIAL_PENGADUAN: Pengaduan[] = [
  {
    id: 'RW04-2026-0042',
    judul: 'Saluran Air Mampet & Endapan Lumpur',
    deskripsi: 'Saluran drainase di depan Jl. Teratai No. 14 tersumbat endapan sampah plastik dan lumpur tebal. Jika hujan deras air meluap ke pekarangan rumah warga.',
    kategori: 'drainase',
    lokasi: {
      lat: -6.2318,
      lng: 106.9279,
      alamat: 'Jl. Teratai RT 04/RW 04',
      rt: 'RT 04'
    },
    fotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    namaPelapor: 'Budi Santoso',
    noHpPelapor: '081289123456',
    isAnonim: false,
    status: 'diproses',
    createdAt: '2026-10-24 09:30:00',
    updatedAt: '2026-10-24 14:15:00',
    tanggapanAdmin: 'Laporan telah diverifikasi oleh Pengurus RW 04. Regu PPSU Kelurahan Malaka Sari dan Pokja RW telah dijadwalkan pengerukan sedimen lumpur besok pagi.',
    namaPetugasAdmin: 'H. Bambang (Ketua RW 04)',
    prioritas: 'tinggi'
  },
  {
    id: 'RW04-2026-0041',
    judul: 'Temuan Jentik Nyamuk di Genangan Pot Tanaman Liar',
    deskripsi: 'Ditemukan banyak jentik nyamuk pada wadah ember bekas dan tatakan pot kosong di halaman rumah kosong Jl. Dahlia. Mohon tindak lanjut tim Jumantik.',
    kategori: 'jumantik_kesehatan',
    lokasi: {
      lat: -6.2309,
      lng: 106.9295,
      alamat: 'Jl. Dahlia Blok C RT 02/RW 04',
      rt: 'RT 02'
    },
    fotoUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80',
    namaPelapor: 'Ibu Ratna Dewi',
    noHpPelapor: '085711223344',
    isAnonim: false,
    status: 'selesai',
    createdAt: '2026-10-23 08:15:00',
    updatedAt: '2026-10-23 11:20:00',
    tanggapanAdmin: 'Kader Jumantik RW 04 telah melakukan inspeksi PSN 3M Plus, membuang genangan air, dan menaburkan bubuk Abate pada penampungan air sekitar.',
    namaPetugasAdmin: 'Ibu Siti Aminah (Kader Jumantik)',
    fotoBuktiPenyelesaian: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
    prioritas: 'tinggi'
  },
  {
    id: 'RW04-2026-0040',
    judul: 'Lampu Penerangan Jalan Umum (PJU) Mati',
    deskripsi: 'Dua tiang lampu PJU di gang masuk Jl. Anggrek RT 07 mati sejak 3 hari lalu. Jalan menjadi gelap gulita di malam hari dan rawan kejahatan.',
    kategori: 'pju_fasum',
    lokasi: {
      lat: -6.2325,
      lng: 106.9268,
      alamat: 'Jl. Anggrek Ujung RT 07/RW 04',
      rt: 'RT 07'
    },
    fotoUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    namaPelapor: 'Hendro Wijaya',
    noHpPelapor: '081399887766',
    isAnonim: false,
    status: 'menunggu',
    createdAt: '2026-10-25 15:40:00',
    updatedAt: '2026-10-25 15:40:00',
    prioritas: 'sedang'
  },
  {
    id: 'RW04-2026-0039',
    judul: 'Dahan Pohon Trembesi Tua Rawan Patah ke Kabel Listrik',
    deskripsi: 'Dahan pohon trembesi besar di sudut Balai Pertemuan RW sudah rapuh dan menjuntai menyentuh kabel listrik PLN.',
    kategori: 'pju_fasum',
    lokasi: {
      lat: -6.2312,
      lng: 106.9287,
      alamat: 'Dekat Pos RW 04, Jl. Malaka Raya RT 05',
      rt: 'RT 05'
    },
    fotoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    namaPelapor: 'Warga Peduli Lingkungan',
    noHpPelapor: '081908765432',
    isAnonim: true,
    status: 'diproses',
    createdAt: '2026-10-22 13:00:00',
    updatedAt: '2026-10-22 16:30:00',
    tanggapanAdmin: 'Sudah dilaporkan dan dikoordinasikan dengan Sudin Pertamanan & Hutan Kota Jakarta Timur untuk pemangkasan dahan.',
    namaPetugasAdmin: 'Yayan (Koordinator Sarpras RW 04)',
    prioritas: 'darurat'
  },
  {
    id: 'RW04-2026-0038',
    judul: 'Tumpukan Sampah Liar di Pinggir Lahan Kosong',
    deskripsi: 'Ada oknum pemulung atau warga luar yang sering melempar kantong sampah plastik di perbatasan RT 12 pada malam hari sehingga menimbulkan bau menyengat.',
    kategori: 'kebersihan',
    lokasi: {
      lat: -6.2332,
      lng: 106.9312,
      alamat: 'Perbatasan Lahan Kosong RT 12/RW 04',
      rt: 'RT 12'
    },
    fotoUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&auto=format&fit=crop&q=80',
    namaPelapor: 'Slamet Riyadi',
    noHpPelapor: '087812349988',
    isAnonim: false,
    status: 'selesai',
    createdAt: '2026-10-20 07:45:00',
    updatedAt: '2026-10-21 10:00:00',
    tanggapanAdmin: 'Sampah telah diangkut oleh truk gerobak sampah RW 04 dan dipasang plang larangan buang sampah disertai pengetatan siskamling malam.',
    namaPetugasAdmin: 'Pak Gunawan (Sie Kebersihan)',
    fotoBuktiPenyelesaian: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    prioritas: 'sedang'
  },
  {
    id: 'RW04-2026-0037',
    judul: 'Permintaan Fogging / Pengasapan Nyamuk',
    deskripsi: 'Ada 1 balita di RT 09 yang sempat demam tinggi trombosit turun. Warga memohon pengasapan (fogging) lingkungan dan pembagian abate.',
    kategori: 'jumantik_kesehatan',
    lokasi: {
      lat: -6.2321,
      lng: 106.9304,
      alamat: 'Jl. Kenanga RT 09/RW 04',
      rt: 'RT 09'
    },
    fotoUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop&q=80',
    namaPelapor: 'Ahmad Fauzi',
    noHpPelapor: '081298761234',
    isAnonim: false,
    status: 'selesai',
    createdAt: '2026-10-18 10:00:00',
    updatedAt: '2026-10-19 14:00:00',
    tanggapanAdmin: 'Puskesmas Kelurahan Malaka Sari bersama Pokja Jumantik RW 04 telah melakukan PE (Penyelidikan Epidemiologi) dan fogging fokus radius 100 meter.',
    namaPetugasAdmin: 'Ibu Hj. Nuryani (Koordinator Jumantik)',
    prioritas: 'tinggi'
  },
  {
    id: 'RW04-2026-0036',
    judul: 'Portal Gang Rusak & Kunci Gembok Hilang',
    deskripsi: 'Portal pembatas siskamling di pintu masuk RT 03 engselnya patah sehingga tidak bisa ditutup saat jam malam (pukul 23.00 WIB).',
    kategori: 'keamanan',
    lokasi: {
      lat: -6.2304,
      lng: 106.9272,
      alamat: 'Pos Ronda RT 03/RW 04',
      rt: 'RT 03'
    },
    fotoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=800&auto=format&fit=crop&q=80',
    namaPelapor: 'Agus Subekti',
    noHpPelapor: '085233445566',
    isAnonim: false,
    status: 'selesai',
    createdAt: '2026-10-16 21:00:00',
    updatedAt: '2026-10-17 11:30:00',
    tanggapanAdmin: 'Engsel portal telah dilas kembali dan diberikan kunci gembok baru nomor kombinasi yang dipegang petugas ronda malam.',
    namaPetugasAdmin: 'Serma Edi (Sie Keamanan RW 04)',
    prioritas: 'sedang'
  },
  {
    id: 'RW04-2026-0035',
    judul: 'Permohonan Pengurusan Surat Pengantar KTP Rusak',
    deskripsi: 'Mohon info jam operasional sekretariat RW untuk legalisir surat pengantar penggantian e-KTP yang patah.',
    kategori: 'administrasi',
    lokasi: {
      lat: -6.2315,
      lng: 106.9285,
      alamat: 'Sekretariat RW 04',
      rt: 'RT 05'
    },
    namaPelapor: 'Rina Kusuma',
    noHpPelapor: '081700112233',
    isAnonim: false,
    status: 'selesai',
    createdAt: '2026-10-15 14:20:00',
    updatedAt: '2026-10-15 15:10:00',
    tanggapanAdmin: 'Sekretariat RW 04 buka setiap Senin - Sabtu pukul 19.30 - 21.30 WIB, atau dapat mengajukan via form permohonan digital di portal ini.',
    namaPetugasAdmin: 'Bambang Tri (Sekretaris RW 04)',
    prioritas: 'rendah'
  }
];

export const INITIAL_WHATSAPP_LOGS: WhatsAppNotificationLog[] = [
  {
    id: 'WAL-001',
    pengaduanId: 'RW04-2026-0042',
    noHp: '081289123456',
    namaPenerima: 'Budi Santoso',
    tipeNotifikasi: 'status_diproses',
    pesan: 'Halo Bapak/Ibu Budi Santoso, Laporan Anda #RW04-2026-0042 ("Saluran Air Mampet & Endapan Lumpur") saat ini berstatus DIPROSES oleh Pengurus RW 04 Malaka Sari. Petugas PPSU dan Pokja telah dijadwalkan pengerukan sedimen lumpur.',
    timestamp: '2026-10-24 14:15:22',
    statusKirim: 'terkirim'
  },
  {
    id: 'WAL-002',
    pengaduanId: 'RW04-2026-0041',
    noHp: '085711223344',
    namaPenerima: 'Ibu Ratna Dewi',
    tipeNotifikasi: 'status_selesai',
    pesan: 'Halo Ibu Ratna Dewi, Kabar baik! Laporan Anda #RW04-2026-0041 ("Temuan Jentik Nyamuk...") telah SELESAI ditangani oleh Kader Jumantik RW 04. Terima kasih atas partisipasi aktif menjaga lingkungan.',
    timestamp: '2026-10-23 11:20:45',
    statusKirim: 'terkirim'
  },
  {
    id: 'WAL-003',
    pengaduanId: 'RW04-2026-0040',
    noHp: '081399887766',
    namaPenerima: 'Hendro Wijaya',
    tipeNotifikasi: 'laporan_diterima',
    pesan: 'Terima kasih Bpk/Ibu Hendro Wijaya. Laporan Anda #RW04-2026-0040 telah kami terima di sistem RW 04 Malaka Sari. Petugas piket kami akan segera memverifikasi dalam waktu 1x24 jam.',
    timestamp: '2026-10-25 15:40:12',
    statusKirim: 'terkirim'
  }
];

export const PERANGKAT_DATA: PerangkatRW[] = [
  {
    id: 'PR-01',
    nama: 'H. Bambang Sugiarto, S.E.',
    jabatan: 'Ketua RW 04 Malaka Sari',
    divisi: 'pengurus_inti',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    kontak: '0812-8404-0404'
  },
  {
    id: 'PR-02',
    nama: 'Drs. Bambang Trihatmojo',
    jabatan: 'Sekretaris RW 04',
    divisi: 'pengurus_inti',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    kontak: '0813-1122-3344'
  },
  {
    id: 'PR-03',
    nama: 'Hj. Endang Suryaningsih, M.M.',
    jabatan: 'Ketua Tim Penggerak PKK RW 04',
    divisi: 'pkk',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    kontak: '0816-9988-7766'
  },
  {
    id: 'PR-04',
    nama: 'Ibu Hj. Nuryani Khasanah',
    jabatan: 'Koordinator Jumantik RW 04',
    divisi: 'jumantik',
    foto: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80',
    kontak: '0812-7766-5544'
  },
  {
    id: 'PR-05',
    nama: 'Ibu Siti Aminah, S.Pd.',
    jabatan: 'Koordinator Dasawisma RW 04',
    divisi: 'dasawisma',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    kontak: '0857-8899-0011'
  },
  {
    id: 'PR-06',
    nama: 'Ibu dr. Fitri Handayani',
    jabatan: 'Ketua Posyandu Cempaka RW 04',
    divisi: 'posyandu',
    foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    kontak: '0815-2233-4455'
  },
  {
    id: 'PR-07',
    nama: 'Serma (Purn) Edi Sucipto',
    jabatan: 'Komandan Regu Siskamling RW 04',
    divisi: 'keamanan',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    kontak: '0812-3344-9988'
  }
];

export const KEGIATAN_DATA: KegiatanRW[] = [
  {
    id: 'KG-01',
    judul: 'Gerakan 1 Rumah 1 Jumantik (G1R1J) & PSN 3M Plus',
    divisi: 'Jumantik',
    jadwal: 'Setiap Jumat, Pukul 08.00 - 10.30 WIB',
    lokasi: 'Keliling RT 01 s.d. RT 15 Wilayah RW 04',
    deskripsi: 'Pemeriksaan jentik berkala pada bak mandi, dispenser, penampungan kulkas, talang air, pembagian abate, dan edukasi ABJ (Angka Bebas Jentik) mencapai 98.6%.',
    status: 'Rutin',
    iconName: 'ShieldCheck'
  },
  {
    id: 'KG-02',
    judul: 'Pertemuan Rutin TP PKK & Bina Keluarga Balita (BKB)',
    divisi: 'PKK',
    jadwal: 'Hari Rabu ke-2 Setiap Bulan, Pukul 14.00 WIB',
    lokasi: 'Aula Balai Warga RW 04',
    deskripsi: 'Program Pokja I - IV: Pembinaan pola asuh anak remaja di era digital, keterampilan kuliner UP2K, serta ketahanan pangan lorong sayur hidroponik.',
    status: 'Rutin',
    iconName: 'HeartHandshake'
  },
  {
    id: 'KG-03',
    judul: 'Pendataan Carik Jakarta & Monitoring Kesehatan Keluarga',
    divisi: 'Dasawisma',
    jadwal: 'Minggu ke-1 & ke-3 Setiap Bulan',
    lokasi: 'Kader Dasawisma di tiap kelompok 10-20 rumah',
    deskripsi: 'Pemutakhiran data kependudukan warga terintegrasi Dasawisma Carik Jakarta, pendataan ibu hamil, bayi berisiko stunting, serta pemilahan sampah anorganik.',
    status: 'Rutin',
    iconName: 'ClipboardList'
  },
  {
    id: 'KG-04',
    judul: 'Layanan Posyandu Balita Cempaka & Skrining Lansia',
    divisi: 'Posyandu',
    jadwal: 'Tanggal 12 Setiap Bulan, Pukul 08.30 - 12.00 WIB',
    lokasi: 'Pos Posyandu Balai Warga RW 04',
    deskripsi: 'Penimbangan balita, imunisasi dasar lengkap, pemberian Vitamin A & PMT sehat, serta cek gula darah, tensi, dan kolesterol lansia secara gratis.',
    status: 'Rutin',
    iconName: 'Activity'
  },
  {
    id: 'KG-05',
    judul: 'Piket Ronda Malam Terpadu & Siskamling Digital',
    divisi: 'Siskamling',
    jadwal: 'Setiap Hari, Pukul 22.00 - 04.30 WIB',
    lokasi: 'Pos Kamling Induk & 4 Pos Pantau RW 04',
    deskripsi: 'Patroli keliling keamanan lingkungan, penutupan portal gang pukul 23.00, serta pemantauan titik rawan melalui 16 kamera CCTV swadaya warga.',
    status: 'Rutin',
    iconName: 'Shield'
  },
  {
    id: 'KG-06',
    judul: 'Kerja Bakti Akbar Bersih Drainase Lingkungan Jelang Musim Hujan',
    divisi: 'PKK',
    jadwal: 'Minggu, 01 November 2026, Pukul 06.30 WIB',
    lokasi: 'Jl. Malaka Raya, Jl. Teratai, & Jl. Bougenville',
    deskripsi: 'Gotong royong serentak seluruh warga bersama regu PPSU Kelurahan Malaka Sari mengangkat sedimen lumpur saluran utama dan pemangkasan ranting pohon.',
    status: 'Mendatang',
    iconName: 'Users'
  }
];

export const GALERI_DATA: GaleriFoto[] = [
  {
    id: 'GF-01',
    judul: 'Aksi Jumat Bersih & PSN 3M Plus Kader Jumantik RW 04',
    kategori: 'Jumantik',
    tanggal: '24 Oktober 2026',
    lokasi: 'Area RT 04 & RT 05 Malaka Sari',
    gambarUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
    deskripsi: 'Kader Jumantik memeriksa tempat penampungan air warga serta membagikan bubuk abate secara door-to-door.'
  },
  {
    id: 'GF-02',
    judul: 'Pelatihan Hidroponik & Olahan Pangan TP PKK',
    kategori: 'PKK',
    tanggal: '18 Oktober 2026',
    lokasi: 'Kebun Bibit Balai RW 04',
    gambarUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?w=800&auto=format&fit=crop&q=80',
    deskripsi: 'Ibu-ibu kader PKK RW 04 memanen kangkung dan selada hidroponik hasil budidaya pekarangan hijau warga.'
  },
  {
    id: 'GF-03',
    judul: 'Pemeriksaan Kesehatan dan Timbang Balita Posyandu Cempaka',
    kategori: 'Warga',
    tanggal: '12 Oktober 2026',
    lokasi: 'Balai Warga RW 04',
    gambarUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    deskripsi: 'Pemberian vitamin dan PMT gizi seimbang untuk balita serta penyuluhan pencegahan stunting.'
  },
  {
    id: 'GF-04',
    judul: 'Rapat Koordinasi Pendataan Carik Jakarta Kader Dasawisma',
    kategori: 'Dasawisma',
    tanggal: '05 Oktober 2026',
    lokasi: 'Ruang Rapat RW 04',
    gambarUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    deskripsi: 'Kader Dasawisma menyinkronkan data profil keluarga percontohan untuk akurasi bantuan sosial dan kesehatan.'
  },
  {
    id: 'GF-05',
    judul: 'Gotong Royong Normalisasi Saluran Air Antisipasi Genangan',
    kategori: 'Gotong Royong',
    tanggal: '28 September 2026',
    lokasi: 'Jl. Teratai RT 04',
    gambarUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    deskripsi: 'Warga bersama petugas PPSU kompak mengangkat lumpur dan sampah padat di saluran penghubung BKT.'
  },
  {
    id: 'GF-06',
    judul: 'Kemeriahan Peringatan Kemerdekaan RI & Senam Sehat Warga',
    kategori: 'Peringatan',
    tanggal: '17 Agustus 2026',
    lokasi: 'Lapangan Olahraga RW 04 Malaka Sari',
    gambarUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    deskripsi: 'Ratusan warga dari RT 01 hingga RT 15 tumpah ruah mengikuti jalan sehat, senam poco-poco, dan pentas seni pemuda.'
  }
];

export const INITIAL_PENGUMUMAN: PengumumanRW[] = [
  {
    id: 'PGM-01',
    judul: 'Kerja Bakti Akbar Serentak Seluruh RT Jelang Musim Hujan',
    isi: 'Dihimbau kepada seluruh warga RT 01 s/d RT 15 untuk berpartisipasi dalam kerja bakti normalisasi saluran drainase pada Minggu pagi pukul 06.30 WIB.',
    tanggal: '26 Oktober 2026',
    prioritas: 'penting',
    author: 'H. Bambang Sugiarto (Ketua RW 04)'
  },
  {
    id: 'PGM-02',
    judul: 'Jadwal Fogging Fokus & Pembagian Abate Puskesmas',
    isi: 'Kader Jumantik bersama Puskesmas Malaka Sari akan mengadakan fogging fokus dan pembagian bubuk abate di wilayah RT 02 dan RT 09.',
    tanggal: '24 Oktober 2026',
    prioritas: 'info',
    author: 'Ibu Hj. Nuryani (Koordinator Jumantik)'
  }
];

export const DEFAULT_USERS = {
  warga: {
    role: 'warga' as const,
    nama: 'Budi Santoso',
    email: 'budi.santoso@gmail.com',
    rt: 'RT 04',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    isAuthenticated: true,
    loginMethod: 'google_oauth' as const
  },
  admin: {
    role: 'admin' as const,
    nama: 'H. Bambang Sugiarto (Ketua RW 04)',
    email: 'rw04masadursa@gmail.com',
    rt: 'Pengurus RW 04',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    isAuthenticated: true,
    loginMethod: 'pengurus_admin' as const
  }
};
