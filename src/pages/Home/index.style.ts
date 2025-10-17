import Colors from "@/src/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    
    headerLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
        width: 22,
        height: 22,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.textPrimary,
    },

    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    notificationButton: {
      position: 'relative',
    },
    
    notificationDot: {
      position: 'absolute',
      top: 2,
      right: 2,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: Colors.error,
    },
    
    bannerContainer: {
      marginHorizontal: 20,
      marginBottom: 10,
      borderRadius: 12,
      overflow: 'hidden',
      height: 80,
    },
    
    bannerImage: {
      width: '100%',
      height: '100%',
    },
    
    bannerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    
    bannerTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: Colors.textLight,
      marginBottom: 4,
    },
    
    bannerSubtitle: {
      fontSize: 16,
      color: Colors.textLight,
      opacity: 0.9,
    },
    
    filterContainer: {
      marginBottom: 10,
    },
    
    filterContent: {
      paddingHorizontal: 20,
    },
    
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: 'rgba(241, 241, 241, 1)',
      borderWidth: 1,
      borderColor: Colors.border,
      marginRight: 12,
    },
    
    filterButtonActive: {
      backgroundColor: Colors.quantityBackground,
      borderColor: Colors.primary,
    },
    
    filterIcon: {
      marginRight: 6,
    },
    
    filterText: {
      fontSize: 14,
      color: Colors.textSecondary,
      fontWeight: '500',
    },
    
    filterTextActive: {
      color: Colors.textPrimary,
    },
    
    section: {
      marginBottom: 10,
    },
    
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    
    viewAllText: {
      fontSize: 14,
      color: 'rgba(32, 165, 242, 1)',
      fontWeight: '500',
    },
    
    horizontalScroll: {
      paddingHorizontal: 10,
    },
    
    restaurantCard: {
        width: 182,
        marginRight: 10,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    
    restaurantImageContainer: {
      position: 'relative',
      height: 90,
      width: 170,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 5,
    },
    
    restaurantImage: {
      width: '100%',
      height: '100%',
    },
    
    freeDeliveryBadge: {
      position: 'absolute',
      top: 0,
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 141, 125, 1)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
    },
    
    freeDeliveryText: {
      fontSize: 10,
      color: Colors.textLight,
      fontWeight: '600',
      marginLeft: 4,
    },
    
    restaurantInfo: {
      paddingHorizontal: 4,
    },
    
    restaurantName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      marginBottom: 4,
    },
    
    restaurantRating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    
    ratingText: {
      fontSize: 15,
      color: Colors.textSecondary,
      marginLeft: 4,
    },
    
    restaurantDetailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    restaurantDetails: {
      fontSize: 16,
      color: Colors.textPrimary,
      fontWeight: 'bold'
    },

    restaurantDistanceDuration: {
      fontSize: 14,
      fontWeight: '400',
      color: Colors.textPrimary,
    },
    
    dishCard: {
        width: 182,
        marginRight: 10,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    
    dishImage: {
        height: 90,
        width: 170,
      borderRadius: 8,
      marginBottom: 5,
    },
    
    dishInfo: {
      paddingHorizontal: 4,
    },
    
    dishName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      marginBottom: 4,
    },
    
    dishDescription: {
      fontSize: 12,
      color: Colors.textSecondary,
      marginBottom: 8,
      lineHeight: 16,
    },
    
    dishPrice: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.textPrimary,
    },
    
    floatingCart: {
      position: 'absolute',
      bottom:25,
      right: 10,
      backgroundColor: Colors.cartBackground,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 24,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    
    cartText: {
      fontSize: 14,
      color: Colors.cartText,
      fontWeight: '600',
      marginLeft: 8,
    },
  });