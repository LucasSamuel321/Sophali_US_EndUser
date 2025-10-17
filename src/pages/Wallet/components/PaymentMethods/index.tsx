import useAuth from '@/src/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../index.style';
import { WalletCard } from '../../types';

const { width } = Dimensions.get('window');

interface PaymentMethodsProps {
  walletCards: WalletCard[];
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ walletCards }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { userData } = useAuth();
  const navigation = useNavigation();

  const getPaymentIcon = (type: string, brand?: string) => {
    switch (type) {
      case 'card':
        if (brand?.toLowerCase() === 'visa') {
          return <Fontisto name="visa" size={24} color="rgba(14, 69, 149, 1)" />;
        } else if (brand?.toLowerCase() === 'mastercard') {
          return <Fontisto name="mastercard" size={24} color="#FF5F00" />;
        } else if(brand?.toLocaleLowerCase() === 'amex') {
          return <Fontisto name="american-express" size={24} color="#FF5F00" />;
        }
        return <Ionicons name="card" size={24} color="#666" />;
      case 'google_pay':
        return <Ionicons name="logo-google" size={24} color="#4285F4" />;
      case 'apple_pay':
        return <Ionicons name="logo-apple" size={24} color="#000" />;
      default:
        return <Ionicons name="card" size={24} color="#666" />;
    }
  };

  const getCardDisplayName = (card: WalletCard) => {
    if (card.type === 'card' && card.cardholderName) {
      return card.cardholderName;
    }
    if (card.type === 'google_pay') {
      return 'Google Pay';
    }
    if (card.type === 'apple_pay') {
      return 'Apple Pay';
    }
    return 'Payment Method';
  };

  const getCardDisplayNumber = (card: WalletCard) => {
    if (card.type === 'card' && card.last4) {
      return `•••• •••• •••• ${card.last4}`;
    }
    if (card.type === 'google_pay') {
      return 'Google Pay Account';
    }
    if (card.type === 'apple_pay') {
      return 'Apple Pay Account';
    }
    return '•••• •••• •••• ••••';
  };

  const getExpiryDisplay = (card: WalletCard) => {
    if (card.type === 'card' && card.expiryMonth && card.expiryYear) {
      const month = card.expiryMonth.toString().padStart(2, '0');
      const year = card.expiryYear.toString().slice(-2);
      return `${month}/${year}`;
    }
    return '';
  };

  const renderWallet = () => (
    <View
      style={[
        styles.walletCard,
        { backgroundColor: 'rgba(18, 34, 53, 1)'},
      ]}
    >
      {/* Card Header */}
      <View style={styles.walletHeaderContainer}>
        <View style={styles.walletHeader}>
          <Text style={styles.walletHolderName}>{userData?.screenName}</Text>
        
        </View>
        <View style={styles.cardBrands}>
          {
            walletCards.map((card, index) => (
              <View key={index}>
                {getPaymentIcon(card.type, card.brand)}
              </View>
            ))
          }
          
        </View>
      </View>

      {/* Card Footer */}
      <View style={styles.walletFooter}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          <Text style={styles.balanceAmount}>${userData.walletBalance / 100}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.topUpButton}
            onPress={() => (navigation as any).navigate('TopUp')}
          >
            <Ionicons name="arrow-down" size={16} color="rgba(18, 34, 53, 1)" />
            <Text style={styles.topUpButtonText}>Top Up</Text>
          </TouchableOpacity>
          
     
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.cardsSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
          setActiveCardIndex(index);
        }}
        contentContainerStyle={styles.cardsContainer}
      >
        {renderWallet()}
        
      </ScrollView>

    </View>
  );
};

export default PaymentMethods;
