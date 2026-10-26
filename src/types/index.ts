export type Role = 'warga' | 'admin';

export type StatusPengaduan = 'menunggu' | 'diproses' | 'selesai' | 'ditolak';

export type KategoriPengaduan = 
  | 'kebersihan'
  | 'drainase'
  | 'pju_fasum'
  | 'jumantik_kesehatan'
  | 'keamanan'
  | 'administrasi'
  | 'lainnya';

export interface LokasiKoordinat {
  lat: number;
  lng: number;
  alamat: string;
  rt: string; // e.g. "RT 03"
}

export interface Pengaduan {
  id: string; // e.g. "RW04-2026-0042"
  judul: string;
  deskripsi: string;
  kategori: KategoriPengaduan;
  lokasi: LokasiKoordinat;
  fotoUrl?: string;
  namaPelapor: string;
  noHpPelapor: string; // WhatsApp number
  isAnonim: boolean;
  status: StatusPengaduan;
  createdAt: string;
  updatedAt: string;
  tanggapanAdmin?: string;
  namaPetugasAdmin?: string;
  fotoBuktiPenyelesaian?: string;
  prioritas: 'rendah' | 'sedang' | 'tinggi' | 'darurat';
}

export interface WhatsAppNotificationLog {
  id: string;
  pengaduanId: string;
  noHp: string;
  namaPenerima: string;
  tipeNotifikasi: 'laporan_diterima' | 'status_diproses' | 'status_selesai' | 'status_ditolak';
  pesan: string;
  timestamp: string;
  statusKirim: 'terkirim' | 'pending';
}

export interface PerangkatRW {
  id: string;
  nama: string;
  jabatan: string;
  divisi: 'pengurus_inti' | 'pkk' | 'dasawisma' | 'jumantik' | 'posyandu' | 'keamanan';
  foto: string;
  kontak?: string;
}

export interface KegiatanRW {
  id: string;
  judul: string;
  divisi: 'PKK' | 'Dasawisma' | 'Jumantik' | 'Posyandu' | 'Karang Taruna' | 'Siskamling';
  jadwal: string;
  lokasi: string;
  deskripsi: string;
  status: 'Rutin' | 'Mendatang' | 'Selesai';
  iconName?: string;
}

export interface GaleriFoto {
  id: string;
  judul: string;
  kategori: 'PKK' | 'Dasawisma' | 'Jumantik' | 'Warga' | 'Gotong Royong' | 'Peringatan';
  tanggal: string;
  lokasi: string;
  gambarUrl: string;
  deskripsi: string;
}

export interface PengumumanRW {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  prioritas: 'darurat' | 'penting' | 'info';
  author: string;
  linkTerkait?: string;
}

export interface UserSession {
  role: Role;
  nama: string;
  email: string;
  rt: string;
  avatar: string;
  isAuthenticated: boolean;
  loginMethod: 'google_oauth' | 'warga_nik' | 'pengurus_admin';
}
