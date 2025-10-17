import usePayments from '@/src/hooks/usePayments';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaymentMethods, PurchasedItems } from './components';
import { styles } from './index.style';
import { PurchasedItem, Transaction } from './types';
import { toast } from '@/src/hooks/use-toast';

type TabType = 'payment' | 'purchased';

const WalletScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('payment');
  const { paymentMethods, fetchExistingPaymentMethods } = usePayments();
  const navigation = useNavigation();


  const purchasedItems: PurchasedItem[] = [
    {
      id: '1',
      title: 'Purchased Items',
      subtitle: '11',
      balance: 136.40,
      color: 'rgba(1, 158, 108, 1)',
      showGiftButton: true,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      merchant: 'Curry On Wheels',
      merchantIcon: "https://res.cloudinary.com/do99dohrh/image/upload/v1760739320/truckLogo_jyhpqn.png",
      date: '04/12/2025',
      time: '12:30 PM',
      amount: 36.80,
      type: 'income',
      transactionType: 'Coupon',
    },
    {
      id: '2',
      merchant: 'Curry On Wheels',
      merchantIcon: "https://res.cloudinary.com/do99dohrh/image/upload/v1760739320/truckLogo_jyhpqn.png",
      date: '04/12/2025',
      time: '8:00 PM',
      amount: -16.20,
      type: 'expense',
      transactionType: 'Coupon',
    },
  ];

  const renderTabButton = (tab: TabType, label: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && styles.activeTabButton,
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tab && styles.activeTabButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderContent = () => {

    switch (activeTab) {
      case 'payment':
        return <PaymentMethods walletCards={paymentMethods} />;
      case 'purchased':
        return <PurchasedItems purchasedItems={purchasedItems} />;
      default:
        return <PaymentMethods walletCards={paymentMethods} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>E-Wallet</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('payment', 'Payment Methods')}
        {renderTabButton('purchased', 'Purchased Items')}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tab Content */}
        {renderContent()}

        {/* Recent Transactions - Always visible */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.transactionsList}>
            {transactions.map((transaction, index) => (
              <View key={transaction.id}>
                <View style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                    <Image source={{uri: transaction.merchantIcon}} style={styles.merchantIcon} />
                  </View>
                  <View style={styles.transactionCenter}>
                    <Text style={styles.merchantName}>{transaction.merchant}</Text>
                    <Text style={styles.transactionDateTime}>
                      {transaction.date} - {transaction.time}
                    </Text>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount,
                      ]}
                    >
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </Text>
                    <View style={styles.transactionTypeContainer}>
                      <Text style={styles.transactionType}>{transaction.transactionType}</Text>
                      <Ionicons
                        name={transaction.amount > 0 ? 'arrow-down' : 'arrow-up'}
                        size={12}
                        color={transaction.amount > 0 ? '#4CAF50' : '#FF4444'}
                      />
                    </View>
                  </View>
                </View>
                {index < transactions.length - 1 && <View style={styles.transactionDivider} />}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;
