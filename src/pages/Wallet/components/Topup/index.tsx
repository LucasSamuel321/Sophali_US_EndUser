import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import TopupWithBank from './components/TopupWithBank';
import TopupWithCard from './components/TopupWithCard';
import { styles } from './index.style';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopUpScreen: React.FC = ({ navigation }: any) => {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const topUpAmounts = [25, 50, 100, 200];

  const handleTopUp = async (amount: number) => {
    setIsProcessing(true);
    try {
      // Handle the top-up logic based on payment method
      Alert.alert('Success', `Successfully topped up $${amount}!`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
      console.error('Top-up error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSkip = () => {
    navigation.goBack();
  };


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
        <Text style={styles.headerTitle}>TopUp Your Wallet</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Wallet Card */}
      {/* <View style={styles.walletCard}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderElement}>
            <Text style={styles.cardHolderName}>John Doe</Text>
            <Text style={styles.cardNumber}>**** **** **** 1234</Text>
          </View>
          <View style={styles.cardHeaderElement}>
            <View style={styles.paymentLogos}>
              <Fontisto name="visa" size={24} color="rgba(14, 69, 149, 1)" />
              <Fontisto name="mastercard" size={24} color="rgba(14, 69, 149, 1)" />
            </View>
            <View style={styles.paymentLogos}>
              <Fontisto name="google" size={24} color="rgba(14, 69, 149, 1)" />
              <Fontisto name="apple" size={24} color="rgba(14, 69, 149, 1)" />
            </View>
          </View>
        </View>
        
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          <Text style={styles.balanceAmount}>${walletBalance.toFixed(2)}</Text>
        </View>
      </View> */}

      {/* Informational Text */}
      {/* <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          With your Sophali Wallet, enjoying your meals has never been easier! Simply top up your wallet and say goodbye to credit card transaction fees.
        </Text>
      </View> */}

      {/* Payment Method Selection */}
      <ScrollView>

      <View style={styles.paymentMethodSection}>
        <Text style={styles.sectionTitle}>Choose Payment Method</Text>
        <View style={styles.paymentMethodOptions}>
          <TouchableOpacity
            style={[
              styles.paymentMethodButton,
              selectedPaymentMethod === 'card' && styles.selectedPaymentMethodButton,
            ]}
            onPress={() => setSelectedPaymentMethod('card')}
          >
            <MaterialIcons 
              name="credit-card" 
              size={24} 
              color={selectedPaymentMethod === 'card' ? '#fff' : '#1E3A8A'} 
            />
            <Text
              style={[
                styles.paymentMethodText,
                selectedPaymentMethod === 'card' && styles.selectedPaymentMethodText,
              ]}
            >
              Credit/Debit Card
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.paymentMethodButton,
              selectedPaymentMethod === 'bank' && styles.selectedPaymentMethodButton,
            ]}
            onPress={() => setSelectedPaymentMethod('bank')}
          >
            <MaterialIcons 
              name="account-balance" 
              size={24} 
              color={selectedPaymentMethod === 'bank' ? '#fff' : '#1E3A8A'} 
            />
            <Text
              style={[
                styles.paymentMethodText,
                selectedPaymentMethod === 'bank' && styles.selectedPaymentMethodText,
              ]}
            >
              Bank Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Amount Selection */}
      <View style={styles.topUpSection}>
        <Text style={styles.sectionTitle}>Select Amount</Text>
        <View style={styles.amountOptions}>
          {topUpAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.amountButton,
                selectedAmount === amount && styles.selectedAmountButton,
              ]}
              onPress={() => setSelectedAmount(amount)}
            >
              <Text
                style={[
                  styles.amountText,
                  selectedAmount === amount && styles.selectedAmountText,
                ]}
              >
                ${amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Payment Method Components */}
      {selectedPaymentMethod === 'card' ? (
        <TopupWithCard
          selectedAmount={selectedAmount}
          onTopUp={handleTopUp}
          isProcessing={isProcessing}
        />
      ) : (
        <TopupWithBank
          selectedAmount={selectedAmount}
          onTopUp={handleTopUp}
          isProcessing={isProcessing}
          navigation={navigation}
        />
      )}

      {/* Skip Button */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>SKIP</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopUpScreen;
