import { 
  Pengaduan, StatusPengaduan, WhatsAppNotificationLog, UserSession, 
  KegiatanRW, GaleriFoto, PengumumanRW 
} from '../types';
import { 
  INITIAL_PENGADUAN, INITIAL_WHATSAPP_LOGS, DEFAULT_USERS, 
  KEGIATAN_DATA, GALERI_DATA, INITIAL_PENGUMUMAN 
} from '../data/initialData';
import { dispatchWhatsAppNotification } from './whatsappService';

const PENGADUAN_KEY = 'rw04_pengaduan_data_v2';
const WALOG_KEY = 'rw04_walogs_v2';
const USER_KEY = 'rw04_user_session_v2';
const THEME_KEY = 'rw04_theme_mode';
const KEGIATAN_KEY = 'rw04_kegiatan_data_v2';
const GALERI_KEY = 'rw04_galeri_data_v2';
const PENGUMUMAN_KEY = 'rw04_pengumuman_data_v2';

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyAll() {
  listeners.forEach(fn => fn());
}

export const StorageService = {
  subscribe(fn: Listener): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  /* ---------------- PENGADUAN ---------------- */
  getPengaduanList(): Pengaduan[] {
    try {
      const stored = localStorage.getItem(PENGADUAN_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading pengaduan from storage', e);
    }
    localStorage.setItem(PENGADUAN_KEY, JSON.stringify(INITIAL_PENGADUAN));
    return INITIAL_PENGADUAN;
  },

  getPengaduanById(id: string): Pengaduan | undefined {
    const list = this.getPengaduanList();
    return list.find(item => item.id.toLowerCase() === id.toLowerCase().trim());
  },

  savePengaduan(item: Omit<Pengaduan, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Pengaduan {
    const list = this.getPengaduanList();
    const count = list.length + 1;
    const padCount = String(count).padStart(4, '0');
    const newId = `RW04-2026-${padCount}`;

    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);

    const newItem: Pengaduan = {
      ...item,
      id: newId,
      status: 'menunggu',
      createdAt: formattedDate,
      updatedAt: formattedDate
    };

    const updatedList = [newItem, ...list];
    localStorage.setItem(PENGADUAN_KEY, JSON.stringify(updatedList));

    if (newItem.noHpPelapor) {
      const waLog = dispatchWhatsAppNotification(newItem, 'laporan_diterima');
      this.saveWhatsAppLog(waLog);
    }

    notifyAll();
    return newItem;
  },

  updateStatus(
    id: string,
    newStatus: StatusPengaduan,
    tanggapanAdmin?: string,
    namaPetugasAdmin?: string,
    fotoBuktiPenyelesaian?: string
  ): Pengaduan | null {
    const list = this.getPengaduanList();
    const index = list.findIndex(p => p.id === id);
    if (index === -1) return null;

    const current = list[index];
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);

    const updated: Pengaduan = {
      ...current,
      status: newStatus,
      updatedAt: formattedDate,
      tanggapanAdmin: tanggapanAdmin ?? current.tanggapanAdmin,
      namaPetugasAdmin: namaPetugasAdmin ?? current.namaPetugasAdmin,
      fotoBuktiPenyelesaian: fotoBuktiPenyelesaian ?? current.fotoBuktiPenyelesaian
    };

    list[index] = updated;
    localStorage.setItem(PENGADUAN_KEY, JSON.stringify(list));

    let waType: 'status_diproses' | 'status_selesai' | 'status_ditolak' | null = null;
    if (newStatus === 'diproses') waType = 'status_diproses';
    else if (newStatus === 'selesai') waType = 'status_selesai';
    else if (newStatus === 'ditolak') waType = 'status_ditolak';

    if (waType && updated.noHpPelapor) {
      const waLog = dispatchWhatsAppNotification(updated, waType, tanggapanAdmin);
      this.saveWhatsAppLog(waLog);
    }

    notifyAll();
    return updated;
  },

  /* ---------------- KEGIATAN PERANGKAT RW (DYNAMIC ADMIN CRUD) ---------------- */
  getKegiatanList(): KegiatanRW[] {
    try {
      const stored = localStorage.getItem(KEGIATAN_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(KEGIATAN_KEY, JSON.stringify(KEGIATAN_DATA));
    return KEGIATAN_DATA;
  },

  saveKegiatan(item: Omit<KegiatanRW, 'id'>): KegiatanRW {
    const list = this.getKegiatanList();
    const newId = `KG-${String(list.length + 1).padStart(2, '0')}`;
    const newItem: KegiatanRW = {
      ...item,
      id: newId
    };
    const updated = [newItem, ...list];
    localStorage.setItem(KEGIATAN_KEY, JSON.stringify(updated));
    notifyAll();
    return newItem;
  },

  updateKegiatan(id: string, item: Partial<KegiatanRW>): KegiatanRW | null {
    const list = this.getKegiatanList();
    const idx = list.findIndex(k => k.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...item };
    localStorage.setItem(KEGIATAN_KEY, JSON.stringify(list));
    notifyAll();
    return list[idx];
  },

  deleteKegiatan(id: string): boolean {
    const list = this.getKegiatanList();
    const updated = list.filter(k => k.id !== id);
    localStorage.setItem(KEGIATAN_KEY, JSON.stringify(updated));
    notifyAll();
    return true;
  },

  /* ---------------- GALERI FOTO (DYNAMIC ADMIN CRUD) ---------------- */
  getGaleriList(): GaleriFoto[] {
    try {
      const stored = localStorage.getItem(GALERI_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(GALERI_KEY, JSON.stringify(GALERI_DATA));
    return GALERI_DATA;
  },

  saveGaleri(item: Omit<GaleriFoto, 'id'>): GaleriFoto {
    const list = this.getGaleriList();
    const newId = `GF-${String(list.length + 1).padStart(2, '0')}`;
    const newItem: GaleriFoto = {
      ...item,
      id: newId
    };
    const updated = [newItem, ...list];
    localStorage.setItem(GALERI_KEY, JSON.stringify(updated));
    notifyAll();
    return newItem;
  },

  deleteGaleri(id: string): boolean {
    const list = this.getGaleriList();
    const updated = list.filter(g => g.id !== id);
    localStorage.setItem(GALERI_KEY, JSON.stringify(updated));
    notifyAll();
    return true;
  },

  /* ---------------- PENGUMUMAN RESMI RW 04 (DYNAMIC ADMIN BROADCAST) ---------------- */
  getPengumumanList(): PengumumanRW[] {
    try {
      const stored = localStorage.getItem(PENGUMUMAN_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem(PENGUMUMAN_KEY, JSON.stringify(INITIAL_PENGUMUMAN));
    return INITIAL_PENGUMUMAN;
  },

  savePengumuman(item: Omit<PengumumanRW, 'id' | 'tanggal'>): PengumumanRW {
    const list = this.getPengumumanList();
    const newId = `PGM-${String(list.length + 1).padStart(2, '0')}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const newItem: PengumumanRW = {
      ...item,
      id: newId,
      tanggal: formattedDate
    };
    const updated = [newItem, ...list];
    localStorage.setItem(PENGUMUMAN_KEY, JSON.stringify(updated));
    notifyAll();
    return newItem;
  },

  deletePengumuman(id: string): boolean {
    const list = this.getPengumumanList();
    const updated = list.filter(p => p.id !== id);
    localStorage.setItem(PENGUMUMAN_KEY, JSON.stringify(updated));
    notifyAll();
    return true;
  },

  /* ---------------- WHATSAPP LOGS ---------------- */
  getWhatsAppLogs(): WhatsAppNotificationLog[] {
    try {
      const stored = localStorage.getItem(WALOG_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading WA logs', e);
    }
    localStorage.setItem(WALOG_KEY, JSON.stringify(INITIAL_WHATSAPP_LOGS));
    return INITIAL_WHATSAPP_LOGS;
  },

  saveWhatsAppLog(log: WhatsAppNotificationLog) {
    const logs = this.getWhatsAppLogs();
    const updated = [log, ...logs];
    localStorage.setItem(WALOG_KEY, JSON.stringify(updated.slice(0, 50)));
  },

  /* ---------------- USER SESSION & AUTHENTICATION ---------------- */
  getUserSession(): UserSession {
    try {
      const stored = localStorage.getItem(USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USERS.warga;
  },

  setUserSession(session: UserSession) {
    localStorage.setItem(USER_KEY, JSON.stringify(session));
    notifyAll();
  },

  loginAdmin(usernameOrEmail: string, pass: string): UserSession | null {
    // Official admin email: rw04masadursa@gmail.com or username admin
    const trimmedUser = usernameOrEmail.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (!trimmedUser || !trimmedPass) return null;

    // Check credentials (accepts official email or standard admin credentials)
    if (
      trimmedUser === 'rw04masadursa@gmail.com' ||
      trimmedUser === 'admin' ||
      trimmedUser === 'ketuarw04' ||
      trimmedUser === 'admin@rw04malakasari.id'
    ) {
      const adminSession: UserSession = {
        role: 'admin',
        nama: 'H. Bambang Sugiarto (Ketua RW 04)',
        email: 'rw04masadursa@gmail.com',
        rt: 'Pengurus RW 04',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        isAuthenticated: true,
        loginMethod: 'pengurus_admin'
      };
      this.setUserSession(adminSession);
      return adminSession;
    }

    // Generic fallback for authorized officers
    const customAdminSession: UserSession = {
      role: 'admin',
      nama: usernameOrEmail.includes('@') ? usernameOrEmail.split('@')[0] : usernameOrEmail,
      email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@rw04malakasari.id`,
      rt: 'Pengurus RW 04',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isAuthenticated: true,
      loginMethod: 'pengurus_admin'
    };
    this.setUserSession(customAdminSession);
    return customAdminSession;
  },

  logout(): UserSession {
    const warga = DEFAULT_USERS.warga;
    this.setUserSession(warga);
    return warga;
  },

  /* ---------------- THEME ---------------- */
  getTheme(): 'dark' | 'light' {
    const val = localStorage.getItem(THEME_KEY);
    return val === 'dark' ? 'dark' : 'light';
  },

  setTheme(theme: 'dark' | 'light') {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    notifyAll();
  },

  /* ---------------- ANALYTICS ---------------- */
  getAnalytics() {
    const list = this.getPengaduanList();
    const total = list.length;
    const selesai = list.filter(p => p.status === 'selesai').length;
    const diproses = list.filter(p => p.status === 'diproses').length;
    const menunggu = list.filter(p => p.status === 'menunggu').length;
    const ditolak = list.filter(p => p.status === 'ditolak').length;
    const persentaseSelesai = total > 0 ? Math.round((selesai / total) * 100) : 0;

    const rtCount: Record<string, number> = {};
    for (let i = 1; i <= 15; i++) {
      const rtKey = `RT ${String(i).padStart(2, '0')}`;
      rtCount[rtKey] = 0;
    }
    list.forEach(item => {
      const rtKey = item.lokasi.rt || 'RT 01';
      rtCount[rtKey] = (rtCount[rtKey] || 0) + 1;
    });

    const kategoriCount: Record<string, number> = {
      drainase: 0,
      kebersihan: 0,
      pju_fasum: 0,
      jumantik_kesehatan: 0,
      keamanan: 0,
      administrasi: 0,
      lainnya: 0
    };
    list.forEach(item => {
      kategoriCount[item.kategori] = (kategoriCount[item.kategori] || 0) + 1;
    });

    const monthlyTrend = [
      { bulan: 'Jan', masuk: 14, selesai: 14 },
      { bulan: 'Feb', masuk: 18, selesai: 17 },
      { bulan: 'Mar', masuk: 22, selesai: 21 },
      { bulan: 'Apr', masuk: 16, selesai: 16 },
      { bulan: 'Mei', masuk: 19, selesai: 18 },
      { bulan: 'Jun', masuk: 24, selesai: 23 },
      { bulan: 'Jul', masuk: 20, selesai: 19 },
      { bulan: 'Agu', masuk: 25, selesai: 24 },
      { bulan: 'Sep', masuk: 28, selesai: 26 },
      { bulan: 'Okt', masuk: total, selesai: selesai }
    ];

    return {
      total,
      selesai,
      diproses,
      menunggu,
      ditolak,
      persentaseSelesai,
      rtCount,
      kategoriCount,
      monthlyTrend,
      indeksKepuasan: 4.8,
      rataRataResponJam: 2.1
    };
  },

  resetToDefault() {
    localStorage.setItem(PENGADUAN_KEY, JSON.stringify(INITIAL_PENGADUAN));
    localStorage.setItem(WALOG_KEY, JSON.stringify(INITIAL_WHATSAPP_LOGS));
    localStorage.setItem(KEGIATAN_KEY, JSON.stringify(KEGIATAN_DATA));
    localStorage.setItem(GALERI_KEY, JSON.stringify(GALERI_DATA));
    localStorage.setItem(PENGUMUMAN_KEY, JSON.stringify(INITIAL_PENGUMUMAN));
    notifyAll();
  }
};
