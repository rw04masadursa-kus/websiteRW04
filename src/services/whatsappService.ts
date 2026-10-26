import { Pengaduan, WhatsAppNotificationLog } from '../types';

export function formatNomorWA(noHp: string): string {
  let cleaned = noHp.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

export function generatePesanWA(
  pengaduan: Pengaduan,
  tipe: 'laporan_diterima' | 'status_diproses' | 'status_selesai' | 'status_ditolak',
  catatanPetugas?: string
): string {
  const judulSingkat = pengaduan.judul.length > 35 
    ? pengaduan.judul.substring(0, 32) + '...' 
    : pengaduan.judul;

  if (tipe === 'laporan_diterima') {
    return `📢 *NOTIFIKASI RESMI RW 04 MALAKA SARI*\n` +
      `------------------------------------------\n` +
      `Halo Bpk/Ibu *${pengaduan.namaPelapor}*,\n\n` +
      `Laporan pengaduan Anda telah terdaftar di sistem kami:\n` +
      `📋 *No. Tiket:* ${pengaduan.id}\n` +
      `📌 *Topik:* ${judulSingkat}\n` +
      `📍 *Lokasi:* ${pengaduan.lokasi.alamat} (${pengaduan.lokasi.rt})\n` +
      `⏱️ *Status:* 🟡 *MENUNGGU VERIFIKASI*\n\n` +
      `Tim piket Pengurus RW 04 segera meninjau laporan Anda dalam kurun waktu 1x24 jam.\n\n` +
      `Anda dapat memantau status secara berkala di portal resmi RW 04 Malaka Sari.\n` +
      `_Salam Hangat, Pengurus RW 04 Malaka Sari, Duren Sawit._`;
  }

  if (tipe === 'status_diproses') {
    return `📢 *UPDATE PENGADUAN RW 04 MALAKA SARI*\n` +
      `------------------------------------------\n` +
      `Halo Bpk/Ibu *${pengaduan.namaPelapor}*,\n\n` +
      `Laporan Anda *#${pengaduan.id}* saat ini berstatus:\n` +
      `🔵 *SEDANG DIPROSES / DITINDAKLANJUTI*\n\n` +
      `📝 *Catatan Tim RW 04:*\n"${catatanPetugas || pengaduan.tanggapanAdmin || 'Tim Pokja RW 04 dan PPSU sedang melakukan penanganan di lokasi kejadian.'}"\n\n` +
      `👨‍💼 *Petugas:* ${pengaduan.namaPetugasAdmin || 'Pengurus RW 04'}\n\n` +
      `Terima kasih atas kepedulian Anda terhadap lingkungan RW 04 Malaka Sari.`;
  }

  if (tipe === 'status_selesai') {
    return `✅ *PENGADUAN SELESAI - RW 04 MALAKA SARI*\n` +
      `------------------------------------------\n` +
      `Kabar baik Bpk/Ibu *${pengaduan.namaPelapor}*!\n\n` +
      `Laporan *#${pengaduan.id}* (${judulSingkat}) telah:\n` +
      `🟢 *SELESAI DITANGANI DENGAN BAIK*\n\n` +
      `📝 *Tindakan Penyelesaian:*\n"${catatanPetugas || pengaduan.tanggapanAdmin || 'Masalah telah dituntaskan oleh regu kerja RW 04.'}"\n\n` +
      `Bukti foto pengerjaan dapat dilihat di portal warga. Mari bersama kita jaga kebersihan dan kenyamanan lingkungan RW 04 Malaka Sari!\n\n` +
      `_Terima kasih atas partisipasi aktif warga._`;
  }

  return `⚠️ *PEMBERITAHUAN PENGADUAN RW 04 MALAKA SARI*\n` +
    `------------------------------------------\n` +
    `Halo Bpk/Ibu *${pengaduan.namaPelapor}*,\n\n` +
    `Laporan Anda *#${pengaduan.id}* belum dapat ditindaklanjuti:\n` +
    `🔴 *DITOLAK / DILIMPAHKAN*\n\n` +
    `Alasan:\n"${catatanPetugas || pengaduan.tanggapanAdmin || 'Data laporan tidak lengkap atau berada di luar batas wilayah RW 04 Malaka Sari.'}"\n\n` +
    `Silakan hubungi sekretariat RW 04 jika terdapat pertanyaan lebih lanjut.`;
}

export function createWhatsAppWebLink(noHp: string, pesan: string): string {
  const formattedPhone = formatNomorWA(noHp);
  const encodedText = encodeURIComponent(pesan);
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}

export function dispatchWhatsAppNotification(
  pengaduan: Pengaduan,
  tipe: 'laporan_diterima' | 'status_diproses' | 'status_selesai' | 'status_ditolak',
  catatanPetugas?: string
): WhatsAppNotificationLog {
  const pesan = generatePesanWA(pengaduan, tipe, catatanPetugas);
  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);

  const log: WhatsAppNotificationLog = {
    id: 'WAL-' + Math.floor(100000 + Math.random() * 900000),
    pengaduanId: pengaduan.id,
    noHp: pengaduan.noHpPelapor,
    namaPenerima: pengaduan.namaPelapor,
    tipeNotifikasi: tipe,
    pesan: pesan,
    timestamp: timestamp,
    statusKirim: 'terkirim'
  };

  return log;
}
