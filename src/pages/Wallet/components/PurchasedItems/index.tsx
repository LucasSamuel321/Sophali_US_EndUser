import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../index.style';

interface PurchasedItem {
  id: string;
  title: string;
  subtitle: string;
  balance: number;
  color: string;
  showGiftButton?: boolean;
}

interface PurchasedItemsProps {
  purchasedItems: PurchasedItem[];
}

const PurchasedItems: React.FC<PurchasedItemsProps> = ({ purchasedItems }) => {
  const renderPurchasedItem = (item: PurchasedItem) => (
    <View
      key={item.id}
      style={[
        styles.walletCard,
        { backgroundColor: item.color },
      ]}
    >
      <View style={styles.walletHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={styles.walletFooter}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceAmount}>${item.balance.toFixed(2)}</Text>
        </View>
        {item.showGiftButton && (
          <TouchableOpacity style={styles.giftButton}>
            <Ionicons name="gift" size={16} color={item.color} />
            <Text style={styles.giftButtonText}>Gift</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.cardsSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {purchasedItems.map((item) => renderPurchasedItem(item))}
      </ScrollView>
    </View>
  );
};

export default PurchasedItems;
