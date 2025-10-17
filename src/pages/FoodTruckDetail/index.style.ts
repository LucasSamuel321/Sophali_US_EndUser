import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header Section
  header: {
    position: 'relative',
    height: 200,
  },
  
  headerImage: {
    width: '100%',
    height: '100%',
  },
  
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Warning Banner
  warningBanner: {
    backgroundColor: '#FF4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  
  warningText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Content
  content: {
    flex: 1,
  },
  
  // Restaurant Information
  restaurantInfo: {
    padding: 20,
    backgroundColor: '#fff',
  },
  
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  
  restaurantTitleContainer: {
    flex: 1,
  },
  
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  cuisineType: {
    fontSize: 14,
    color: '#666',
  },
  
  arrowButton: {
    padding: 4,
  },
  
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  
  deliveryInfo: {
    flex: 1,
    marginLeft: 20,
  },
  
  deliveryText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  
  deliveryDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  deliveryTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  
  deliveryCost: {
    fontSize: 12,
    color: '#666',
  },
  
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  
  offersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  offersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  offersText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  
  // Menu Categories
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  
  activeCategoryTab: {
    backgroundColor: '#333',
  },
  
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  
  activeCategoryText: {
    color: '#fff',
  },
  
  // Menu Items
  menuContainer: {
    padding: 20,
  },
  
  menuItem: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  
  menuItemContent: {
    flex: 1,
  },
  
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  
  menuItemDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 8,
  },
  
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  
  icon: {
    marginRight: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  
  iconText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  
  halalText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  
  priceTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
