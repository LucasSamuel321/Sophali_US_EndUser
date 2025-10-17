import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { toast } from '@/src/hooks/use-toast';
import useAuth from '@/src/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './index.style';

export default function RegisterScreen() {
  const router = useRouter();
  // New state hooks for all required fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [screenName, setScreenName] = useState('');
  const [genderValue, setGenderValue] = useState(0);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },      
  ]);
  const [countryValue, setCountryValue] = useState(0);
  const [countryItems, setCountryItems] = useState([
    { label: 'United States', value: 0 },
    { label: 'Canada', value: 1 },
  ]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetDirection, setStreetDirection] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [stateField, setStateField] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // DropDownPicker open/values
  const [genderOpen, setGenderOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const { signup, } = useAuth();
  const navigation = useNavigation();

  const register = async () => {
    // Validate all required fields
    if (!firstName || !lastName || !screenName || !email || !phoneNumber || !password || !confirmPassword || !streetNumber || !streetDirection || !streetName || !city || !stateField || !zipCode) {
      toast({
        title: "Enter error!",
        description: "Please fill in all required fields!",
        type: "error",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Enter error!",
        description: "Password has to be same as confirm password.",
        type: "error",
      });
      return;
    }
    setIsLoading(true);
    await signup({
      first_name: firstName,
      last_name: lastName,
      screenName,
      gender: genderValue,
      email,
      phone_number: phoneNumber,
      password,
      streetNumber,
      streetDirection,
      streetName,
      city,
      state: stateField,
      zipCode,
      country: countryValue,
    });
    setIsLoading(false);
  }

  return (
    <ScrollView>
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Card */}
          <View style={styles.card}>
            <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>Sign up to get started</ThemedText>

            {/* First Name */}
            <ThemedText style={styles.label}>First Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#A0A0A0"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            {/* Last Name */}
            <ThemedText style={styles.label}>Last Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#A0A0A0"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
            {/* Email */}
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            {/* Screen Name */}
            <ThemedText style={styles.label}>Screen Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Screen Name"
              placeholderTextColor="#A0A0A0"
              value={screenName}
              onChangeText={setScreenName}
              autoCapitalize="none"
            />
            {/* Gender */}
            <ThemedText style={styles.label}>Gender</ThemedText>
            <DropDownPicker
              open={genderOpen}
              value={genderValue}
              items={genderItems}
              setOpen={setGenderOpen}
              setValue={setGenderValue}
              setItems={setGenderItems}
              placeholder="Select Gender"
              style={{ marginBottom: 4, borderColor: '#E0E0E0', backgroundColor: '#F8F8F8' }}
              dropDownContainerStyle={{ borderColor: '#E0E0E0' }}
              zIndex={2000}
              listMode="SCROLLVIEW"
            />
            {/* Phone Number */}
            <ThemedText style={styles.label}>Phone Number</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#A0A0A0"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
            {/* Street Number */}
            <ThemedText style={styles.label}>Street Number</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Street Number"
              placeholderTextColor="#A0A0A0"
              value={streetNumber}
              onChangeText={setStreetNumber}
              autoCapitalize="none"
            />
            {/* Street Direction */}
            <ThemedText style={styles.label}>Street Direction</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Street Direction"
              placeholderTextColor="#A0A0A0"
              value={streetDirection}
              onChangeText={setStreetDirection}
              autoCapitalize="none"
            />
            {/* Street Name */}
            <ThemedText style={styles.label}>Street Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Street Name"
              placeholderTextColor="#A0A0A0"
              value={streetName}
              onChangeText={setStreetName}
              autoCapitalize="words"
            />
            {/* City */}
            <ThemedText style={styles.label}>City</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor="#A0A0A0"
              value={city}
              onChangeText={setCity}
              autoCapitalize="words"
            />
            {/* State */}
            <ThemedText style={styles.label}>State</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="State"
              placeholderTextColor="#A0A0A0"
              value={stateField}
              onChangeText={setStateField}
              autoCapitalize="characters"
            />
            {/* Zip Code */}
            <ThemedText style={styles.label}>Zip Code</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              placeholderTextColor="#A0A0A0"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
            {/* Country */}
            <ThemedText style={styles.label}>Country</ThemedText>
            <DropDownPicker
              open={countryOpen}
              value={countryValue}
              items={countryItems}
              setOpen={setCountryOpen}
              setValue={setCountryValue}
              setItems={setCountryItems}
              placeholder="Select Country"
              style={{ marginBottom: 4, borderColor: '#E0E0E0', backgroundColor: '#F8F8F8' }}
              dropDownContainerStyle={{ borderColor: '#E0E0E0' }}
              zIndex={1000}
              listMode="SCROLLVIEW"
            />

            {/* Password */}
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="••••••••••••"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Confirm Password */}
            <ThemedText style={styles.label}>Confirm Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="••••••••••••"
              placeholderTextColor="#A0A0A0"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {/* Register Button */}
            <TouchableOpacity style={styles.signInButton} onPress={register} disabled={isLoading}>
              <ThemedText style={styles.signInButtonText}>{isLoading ? 'SIGNING UP...' : 'SIGN UP'}</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.signUpRow}>
            <ThemedText style={styles.signUpText}>Already have an account? </ThemedText>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}> */}
            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
              <ThemedText style={styles.signUpLink}>Sign In</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
    </ScrollView>
  );
}

