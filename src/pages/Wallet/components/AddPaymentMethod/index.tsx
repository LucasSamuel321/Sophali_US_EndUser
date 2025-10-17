import { toast } from '@/src/hooks/use-toast';
import useAuth from '@/src/hooks/useAuth';
import usePayments from '@/src/hooks/usePayments';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './index.style';

// Payment method types
type PaymentMethodType = 'card' | 'google_pay' | 'apple_pay';

interface CardDetails {
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  isDefault: boolean;
  last4?: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cardholderName?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddPaymentMethod: React.FC = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<PaymentMethodType>('card');
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAuth();
  const { addCard, fetchExistingPaymentMethods } = usePayments();
  // Card form state
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  // Google Pay & Apple Pay state
  const [isGooglePayAvailable, setIsGooglePayAvailable] = useState(false);
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);

  useEffect(() => {
    checkPaymentMethodAvailability();
    fetchExistingPaymentMethods();
  }, []);

  const checkPaymentMethodAvailability = () => {
    // Check Google Pay availability
    if (Platform.OS === 'android') {
      setIsGooglePayAvailable(true);
    }
    
    // Check Apple Pay availability
    if (Platform.OS === 'ios') {
      setIsApplePayAvailable(true);
    }
  };

  

  // Card validation
  const validateCard = (): boolean => {
    const { cardholderName, cardNumber, expiryMonth, expiryYear, cvv } = cardDetails;
    
    if (!cardholderName.trim()) {
      toast({ title: "Error", description: "Please enter cardholder name", type: "error" });
      return false;
    }
    
    if (cardNumber.replace(/\s/g, '').length < 13) {
      toast({ title: "Error", description: "Please enter a valid card number", type: "error" });
      return false;
    }
    
    if (!expiryMonth || !expiryYear) {
      toast({ title: "Error", description: "Please enter expiry date", type: "error" });
      return false;
    }
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    if (parseInt(expiryYear) < currentYear || 
        (parseInt(expiryYear) === currentYear && parseInt(expiryMonth) < currentMonth)) {
      toast({ title: "Error", description: "Card has expired", type: "error" });
      return false;
    }
    
    if (cvv.length < 3 || cvv.length > 4) {
      toast({ title: "Error", description: "Please enter a valid CVV", type: "error" });
      return false;
    }
    
    return true;
  };

  // Luhn algorithm for card number validation
  const isValidCardNumber = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, '');
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const handleAddCard = async () => {
    if (!validateCard()) return;
    
    if (!isValidCardNumber(cardDetails.cardNumber)) {
      toast({ title: "Error", description: "Invalid card number", type: "error" });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, you would:
      // 1. Send card details to your backend securely
      // 2. Backend would use Stripe to create a payment method token
      // 3. Return the token to frontend
      
      const cardData = {
        cardholderName: cardDetails.cardholderName,
        last4: cardDetails.cardNumber.slice(-4),
        brand: detectCardBrand(cardDetails.cardNumber),
        expiryMonth: parseInt(cardDetails.expiryMonth),
        expiryYear: parseInt(cardDetails.expiryYear),
        // paymentToken would come from Stripe in real implementation
        paymentToken: `tok_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      const response = await addCard({...cardData, userId: userData.id});
      
      if (response.status === "success") {
        toast({ 
          title: "Success", 
          description: "Card added successfully", 
          type: "success" 
        });
        await fetchExistingPaymentMethods();
        navigation.goBack();
      } else {
        toast({
          title: "Error!",
          description: response.message,
          type: "error"
        })
      }
    } catch (error: any) {
      console.error('Error adding card:', error);
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to add card", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGooglePay = async () => {
    // setIsLoading(true);
    
    // try {
    //   // In a real implementation, you would:
    //   // 1. Initialize Google Pay
    //   // 2. Request payment data
    //   // 3. Send token to backend
      
    //   const googlePayData = {
    //     googlePayToken: `gpay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    //   };

    //   const response = await axios.post(`${config.serverUrl}/enduser/addGooglePay`, googlePayData);
      
    //   if (response.data.success) {
    //     toast({ 
    //       title: "Success", 
    //       description: "Google Pay added successfully", 
    //       type: "success" 
    //     });
    //     await fetchExistingPaymentMethods();
    //     navigation.goBack();
    //   }
    // } catch (error: any) {
    //   console.error('Error adding Google Pay:', error);
    //   toast({ 
    //     title: "Error", 
    //     description: error.response?.data?.error || "Failed to add Google Pay", 
    //     type: "error" 
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleAddApplePay = async () => {
    // setIsLoading(true);
    
    // try {
    //   // In a real implementation, you would:
    //   // 1. Initialize Apple Pay
    //   // 2. Request payment data
    //   // 3. Send token to backend
      
    //   const applePayData = {
    //     applePayToken: `apay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    //   };

    //   const response = await axios.post(`${config.serverUrl}/enduser/addApplePay`, applePayData);
      
    //   if (response.data.success) {
    //     toast({ 
    //       title: "Success", 
    //       description: "Apple Pay added successfully", 
    //       type: "success" 
    //     });
    //     await fetchExistingPaymentMethods();
    //     navigation.goBack();
    //   }
    // } catch (error: any) {
    //   console.error('Error adding Apple Pay:', error);
    //   toast({ 
    //     title: "Error", 
    //     description: error.response?.data?.error || "Failed to add Apple Pay", 
    //     type: "error" 
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const detectCardBrand = (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6/.test(cleaned)) return 'discover';
    
    return 'unknown';
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpiryDate = (text: string, isMonth: boolean) => {
    const cleaned = text.replace(/\D/g, '');
    if (isMonth) {
      return cleaned.slice(0, 2);
    }
    return cleaned.slice(0, 4);
  };

  const getCardBrandColor = (brand: string): string => {
    switch (brand) {
      case 'visa': return '#1E3A8A';
      case 'mastercard': return '#FF6B35';
      case 'amex': return '#006FCF';
      case 'discover': return '#FF6000';
      default: return '#666';
    }
  };

  const renderCardForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Cardholder Name</Text>
        <TextInput
          style={styles.textInput}
          value={cardDetails.cardholderName}
          onChangeText={(text) => setCardDetails({...cardDetails, cardholderName: text})}
          placeholder="Enter cardholder name"
          placeholderTextColor="#999"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <View style={styles.cardNumberContainer}>
          <TextInput
            style={[styles.textInput, styles.cardNumberInput]}
            value={cardDetails.cardNumber}
            onChangeText={(text) => setCardDetails({...cardDetails, cardNumber: formatCardNumber(text)})}
            placeholder="0000 0000 0000 0000"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={19}
          />
          <View style={[styles.cardBrandLogo, 
            { backgroundColor: getCardBrandColor(detectCardBrand(cardDetails.cardNumber)) }]}
            >
            <Text style={styles.cardBrandText}>{detectCardBrand(cardDetails.cardNumber).toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={styles.inputLabel}>Month</Text>
          <TextInput
            style={styles.textInput}
            value={cardDetails.expiryMonth}
            onChangeText={(text) => setCardDetails({...cardDetails, expiryMonth: formatExpiryDate(text, true)})}
            placeholder="MM"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        <View style={[styles.inputGroup, styles.halfWidth]}>
          <Text style={styles.inputLabel}>Year</Text>
          <TextInput
            style={styles.textInput}
            value={cardDetails.expiryYear}
            onChangeText={(text) => setCardDetails({...cardDetails, expiryYear: formatExpiryDate(text, false)})}
            placeholder="YYYY"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>CVV/CVC</Text>
        <TextInput
          style={styles.textInput}
          value={cardDetails.cvv}
          onChangeText={(text) => setCardDetails({...cardDetails, cvv: text.replace(/\D/g, '').slice(0, 4)})}
          placeholder="***"
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={[styles.addButton, isLoading && styles.disabledButton]} 
        onPress={handleAddCard}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addButtonText}>ADD CARD</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderGooglePayForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.infoContainer}>
        <Ionicons name="logo-google" size={48} color="#4285F4" />
        <Text style={styles.infoTitle}>Google Pay</Text>
        <Text style={styles.infoDescription}>
          Securely add Google Pay to your account for quick and easy payments.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.addButton, styles.googlePayButton, isLoading && styles.disabledButton]} 
        onPress={handleAddGooglePay}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addButtonText}>ADD GOOGLE PAY</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderApplePayForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.infoContainer}>
        <Ionicons name="logo-apple" size={48} color="#000" />
        <Text style={styles.infoTitle}>Apple Pay</Text>
        <Text style={styles.infoDescription}>
          Securely add Apple Pay to your account for quick and easy payments.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.addButton, styles.applePayButton, isLoading && styles.disabledButton]} 
        onPress={handleAddApplePay}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addButtonText}>ADD APPLE PAY</Text>
        )}
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Add Payment Method</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'card' && styles.activeTab]}
          onPress={() => setActiveTab('card')}
        >
          <Ionicons name="card" size={20} color={activeTab === 'card' ? '#1E3A8A' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'card' && styles.activeTabText]}>Card</Text>
        </TouchableOpacity>

        {isGooglePayAvailable && (
          <TouchableOpacity
            style={[styles.tab, activeTab === 'google_pay' && styles.activeTab]}
            onPress={() => setActiveTab('google_pay')}
          >
            <Ionicons name="logo-google" size={20} color={activeTab === 'google_pay' ? '#1E3A8A' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'google_pay' && styles.activeTabText]}>Google Pay</Text>
          </TouchableOpacity>
        )}

        {isApplePayAvailable && (
          <TouchableOpacity
            style={[styles.tab, activeTab === 'apple_pay' && styles.activeTab]}
            onPress={() => setActiveTab('apple_pay')}
          >
            <Ionicons name="logo-apple" size={20} color={activeTab === 'apple_pay' ? '#1E3A8A' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'apple_pay' && styles.activeTabText]}>Apple Pay</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Form Content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 'card' && renderCardForm()}
        {activeTab === 'google_pay' && renderGooglePayForm()}
        {activeTab === 'apple_pay' && renderApplePayForm()}
      </ScrollView>

      {/* Security Notice */}
      <View style={styles.securityNotice}>
        <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
        <Text style={styles.securityText}>
          Your payment information is encrypted and secure
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AddPaymentMethod;