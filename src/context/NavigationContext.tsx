import React, { createContext, ReactNode, useContext, useState } from 'react';

interface NavigationContextType {
  activeTab: string;
  activeSidebarItem: string;
  showSidebar: boolean;
  setActiveTab: (tab: string) => void;
  setActiveSidebarItem: (item: string) => void;
  setShowSidebar: (show: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('KOB');
  const [activeSidebarItem, setActiveSidebarItem] = useState('Items');
  const [showSidebar, setShowSidebar] = useState(true);

  const value = {
    activeTab,
    activeSidebarItem,
    showSidebar,
    setActiveTab,
    setActiveSidebarItem,
    setShowSidebar,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
