
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../components/ui/Button';
import Colors from '../../constants/Colors';
import { styles } from './index.style';

const { width, height } = Dimensions.get('window');

const Splash: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const handleSignIn = () => {
    // Handle sign in logic
    console.log('Sign in:', { email, password });
    navigation.navigate('Login' as never);
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    console.log('Navigate to sign up');
    navigation.navigate('Register' as never);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background Image */}
      <ImageBackground
        source={{uri: "https://res.cloudinary.com/do99dohrh/image/upload/v1760739825/splash_t5rknd.png"}} // Add actual image
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Sophali Branding */}
          <View style={styles.brandingContainer}>
            <View style={styles.logoContainer}>
              <Image source={require('../../../assets/images/sophali_logo.png')} style={{width: 100, height: 100, resizeMode: 'contain'}} />
            </View>
            <Text style={styles.brandName}>SOPHALI</Text>
            <Text style={styles.slogan}>Buy Now. Eat Later™</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Login Card */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome to Sophali</Text>
          
          <Button
            title="SIGN IN"
            onPress={handleSignIn}
            variant="primary"
            size="large"
            style={styles.signInButton}
          />
          
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};


export default Splash; 