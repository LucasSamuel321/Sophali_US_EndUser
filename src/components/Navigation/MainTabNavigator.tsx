import HomeScreen from '@/src/pages/Home';
import OrderReceiptScreen from '@/src/pages/OrderReceipt';
import ProfileScreen from '@/src/pages/Profile';
import WalletScreen from '@/src/pages/Wallet';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

const Tab = createBottomTabNavigator();

// Custom FAB component with dynamic icon and functionality
const FloatingActionButton: React.FC<{ 
  activeTab: string; 
  onPress: () => void 
}> = ({ activeTab, onPress }) => {
  const getIconName = () => {
    switch (activeTab) {
      case 'Home':
        return 'sparkles-outline'; // Bot icon for Home
      case 'Wallet':
        return 'add'; // Plus icon for Wallet
      case 'Receipts':
        return 'add-circle-outline'; // Add circle for Receipts
      case 'Profile':
        return 'barcode-sharp'; // Person add for Profile
      default:
        return 'add';
    }
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Ionicons name={getIconName() as any} size={24} color={Colors.fabIcon} />
    </TouchableOpacity>
  );
};

// Placeholder Center Screen
const CenterScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* This screen is not meant to be displayed, just for navigation */}
  </View>
);

const MainTabNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigation = useNavigation();

  const handleCenterPress = () => {
    switch (activeTab) {
      case 'Home':
        console.log('Bot navigation for Home tab');
        (navigation as any).navigate('AIBot');
        break;
        case 'Wallet':
        console.log('Wallet adding navigation for Wallet tab');
        (navigation as any).navigate('TopUp');
        break;
      case 'Receipts':
        console.log('Add new receipt for Receipts tab');
        // Navigate to add new receipt screen
        break;
      case 'Profile':
        console.log('Add new buddy for Profile tab');
        // Navigate to add new buddy screen
        break;
      default:
        console.log('Default center action');
    }
  };

  return (
    <Tab.Navigator
      screenListeners={{
        tabPress: (e) => {
          const routeName = e.target?.split('-')[0];
          if (routeName && routeName !== 'Center') {
            setActiveTab(routeName);
          }
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Receipts') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarShowLabel: false
        }}
      />
      
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen}
        options={{
          tabBarShowLabel: false
        }}
      />
      
      <Tab.Screen 
        name="Center" 
        component={CenterScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <FloatingActionButton activeTab={activeTab} onPress={() => handleCenterPress()}/>,
        }}
      />
      
      <Tab.Screen 
        name="Receipts" 
        component={OrderReceiptScreen}
        options={{
          tabBarShowLabel: false,
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    boxShadow: '10px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.fabBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
});

export default MainTabNavigator;
