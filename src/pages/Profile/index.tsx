import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './index.style';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const userStats = {
    buddies: 8,
    giftsGiven: 27,
    giftsReceived: 3,
  };

  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Edit Personal Info',
      icon: 'person-outline',
      onPress: () => console.log('Edit Personal Info'),
    },
    {
      id: '2',
      title: 'Addresses',
      icon: 'location-outline',
      onPress: () => console.log('Addresses'),
    },
    {
      id: '3',
      title: 'Buddies',
      icon: 'people-outline',
      onPress: () => (navigation as any).navigate('Buddies'),
    },
    {
      id: '4',
      title: 'Help',
      icon: 'help-circle-outline',
      onPress: () => console.log('Help'),
    },
    {
      id: '5',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => console.log('Settings'),
    },
    {
      id: '6',
      title: 'Logout',
      icon: 'log-out-outline',
      onPress: () => (navigation as any).navigate('Login'),
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <Ionicons name={item.icon as any} size={24} color="rgba(28, 147, 216, 1)" />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{uri: 'https://res.cloudinary.com/do99dohrh/image/upload/v1760738806/profileImage_iu3god.jpg'}}
            style={styles.profilePicture}
          />
          <Text style={styles.userName}>Catherine Bates</Text>
          <Text style={styles.userHandle}>cbFoodie24</Text>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.buddies}</Text>
            <Text style={styles.statLabel}>Buddies</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.giftsGiven}</Text>
            <Text style={styles.statLabel}>Gifts Given</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.giftsReceived}</Text>
            <Text style={styles.statLabel}>Gifts Received</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              {renderMenuItem(item)}
              {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
