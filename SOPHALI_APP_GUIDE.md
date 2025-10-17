# Sophali Food Ordering App

A React Native Expo application for food ordering with "Buy Now. Eat Later™" functionality.

## 🚀 Features

- **Onboarding Flow**: Beautiful onboarding screens introducing app features
- **Authentication**: Login screen with Sophali branding
- **Home Screen**: Restaurant discovery with promotional banners and filters
- **Cart Management**: Shopping cart with quantity controls
- **Wallet System**: Digital wallet for payments
- **Order Tracking**: Order receipts and history
- **User Profile**: Account management
- **Modern UI**: Clean, responsive design matching Figma specifications

## 📱 Screens Implemented

### 1. Onboarding Screens
- **Location**: `src/pages/Onboarding/OnboardingScreen.tsx`
- **Features**: 
  - 4 onboarding slides with pagination
  - Skip functionality
  - Smooth horizontal scrolling
  - Progress indicators

### 2. Login Screen
- **Location**: `src/pages/Login/login.tsx`
- **Features**:
  - Dark background with food truck imagery
  - Sophali branding overlay
  - White card with sign-in functionality
  - Sign up link

### 3. Home Screen
- **Location**: `src/pages/Home/HomeScreen.tsx`
- **Features**:
  - Promotional banner
  - Filter categories (Under $20, Burger, Pizza, etc.)
  - Restaurant cards with ratings and delivery info
  - Recommended dishes
  - Floating cart summary
  - Notification bell

### 4. Cart Screen
- **Location**: `src/pages/Cart/CartScreen.tsx`
- **Features**:
  - Eat Now/Eat Later sections
  - Quantity selectors with delete functionality
  - Discount offers
  - Add more items button
  - Checkout footer

### 5. Wallet Screen
- **Location**: `src/pages/Wallet/WalletScreen.tsx`
- **Features**:
  - Wallet balance display
  - Transaction history
  - Top-up functionality

### 6. Order Receipts
- **Location**: `src/pages/OrderReceipt/OrderReceiptScreen.tsx`
- **Features**: Order history and receipts

### 7. Profile Screen
- **Location**: `src/pages/Profile/ProfileScreen.tsx`
- **Features**: User account management

## 🎨 Design System

### Colors
- **Primary**: `#1A1A2E` (Dark blue/black)
- **Secondary**: `#66CCFF` (Light blue - Sophali brand)
- **Accent**: `#4CAF50` (Green for success states)
- **Background**: `#FFFFFF` (White)
- **Text Primary**: `#1A1A2E` (Dark gray)
- **Text Secondary**: `#6C757D` (Light gray)

### Components
- **Button**: Reusable button with variants (primary, secondary, outline)
- **Card**: Card component for content containers
- **QuantitySelector**: Custom quantity control with delete functionality

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── QuantitySelector.tsx
│   └── Navigation/
│       └── MainTabNavigator.tsx
├── constants/
│   └── Colors.tsx
├── pages/
│   ├── Onboarding/
│   ├── Login/
│   ├── Home/
│   ├── Cart/
│   ├── Wallet/
│   ├── OrderReceipt/
│   ├── Profile/
│   └── RootNavigator.tsx
└── context/
    ├── NavigationContext.tsx
    └── NotificationContext.tsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enduser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 📱 Navigation Flow

1. **Onboarding** → User sees app introduction
2. **Login** → Authentication screen
3. **Main App** → Tab-based navigation with:
   - Home (restaurant discovery)
   - Wallet (digital payments)
   - Search (FAB - floating action button)
   - Receipts (order history)
   - Profile (account management)

## 🎯 Key Features to Implement Next

1. **Product Detail Screen**: Food item customization and ordering
2. **Checkout Flow**: Payment method selection and order confirmation
3. **Buddies System**: Social features for gifting food
4. **Search Functionality**: Restaurant and food search
5. **Push Notifications**: Order updates and promotions
6. **Offline Support**: Cache restaurant data
7. **Payment Integration**: Real payment processing
8. **Maps Integration**: Delivery tracking

## 🔧 Customization

### Adding New Screens
1. Create screen component in `src/pages/`
2. Add to navigation in `RootNavigator.tsx` or `MainTabNavigator.tsx`
3. Update types if needed

### Styling
- Use the color constants from `src/constants/Colors.tsx`
- Follow the existing component patterns
- Maintain responsive design principles

### Images
- Add images to `assets/` folder
- Update image imports in components
- Use appropriate image formats (PNG for icons, JPG for photos)

## 📄 License

This project is part of the Sophali food ordering platform.

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Maintain consistent styling
4. Test on both iOS and Android
5. Update documentation as needed

## 📞 Support

For questions or issues, please refer to the project documentation or contact the development team.
