import useAuth from '@/src/hooks/useAuth';
import paymentService from '@/src/service/payment.service';
import {
  collectBankAccountForSetup,
  confirmPayment,
  useStripe
} from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../index.style';

interface TopupWithBankProps {
  selectedAmount: number;
  onTopUp: (amount: number) => void;
  isProcessing: boolean;
  navigation: any;
}

const TopupWithBank: React.FC<TopupWithBankProps> = ({
  selectedAmount,
  onTopUp,
  isProcessing,
  navigation,
}) => {
  const { userData, fetchUserData } = useAuth();
  const { confirmSetupIntent } = useStripe();
  const [message, setMessage] = useState("");
  const [setupMode, setSetupMode] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [verificationMode, setVerificationMode] = useState(false);
  const [setupIntentId, setSetupIntentId] = useState("");
  const [microdepositAmounts, setMicrodepositAmounts] = useState<[number, number]>([0, 0]);

  const handleTopUpWithBank = async () => {
    try {
      console.log("paymentmethodid", paymentMethodId);
      if(!paymentMethodId) {
        Alert.alert("Warning!", 'Setup bank account!');
        return;
      }
      const charge = await paymentService.chargeNowByBank(selectedAmount * 100, userData.stripe_account_id, userData.id, paymentMethodId);
      const clientSecret = charge?.clientSecret;
      if (!clientSecret) {
        Alert.alert('Error', 'Failed to create payment intent');
        return;
      }

      // 2️⃣ Open Financial Connections UI for bank selection
      // const { session, error } = await collectFinancialConnectionsAccounts(clientSecret);
      
      // if (error) {
      //   Alert.alert('Error', error.message);
      //   return;
      // }

      // 3️⃣ Confirm the ACH debit
      const confirmResult: any = await confirmPayment(clientSecret);
      // if (confirmResult.error) {
      //   Alert.alert('Error', confirmResult.error.message);
      //   return;
      // }
      
      // 4️⃣ Success → show confirmation (ACH will take a few days)
      setMessage('Deposit initiated successfully! ACH transfer started. Funds will be available in 3–5 business days.');
      Alert.alert(
        'Deposit Initiated',
        'Your ACH transfer has started. Funds will be available in 3–5 business days.',
        [
          {
            text: 'OK',
            // onPress: () => onTopUp(selectedAmount)
          }
        ]
      );
      setTimeout(() => {
        fetchUserData();
      }, 10000);
    } catch (error: any) {
      const errorMessage = error?.message || 'Payment failed. Please try again.';
      setMessage('Error: ' + errorMessage);
      Alert.alert('Error', errorMessage);
      console.error('Bank payment error:', error);
    }
  };

  const handleBankAccountSetup = async () => {
    try {
      setMessage('Setting up bank account...');
      
      // Get SetupIntent from your backend
      const response: any = await paymentService.setupIntentForPaymnetViaBank(userData.stripe_account_id)
      
      const clientSecret = response?.clientSecret;
      if (!clientSecret) {
        throw new Error('Failed to create setup intent');
      }

      // Collect bank account
      const result: any = await collectBankAccountForSetup(clientSecret, {
        paymentMethodType: 'USBankAccount',
        paymentMethodData: {
          billingDetails: {
            name: userData.first_name + " " + userData.last_name,
            email: userData.email,
          }
        }
      });

      console.log("collectBankAccountForSetup", result);
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      // Confirm SetupIntent (mandate authorization)
      // Since we used collectBankAccountForSetup, the payment method is already attached
      const confirmResult = await confirmSetupIntent(clientSecret, {
        paymentMethodType: "USBankAccount",
        paymentMethodData: {
          accountNumber: "000123456789",
          routingNumber: "110000000",
          billingDetails: {
            name: userData.first_name + " " + userData.last_name
          }
        }
      });
      console.log("confirmsetupIntentResponse", confirmResult);
      // Extract payment method ID from the result object
      const paymentMethodId = result?.setupIntent?.paymentMethodId || result?.paymentMethodId;

      if (!paymentMethodId) {
        throw new Error('Unable to retrieve payment method ID from setupIntent');
      }

      setPaymentMethodId(paymentMethodId);

      const setupIntentId = result?.setupIntent?.id;
      setSetupIntentId(setupIntentId || '');

      setMessage('Bank account setup complete! SetupIntent ID: ' + setupIntentId);
      Alert.alert(
        'Bank Account Linked',
        'Your bank account has been successfully linked for future payments.',
        [
          {
            text: 'OK',
            onPress: () => setSetupMode(false)
          }
        ]
      );
    } catch (err: any) {
      const errorMessage = err?.message || 'Bank account setup failed';
      setMessage('Error: ' + errorMessage);
      Alert.alert('Setup Error', errorMessage);
      console.error('Bank setup error:', err);
    }
  };

  const handleMicrodepositsVerification = async () => {
    try {
      setMessage('Verifying microdeposits...');
      
      const result = await paymentService.verifySetupMicrodeposits(setupIntentId, microdepositAmounts);
      
      if (result.verified) {
        setMessage('Bank account verified successfully!');
        Alert.alert(
          'Verification Complete',
          'Your bank account has been verified and is ready for use.',
          [
            {
              text: 'OK',
              onPress: () => {
                setVerificationMode(false);
                setSetupMode(false);
                setMessage('');
              }
            }
          ]
        );
      } else {
        throw new Error(result.error || 'Verification failed');
      }
    } catch (err: any) {
      const errorMessage = err?.message || 'Verification failed';
      setMessage('Error: ' + errorMessage);
      Alert.alert('Verification Error', errorMessage);
      console.error('Microdeposits verification error:', err);
    }
  };



  return (
    <ScrollView style={styles.bankFormContainer}>
      <View style={styles.paymentDetailsSection}>
        <Text style={styles.subSectionTitle}>Bank Deposit (ACH)</Text>
        <Text style={styles.paymentNote}>
          ${selectedAmount}.00 will be transferred from your bank account.
        </Text>

        {message ? (
          <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
            <Text style={{ fontSize: 14, color: '#333' }}>{message}</Text>
          </View>
        ) : null}

        {verificationMode ? (
          <>
            <Text style={[styles.paymentNote, { marginBottom: 15 }]}>
              Please enter the two microdeposit amounts you received in your bank account:
            </Text>
            
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>First Amount (cents):</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 }}
                value={microdepositAmounts[0].toString()}
                onChangeText={(text) => setMicrodepositAmounts([parseInt(text) || 0, microdepositAmounts[1]])}
                keyboardType="numeric"
                placeholder="e.g., 32"
              />
              
              <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 5 }}>Second Amount (cents):</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10 }}
                value={microdepositAmounts[1].toString()}
                onChangeText={(text) => setMicrodepositAmounts([microdepositAmounts[0], parseInt(text) || 0])}
                keyboardType="numeric"
                placeholder="e.g., 45"
              />
            </View>

            <TouchableOpacity 
              style={[
                styles.topUpButton, 
                { backgroundColor: '#28a745' },
                isProcessing && styles.disabledButton
              ]} 
              onPress={handleMicrodepositsVerification}
              disabled={isProcessing}
            >
              <Text style={styles.topUpButtonText}>
                {isProcessing ? 'VERIFYING...' : 'VERIFY MICRODEPOSITS'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.topUpButton, 
                { backgroundColor: '#6c757d', marginTop: 10 },
                isProcessing && styles.disabledButton
              ]} 
              onPress={() => {
                setVerificationMode(false);
                setMessage('');
              }}
              disabled={isProcessing}
            >
              <Text style={styles.topUpButtonText}>
                CANCEL VERIFICATION
              </Text>
            </TouchableOpacity>
          </>
        ) : !setupMode ? (
          <>
            <TouchableOpacity 
              style={[
                styles.topUpButton, 
                isProcessing && styles.disabledButton
              ]} 
              onPress={handleTopUpWithBank}
              disabled={isProcessing}
            >
              <Text style={styles.topUpButtonText}>
                {isProcessing ? 'PROCESSING...' : `DEPOSIT $${selectedAmount}`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.topUpButton, 
                { backgroundColor: '#6c757d', marginTop: 10 },
                isProcessing && styles.disabledButton
              ]} 
              onPress={() => setSetupMode(true)}
              disabled={isProcessing}
            >
              <Text style={styles.topUpButtonText}>
                LINK BANK ACCOUNT 
              </Text>
              <Text style={styles.topUpButtonText}>
                FOR FUTURE PAYMENTS
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              style={[
                styles.topUpButton, 
                { backgroundColor: '#28a745' },
                isProcessing && styles.disabledButton
              ]} 
              onPress={handleBankAccountSetup}
              disabled={isProcessing}
            >
              <Text style={styles.topUpButtonText}>
                {isProcessing ? 'SETTING UP...' : 'SETUP BANK ACCOUNT'}
              </Text>
            </TouchableOpacity>

            {/* {setupIntentId ? (
              <TouchableOpacity 
                style={[
                  styles.topUpButton, 
                  { backgroundColor: '#ffc107', marginTop: 10 },
                  isProcessing && styles.disabledButton
                ]} 
                onPress={() => {
                  setVerificationMode(true);
                  setMessage('Please check your bank account for two small deposits and enter the amounts below.');
                }}
                disabled={isProcessing}
              >
                <Text style={styles.topUpButtonText}>
                  VERIFY WITH MICRODEPOSITS
                </Text>
              </TouchableOpacity>
            ) : null} */}

            <TouchableOpacity 
              style={[
                styles.topUpButton, 
                { backgroundColor: '#6c757d', marginTop: 10 },
                isProcessing && styles.disabledButton
              ]} 
              onPress={() => {
                setSetupMode(false);
                setMessage('');
              }}
              disabled={isProcessing}
            >
              <Text style={styles.topUpButtonText}>
                CANCEL SETUP
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default TopupWithBank;
