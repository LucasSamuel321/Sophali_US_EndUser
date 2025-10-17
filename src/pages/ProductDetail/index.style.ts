import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
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
    zIndex: 10,
  },
  
  imageContainer: {
    height: 230,
    backgroundColor: '#f5f5f5',
  },
  
  productImage: {
    width: '100%',
    height: '100%',
  },
  
  productInfo: {
    padding: 20,
    marginBottom: 100
  },
  
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  
  dietaryIcons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  
  dietaryIcon: {
    marginRight: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  
  dietaryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(242, 242, 242, 1)',
    borderRadius: 10,
  },
  
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  
  infoDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
  },
  
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  infoSubLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  
  offersSection: {
    marginBottom: 24,
  },
  
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  offerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 28,
  },
  
  offerText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  
  variantsSection: {
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: '#e0e0e0',
    // borderRadius: 20,
  },
  customizationSection: {
    marginBottom: 10,
  },
  
  comboCustomizationLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    paddingBottom: 10,
  },
  customizationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 12,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  
  optionButtonSelected: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  
  optionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  
  optionTextSelected: {
    color: '#fff',
  },
  
  addOnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
  },
  
  addOnInfo: {
    flex: 1,
  },
  
  addOnName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  
  addOnPrice: {
    fontSize: 12,
    color: '#333',
    marginRight: 10,
    fontWeight: 'bold',
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  checkboxSelected: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  
  timingContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  
  timingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  
  timingButtonSelected: {
    // Selected state styling
  },
  
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  
  radioButtonSelected: {
    borderColor: '#333',
  },
  
  radioButtonDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },

  addOnPriceAndCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  timingText: {
    fontSize: 14,
    color: '#333',
  },
  
  bottomBar: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.3)',
    flexDirection: 'column',
    alignItems: 'center',
  },

  quantityAndAddToCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 16,
  },
  
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  
  addToCartButtonContainer: {
    flex: 1,
    backgroundColor: 'rgba(24, 28, 46, 1)',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
  addToCartButton: {
    paddingVertical: 10
  },
  
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  totalPrice: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
