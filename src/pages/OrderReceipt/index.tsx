import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './index.style';

interface OrderReceipt {
  id: string;
  orderId: string;
  restaurantName: string;
  restaurantLogo: any;
  orderType: 'Pick up' | 'Delivery' | 'Eat Later';
  status: 'Completed' | 'Cancelled' | 'In Progress';
  totalAmount: number;
  date: string;
  time: string;
  itemCount: number;
  canRate: boolean;
}

const OrderReceiptScreen: React.FC = () => {
  const navigation = useNavigation();

  const orderReceipts: OrderReceipt[] = [
    {
      id: '1',
      orderId: '12345678',
      restaurantName: 'Curry on Wheels',
      restaurantLogo: "https://res.cloudinary.com/do99dohrh/image/upload/v1760739320/truckLogo_jyhpqn.png",
      orderType: 'Pick up',
      status: 'Completed',
      totalAmount: 25.16,
      date: '6 JUN',
      time: '12:00 PM',
      itemCount: 3,
      canRate: true,
    },
    {
      id: '2',
      orderId: '12345679',
      restaurantName: 'Curry on Wheels',
      restaurantLogo: "https://res.cloudinary.com/do99dohrh/image/upload/v1760739320/truckLogo_jyhpqn.png",
      orderType: 'Delivery',
      status: 'Completed',
      totalAmount: 18.25,
      date: '5 JUN',
      time: '1:00 PM',
      itemCount: 2,
      canRate: true,
    },
    {
      id: '3',
      orderId: '12345680',
      restaurantName: 'Curry on Wheels',
      restaurantLogo: "https://res.cloudinary.com/do99dohrh/image/upload/v1760739320/truckLogo_jyhpqn.png",
      orderType: 'Delivery',
      status: 'Cancelled',
      totalAmount: 45.80,
      date: '4 JUN',
      time: '12:00 PM',
      itemCount: 4,
      canRate: false,
    },
    {
      id: '4',
      orderId: '12345681',
      restaurantName: 'Curry on Wheels',
      restaurantLogo: "https://res.cloudinary.com/do99dohrh/image/upload/v1760739320/truckLogo_jyhpqn.png",
      orderType: 'Eat Later',
      status: 'Completed',
      totalAmount: 145.00,
      date: '2 JUN',
      time: '12:00 PM',
      itemCount: 10,
      canRate: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return ' rgba(0, 141, 125, 1)';
      case 'Cancelled':
        return '#FF4444';
      case 'In Progress':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  const handleOrderDetail = (order: OrderReceipt) => {
    (navigation as any).navigate('OrderDetail', { order });
  };

  const handleRate = (order: OrderReceipt) => {
    console.log('Rate order:', order.orderId);
  };

  const handleReOrder = (order: OrderReceipt) => {
    console.log('Re-order:', order.orderId);
  };

  const renderOrderReceipt = (order: OrderReceipt) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.restaurantInfo}>
          <Image source={{uri: order.restaurantLogo}} style={styles.restaurantLogo} />
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>{order.restaurantName}</Text>
            <Text style={styles.orderId}>#{order.orderId}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderStatusRow}>
        <View style={styles.orderTypeBadge}>
          <Text style={styles.orderTypeText}>{order.orderType}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
        <Text style={styles.orderDateTime}>
          {order.date}, {order.time}
        </Text>
        <Text style={styles.orderDot}>•</Text>
        <Text style={styles.itemCount}>{order.itemCount} Items</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.rateButton,
            !order.canRate && styles.rateButtonDisabled
          ]}
          onPress={() => handleRate(order)}
          disabled={!order.canRate}
        >
          <Ionicons
            name="star"
            size={16}
            color={order.canRate ? '#666' : '#ccc'}
          />
          <Text style={[
            styles.rateButtonText,
            !order.canRate && styles.rateButtonTextDisabled
          ]}>
            Rate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reOrderButton}
          onPress={() => handleReOrder(order)}
        >
          <Ionicons name="bag" size={16} color="#fff" />
          <Text style={styles.reOrderButtonText}>Re-Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Receipts</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ordersList}>
          {orderReceipts.map((order, index) => (
            <TouchableOpacity
              key={order.id}
              onPress={() => handleOrderDetail(order)}
            >
              {renderOrderReceipt(order)}
              {index < orderReceipts.length - 1 && <View style={styles.orderDivider} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderReceiptScreen;
