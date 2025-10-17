import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  itemAccompaniments: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  redeemedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  redeemedText: {
    fontSize: 12,
    color: Colors.walletGreen,
    marginLeft: 4,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.quantityBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.quantityBorder,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  itemPriceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  redeemedPrice: {
    color: Colors.walletGreen,
  },
  redeemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  redeemText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  discountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
  },
  discountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  addMoreText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  checkoutBar: {
    
  },
  checkoutButton: {
    margin: 15,
    backgroundColor: Colors.cartBackground,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.cartText,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.cartText,
  },
});
