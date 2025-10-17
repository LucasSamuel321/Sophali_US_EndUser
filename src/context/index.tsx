import { GlobalValueType } from '@/src/@types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { NavigationProvider, useNavigation } from './NavigationContext';

// Define the type for your global state
interface GlobalContextType {
  state: GlobalValueType;
  update: (data: Partial<GlobalValueType>) => void;
}

// Create the context with default values
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const initialValue: GlobalValueType = {
  isAuthenticated: 'false', // Will be set properly in useEffect
  chattingHistory: [],
  userData: null,
  orders: [],
  foodTrucks: [],
  foods: null,
  cartItems: [],
};

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GlobalValueType>(initialValue);

  React.useEffect(() => {
    (async () => {
      const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
      setState(prev => ({
        ...prev,
        isAuthenticated: isAuthenticated || 'false',
      }));
    })();
  }, []);

  const update = (data: Partial<GlobalValueType>) => {
    setState(prev => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, update }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// Export navigation context
export { NavigationProvider, useNavigation };

