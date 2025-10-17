import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/Colors';

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
}

interface AddressModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
  selectedAddressId?: string;
}

const AddressModal: React.FC<AddressModalProps> = ({
  visible,
  onClose,
  onSelectAddress,
  selectedAddressId,
}) => {
  const [addresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      address: '1140 S Country Club Dr #101',
      city: 'Mesa, Arizona',
      postalCode: '85210',
    },
    {
      id: '2',
      name: 'Work',
      address: '1234 Work Road',
      city: 'Oshawa, Ontario',
      postalCode: 'H1H 1H1',
    },
  ]);

  const handleAddressSelect = (address: Address) => {
    onSelectAddress(address);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Deliver To</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.addressCard}>
            {addresses.map((address, index) => (
              <React.Fragment key={address.id}>
                <TouchableOpacity
                  style={styles.addressOption}
                  onPress={() => handleAddressSelect(address)}
                >
                  <Ionicons 
                    name="location" 
                    size={20} 
                    color={Colors.textPrimary} 
                  />
                  <View style={styles.addressContent}>
                    <Text style={styles.addressName}>{address.name}</Text>
                    <Text style={styles.addressText}>{address.address}</Text>
                    <Text style={styles.addressText}>
                      {address.city} {address.postalCode}
                    </Text>
                  </View>
                  <View style={styles.checkboxContainer}>
                    <View style={[
                      styles.checkbox,
                      selectedAddressId === address.id && styles.checkboxSelected
                    ]}>
                      {selectedAddressId === address.id && (
                        <Ionicons 
                          name="checkmark" 
                          size={16} 
                          color={Colors.textLight} 
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                {index < addresses.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          <TouchableOpacity style={styles.addAddressButton}>
            <Text style={styles.addAddressText}>Add A New Address</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  closeButton: {
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
    padding: 20,
  },
  addressCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  addressOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  addressContent: {
    flex: 1,
    marginLeft: 16,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  checkboxContainer: {
    marginLeft: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 20,
  },
  addAddressButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    alignItems: 'center',
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});

export default AddressModal;
