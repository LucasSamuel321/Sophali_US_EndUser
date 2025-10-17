import useFoods from '@/src/hooks/useFoods';
import useFoodTrucks from '@/src/hooks/useFoodTrucks';
import { FoodTruck } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';
import { styles } from './index.style';
import useCartItems from '@/src/hooks/useCartItems';


const filterCategories = [
  { id: '1', name: 'Under $20' },
  { id: '2', name: 'Burger' },
  { id: '3', name: 'Pizza' },
  { id: '4', name: 'Italian' },
];

const HomeScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('1');
  const { foods } = useFoods();
  const { foodTrucks } = useFoodTrucks();
  const { cartItems } = useCartItems();
  const navigation = useNavigation();

  const handleFoodTruckDetail = (restaurant: FoodTruck) => {
    (navigation as any).navigate('FoodTruckDetail', { restaurant });
  };

  const handleFoodDetail = (food: any) => {
    (navigation as any).navigate('ProductDetail', { food });
  };

  const isShowViewAllRecommended = () => {
    if(foods) {
      if((foods.mainItems.length + foods.sides.length + foods.drinks.length + foods.combos.length) > 2) {
        return true
      } else return false
    } else return false
  };

  const renderPromotionalBanner = () => (
    <View style={styles.bannerContainer}>
      <Image
        source={require('../../../assets/images/promo-banner.png')} // Add actual image
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle}>Big Deal</Text>
        <Text style={styles.bannerSubtitle}>Get the coupon now</Text>
      </View>
    </View>
  );

  const renderFilterCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {filterCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.filterButton,
            selectedFilter === category.id && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedFilter(category.id)}
        >
   
          <Text
            style={[
              styles.filterText,
              selectedFilter === category.id && styles.filterTextActive,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderFoodTruckCard = (foodTruck: FoodTruck) => (
    <TouchableOpacity key={foodTruck.id} onPress={() => handleFoodTruckDetail(foodTruck)}>
      <Card key={foodTruck.id} style={styles.restaurantCard}>
      <View style={styles.restaurantImageContainer}>
        <Image source={{ uri: foodTruck.coverImageUrl }} style={styles.restaurantImage} />
        {foodTruck.freeDelivery && (
          <View style={styles.freeDeliveryBadge}>
            <Ionicons name="car" size={12} color={Colors.textLight} />
            <Text style={styles.freeDeliveryText}>Free Delivery</Text>
          </View>
        )}
      </View>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{foodTruck.name}</Text>
        <View style={styles.restaurantRating}>
          <Ionicons name="star" size={14} color={Colors.ratingStar} />
          <Text style={styles.ratingText}>
            {foodTruck.star} (300+ reviews)
            {/* ({foodTruck.reviews}) */}
          </Text>
        </View>
        <View style={styles.restaurantDetailsContainer}>
          <Text style={styles.restaurantDetails}>
            ${foodTruck.minPrice} - ${foodTruck.maxPrice} 
          </Text>
          <Text style={styles.restaurantDistanceDuration}>
            2.7km - 20min
            {/* ${foodTruck.distance}km - ${foodTruck.duration}min  */}
          </Text>
        </View>
      </View>
    </Card>
    </TouchableOpacity>
  );

  const renderFoodCard = (food: any) => (
    <TouchableOpacity key={food.id} onPress={() => handleFoodDetail(food)}>
      <Card style={styles.dishCard}>
        <Image source={{ uri: food.imageUrl }} style={styles.dishImage} />
        <View style={styles.dishInfo}>
          <Text style={styles.dishName}>{food.name}</Text>
          <Text style={styles.dishDescription} numberOfLines={2}>
            {food.description}
          </Text>
          <Text style={styles.dishPrice}>${food.basePrice}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderSectionHeader = (title: string, showViewAll: boolean = true) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {showViewAll && (
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All →</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const getCartTotal = () => {
    return cartItems.reduce((total: number, item: any) => {
      return total + item.totalPrice * item.quantity;
    }, 0);
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header with notification bell */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>OPHALI</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={Colors.textPrimary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        {renderPromotionalBanner()}

        {/* Filter Categories */}
        {renderFilterCategories()}

        {/* Near You Section */}
        <View style={styles.section}>
          {renderSectionHeader('Near You', foodTrucks.length > 2 ? true : false)}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {foodTrucks.map(renderFoodTruckCard)}
          </ScrollView>
        </View>

        {/* Recommended Section */}
        <View style={styles.section}>
          {renderSectionHeader('Recommended', isShowViewAllRecommended())}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {foods.mainItems.map(renderFoodCard)}
            {foods.sides.map(renderFoodCard)}
            {foods.drinks.map(renderFoodCard)}
            {foods.combos.map(renderFoodCard)}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Floating Cart Summary */}
      <TouchableOpacity style={styles.floatingCart} onPress={() => { (navigation as any).navigate('Cart');}}>
        <Ionicons name="bag" size={20} color={Colors.textLight} />
        <Text style={styles.cartText}>{cartItems.length} Items • ${getCartTotal()}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



export default HomeScreen;
