import { useCallback, useState } from 'react';
import { toast } from './use-toast';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
  read: boolean;
  action?: () => void;
}

export interface NotificationOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  showToast?: boolean;
  addToBadge?: boolean;
  action?: () => void;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const showNotification = useCallback((options: NotificationOptions) => {
    const {
      title,
      message,
      type = 'info',
      duration = 4000,
      showToast = true,
      addToBadge = true,
      action
    } = options;

    // Show toast notification
    if (showToast) {
      toast({
        title,
        description: message,
        type,
        duration
      });
    }

    // Add to notification list
    if (addToBadge) {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title,
        message,
        type,
        timestamp: new Date(),
        read: false,
        action
      };

      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === notificationId);
      if (notification && !notification.read) {
        setUnreadCount(count => Math.max(0, count - 1));
      }
      return prev.filter(n => n.id !== notificationId);
    });
  }, []);

  // Convenience methods for different notification types
  const showSuccess = useCallback((title: string, message: string, options?: Partial<NotificationOptions>) => {
    showNotification({ title, message, type: 'success', ...options });
  }, [showNotification]);

  const showError = useCallback((title: string, message: string, options?: Partial<NotificationOptions>) => {
    showNotification({ title, message, type: 'error', ...options });
  }, [showNotification]);

  const showInfo = useCallback((title: string, message: string, options?: Partial<NotificationOptions>) => {
    showNotification({ title, message, type: 'info', ...options });
  }, [showNotification]);

  const showWarning = useCallback((title: string, message: string, options?: Partial<NotificationOptions>) => {
    showNotification({ title, message, type: 'warning', ...options });
  }, [showNotification]);

  return {
    notifications,
    unreadCount,
    showNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    removeNotification
  };
};
