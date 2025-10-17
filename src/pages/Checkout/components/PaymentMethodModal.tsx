import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/Colors';

interface PaymentMethod {
  id: string;
  type: 'wallet' | 'card' | 'google_pay' | 'apple_pay';
  isDefault: boolean;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cardholderName?: string;
  googlePayToken?: string;
  applePayToken?: string;
  isActive: boolean;
}

interface PaymentMethodModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPayment: (payment: PaymentMethod) => void;
  selectedPaymentId?: string;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  visible,
  onClose,
  onSelectPayment,
  selectedPaymentId,
}) => {

  const handlePaymentSelect = (payment: PaymentMethod) => {
    onSelectPayment(payment);
    onClose();
  };

  const getSelectedPaymentId = () => {
    if (!selectedPaymentId) return '2'; // Default to VISA
    return selectedPaymentId;
  };

  const getPaymentDisplayName = (payment: PaymentMethod): string => {
    if (payment.type === 'wallet') {
      return 'Wallet';
    }
    if (payment.type === 'card' && payment.brand && payment.last4) {
      return `${payment.brand} •••• ${payment.last4}`;
    } else if (payment.type === 'card') {
      return 'Credit/Debit Card';
    } else if (payment.type === 'google_pay') {
      return 'Google Pay';
    } else if (payment.type === 'apple_pay') {
      return 'Apple Pay';
    }
    return 'Payment Method';
  };

  const getPaymentDetails = (payment: PaymentMethod): string | undefined => {
    if (payment.type === 'card' && payment.expiryMonth && payment.expiryYear) {
      return `Expires ${payment.expiryMonth}/${payment.expiryYear}`;
    }
    return undefined;
  };

  const getPaymentIcon = (payment: PaymentMethod) => {
    if (payment.type === 'wallet') {
      return (
        <View style={styles.cardIcon}>
          <Ionicons name="wallet" size={24} color={Colors.textPrimary} />
        </View>
      );
    }
    if (payment.type === 'card') {
      if (payment.brand?.toLowerCase() === 'visa') {
        return (
          <View style={styles.visaIcon}>
            <Text style={styles.visaText}>VISA</Text>
          </View>
        );
      } else if (payment.brand?.toLowerCase() === 'mastercard') {
        return (
          <View style={styles.mastercardIcon}>
            <Text style={styles.mastercardText}>MC</Text>
          </View>
        );
      } else if (payment.brand?.toLowerCase() === 'amex') {
        return (
          <View style={styles.amexIcon}>
            <Text style={styles.amexText}>AMEX</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.cardIcon}>
            <Ionicons name="card" size={24} color={Colors.textPrimary} />
          </View>
        );
      }
    } else if (payment.type === 'google_pay') {
      return (
        <View style={styles.googlePayIcon}>
          <Text style={styles.googlePayText}>G</Text>
        </View>
      );
    } else if (payment.type === 'apple_pay') {
      return (
        <View style={styles.applePayIcon}>
          <Ionicons name="logo-apple" size={24} color={Colors.textLight} />
        </View>
      );
    }
    return null;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Unified methods: Wallet, Card, Google Pay, Apple Pay */}
          {[
            { id: 'wallet', type: 'wallet', isDefault: false, isActive: true },
            { id: 'card_default', type: 'card', brand: 'visa', last4: '4242', isDefault: true, isActive: true },
            { id: 'google_pay', type: 'google_pay', isDefault: false, isActive: true },
            { id: 'apple_pay', type: 'apple_pay', isDefault: false, isActive: true },
          ].map((payment: any) => (
            <TouchableOpacity
              key={payment.id}
              style={styles.paymentOption}
              onPress={() => handlePaymentSelect(payment)}
            >
              <View style={styles.paymentLeft}>
                {getPaymentIcon(payment)}
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>{getPaymentDisplayName(payment)}</Text>
                  {getPaymentDetails(payment) && (
                    <Text style={styles.paymentDetails}>{getPaymentDetails(payment)}</Text>
                  )}
                  {payment.isDefault && (
                    <Text style={styles.paymentBalance}>Default</Text>
                  )}
                </View>
              </View>
              <View style={styles.paymentRight}>
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioButton,
                    getSelectedPaymentId() === payment.id && styles.radioButtonSelected
                  ]}>
                    {getSelectedPaymentId() === payment.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addPaymentButton}>
            <Text style={styles.addPaymentText}>Add A New Payment Method</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  editButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentInfo: {
    marginLeft: 16,
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  paymentDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  paymentBalance: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  paymentRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    marginLeft: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  cardIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visaIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.visaBlue,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visaText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  mastercardIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.mastercardRed,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mastercardText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  amexIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.amexBlue,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amexText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: 'bold',
  },
  googlePayIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.googlePayGreen,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googlePayText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  applePayIcon: {
    width: 40,
    height: 24,
    backgroundColor: Colors.applePayBlack,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPaymentButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  addPaymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});

export default PaymentMethodModal;
