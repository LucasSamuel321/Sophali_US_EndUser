import useAuth from '@/src/hooks/useAuth';
import useCartItems from '@/src/hooks/useCartItems';
import paymentService from '@/src/service/payment.service';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CardField, confirmPayment, useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import AddressModal from './components/AddressModal';
import { styles } from './index.style';

type DeliveryType = 'delivery' | 'pickup';
type TipOption = 'none' | '15%' | '18%' | '20%' | 'other';

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
}



const Checkout: React.FC = () => {
  const navigation = useNavigation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [selectedTip, setSelectedTip] = useState<TipOption>('none');
  const [includeUtensils, setIncludeUtensils] = useState(true);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>({
    id: '1',
    name: 'Home',
    address: '1140 S Country Club Dr #101',
    city: 'Mesa, Arizona',
    postalCode: '85210',
  });
  const [selectedPaymentBrand, setSelectedPaymentBrand] = useState<string>('visa');
  const [selectedPaymentType, setSelectedPaymentType] = useState<'wallet' | 'card' | 'google_pay' | 'apple_pay'>('card');
  const [cardDetails, setCardDetails] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { userData } = useAuth();
  const { totalPrice, cartItems } = useCartItems();
  

  const subtotal = totalPrice();
  const discounts = 8.00;
  const transactionFeePlatform = deliveryType === 'delivery' ? 0.5 : 0.5;
  const transactionPercentFeeStripe = 0.029; // 2.9%
  const transactionFixedFeeStripe = 0.3;     // 0.3
  const tip = selectedTip === 'none' ? 0 : 
       selectedTip === '15%' ? subtotal * 0.15 :
       selectedTip === '18%' ? subtotal * 0.18 :
       selectedTip === '20%' ? subtotal * 0.20 : 0;
  const taxRate = 0.05;

  const payForOrder = async () => {
    try {
      // Debug: Check if Stripe is initialized
      console.log('Starting payment process...');
      console.log('Selected payment type:', selectedPaymentType);
      console.log('Selected payment brand:', selectedPaymentBrand);
      
      // Validate payment method selection
      if (!selectedPaymentBrand) {
        Alert.alert('Payment Method Required', 'Please select a payment method to continue.');
        return;
      }

      // Validate card details for card payments
      if (selectedPaymentType === 'card' && !cardDetails?.complete) {
        Alert.alert('Invalid Card Details', 'Please enter valid card information to continue.');
        return;
      }

      setIsProcessingPayment(true);
      
      if (selectedPaymentType === 'wallet') {
        await handleWalletPayment();
      } else if (selectedPaymentType === 'card') {
        // Handle card payments
        await handleCardPayment();
      } else if (selectedPaymentType === 'google_pay' || selectedPaymentType === 'apple_pay') {
        // Handle digital wallet payments
        await handleDigitalWalletPayment();
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      Alert.alert('Payment Failed', `There was an error processing your payment: ${error.message || 'Unknown error'}`);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  

  const handleDigitalWalletPayment = async () => {
    try {
      const amount = getTotal();
      // if(cartItems[0])
    } catch (error) {
      console.error('Digital wallet payment error:', error);
      Alert.alert('Payment Failed', 'Unable to process digital wallet payment. Please try another method.');
    }
  };

  const handleWalletPayment = async () => {
    try {
      const totalAmount = getTotal();
      const walletBalance = (userData?.walletBalance || 0) / 100; // cents to dollars
      const result = await paymentService.paymentViaWallet(totalAmount, userData.id, cartItems[0].foodTruckId )
      if (walletBalance < totalAmount) {
        Alert.alert('Insufficient Wallet Balance', 'Please top up your wallet or choose another method.');
        return;
      }
      // TODO: Call backend to create order and deduct wallet balance
      Alert.alert(
        'Payment Successful',
        'Your wallet payment has been processed successfully!',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('OrderDetail' as never)
          }
        ]
      );
    } catch (error) {
      console.error('Wallet payment error:', error);
      Alert.alert('Payment Failed', 'Unable to process wallet payment. Please try again.');
    }
  };

  const handleCardPayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Invalid Card', 'Please enter valid card details to continue.');
      return;
    }
    
    try {
      const clientSecret = await paymentService.fetchPaymentIntentClientSecretForTopupViaCard((getTotal() * 100), userData.id); // Convert to cents
      
      if (!clientSecret) {
        Alert.alert('Payment Failed', 'Unable to create payment intent. Please try again.');
        return;
      }
      
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: {
            name: userData?.name || 'Lucas Samuel', // Use user data if available
            address: {
              line1: selectedAddress.address,
              city: selectedAddress.city,
              postalCode: selectedAddress.postalCode,
              country: 'US',
            },
          },
        },
      });

      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent) {
        Alert.alert(
          'Payment Successful', 
          'Your card payment has been processed successfully!',
          [
            {
              text: 'Continue',
              onPress: () => navigation.navigate('OrderDetail' as never)
            }
          ]
        );
      }
    } catch (error) {
      console.error('Card payment error:', error);
      Alert.alert('Payment Failed', 'Unable to process card payment. Please check your card details and try again.');
    }
  };

  const getTotal = () => {
    return Math.round((subtotal - discounts + transactionFeePlatform + transactionFixedFeeStripe + tip)/(1 - transactionPercentFeeStripe - taxRate));
  };

  const getTransactionFeeStripe = () => {
    return getTotal() * transactionPercentFeeStripe + transactionFixedFeeStripe;
  };

  const getTaxFee = () => {
    
    return getTotal() * taxRate;
  }

  const getEstimatedTime = () => {
    return deliveryType === 'delivery' ? '26 mins' : '14 mins';
  };

  const handleDeliveryTypeChange = (type: DeliveryType) => {
    setDeliveryType(type);
  };

  const renderDeliveryToggle = () => (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleOption,
          deliveryType === 'delivery' && styles.toggleOptionActive
        ]}
        onPress={() => handleDeliveryTypeChange('delivery')}
      >
        <Ionicons 
          name="car" 
          size={20} 
          color={deliveryType === 'delivery' ? Colors.textLight : Colors.textPrimary} 
        />
        <Text style={[
          styles.toggleText,
          deliveryType === 'delivery' && styles.toggleTextActive
        ]}>
          Delivery
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.toggleOption,
          deliveryType === 'pickup' && styles.toggleOptionActive
        ]}
        onPress={() => handleDeliveryTypeChange('pickup')}
      >
        <Ionicons 
          name="bag" 
          size={20} 
          color={deliveryType === 'pickup' ? Colors.textLight : Colors.textPrimary} 
        />
        <Text style={[
          styles.toggleText,
          deliveryType === 'pickup' && styles.toggleTextActive
        ]}>
          Pickup
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddressPress = () => {
    setShowAddressModal(true);
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleTimePress = () => {
    Alert.alert(
      'Delivery Time',
      'Select your preferred delivery time',
      [{ text: 'OK' }]
    );
  };

  const handleNotesPress = () => {
    Alert.alert(
      'Kitchen Notes',
      'Add special instructions for the kitchen',
      [{ text: 'OK' }]
    );
  };

  const renderDeliveryDetails = () => (
    <View style={styles.section}>
      
      <TouchableOpacity style={styles.detailItem} onPress={handleAddressPress}>
        <Ionicons name="location" size={20} color={Colors.textPrimary} />
        <View style={styles.detailContent}>
            <Text style={styles.sectionTitle}>
                {deliveryType === 'delivery' ? 'Deliver To:' : 'Pick up at:'}
            </Text>
          <Text style={styles.detailTitle}>
            {deliveryType === 'delivery' ? selectedAddress.name : 'Curry on Wheels'}
          </Text>
          <Text style={styles.detailSubtitle}>
            {deliveryType === 'delivery' 
              ? `${selectedAddress.address}, ${selectedAddress.city} ${selectedAddress.postalCode}`
              : '9245 Hilltop Road, Oshawa, Ontario P1P-1P1'
            }
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.detailItem} onPress={handleTimePress}>
        <Ionicons name="time" size={20} color={Colors.textPrimary} />
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>
            {deliveryType === 'delivery' ? 'Deliver Time' : 'Pick up time'}
          </Text>
          <Text style={styles.detailSubtitle}>Today - 12:30 PM</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.detailItem} onPress={handleNotesPress}>
        <Ionicons name="document-text" size={20} color={Colors.textPrimary} />
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>Notes for the kitchen</Text>
          <Text style={styles.detailSubtitle}>
            {deliveryType === 'pickup' 
              ? 'Coriander tastes like soap to me, please skip it. Make it medium spicy and put it in a large container.'
              : 'Add a note'
            }
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.detailItem}>
        <Ionicons name="restaurant" size={20} color={Colors.textPrimary} />
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>Include Napkins & Utensils</Text>
          <Text style={styles.detailSubtitle}>Items included depend on your order</Text>
        </View>
        <TouchableOpacity onPress={() => setIncludeUtensils(!includeUtensils)}>
          <Ionicons 
            name={includeUtensils ? "checkbox" : "square-outline"} 
            size={24} 
            color={includeUtensils ? Colors.primary : Colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handlePaymentMethodPress = () => {
    setShowPaymentModal(true);
  };



  const handleTipSelection = (tip: TipOption) => {
    setSelectedTip(tip);
  };

    const renderPaymentDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Methods</Text>
      <View style={styles.paymentMethodsRow}>
        <TouchableOpacity
          style={[
            styles.methodTile,
            selectedPaymentType === 'wallet' && styles.methodTileActive
          ]}
          onPress={() => setSelectedPaymentType('wallet')}
        >
          <View style={styles.methodIconCircle}>
            <Ionicons name="wallet" size={20} color={Colors.textPrimary} />
          </View>
          <Text style={styles.methodLabel}>Wallet</Text>
          <Text style={styles.methodSubLabel}>${(userData?.walletBalance || 0) / 100}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodTile,
            selectedPaymentType === 'card' && styles.methodTileActive
          ]}
          onPress={() => setSelectedPaymentType('card')}
        >
          <View style={styles.methodIconCircle}>
            <Ionicons name="card" size={20} color={Colors.textPrimary} />
          </View>
          <Text style={styles.methodLabel}>Card</Text>
          <Text style={styles.methodSubLabel}>Visa/Mastercard</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[
            styles.methodTile,
            selectedPaymentType === 'google_pay' && styles.methodTileActive
          ]}
          onPress={() => setSelectedPaymentType('google_pay')}
        >
          <View style={styles.methodIconCircle}>
            <Text style={styles.googlePayText}>G</Text>
          </View>
          <Text style={styles.methodLabel}>Google Pay</Text>
          <Text style={styles.methodSubLabel}>Fast checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodTile,
            selectedPaymentType === 'apple_pay' && styles.methodTileActive
          ]}
          onPress={() => setSelectedPaymentType('apple_pay')}
        >
          <View style={styles.methodIconCircle}>
            <Ionicons name="logo-apple" size={20} color={Colors.textPrimary} />
          </View>
          <Text style={styles.methodLabel}>Apple Pay</Text>
          <Text style={styles.methodSubLabel}>Fast checkout</Text>
        </TouchableOpacity> */}
      </View>
      {/* Show card input only for card-based payment methods */}
      {selectedPaymentType === 'card' && (
        <View style={styles.cardInputContainer}>
          <Text style={styles.cardInputLabel}>Card Details</Text>
          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderWidth: 1,
              borderColor: Colors.border,
              borderRadius: 8,
            }}
            style={{
              width: '100%',
              height: 50,
              marginTop: 8,
            }}
            onCardChange={cardDetails => {
              setCardDetails(cardDetails);
            }}
            onFocus={focusedField => {}}
          />
        </View>
      )}



      {/* Show digital wallet info */}
      {/* {(selectedPaymentType === 'google_pay' || selectedPaymentType === 'apple_pay') && (
        <View style={styles.digitalWalletInfoContainer}>
          <View style={styles.digitalWalletRow}>
            {selectedPaymentType === 'google_pay' ? (
              <View style={styles.googlePayIcon}>
                <Text style={styles.googlePayText}>G</Text>
              </View>
            ) : (
              <View style={styles.applePayIcon}>
                <Ionicons name="logo-apple" size={20} color={Colors.textLight} />
              </View>
            )}
            <Text style={styles.digitalWalletText}>
              {selectedPaymentType === 'google_pay' ? 'Google Pay' : 'Apple Pay'} will be used for payment
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.detailItem} onPress={handlePaymentMethodPress}>
        {selectedPaymentType === 'wallet' ? (
          <Ionicons name="wallet" size={20} color={Colors.textPrimary} />
        ) : selectedPaymentType === 'card' ? (
          selectedPaymentBrand === 'visa' ? (
            <View style={styles.visaIcon}>
              <Text style={styles.visaText}>VISA</Text>
            </View>
          ) : selectedPaymentBrand === 'mastercard' ? (
            <View style={styles.mastercardIcon}>
              <Text style={styles.mastercardText}>MC</Text>
            </View>
          ) : selectedPaymentBrand === 'amex' ? (
            <View style={styles.amexIcon}>
              <Text style={styles.amexText}>AMEX</Text>
            </View>
          ) : (
            <Ionicons name="card" size={20} color={Colors.textPrimary} />
          )
        ) : selectedPaymentType === 'google_pay' ? (
          <View style={styles.googlePayIcon}>
            <Text style={styles.googlePayText}>G</Text>
          </View>
        ) : selectedPaymentType === 'apple_pay' ? (
          <View style={styles.applePayIcon}>
            <Ionicons name="logo-apple" size={20} color={Colors.textLight} />
          </View>
        ) : (
          <Ionicons name="card" size={20} color={Colors.textPrimary} />
        )}
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>
            {selectedPaymentType === 'wallet' ? 'Wallet' : selectedPaymentType === 'card' ? 
             (selectedPaymentBrand === 'visa' ? 'VISA Card' :
              selectedPaymentBrand === 'mastercard' ? 'Mastercard' :
              selectedPaymentBrand === 'amex' ? 'American Express' :
              'Credit Card') :
             selectedPaymentType === 'google_pay' ? 'Google Pay' :
             selectedPaymentType === 'apple_pay' ? 'Apple Pay' : 'Select Payment Method'}
          </Text>
          <Text style={styles.detailSubtitle}>
            {selectedPaymentType === 'wallet' ? 'Use wallet balance for payment' : selectedPaymentType === 'card' ? 'Enter card details above' :
             selectedPaymentType === 'google_pay' ? 'Use Google Pay for quick checkout' :
             selectedPaymentType === 'apple_pay' ? 'Use Apple Pay for quick checkout' : 'Select payment method'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      </TouchableOpacity> */}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Discounts & Promo Codes</Text>
        <Text style={[styles.summaryValue, styles.discountValue]}>
          -${discounts.toFixed(2)}
        </Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Transaction Fee(Platform)</Text>
        <Text style={styles.summaryValue}>${transactionFeePlatform.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Transaction Fee(Stripe)</Text>
        <Text style={styles.summaryValue}>${getTransactionFeeStripe().toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Tax Fee</Text>
        <Text style={styles.summaryValue}>${getTaxFee().toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Tips</Text>
        <Text style={styles.summaryValue}>+${tip.toFixed(2)}</Text>
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.tipLabel}>Select Tip:</Text>
        <View style={styles.tipButtons}>
          {(['none', '15%', '18%', '20%', 'other'] as TipOption[]).map((tipOption) => (
            <TouchableOpacity
              key={tipOption}
              style={[
                styles.tipButton,
                selectedTip === tipOption && styles.tipButtonActive
              ]}
              onPress={() => handleTipSelection(tipOption)}
            >
              <Text style={[
                styles.tipButtonText,
                selectedTip === tipOption && styles.tipButtonTextActive
              ]}>
                {tipOption === 'none' ? 'None' : tipOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderDeliveryToggle()}
        {renderDeliveryDetails()}
        {renderPaymentDetails()}
        {renderOrderSummary()}
      </ScrollView>

      <TouchableOpacity style={styles.payNowBar} onPress={payForOrder} disabled={isProcessingPayment}>
        <View style={styles.paymentSummary}>
          <Text style={styles.paymentMethodText}>
            Paying with: {selectedPaymentType === 'wallet' ? 'Wallet' : 'Card'}
          </Text>
        </View>
        <View 
          style={[styles.payNowButton, isProcessingPayment && styles.payNowButtonDisabled]}
        >
          <Text style={styles.payNowText}>
            {isProcessingPayment ? 'Processing...' : 'Pay Now'}
          </Text>
        </View>
        <Text style={styles.estimatedInfo}>
          {getEstimatedTime()} • ${getTotal().toFixed(2)}
        </Text>
      </TouchableOpacity>

      <AddressModal
        visible={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSelectAddress={handleAddressSelect}
        selectedAddressId={selectedAddress.id}
      />

 
    </SafeAreaView>
  );
};

export default Checkout;
