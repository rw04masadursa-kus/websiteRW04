import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { PerangkatRWSection } from './components/PerangkatRWSection';
import { GaleriKegiatanSection } from './components/GaleriKegiatanSection';
import { PetaPengaduanSection } from './components/PetaPengaduanSection';
import { AdminDashboard } from './components/AdminDashboard';
import { FormPengaduanModal } from './components/FormPengaduanModal';
import { TrackingPengaduanModal } from './components/TrackingPengaduanModal';
import { SuratPengantarModal } from './components/SuratPengantarModal';
import { ApiSyncModal } from './components/ApiSyncModal';
import { AuthModal } from './components/AuthModal';
import { NotificationToaster } from './components/NotificationToast';
import { Footer } from './components/Footer';
import { StorageService } from './services/storageService';
import { Pengaduan, UserSession } from './types';
import { MessageSquarePlus, Search, Shield } from 'lucide-react';

export default function App() {
  const [pengaduanList, setPengaduanList] = useState<Pengaduan[]>(() => StorageService.getPengaduanList());
  const [currentUser, setCurrentUser] = useState<UserSession>(() => StorageService.getUserSession());
  const [activeView, setActiveView] = useState<'landing' | 'admin'>('landing');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isSuratOpen, setIsSuratOpen] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [isApiSyncOpen, setIsApiSyncOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    const theme = StorageService.getTheme();
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Subscribe to reactive storage changes
    const unsubscribe = StorageService.subscribe(() => {
      setPengaduanList(StorageService.getPengaduanList());
      setCurrentUser(StorageService.getUserSession());
    });

    return () => unsubscribe();
  }, []);

  const handleSelectReport = (item: Pengaduan) => {
    setTrackingId(item.id);
    setIsTrackingOpen(true);
  };

  const handleSelectReportToMap = (item: Pengaduan) => {
    setActiveView('landing');
    setTimeout(() => {
      const el = document.getElementById('peta-pengaduan');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const selesaiCount = pengaduanList.filter((p) => p.status === 'selesai').length;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans transition-colors selection:bg-teal-500 selection:text-white">
      
      {/* Real-time Push Notifications Toaster */}
      <NotificationToaster />

      {/* Main Top Navigation */}
      <Navbar
        currentUser={currentUser}
        onOpenForm={() => setIsFormOpen(true)}
        onOpenTracking={() => {
          setTrackingId('');
          setIsTrackingOpen(true);
        }}
        onOpenSurat={() => setIsSuratOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenApiSync={() => setIsApiSyncOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      {activeView === 'admin' ? (
        <AdminDashboard
          pengaduanList={pengaduanList}
          currentUser={currentUser}
          onSelectReportToMap={handleSelectReportToMap}
          onSwitchToWarga={() => {
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
          }}
          onOpenApiSync={() => setIsApiSyncOpen(true)}
        />
      ) : (
        <main>
          {/* Hero Section */}
          <HeroSection
            onOpenForm={() => setIsFormOpen(true)}
            onOpenTracking={(id?: string) => {
              setTrackingId(id || '');
              setIsTrackingOpen(true);
            }}
            onOpenSurat={() => setIsSuratOpen(true)}
            onOpenApiSync={() => setIsApiSyncOpen(true)}
            totalPengaduan={pengaduanList.length}
            selesaiPengaduan={selesaiCount}
          />

          {/* Live Visual Stats */}
          <StatsSection />

          {/* Interactive Leaflet Map for spatial verification */}
          <PetaPengaduanSection
            pengaduanList={pengaduanList}
            onSelectPengaduan={handleSelectReport}
            onOpenForm={() => setIsFormOpen(true)}
          />

          {/* Perangkat RW: PKK, Dasawisma, Jumantik, Posyandu */}
          <PerangkatRWSection />

          {/* Galeri Kegiatan Warga */}
          <GaleriKegiatanSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenForm={() => setIsFormOpen(true)}
        onOpenTracking={() => {
          setTrackingId('');
          setIsTrackingOpen(true);
        }}
        onOpenApiSync={() => setIsApiSyncOpen(true)}
      />

      {/* Floating Action Button (Mobile Friendly) */}
      <div className="fixed bottom-6 left-6 z-30 sm:hidden flex flex-col gap-2">
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-2xl flex items-center justify-center font-bold"
          title="Lapor Cepat"
        >
          <MessageSquarePlus className="w-6 h-6" />
        </button>
      </div>

      {/* MODALS */}
      {isFormOpen && (
        <FormPengaduanModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          currentUser={currentUser}
          onSuccess={(newReport) => {
            setPengaduanList(StorageService.getPengaduanList());
          }}
        />
      )}

      {isTrackingOpen && (
        <TrackingPengaduanModal
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
          initialPengaduanId={trackingId}
          onOpenReport={handleSelectReportToMap}
        />
      )}

      {isSuratOpen && (
        <SuratPengantarModal
          isOpen={isSuratOpen}
          onClose={() => setIsSuratOpen(false)}
        />
      )}

      {isApiSyncOpen && (
        <ApiSyncModal
          isOpen={isApiSyncOpen}
          onClose={() => setIsApiSyncOpen(false)}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={(session) => {
            setCurrentUser(session);
            if (session.role === 'admin') {
              setActiveView('admin');
            } else {
              setActiveView('landing');
            }
          }}
        />
      )}

    </div>
  );
}
