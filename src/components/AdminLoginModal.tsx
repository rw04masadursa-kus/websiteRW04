import React, { useState } from 'react';
import { UserSession } from '../types';
import { StorageService } from '../services/storageService';
import { triggerGlobalToast } from './NotificationToast';
import { 
  X, Lock, ShieldCheck, UserCheck, Eye, EyeOff, 
  ArrowRight, KeyRound, Copy, Check, Sparkles, AlertCircle 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: UserSession) => void;
}

export const AdminLoginModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('rw04masadursa@gmail.com');
  const [password, setPassword] = useState('adminrw04');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMsg('Mohon isi email/username dan kata sandi admin.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const session = StorageService.loginAdmin(usernameOrEmail, password);

      if (session) {
        triggerGlobalToast({
          tipe: 'success',
          judul: 'Otentikasi Admin Berhasil',
          pesan: `Selamat datang, ${session.nama}. Akses manajemen sistem aktif.`
        });
        onSuccess(session);
        onClose();
      } else {
        setErrorMsg('Kredensial tidak valid. Silakan coba lagi.');
      }
    }, 600);
  };

  const handleCopyAdminUrl = () => {
    const url = `${window.location.origin}${window.location.pathname}?page=admin-login`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card-white-glow rounded-3xl max-w-md w-full p-6 sm:p-8 animate-in zoom-in-95 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3 border border-teal-200 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Portal Masuk Pengurus RW 04
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Autentikasi Terenkripsi Pengelola &amp; Verifikator Malaka Sari
          </p>
        </div>

        {/* URL Route Badge Helper */}
        <div className="mt-4 p-3 bg-teal-50/80 rounded-2xl border border-teal-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-teal-900 font-medium">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
            <span className="truncate">URL Akses: <strong>?page=admin-login</strong></span>
          </div>
          <button
            type="button"
            onClick={handleCopyAdminUrl}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:text-teal-900 hover:underline shrink-0"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedUrl ? 'Tersalin' : 'Salin URL'}
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Pengurus / NIK Admin <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="rw04masadursa@gmail.com"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">
                Kata Sandi <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-teal-600 hover:underline flex items-center gap-1"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="text-xs text-slate-600 font-medium">Ingat saya di perangkat ini</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            <KeyRound className="w-4 h-4" />
            {isLoading ? 'Memverifikasi Akses...' : 'Masuk ke Dashboard Admin'}
          </button>
        </form>

        {/* Quick Demo Pre-fill Button */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => {
              setUsernameOrEmail('rw04masadursa@gmail.com');
              setPassword('adminrw04');
            }}
            className="text-xs text-slate-500 hover:text-teal-700 flex items-center justify-center gap-1.5 mx-auto font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Gunakan Akun Resmi Pengurus (H. Bambang Sugiarto)
          </button>
        </div>

      </div>
    </div>
  );
};
