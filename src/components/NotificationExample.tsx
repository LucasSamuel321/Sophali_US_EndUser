import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNotificationContext } from '../context/NotificationContext';

const NotificationExample: React.FC = () => {
  const { 
    showSuccess, 
    showError, 
    showInfo, 
    showWarning,
    showNotification,
    unreadCount 
  } = useNotificationContext();

  const handleSuccessNotification = () => {
    showSuccess(
      'Order Completed!',
      'Order #12345 has been successfully processed and is ready for pickup.',
      {
        duration: 5000,
        action: () => {
          console.log('Navigate to order details');
          // You can navigate to order details here
        }
      }
    );
  };

  const handleErrorNotification = () => {
    showError(
      'Connection Failed',
      'Unable to connect to the server. Please check your internet connection.',
      { duration: 6000 }
    );
  };

  const handleInfoNotification = () => {
    showInfo(
      'New Menu Item',
      'Spicy Chicken Wings has been added to your menu.',
      {
        showToast: true,
        addToBadge: true
      }
    );
  };

  const handleWarningNotification = () => {
    showWarning(
      'Low Inventory',
      'You are running low on tomatoes. Consider restocking soon.',
      {
        duration: 8000,
        action: () => {
          console.log('Navigate to inventory management');
        }
      }
    );
  };

  const handleCustomNotification = () => {
    showNotification({
      title: 'Special Offer',
      message: 'Get 20% off on all orders today! Limited time offer.',
      type: 'info',
      duration: 10000,
      showToast: true,
      addToBadge: true,
      action: () => {
        console.log('Navigate to promotions');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification System Demo</Text>
      <Text style={styles.subtitle}>Unread notifications: {unreadCount}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.successButton]} 
          onPress={handleSuccessNotification}
        >
          <Text style={styles.buttonText}>Success Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.errorButton]} 
          onPress={handleErrorNotification}
        >
          <Text style={styles.buttonText}>Error Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.infoButton]} 
          onPress={handleInfoNotification}
        >
          <Text style={styles.buttonText}>Info Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.warningButton]} 
          onPress={handleWarningNotification}
        >
          <Text style={styles.buttonText}>Warning Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.customButton]} 
          onPress={handleCustomNotification}
        >
          <Text style={styles.buttonText}>Custom Notification</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instructions}>
        Tap the notification bell in the top bar to view all notifications
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  errorButton: {
    backgroundColor: '#F44336',
  },
  infoButton: {
    backgroundColor: '#2196F3',
  },
  warningButton: {
    backgroundColor: '#FF9800',
  },
  customButton: {
    backgroundColor: '#9C27B0',
  },
  instructions: {
    marginTop: 30,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default NotificationExample;
