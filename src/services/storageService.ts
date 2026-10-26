import { Pengaduan, StatusPengaduan, WhatsAppNotificationLog, UserSession } from '../types';
import { INITIAL_PENGADUAN, INITIAL_WHATSAPP_LOGS, DEFAULT_USERS } from '../data/initialData';
import { dispatchWhatsAppNotification } from './whatsappService';

const PENGADUAN_KEY = 'rw04_pengaduan_data_v2';
const WALOG_KEY = 'rw04_walogs_v2';
const USER_KEY = 'rw04_user_session_v2';
const THEME_KEY = 'rw04_theme_mode';

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

  getPengaduanList(): Pengaduan[] {
    try {
      const stored = localStorage.getItem(PENGADUAN_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading pengaduan from storage', e);
    }
    // initialize
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

    // Dispatch WhatsApp notification to reporter
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

    // Send automated WhatsApp notification on status change
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

  getAnalytics() {
    const list = this.getPengaduanList();
    const total = list.length;
    const selesai = list.filter(p => p.status === 'selesai').length;
    const diproses = list.filter(p => p.status === 'diproses').length;
    const menunggu = list.filter(p => p.status === 'menunggu').length;
    const ditolak = list.filter(p => p.status === 'ditolak').length;
    const persentaseSelesai = total > 0 ? Math.round((selesai / total) * 100) : 0;

    // Breakdown RT (1 to 15)
    const rtCount: Record<string, number> = {};
    for (let i = 1; i <= 15; i++) {
      const rtKey = `RT ${String(i).padStart(2, '0')}`;
      rtCount[rtKey] = 0;
    }
    list.forEach(item => {
      const rtKey = item.lokasi.rt || 'RT 01';
      rtCount[rtKey] = (rtCount[rtKey] || 0) + 1;
    });

    // Breakdown Kategori
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

    // Monthly trends (mocked historical for rich analytics Jan - Oct 2026)
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
    notifyAll();
  }
};
