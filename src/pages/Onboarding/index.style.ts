import Colors from "@/src/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    
    skipButtonContainer: {
      // position: 'absolute',
      top: 50,
      display: 'flex',
      justifyContent: 'flex-end',
      right: 20,
      zIndex: 10,
      marginBottom: 20
    },
    
    skipButton: {
      marginLeft: "auto",
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: Colors.background,
    },
    
    skipText: {
      color: 'black',
      fontSize: 14,
      fontWeight: '500',
    },
    
    scrollView: {
      flex: 1,
      marginTop: 20,
    },
    
    slide: {
      width,
      height: height - 200, // Account for bottom section
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    
    imageContainer: {
      width: width * 0.6,
      height: height * 0.35,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 20,
    },
    
    image: {
      width: '100%',
      height: '100%',
    },
    
    textContainer: {
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      textAlign: 'center',
      marginBottom: 16,
    },
    
    description: {
      fontSize: 16,
      color: Colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
    
    bottomSection: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 32,
    },
    
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    
    activeDot: {
      backgroundColor: Colors.textSecondary,
    },
    
    inactiveDot: {
      backgroundColor: Colors.textMuted,
    },
    
    nextButton: {
      width: '100%',
    },
  });
  