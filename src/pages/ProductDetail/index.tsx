import useCartItems from '@/src/hooks/useCartItems';
import { AddOn, CartItem, FrontendVariation } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/Button';
import QuantitySelector from '../../components/ui/QuantitySelector';
import Colors from '../../constants/Colors';
import { styles } from './index.style';
import { toast } from '@/src/hooks/use-toast';

const { width } = Dimensions.get('window');

interface ProductDetailProps {
  navigation: any;
  route: {
    params?: {
      food?: any;
    };
  };
}

const ProductDetailScreen: React.FC<ProductDetailProps> = ({ navigation, route }) => {
  const food = route?.params?.food;
  const [quantity, setQuantity] = useState(1);
  const [orderTiming, setOrderTiming] = useState<'eatNow' | 'eatLater'>('eatNow');
  const { addSearchedItemToCart } = useCartItems();
  const [isAddLoadingToCart, setIsAddLoadingToCart] = useState(false);

  // State for regular items (mainItem, side, drink)
  const [addOns, setAddOns] = useState(food.addOns?.map((addOn: any) => { return { ...addOn, selected: false } }));
  const [variants, setVariants] = useState(food.variants?.map((variant: any) => { return { ...variant, selectedOption: null } }));

  // State for combo components
  const [mainItemVariants, setMainItemVariants] = useState(
    food.mainItem?.variants?.map((variant: any) => ({ ...variant, selectedOption: null })) || []
  );
  const [mainItemAddOns, setMainItemAddOns] = useState(
    food.mainItem?.addOns?.map((addOn: any) => ({ ...addOn, selected: false })) || []
  );
  
  const [sideVariants, setSideVariants] = useState(
    food.side?.variants?.map((variant: any) => ({ ...variant, selectedOption: null })) || []
  );
  const [sideAddOns, setSideAddOns] = useState(
    food.side?.addOns?.map((addOn: any) => ({ ...addOn, selected: false })) || []
  );
  
  const [drinkVariants, setDrinkVariants] = useState(
    food.drink?.variants?.map((variant: any) => ({ ...variant, selectedOption: null })) || []
  );
  // Handlers for regular items
  const handleVariantsChange = (customizationId: string, option: string) => {
    setVariants((prev: any) =>
      prev.map((variant: any) =>
        variant.id === customizationId
          ? { ...variant, selectedOption: option }
          : variant
      )
    );
  };

  const handleAddOnToggle = (addOnId: string) => {
    setAddOns((prev: any) =>
      prev.map((addOn: any) =>
        addOn.id === addOnId ? { ...addOn, selected: !addOn.selected } : addOn
      )
    );
  };

  // Handlers for combo components
  const handleMainItemVariantChange = (customizationId: string, option: string) => {
    setMainItemVariants((prev: any) =>
      prev.map((variant: any) =>
        variant.id === customizationId
          ? { ...variant, selectedOption: option }
          : variant
      )
    );
  };

  const handleMainItemAddOnToggle = (addOnId: string) => {
    setMainItemAddOns((prev: any) =>
      prev.map((addOn: any) =>
        addOn.id === addOnId ? { ...addOn, selected: !addOn.selected } : addOn
      )
    );
  };

  const handleSideVariantChange = (customizationId: string, option: string) => {
    setSideVariants((prev: any) =>
      prev.map((variant: any) =>
        variant.id === customizationId
          ? { ...variant, selectedOption: option }
          : variant
      )
    );
  };

  const handleSideAddOnToggle = (addOnId: string) => {
    setSideAddOns((prev: any) =>
      prev.map((addOn: any) =>
        addOn.id === addOnId ? { ...addOn, selected: !addOn.selected } : addOn
      )
    );
  };

  const handleDrinkVariantChange = (customizationId: string, option: string) => {
    setDrinkVariants((prev: any) =>
      prev.map((variant: any) =>
        variant.id === customizationId
          ? { ...variant, selectedOption: option }
          : variant
      )
    );
  };

  const getTotalPrice = () => {
    if(food.type === 'mainItem' || food.type === 'side') {
      const basePrice = food ? parseFloat(food.basePrice) : 12.75;
      const variantsPrice = variants
        .filter((variant: any) => variant.selectedOption)
        .reduce((total: any, variant: any) => total + 
        variant.elements.find((element: any) => element.name === variant.selectedOption)?.extra_price, 0);
      const addOnsPrice = addOns
        .filter((addOn: any) => addOn.selected)
        .reduce((total: any, addOn: any) => total + addOn.extraPrice, 0); 
      return (basePrice + variantsPrice + addOnsPrice) * quantity;
    } else if(food.type === 'drink') {
      const basePrice = food ? parseFloat(food.basePrice) : 12.75;
      const variantsPrice = variants
        .filter((variant: any) => variant.selectedOption)
        .reduce((total: any, variant: any) => total + 
        variant.elements.find((element: any) => element.name === variant.selectedOption)?.extra_price, 0);
      return (basePrice + variantsPrice) * quantity;
    } else if(food.type === 'combo') {
      // Calculate combo total with component customizations
      const comboBasePrice = food ? parseFloat(food.basePrice) : 0;
      
      // Main item customizations
      const mainItemVariantsPrice = mainItemVariants
        .filter((variant: any) => variant.selectedOption)
        .reduce((total: any, variant: any) => total + 
        variant.elements.find((element: any) => element.name === variant.selectedOption)?.extra_price, 0);
      const mainItemAddOnsPrice = mainItemAddOns
        .filter((addOn: any) => addOn.selected)
        .reduce((total: any, addOn: any) => total + addOn.extraPrice, 0);
      
      // Side customizations
      const sideVariantsPrice = sideVariants
        .filter((variant: any) => variant.selectedOption)
        .reduce((total: any, variant: any) => total + 
        variant.elements.find((element: any) => element.name === variant.selectedOption)?.extra_price, 0);
      const sideAddOnsPrice = sideAddOns
        .filter((addOn: any) => addOn.selected)
        .reduce((total: any, addOn: any) => total + addOn.extraPrice, 0);
      
      // Drink customizations
      const drinkVariantsPrice = drinkVariants
        .filter((variant: any) => variant.selectedOption)
        .reduce((total: any, variant: any) => total + 
        variant.elements.find((element: any) => element.name === variant.selectedOption)?.extra_price, 0);
      
      const totalCustomizationPrice = mainItemVariantsPrice + mainItemAddOnsPrice + 
                                    sideVariantsPrice + sideAddOnsPrice + drinkVariantsPrice;
      
      return (comboBasePrice + totalCustomizationPrice) * quantity;
    }
    return 0;
  };

  

  const AddToCart = async() => {
    const cartData: any = {
      itemType: food.type,
      type: food.type,
      foodId: food.id,
      foodTruckId: food.foodTruckId,
      quantity: quantity,
      variants: variants,
      addOns: addOns,
      eatingType: orderTiming === 'eatLater' ? 1 : 0,
      totalPrice: getTotalPrice()
    };

    // For combo items, include component-specific customizations
    if (food.type === 'combo') {
      cartData.mainItemVariants = mainItemVariants;
      cartData.mainItemAddOns = mainItemAddOns;
      cartData.sideVariants = sideVariants;
      cartData.sideAddOns = sideAddOns;
      cartData.drinkVariants = drinkVariants;
    }

    if(validateCartItem(cartData).isValid) {
      setIsAddLoadingToCart(true);
      await addSearchedItemToCart(cartData);
      setIsAddLoadingToCart(false);
      navigation.goBack();
    } else {
      console.log(validateCartItem(cartData).errors);
      toast({
        type: 'error',
        title: 'Error',
        description: validateCartItem(cartData).errors.join(', ')
      })
    }
  }

  const validateCartItem = (item: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!item.quantity || item.quantity <= 0) errors.push('Valid quantity is required');
    if (item.totalPrice !== undefined && item.totalPrice < 0) errors.push('Total price cannot be negative');
    
    // Validate combo-specific fields
    if (item.itemType === 'combo') {
      if(item.mainItemVariants.find((variant: any) => variant.selectedOption === null)) errors.push('Main item variants are required');
      if(item.sideVariants.find((variant: any) => variant.selectedOption === null)) errors.push('Side variants are required');
      if(item.drinkVariants.find((variant: any) => variant.selectedOption === null)) errors.push('Drink variants are required');
     
    } else {
      if (item.variants.find((variant: any) => variant.selectedOption === null)) errors.push('Variants are required');
    } 
    console.log("errors", errors.length)
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Generic variant rendering function
  const renderVariantsSection = (variant: FrontendVariation, onVariantChange: (id: string, option: string) => void) => (
    <View key={variant.id} style={styles.variantsSection}>
      <Text style={styles.customizationLabel}>{variant.name}</Text>
      <View style={styles.optionsContainer}>
        {variant.elements.map((option) => (
          <TouchableOpacity
            key={option.name}
            style={[
              styles.optionButton,
              variant.selectedOption === option.name && styles.optionButtonSelected,
            ]}
            onPress={() => onVariantChange(variant.id, option.name)}
          >
            <Text
              style={[
                styles.optionText,
                variant?.selectedOption === option.name && styles.optionTextSelected,
              ]}
            >
              {option.name} {option.extra_price !== 0 && `(+${option.extra_price.toFixed(2)}$)` }
                
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Generic addOns rendering function
  const renderAddOns = (addOns: AddOn[], onAddOnToggle: (id: string) => void) => (
    <View style={styles.customizationSection}>
      <Text style={styles.customizationLabel}>Choice of Add On</Text>
      {addOns.map((addOn) => (
        <View key={addOn.id} style={styles.addOnItem}>
          <View style={styles.addOnInfo}>
            <Text style={styles.addOnName}>{addOn.name}</Text>
            
          </View>
          <View style={styles.addOnPriceAndCheckboxContainer}>
            <Text style={styles.addOnPrice}>
              {addOn.extraPrice === 0 ? 'Free' : `(+${addOn.extraPrice.toFixed(2)}$)`}
            </Text>
            <TouchableOpacity
              style={[
                styles.checkbox,
                addOn.selected && styles.checkboxSelected,
              ]}
              onPress={() => onAddOnToggle(addOn.id)}
            >
              {addOn?.selected ? (
                <Ionicons name="checkmark" size={16} color={Colors.textLight} />
              ) : (
                <Ionicons name="close" size={16} color={Colors.textLight} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCutomizationSection = () => {
    if(food?.type === 'mainItem') {
      return <>
       {variants.map((variant: any) => renderVariantsSection(variant, handleVariantsChange))}
       {renderAddOns(addOns, handleAddOnToggle)}
       </>
    } else if(food.type === 'side') {
      return <>
       {variants.map((variant: any) => renderVariantsSection(variant, handleVariantsChange))}
       {renderAddOns(addOns, handleAddOnToggle)}
       </>
    } else if(food.type === 'drink') {
      return <>
       {variants.map((variant: any) => renderVariantsSection(variant, handleVariantsChange))}
       </>
    } else if(food.type === 'combo') {
      return <>
        {food.mainItem && renderMainItemSection()}
        {food.side && renderSideSection()}
        {food.drink && renderDrinkSection()}
      </>
    }
  }

  const renderMainItemSection = () => {
    return <>
     <Text style={styles.comboCustomizationLabel}>{food.mainItem?.name} (Main Item)</Text>
     {mainItemVariants.map((variant: any) => renderVariantsSection(variant, handleMainItemVariantChange))}
     {mainItemAddOns.length > 0 && renderAddOns(mainItemAddOns, handleMainItemAddOnToggle)}
     </>
  }

  const renderSideSection = () => {
    return <>
     <Text style={styles.comboCustomizationLabel}>{food.side?.name} (Side)</Text>
     {sideVariants.map((variant: any) => renderVariantsSection(variant, handleSideVariantChange))}
     {sideAddOns.length > 0 && renderAddOns(sideAddOns, handleSideAddOnToggle)}
     </>
  }

  const renderDrinkSection = () => {
    return <>
     <Text style={styles.comboCustomizationLabel}>{food.drink?.name} (Drink)</Text>
     {drinkVariants.map((variant: any) => renderVariantsSection(variant, handleDrinkVariantChange))}
     </>
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: food?.imageUrl }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{food?.name}</Text>
            <Text style={styles.productPrice}>${food?.basePrice}</Text>
          </View>
          
          <Text style={styles.productDescription}>
            {food?.description || 'Aromatic rice and chicken, layered with spices, onions, and tomatoes.'}
          </Text>

          {/* Dietary Icons */}
          {/* <View style={styles.dietaryIcons}>
            <View style={styles.dietaryIcon}>
              <Ionicons name="flame" size={16} color={Colors.error} />
            </View>
            <View style={styles.dietaryIcon}>
              <Text style={styles.dietaryText}>GF</Text>
            </View>
            <View style={styles.dietaryIcon}>
              <Text style={styles.dietaryText}>K</Text>
            </View>
            <View style={styles.dietaryIcon}>
              <Text style={styles.dietaryText}>Halal</Text>
            </View>
          </View> */}

          {/* Rating and Prepare Time */}
          <View style={styles.infoBar}>
            <View style={styles.infoItem}>
              
              <Text style={styles.infoLabel}><Ionicons name="star" size={16} color={Colors.ratingStar} />{food?.star}</Text>
              <Text style={styles.infoSubLabel}>Rating</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{food?.prepareTime} min</Text>
              <Text style={styles.infoSubLabel}>Prepare Time</Text>
            </View>
          </View>

          {/* Offers */}
          <View style={styles.offersSection}>
            <View style={styles.offerHeader}>
              <Ionicons name="pricetag" size={20} color={Colors.discountTeal} />
              <Text style={styles.offerTitle}>Offers are available (3)</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.offerItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              <Text style={styles.offerText}>20% off 8 or more of the same items</Text>
            </View>
          </View>

          {/* Customization Options */}
          {
              renderCutomizationSection()
          }

        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {/* Order Timing */}
        <View style={styles.timingContainer}>
           <TouchableOpacity
                style={[
                  styles.timingButton,
                  orderTiming === 'eatNow' && styles.timingButtonSelected,
                ]}
                onPress={() => setOrderTiming('eatNow')}
              >
                <View style={[
                  styles.radioButton,
                  orderTiming === 'eatNow' && styles.radioButtonSelected,
                ]}>
                  {orderTiming === 'eatNow' && (
                    <View style={styles.radioButtonDot} />
                  )}
                </View>
                <Text style={styles.timingText}>Eat Now</Text>
            </TouchableOpacity>
              
            <TouchableOpacity
                style={[
                  styles.timingButton,
                  orderTiming === 'eatLater' && styles.timingButtonSelected,
                ]}
                onPress={() => setOrderTiming('eatLater')}
              >
                <View style={[
                  styles.radioButton,
                  orderTiming === 'eatLater' && styles.radioButtonSelected,
                ]}>
                  {orderTiming === 'eatLater' && (
                    <View style={styles.radioButtonDot} />
                  )}
                </View>
                <Text style={styles.timingText}>Eat Later™</Text>
            </TouchableOpacity>   
        </View>

        {/* Quantity & ADD TO CART Button */}
        <View style={styles.quantityAndAddToCartContainer}> 
          <View style={styles.quantityContainer}>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              minQuantity={1}
              maxQuantity={99}
            />
          </View>
          <View style={styles.addToCartButtonContainer}>
            <Button
              title="Add to cart"
                        onPress={() => AddToCart()}
              variant="primary"
              size="large"
              disabled={isAddLoadingToCart}
              style={styles.addToCartButton}
            />

            <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


  
export default ProductDetailScreen;
