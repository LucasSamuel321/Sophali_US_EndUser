import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Buddy {
  id: string;
  name: string;
  username: string;
  profilePicture: any;
}

const BuddiesScreen: React.FC = ({ navigation }: any) => {
  const buddies: Buddy[] = [
    {
      id: '1',
      name: 'Zora Thomas',
      username: 'zthomas',
      profilePicture: require('../../../../assets/images/buddy1.jpg'),
    },
    {
      id: '2',
      name: 'Joel V.',
      username: 'joelv4',
      profilePicture: require('../../../../assets/images/buddy2.jpg'),
    },
    {
      id: '3',
      name: 'Mary Bateman',
      username: 'mary1990',
      profilePicture: require('../../../../assets/images/buddy3.jpg'),
    },
    {
      id: '4',
      name: 'Eric B.',
      username: 'eb29_2',
      profilePicture: require('../../../../assets/images/buddy4.jpg'),
    },
    {
      id: '5',
      name: 'Dan Johnston',
      username: 'foodie5',
      profilePicture: require('../../../../assets/images/buddy5.jpg'),
    },

  ];

  const renderBuddy = (buddy: Buddy, index: number) => (
    <View key={buddy.id}>
      <TouchableOpacity style={styles.buddyItem}>
        <Image source={buddy.profilePicture} style={styles.buddyPicture} />
        <View style={styles.buddyInfo}>
          <Text style={styles.buddyName}>{buddy.name}</Text>
          <Text style={styles.buddyUsername}>{buddy.username}</Text>
        </View>
      </TouchableOpacity>
      {index < buddies.length - 1 && <View style={styles.buddyDivider} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buddies</Text>
      </View>

      {/* Buddies List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.buddiesList}>
          {buddies.map((buddy, index) => renderBuddy(buddy, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  buddiesList: {
    paddingHorizontal: 20,
  },
  buddyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  buddyPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  buddyInfo: {
    flex: 1,
  },
  buddyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  buddyUsername: {
    fontSize: 14,
    color: '#666',
  },
  buddyDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});

export default BuddiesScreen;
