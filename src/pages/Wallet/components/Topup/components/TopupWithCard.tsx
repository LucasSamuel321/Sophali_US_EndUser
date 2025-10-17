import Colors from '@/src/constants/Colors';
import useAuth from '@/src/hooks/useAuth';
import paymentService from '@/src/service/payment.service';
import { CardField, confirmPayment } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from '../index.style';

interface TopupWithCardProps {
  selectedAmount: number;
  onTopUp: (amount: number) => void;
  isProcessing: boolean;
}

const TopupWithCard: React.FC<TopupWithCardProps> = ({
  selectedAmount,
  onTopUp,
  isProcessing,
}) => {
  const [cardDetails, setCardDetails] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { userData, fetchUserData } = useAuth();

  const handleTopUp = async () => {
    // Validate card details
    if (!cardDetails?.complete) {
      Alert.alert('Invalid Card', 'Please enter valid card details to continue.');
      return;
    }

    try {
      setIsProcessingPayment(true);
      
      // Create payment intent
      const clientSecret = await paymentService.fetchPaymentIntentClientSecretForTopupViaCard(selectedAmount * 100, userData.id); // Convert to cents
      
      if (!clientSecret) {
        Alert.alert('Payment Failed', 'Unable to create payment intent. Please try again.');
        return;
      }
      // Confirm payment with Stripe
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: {
            name: userData?.first_name + " " + userData?.second_name,
            email: userData?.email || '',
          },
        },
      });
      
      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent) {

        Alert.alert(
          'Payment Initiated',
          'Your card payment was confirmed. Your wallet will update once our server verifies the payment with Stripe.'
        );
        setTimeout(() => {
          fetchUserData();
        }, 5000);
      }
    } catch (error: any) {
      console.error('Card payment error:', error);
      Alert.alert('Payment Failed', 'Unable to process card payment. Please check your card details and try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <ScrollView style={styles.cardFormContainer}>
      <View style={styles.paymentDetailsSection}>
        <Text style={styles.subSectionTitle}>Card Information</Text>
        
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

        {/* Top Up Button */}
        <TouchableOpacity 
          style={[
            styles.topUpButton, 
            (isProcessing || isProcessingPayment) && styles.disabledButton
          ]} 
          onPress={handleTopUp}
          disabled={isProcessing || isProcessingPayment}
        >
          <Text style={styles.topUpButtonText}>
            {(isProcessing || isProcessingPayment) ? 'PROCESSING...' : `TOP UP $${selectedAmount}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TopupWithCard;
