import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  minQuantity?: number;
  maxQuantity?: number;
  showDelete?: boolean;
  onDelete?: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  minQuantity = 1,
  maxQuantity = 99,
  showDelete = false,
  onDelete,
}) => {
  const handleDecrease = () => {
    if (quantity > minQuantity) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <View style={styles.container}>
      {showDelete && quantity === 1 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      )}
      
      {quantity > 1 && (
        <TouchableOpacity style={styles.button} onPress={handleDecrease}>
          <Ionicons name="remove" size={16} color={Colors.textPrimary} />
        </TouchableOpacity>
      )}
      
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleIncrease}>
        <Ionicons name="add" size={16} color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.quantityBackground,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  
  deleteButton: {
    padding: 8,
    marginRight: 4,
  },
  
  button: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.quantityBorder,
  },
  
  quantityContainer: {
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});

export default QuantitySelector;
