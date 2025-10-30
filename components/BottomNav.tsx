
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.242 16.975 16.975 0 004.241-5.16c.317-1.42.543-2.88.543-4.385C21.998 6.047 17.52 2 12 2S2.002 6.047 2.002 11.5c0 1.506.226 2.965.544 4.385 1.157 5.17 4.24 8.26 5.16 4.242.04.07.016.028 0 .07zM12 15a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

const CreditCardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15z" />
    <path fill="#fff" d="M21 9.75H3v-.75a3 3 0 013-3h15a.75.75 0 01.75.75v3z" />
  </svg>
);

const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.85C8.56 6.035 8.1 6.276 7.67 6.564l-2.12-1.282c-.828-.5-1.872-.236-2.348.595L1.378 8.85c-.475.831-.21 1.872.595 2.348l1.282 2.121c-.288.43-.529.89-.714 1.38l-2.122.172c-.946.076-1.624.89-1.548 1.836v2.07c.076.945.802 1.66 1.748 1.748l2.122.172c.184.49.426.95.714 1.38l-1.282 2.121c-.805.475-1.07 1.517-.595 2.348l2.022 2.869c.475.831 1.52.105 2.348-.595l2.12-1.282c.43.288.89.529 1.38.714l.172 2.122c.076.945.89 1.624 1.836 1.548h2.07c.945-.076 1.66-.802 1.748-1.748l.172-2.122c.49-.184.95-.426 1.38-.714l2.12 1.282c.828.5 1.872.236 2.348-.595l2.023-2.869c.475-.831.21-1.872-.595-2.348l-1.282-2.121c.288-.43.529.89.714-1.38l2.122-.172c.946-.076 1.624-.89 1.548-1.836v-2.07c-.076-.945-.802-1.66-1.748-1.748l-2.122-.172c-.184-.49-.426-.95-.714-1.38l1.282-2.121c.805-.475 1.07-1.517.595-2.348l-2.023-2.869c-.475-.831-1.52-.105-2.348.595l-2.12 1.282c-.43-.288-.89-.529-1.38-.714l-.172-2.122A1.875 1.875 0 0013.05 2.25h-1.972zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
  </svg>
);


const NavItem: React.FC<{
  icon: React.ReactNode;
  label: Screen;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 py-2 transition-colors duration-200 ${
      isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-500'
    }`}
  >
    {icon}
    <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { screen: Screen.Map, icon: <MapPinIcon className="w-6 h-6 mb-1" /> },
    { screen: Screen.Trips, icon: <ClockIcon className="w-6 h-6 mb-1" /> },
    { screen: Screen.Wallet, icon: <CreditCardIcon className="w-6 h-6 mb-1" /> },
    { screen: Screen.Settings, icon: <CogIcon className="w-6 h-6 mb-1" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)] flex justify-around max-w-md mx-auto z-20">
      {navItems.map((item) => (
        <NavItem
          key={item.screen}
          icon={item.icon}
          label={item.screen}
          isActive={activeScreen === item.screen}
          onClick={() => setActiveScreen(item.screen)}
        />
      ))}
    </div>
  );
};

export default BottomNav;
