# Notification System Guide

Your app now has a comprehensive notification system that provides both in-app toast notifications and persistent notification management with badges.

## 🚀 Quick Start

### 1. Basic Usage

```typescript
import { useNotificationContext } from '../context/NotificationContext';

const MyComponent = () => {
  const { showSuccess, showError, showInfo, showWarning } = useNotificationContext();

  const handleOrderComplete = () => {
    showSuccess('Order Complete!', 'Order #123 has been processed successfully');
  };

  const handleError = () => {
    showError('Connection Failed', 'Unable to connect to server');
  };

  return (
    // Your component JSX
  );
};
```

### 2. Advanced Usage

```typescript
const { showNotification } = useNotificationContext();

showNotification({
  title: 'Special Offer',
  message: 'Get 20% off today!',
  type: 'info',
  duration: 10000,
  showToast: true,
  addToBadge: true,
  action: () => {
    // Navigate to promotions page
    navigation.navigate('Promotions');
  }
});
```

## 📋 Available Methods

### Simple Methods
- `showSuccess(title, message, options?)` - Green success notifications
- `showError(title, message, options?)` - Red error notifications  
- `showInfo(title, message, options?)` - Blue info notifications
- `showWarning(title, message, options?)` - Orange warning notifications

### Advanced Method
- `showNotification(options)` - Full control over notification behavior

## ⚙️ Options

```typescript
interface NotificationOptions {
  title: string;                    // Notification title
  message: string;                  // Notification message
  type?: 'success' | 'error' | 'info' | 'warning';  // Visual style
  duration?: number;                // How long toast shows (ms)
  showToast?: boolean;              // Show as toast (default: true)
  addToBadge?: boolean;             // Add to notification list (default: true)
  action?: () => void;              // Action when notification is tapped
}
```

## 🎯 Real-World Examples

### Order Management
```typescript
// Order completed
showSuccess(
  'Order Complete!', 
  'Order #12345 is ready for pickup',
  {
    duration: 5000,
    action: () => navigation.navigate('OrderDetails', { orderId: '12345' })
  }
);

// Order failed
showError(
  'Order Failed',
  'Payment processing failed. Please try again.',
  { duration: 8000 }
);
```

### Inventory Management
```typescript
// Low stock warning
showWarning(
  'Low Inventory',
  'You are running low on tomatoes. Consider restocking.',
  {
    duration: 10000,
    action: () => navigation.navigate('Inventory')
  }
);

// Stock updated
showInfo(
  'Inventory Updated',
  'Tomato stock has been updated to 50 units'
);
```

### Menu Management
```typescript
// New item added
showSuccess(
  'Menu Updated',
  'Spicy Chicken Wings has been added to your menu',
  {
    action: () => navigation.navigate('Menu')
  }
);

// Item removed
showInfo(
  'Item Removed',
  'Chicken Burger has been removed from your menu'
);
```

## 🔔 Notification Panel

The notification panel shows all notifications with:
- **Unread indicators** - Blue dots for unread notifications
- **Time stamps** - "2m ago", "1h ago", etc.
- **Actions** - Mark as read, clear all, remove individual
- **Interactive** - Tap notifications to trigger actions

### Accessing the Panel
- Tap the notification bell icon in the top bar
- Shows unread count as a badge
- Responsive design for tablets and phones

## 🎨 Customization

### Toast Styling
Toasts are styled based on type:
- **Success**: Green background with checkmark icon
- **Error**: Red background with X icon  
- **Info**: Blue background with info icon
- **Warning**: Orange background with warning icon

### Badge Styling
- KOB tab shows notification count
- Notification bell shows "A" indicator when unread
- Responsive sizing for tablets

## 🔧 Integration Tips

### 1. API Error Handling
```typescript
try {
  const result = await apiCall();
  showSuccess('Success', 'Data saved successfully');
} catch (error) {
  showError('Error', error.message || 'Something went wrong');
}
```

### 2. Form Validation
```typescript
const handleSubmit = () => {
  if (!formData.name) {
    showError('Validation Error', 'Name is required');
    return;
  }
  // Submit form
};
```

### 3. Background Tasks
```typescript
const handleSync = async () => {
  showInfo('Syncing', 'Updating data from server...');
  
  try {
    await syncData();
    showSuccess('Sync Complete', 'All data updated successfully');
  } catch (error) {
    showError('Sync Failed', 'Unable to sync data');
  }
};
```

### 4. Navigation Actions
```typescript
showNotification({
  title: 'New Order',
  message: 'Order #12345 received',
  type: 'info',
  action: () => {
    navigation.navigate('Orders', { orderId: '12345' });
  }
});
```

## 🚨 Best Practices

1. **Keep messages concise** - Users scan notifications quickly
2. **Use appropriate types** - Success for good news, error for problems
3. **Include actions** - Let users tap to navigate to relevant screens
4. **Don't spam** - Avoid too many notifications at once
5. **Clear on action** - Mark notifications as read when user takes action

## 🔄 State Management

The notification system automatically manages:
- **Unread count** - Updates badge numbers
- **Notification list** - Stores all notifications
- **Read status** - Tracks which notifications have been viewed
- **Persistence** - Notifications survive app restarts (in memory)

## 📱 Responsive Design

- **Tablets**: Larger notification panel, optimized spacing
- **Phones**: Compact design, slide-up panel
- **Auto-sizing**: Adapts to content and screen size

## 🎯 Testing

Use the `NotificationExample` component to test all notification types:

```typescript
import NotificationExample from '../components/NotificationExample';

// Add to any screen for testing
<NotificationExample />
```

This provides buttons to test all notification types and see how they behave.
