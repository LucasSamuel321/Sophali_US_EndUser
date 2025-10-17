import { FoodTruck } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './index.style';

const { width } = Dimensions.get('window');

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: any;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
  isKosher?: boolean;
  isHalal?: boolean;
}


interface FoodTruckDetailProps {
  navigation: any;
  route: {
    params?: {
      restaurant?: FoodTruck;
    };
  };
}

const FoodTruckDetail: React.FC<FoodTruckDetailProps> = ({ navigation, route }) => {
  // Handle optional route params
  const restaurant: FoodTruck | undefined = route?.params?.restaurant;
  const [selectedCategory, setSelectedCategory] = useState('Specials');


  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Chicken Biryani',
      description: 'Aromatic rice and chicken, layered with spices, onions, and tomatoes.',
      price: 12.75,
      image: require('../../../assets/images/react-logo.png'),
      isSpicy: true,
      isGlutenFree: true,
      isKosher: true,
      isHalal: true,
    },
    {
      id: 2,
      name: 'Butter Chicken',
      description: 'Tandoori chicken breast in a rich, creamy tomato-based sauce.',
      price: 15.00,
      originalPrice: 16.50,
      image: require('../../../assets/images/react-logo.png'),
      isKosher: true,
      isHalal: true,
    },
  ];

  const categories = ['Specials', 'Frequently Ordered', 'Rice', 'Chicken'];

  const renderIcons = (item: MenuItem) => (
    <View style={styles.iconContainer}>
      {item.isSpicy && (
        <View style={styles.icon}>
          <Ionicons name="flame" size={12} color="#FF4444" />
        </View>
      )}
      {item.isGlutenFree && (
        <View style={styles.icon}>
          <Text style={styles.iconText}>GF</Text>
        </View>
      )}
      {item.isKosher && (
        <View style={styles.icon}>
          <Text style={styles.iconText}>K</Text>
        </View>
      )}
      {item.isHalal && (
        <View style={styles.icon}>
          <Text style={styles.halalText}>Halal</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Food Image */}
      <View style={styles.header}>
        <Image
          source={{ uri: restaurant?.coverImageUrl }}
          style={styles.headerImage}
          resizeMode="cover"
          onError={(error) => console.log('Header image error:', error)}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Warning Banner */}
      <View style={styles.warningBanner}>
        <Text style={styles.warningText}>Closing soon. Your order may not be accepted</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Restaurant Information */}
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantHeader}>
            <View style={styles.restaurantTitleContainer}>
              <Text style={styles.restaurantName}>{restaurant?.name}</Text>
              {/* <Text style={styles.cuisineType}>{restaurant?.cuisineType}</Text> */}
            </View>
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="location" size={16} color="#666" />
              {/* <Text style={styles.detailText}>{restaurant?.distance}</Text> */}
              <Text style={styles.detailText}>2.7km</Text>
            </View>
            <View style={styles.deliveryInfo}>
              <Text style={styles.deliveryText}>
                {restaurant?.freeDelivery 
                  ? 'Free delivery available' 
                  : `Free delivery with ${restaurant?.minPrice} or more`
                }
              </Text>
              <View style={styles.deliveryDetails}>
                <Ionicons name="bicycle" size={16} color="#FF8C00" />
                <Text style={styles.deliveryTime}>{restaurant?.operationalHours?.find(hour => hour.day === 'Monday')?.openTime}</Text>
                {!restaurant?.freeDelivery && (
                  // <Text style={styles.deliveryCost}>{restaurant?.deliveryCost}</Text>
                  <Text style={styles.deliveryCost}>2$</Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{restaurant?.star}</Text>
            </View>
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.offersRow}>
            <View style={styles.offersContainer}>
              <Ionicons name="pricetag" size={16} color="#4CAF50" />
              <Text style={styles.offersText}>Price Range: ${restaurant?.minPrice} - ${restaurant?.maxPrice}</Text>
            </View>
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  selectedCategory === category && styles.activeCategoryTab,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Image 
                source={item.image} 
                style={styles.menuItemImage}
                onError={(error) => console.log('Menu item image error:', error)}
              />
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                {renderIcons(item)}
                <View style={styles.priceContainer}>
                  {item.originalPrice && (
                    <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                  )}
                  <View style={styles.priceTag}>
                    <Text style={styles.price}>${item.price}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodTruckDetail;
