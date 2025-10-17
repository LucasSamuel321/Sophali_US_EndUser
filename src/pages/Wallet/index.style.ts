import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  
  notificationButton: {
    padding: 4,
  },
  
  // Tab Navigation
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 2,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  activeTabButton: {
    backgroundColor: '#007AFF',
  },
  
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  
  activeTabButtonText: {
    color: '#fff',
  },
  
  // Content
  content: {
    flex: 1,
  },
  
  // Wallet Cards Section
  cardsSection: {
    paddingVertical: 20,
  },
  
  cardsContainer: {
    // 
  },
  walletCard: {
    width: width - 40,
    height: 200,
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  
  activeCard: {
    transform: [{ scale: 1.02 }],
  },
  
  // Card Header
  walletHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletHeader: {
    // flex: 1,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  walletHolderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  
  cardNumber: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 2,
  },
  
  // Card Footer
  walletFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 40,
  },
  
  balanceContainer: {
    flex: 1,
  },
  
  balanceLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  giftButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  giftButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  
  cardActions: {
    alignItems: 'flex-end',
  },
  
  topUpButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  topUpButtonText: {
    fontSize: 12,
    color: 'rgba(18, 34, 53, 1)',
    fontWeight: '600',
    marginLeft: 4,
  },
  
  setDefaultButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  setDefaultButtonText: {
    fontSize: 12,
    color: 'rgba(18, 34, 53, 1)',
    fontWeight: '600',
    marginLeft: 4,
  },
  
  defaultBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  
  defaultBadgeText: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  
  cardBrands: {
    flexDirection: 'row',
    gap: 8,
  },
  
  cardBrand: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  
  // Pagination Dots
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  
  activeDot: {
    backgroundColor: '#1E3A8A',
  },
  
  inactiveDot: {
    backgroundColor: '#D1D5DB',
  },
  
  // Transactions Section
  transactionsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  
  viewAllText: {
    fontSize: 14,
    color: '#1E3A8A',
    fontWeight: '500',
  },
  
  transactionsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  
  transactionLeft: {
    marginRight: 12,
  },
  
  merchantIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  
  transactionCenter: {
    flex: 1,
  },
  
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  
  transactionDateTime: {
    fontSize: 12,
    color: '#666',
  },
  
  transactionRight: {
    alignItems: 'flex-end',
  },
  
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  positiveAmount: {
    color: '#4CAF50',
  },
  
  negativeAmount: {
    color: '#FF4444',
  },
  
  transactionTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  transactionType: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  
  transactionDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
});
