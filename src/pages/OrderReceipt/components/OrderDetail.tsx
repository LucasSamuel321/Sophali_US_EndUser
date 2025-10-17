import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  customizations: string[];
  price: number;
}

interface OrderDetailProps {
  navigation: any;
  route: {
    params?: {
      order?: {
        id: string;
        orderId: string;
        restaurantName: string;
        orderType: string;
        status: string;
        totalAmount: number;
        date: string;
        time: string;
        itemCount: number;
        address?: string;
        pickUpTime?: string;
        notes?: string;
        includeNapkins?: boolean;
        paymentMethod?: string;
        subtotal?: number;
        discounts?: number;
        promoCode?: string;
        tips?: number;
        items?: OrderItem[];
      };
    };
  };
}

const OrderDetailScreen: React.FC<OrderDetailProps> = ({ navigation, route }) => {
  const order = route?.params?.order;

  // Default order data if none provided
  const orderData = order || {
    id: '1',
    orderId: 'P1A2B3C4D5',
    restaurantName: 'Curry on Wheels',
    orderType: 'Pick up',
    status: 'Completed',
    totalAmount: 25.16,
    date: '6 JUN 2025',
    time: '12:06 PM',
    itemCount: 3,
    address: '9245 Hilltop Road, Oshawa, Ontario P1P-1P1',
    pickUpTime: '6 JUN 2025 - 12:06 PM',
    notes: 'Coriander tastes like soap to me, please skip it. Make it medium spicy and put it in a large container.',
    includeNapkins: true,
    paymentMethod: 'Sophali Wallet - $25.16',
    subtotal: 34.16,
    discounts: 8.00,
    promoCode: 'G1A2B3C4D5E',
    tips: 3.00,
    items: [
      {
        id: '1',
        name: 'Butter Chicken',
        quantity: 2,
        customizations: ['Garlic Naan'],
        price: 16.50,
      },
      {
        id: '2',
        name: 'Chicken Biryani',
        quantity: 1,
        customizations: ['Coriander', 'Raita'],
        price: 0.00,
      },
    ],
  };

  const handleReOrder = () => {
    console.log('Re-order:', orderData.orderId);
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderInfoRow = (icon: string, label: string, value: string, isAddress: boolean = false) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon as any} size={20} color="#666" style={styles.infoIcon} />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        {isAddress ? (
          <View>
            <Text style={styles.infoValue}>{orderData.restaurantName}</Text>
            <Text style={styles.infoAddress}>{value}</Text>
          </View>
        ) : (
          <Text style={styles.infoValue}>{value}</Text>
        )}
      </View>
    </View>
  );

  const renderOrderItem = (item: OrderItem) => (
    <View key={item.id} style={styles.orderItem}>
      <View style={styles.itemQuantity}>
        <Text style={styles.quantityText}>{item.quantity}</Text>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.customizations.length > 0 && (
          <Text style={styles.itemCustomizations}>
            {item.customizations.join(', ')}
          </Text>
        )}
      </View>
      <Text style={styles.itemPrice}>
        ${item.price.toFixed(2)}
      </Text>
    </View>
  );

  const renderSummaryRow = (label: string, value: string | number, isTotal: boolean = false) => (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, isTotal && styles.summaryLabelTotal]}>
        {label}
      </Text>
      <Text style={[styles.summaryValue, isTotal && styles.summaryValueTotal]}>
        {typeof value === 'number' ? `$${value.toFixed(2)}` : value}
      </Text>
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
        <Text style={styles.headerTitle}>
          Order Details - {orderData.orderId}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pick-up Information */}
        {renderSection('Pick-up Information', (
          <>
            {renderInfoRow('bag', 'Pick up at:', orderData.address || '', true)}
            {renderInfoRow('calendar', 'Pick up time', orderData.pickUpTime || '')}
          </>
        ))}

        {/* Notes for Kitchen */}
        {orderData.notes && renderSection('Notes for the Kitchen', (
          <View style={styles.notesContainer}>
            <Ionicons name="document-text" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.notesText}>{orderData.notes}</Text>
          </View>
        ))}

        {/* Include Napkins & Utensils */}
        {renderSection('Include Napkins & Utensils', (
          <View style={styles.napkinsRow}>
            <Ionicons name="restaurant" size={20} color="#666" style={styles.infoIcon} />
            <Text style={styles.napkinsText}>Include Napkins & Utensils</Text>
            {orderData.includeNapkins && (
              <Ionicons name="checkmark" size={20} color="#4CAF50" />
            )}
          </View>
        ))}

        {/* Payment Details */}
        {renderSection('Payment Details', (
          renderInfoRow('wallet', '', orderData.paymentMethod || '')
        ))}

        {/* Items */}
        {renderSection('Items', (
          <View style={styles.itemsContainer}>
            {orderData.items?.map(renderOrderItem)}
          </View>
        ))}

        {/* Order Summary */}
        {renderSection('Order Summary', (
          <View style={styles.summaryContainer}>
            {renderSummaryRow('Subtotal', orderData.subtotal || 0)}
            {orderData.discounts && orderData.discounts > 0 && (
              <>
                {renderSummaryRow('Discounts & Promo Codes', -(orderData.discounts))}
                <Text style={styles.promoCode}>{orderData.promoCode}</Text>
              </>
            )}
            {orderData.tips && orderData.tips > 0 && (
              renderSummaryRow('Tips', orderData.tips)
            )}
            {renderSummaryRow('Total', orderData.totalAmount, true)}
          </View>
        ))}
      </ScrollView>

      {/* Re-Order Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={styles.reOrderButton}
          onPress={handleReOrder}
        >
          <Text style={styles.reOrderButtonText}>Re-Order</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notesText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  napkinsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  napkinsText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 12,
  },
  itemsContainer: {
    gap: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemQuantity: {
    width: 32,
    height: 32,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemCustomizations: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryContainer: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryLabelTotal: {
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  summaryValueTotal: {
    fontWeight: 'bold',
  },
  promoCode: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginTop: -8,
  },
  bottomButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  reOrderButton: {
    backgroundColor: 'rgba(24, 28, 46, 1)',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reOrderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default OrderDetailScreen;
