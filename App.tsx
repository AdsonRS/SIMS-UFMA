
import React, { useState } from 'react';
import { Screen } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import MapScreen from './components/MapScreen';
import TripsScreen from './components/TripsScreen';
import WalletScreen from './components/WalletScreen';
import SettingsScreen from './components/SettingsScreen';
import QrScanner from './components/QrScanner';
import TripInProgressScreen from './components/TripInProgressScreen';
import { stationDataMap } from './data/stations';

type View = 'main' | 'scanning' | 'trip';

const QrCodeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h6v6H4V4zm2 2v2h2V6H6zM4 14h6v6H4v-6zm2 2v2h2v-2H6zm10-12h6v6h-6V4zm2 2v2h2V6h-2zM14 14h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2-4h2v2h-2v-2zm2-2h2v2h-2v-2zm2 2h2v2h-2v-2z"/>
    </svg>
);

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.Map);
  const [currentView, setCurrentView] = useState<View>('main');
  const [scannedStationId, setScannedStationId] = useState<string | null>(null);

  const handleScanClick = () => {
    setCurrentView('scanning');
  };

  const handleScanSuccess = (stationId: string) => {
    setScannedStationId(stationId);
    setCurrentView('trip');
  };

  const handleScanCancel = () => {
    setCurrentView('main');
  };

  const handleEndTrip = () => {
    setScannedStationId(null);
    setCurrentView('main');
  };
  
  const renderMainScreen = () => {
    switch (activeScreen) {
      case Screen.Map:
        return <MapScreen />;
      case Screen.Trips:
        return <TripsScreen />;
      case Screen.Wallet:
        return <WalletScreen />;
      case Screen.Settings:
        return <SettingsScreen />;
      default:
        return <MapScreen />;
    }
  };

  const stationName = scannedStationId ? stationDataMap[scannedStationId] || "Estação Desconhecida" : "";

  return (
    <div className="relative h-screen w-screen bg-gray-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl overflow-hidden">
      {currentView === 'scanning' ? (
        <QrScanner onScanSuccess={handleScanSuccess} onCancel={handleScanCancel} />
      ) : currentView === 'trip' ? (
        <TripInProgressScreen stationName={stationName} onEndTrip={handleEndTrip} />
      ) : (
        <>
          <Header />
          <main className="flex-1 overflow-y-auto pb-16">
            {renderMainScreen()}
          </main>

          <button
            onClick={handleScanClick}
            aria-label="Escanear QR Code"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-purple-600 text-white rounded-full p-4 shadow-2xl flex items-center justify-center transform transition-transform hover:scale-110 active:scale-100 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50"
          >
            <QrCodeIcon className="w-8 h-8"/>
          </button>
          
          <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        </>
      )}
    </div>
  );
};

export default App;
