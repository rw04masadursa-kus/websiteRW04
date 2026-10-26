import React, { useState } from 'react';
import { UserSession } from '../types';
import { 
  Building2, Moon, Sun, Shield, Bell, PhoneCall, 
  MapPin, LogOut, CheckCircle, MessageCircle, ExternalLink, Menu, X, User, FileText
} from 'lucide-react';
import { StorageService } from '../services/storageService';

interface Props {
  currentUser: UserSession;
  onOpenForm: () => void;
  onOpenTracking: () => void;
  onOpenSurat: () => void;
  onOpenAuth: () => void;
  onOpenApiSync: () => void;
  activeView: 'landing' | 'admin';
  setActiveView: (view: 'landing' | 'admin') => void;
}

export const Navbar: React.FC<Props> = ({
  currentUser,
  onOpenForm,
  onOpenTracking,
  onOpenSurat,
  onOpenAuth,
  onOpenApiSync,
  activeView,
  setActiveView
}) => {
  const [theme, setThemeState] = useState<'dark' | 'light'>(StorageService.getTheme());
  const [showHotlineMenu, setShowHotlineMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const waLogs = StorageService.getWhatsAppLogs().slice(0, 4);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    StorageService.setTheme(nextTheme);
    setThemeState(nextTheme);
  };

  const handleRoleToggle = () => {
    if (currentUser.role === 'warga') {
      StorageService.setUserSession({
        role: 'admin',
        nama: 'H. Bambang Sugiarto (Ketua RW 04)',
        email: 'rw04masadursa@gmail.com',
        rt: 'Pengurus RW 04',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        isAuthenticated: true,
        loginMethod: 'pengurus_admin'
      });
      setActiveView('admin');
    } else {
      StorageService.setUserSession({
        role: 'warga',
        nama: 'Budi Santoso',
        email: 'budi.santoso@gmail.com',
        rt: 'RT 04',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        isAuthenticated: true,
        loginMethod: 'google_oauth'
      });
      setActiveView('landing');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('landing')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-teal-500/20">
              04
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                  RW 04 MALAKA SARI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-200/70 dark:border-teal-800">
                  Duren Sawit, Jakarta Timur
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                Portal Pelayanan Warga • PKK • Dasawisma • Jumantik
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveView('landing')}
              className={`hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${
                activeView === 'landing' ? 'text-teal-600 dark:text-teal-400 font-bold' : ''
              }`}
            >
              Beranda
            </button>
            <a href="#lembaga-rw" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              PKK &amp; Jumantik
            </a>
            <a href="#galeri-kegiatan" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Galeri Kegiatan
            </a>
            <a href="#peta-pengaduan" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Peta Kejadian
            </a>
            <button
              onClick={onOpenSurat}
              className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-teal-600" /> Surat Pengantar
            </button>
            <button
              onClick={onOpenTracking}
              className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              Lacak Tiket
            </button>
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeView === 'admin'
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 hover:bg-teal-100 border border-teal-200 dark:border-teal-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5" /> Dashboard Admin
              </button>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Eye-catching Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Beralih ke Mode Terang yang Segar' : 'Beralih ke Mode Gelap'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm transition-all"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline text-[11px]">Mode Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline text-[11px]">Mode Gelap</span>
                </>
              )}
            </button>

            {/* Emergency Hotline Button */}
            <div className="relative">
              <button
                onClick={() => setShowHotlineMenu(!showHotlineMenu)}
                title="Nomor Darurat & Posko"
                className="p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
              </button>

              {showHotlineMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 text-xs z-50 animate-in fade-in">
                  <div className="font-bold text-slate-900 dark:text-white pb-2 mb-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-rose-500" />
                    Kontak Darurat &amp; Keamanan RW 04
                  </div>
                  <div className="space-y-2 text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span>Pos Kamling &amp; Siskamling RW 04:</span>
                      <strong className="text-emerald-600 font-mono">0812-3344-9988</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span>Sekretariat Balai RW 04:</span>
                      <strong className="text-teal-600 font-mono">(021) 8660-0404</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span>Polsek Duren Sawit:</span>
                      <strong className="text-blue-600 font-mono">(021) 8616134</strong>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                      <span>Damkar Duren Sawit:</span>
                      <strong className="text-rose-600 font-mono">113 / 8660232</strong>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span>Puskesmas Malaka Sari:</span>
                      <strong className="text-purple-600 font-mono">(021) 8660-1234</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                title="Notifikasi WhatsApp Otomatis"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 relative transition-colors shadow-sm"
              >
                <Bell className="w-4 h-4" />
                {waLogs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {showNotificationMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 text-xs z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-emerald-500" /> Notifikasi WhatsApp Terakhir
                    </span>
                    <span className="text-[10px] text-emerald-600 font-mono font-semibold">Real-Time</span>
                  </div>
                  <div className="space-y-3">
                    {waLogs.map((log) => (
                      <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                          <span className="font-mono font-semibold text-teal-600">{log.pengaduanId}</span>
                          <span>{log.timestamp.substring(11, 16)} WIB</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px] line-clamp-2">
                          {log.pesan}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Role Switcher Pill */}
            <button
              onClick={handleRoleToggle}
              title="Klik untuk beralih antara Role Warga dan Admin Pengurus"
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 text-xs font-semibold bg-white dark:bg-slate-800 shadow-sm transition-all"
            >
              <img
                src={currentUser.avatar}
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-slate-600"
              />
              <div className="text-left leading-none">
                <span className="text-[10px] text-slate-400 block font-normal">
                  Role: <strong className="text-slate-800 dark:text-slate-200 capitalize">{currentUser.role}</strong>
                </span>
                <span className="text-teal-700 dark:text-teal-300 font-bold text-xs truncate max-w-[90px] block">
                  {currentUser.role === 'admin' ? 'Pengurus RW' : 'Warga RT 04'}
                </span>
              </div>
            </button>

            {/* Buat Pengaduan Primary Action Button */}
            <button
              onClick={onOpenForm}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-teal-500/30 transition-all hover:-translate-y-0.5"
            >
              <span>+ Buat Pengaduan</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 lg:hidden rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {showMobileMenu && (
          <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 text-sm space-y-2 animate-in slide-in-from-top-2">
            <button
              onClick={() => {
                setActiveView('landing');
                setShowMobileMenu(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
            >
              Beranda RW 04
            </button>
            <a
              href="#lembaga-rw"
              onClick={() => setShowMobileMenu(false)}
              className="block py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
            >
              Lembaga PKK, Dasawisma &amp; Jumantik
            </a>
            <a
              href="#galeri-kegiatan"
              onClick={() => setShowMobileMenu(false)}
              className="block py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
            >
              Galeri Foto Kegiatan Warga
            </a>
            <a
              href="#peta-pengaduan"
              onClick={() => setShowMobileMenu(false)}
              className="block py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
            >
              Peta Sebaran Pengaduan
            </a>
            <button
              onClick={() => {
                onOpenSurat();
                setShowMobileMenu(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-teal-700 dark:text-teal-300 font-bold"
            >
              📄 Layanan Surat Pengantar RT/RW Digital
            </button>
            <button
              onClick={() => {
                onOpenTracking();
                setShowMobileMenu(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
            >
              Lacak Status Tiket Pengaduan
            </button>
            <button
              onClick={() => {
                onOpenApiSync();
                setShowMobileMenu(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
            >
              API Integrasi Satu Data Kelurahan
            </button>
            
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-3">
              <span className="text-xs text-slate-500">Ganti Akun &amp; Role:</span>
              <button
                onClick={handleRoleToggle}
                className="px-3 py-1.5 rounded-lg bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-bold"
              >
                Switch ke {currentUser.role === 'warga' ? 'Admin Pengurus' : 'Warga RT'}
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
