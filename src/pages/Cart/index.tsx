import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { styles } from './index.style';
import { CartItem } from '@/src/types';
import useCartItems from '@/src/hooks/useCartItems';

const Cart: React.FC = () => {
  const navigation = useNavigation();
  const { cartItems, updateCartItemQuantity } = useCartItems();


  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      Alert.alert(
        'Remove Item',
        'Do you want to remove this item from your cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => removeItem(itemId),
          },
        ]
      );
      return;
    }

    updateCartItemQuantity(itemId, newQuantity);
  };

  const removeItem = (itemId: string) => {
    // setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total: number, item: any) => {
      const itemTotal = (item.eatingType === 2 || item.eatingType === 3) ? 0 : item.totalPrice * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  const handleRedeemItems = () => {
    Alert.alert(
      'Redeem Items',
      'This feature allows you to redeem items from your purchased items. Coming soon!',
      [{ text: 'OK' }]
    );
  };

  const handleAddMoreItems = () => {
    navigation.goBack();
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout' as never);
  };

  const handleDiscountPress = () => {
    Alert.alert(
      'Discount Applied',
      '5% discount will be applied to your pickup order!',
      [{ text: 'OK' }]
    );
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.itemId} style={styles.cartItem}>
      <Image source={{uri: item.itemData.imageUrl}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.itemData.name}</Text>
        <Text style={styles.itemAccompaniments}>{item.itemData?.accompaniments}</Text>
        
        {item.eatingType === 2 || item.eatingType === 3 && (
          <View style={styles.redeemedContainer}>
            <Ionicons name="wallet" size={16} color={Colors.walletGreen} />
            <Text style={styles.redeemedText}>Redeemed from Wallet</Text>
          </View>
        )}
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id || '', item.quantity - 1)}
          >
            {item.quantity === 1 ? (
              <Ionicons name="trash" size={16} color={Colors.error} />
            ) : (
              <Ionicons name="remove" size={16} color={Colors.textPrimary} />
            )}
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id || '', item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.itemPriceContainer}>
        <Text style={[styles.itemPrice, (item.eatingType === 2 || item.eatingType === 3) && styles.redeemedPrice]}>
          {item.eatingType === 2 || item.eatingType === 3 ? '$0.00' : `$${(item.totalPrice * item.quantity).toFixed(2)}`}
        </Text>
      </View>
    </View>
  );

  const renderSection = (title: string, items: CartItem[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map(renderCartItem)}
    </View>
  );

  const eatNowItems = cartItems.filter((item: any) => item.eatingType !== 1);
  const eatLaterItems = cartItems.filter((item: any) => item.eatingType === 1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {eatNowItems.length > 0 && renderSection('Eat Now', eatNowItems)}
        
        <TouchableOpacity style={styles.redeemButton} onPress={handleRedeemItems}>
          <Ionicons name="wallet" size={20} color={Colors.textPrimary} />
          <Text style={styles.redeemText}>Redeem from your purchased items</Text>
        </TouchableOpacity>

        {eatLaterItems.length > 0 && renderSection('Eat Later', eatLaterItems)}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discounts & Promo Codes</Text>
          <TouchableOpacity style={styles.discountItem} onPress={handleDiscountPress}>
            <View style={styles.discountInfo}>
              <Ionicons name="pricetag" size={20} color={Colors.discountTeal} />
              <Text style={styles.discountText}>5% off pick up order</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addMoreButton} onPress={handleAddMoreItems}>
          <Ionicons name="add-circle" size={20} color={Colors.textPrimary} />
          <Text style={styles.addMoreText}>Add more items</Text>
        </TouchableOpacity>
      </ScrollView>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <View>
                <Text style={styles.checkoutText}>Checkout</Text> 
            </View>
            <View>
                <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Cart;
