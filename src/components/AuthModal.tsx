import React, { useState } from 'react';
import { UserSession } from '../types';
import { StorageService } from '../services/storageService';
import { triggerGlobalToast } from './NotificationToast';
import { X, ShieldCheck, UserCheck, Lock, Chrome, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: UserSession) => void;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'pilih_role' | 'nik'>('pilih_role');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleLoginGoogle = (role: 'warga' | 'admin') => {
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      let session: UserSession;

      if (role === 'admin') {
        session = {
          role: 'admin',
          nama: 'H. Bambang Sugiarto (Ketua RW 04)',
          email: 'rw04masadursa@gmail.com',
          rt: 'Pengurus RW 04',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
          isAuthenticated: true,
          loginMethod: 'pengurus_admin'
        };
      } else {
        session = {
          role: 'warga',
          nama: 'Budi Santoso',
          email: 'budi.santoso@gmail.com',
          rt: 'RT 04',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          isAuthenticated: true,
          loginMethod: 'google_oauth'
        };
      }

      StorageService.setUserSession(session);
      triggerGlobalToast({
        tipe: 'success',
        judul: `Login Berhasil (${session.role.toUpperCase()})`,
        pesan: `Selamat datang kembali, ${session.nama}.`
      });

      onSuccess(session);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Otentikasi Akun RW 04
              </h3>
              <p className="text-[11px] text-slate-500">
                Aman Berbasis OAuth 2.0 &amp; Multi-Role
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Pilih peran otentikasi untuk mengakses fitur sesuai kewenangan sistem:
          </p>

          {/* Option 1: Admin */}
          <div
            onClick={() => handleLoginGoogle('admin')}
            className="p-4 rounded-2xl border-2 border-teal-500/40 hover:border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 cursor-pointer transition-all hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    Role Admin: Pengurus RW 04
                    <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded font-mono">Ketua RW</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Akses verifikasi laporan, ubah status, analitik tren bulanan &amp; broadcast WA.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Option 2: Warga */}
          <div
            onClick={() => handleLoginGoogle('warga')}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800/40 cursor-pointer transition-all hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center font-bold shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Role Warga: Pelapor RT 04
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Budi Santoso (RT 04/RW 04). Input pengaduan, pilih peta, &amp; lacak tiket.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={() => handleLoginGoogle('warga')}
            disabled={isAuthenticating}
            className="w-full mt-2 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            {isAuthenticating ? 'Memproses Otentikasi OAuth 2.0...' : 'Masuk Cepat dengan Google OAuth 2.0'}
          </button>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 text-center">
          Protokol Keamanan Enkripsi TLS 1.3 • Sesuai Standar Satu Data Indonesia
        </div>

      </div>
    </div>
  );
};
