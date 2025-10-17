import Colors from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.onboardingBackground,
    },
    
    backgroundImage: {
      flex: 1,
      width: '100%',
    },
    
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    brandingContainer: {
      alignItems: 'center',
      marginBottom: 100,
    },
    
    logoContainer: {
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    
    logo: {
      fontSize: 48,
      fontWeight: 'bold',
      color: Colors.textLight,
    },
    
    brandName: {
      fontSize: 32,
      fontWeight: '400',
      color: Colors.textLight,
      marginBottom: 8,
    //   fontFamily: 'i',
    },
    
    slogan: {
      fontSize: 16,
      color: Colors.textLight,
      opacity: 0.9,
    },
    
    cardContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    
    card: {
      backgroundColor: Colors.onboardingOverlay,
      borderRadius: 24,
      paddingHorizontal: 24,
      paddingVertical: 32,
      alignItems: 'center',
    },
    
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      marginBottom: 32,
      textAlign: 'center',
    },
    
    signInButton: {
      width: '100%',
      marginBottom: 24,
    },
    
    signUpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    signUpText: {
      fontSize: 16,
      color: Colors.textPrimary,
    },
    
    signUpLink: {
      fontSize: 16,
      color: Colors.primary,
      fontWeight: '600',
    },
  });
  