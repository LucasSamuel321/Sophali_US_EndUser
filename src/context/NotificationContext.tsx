import React, { createContext, ReactNode, useContext } from 'react';
import { Notification, NotificationOptions, useNotification } from '../hooks/useNotification';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  showNotification: (options: NotificationOptions) => void;
  showSuccess: (title: string, message: string, options?: Partial<NotificationOptions>) => void;
  showError: (title: string, message: string, options?: Partial<NotificationOptions>) => void;
  showInfo: (title: string, message: string, options?: Partial<NotificationOptions>) => void;
  showWarning: (title: string, message: string, options?: Partial<NotificationOptions>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  removeNotification: (notificationId: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const notificationSystem = useNotification();

  return (
    <NotificationContext.Provider value={notificationSystem}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
