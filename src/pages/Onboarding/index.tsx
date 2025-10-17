import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
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
import { styles } from './index.style';

const { width, height } = Dimensions.get('window');


interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: any; // You'll need to add actual images to assets
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Places you love',
    description: 'Discover all your favorite dishes in one spot. Place your order now or choose to Eat Later™.',
    image: require('../../../assets/images/onboarding-1.png'), // Add actual image
  },
  {
    id: 2,
    title: 'Easy Payment',
    description: 'You can make payments with your Sophali Wallet, a Credit Card, Google Pay, or Apple Pay.',
    image: require('../../../assets/images/onboarding-2.png'), // Add actual image
  },
  {
    id: 3,
    title: 'Get more for less',
    description: 'Purchase additional servings of your favorite dishes and enjoy great discounts that let you Eat Later™ or dine now!',
    image: require('../../../assets/images/onboarding-3.png'), // Add actual image
  },
  {
    id: 4,
    title: 'Gift your Friends',
    description: 'Connect with your friends through chat and surprise them with gifts of your favorite items.',
    image: require('../../../assets/images/onboarding-4.png'), // Add actual image
  },
];

const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      // Scroll to the next slide
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
    } else {
      navigation.navigate('MainApp' as never);
      // Navigate to login or main app
      console.log('Onboarding completed');
    }
  };

  const handleSkip = () => {
    navigation.navigate('MainApp' as never);
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentSlide ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <View style={styles.skipButtonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slideIndex);
        }}
        style={styles.scrollView}
      >
        {onboardingSlides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image source={slide.image} style={styles.image} resizeMode="cover" />
            </View>

            {/* Text Content */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {renderDots()}
        
        <Button
          title={currentSlide === onboardingSlides.length - 1 ? 'GET STARTED' : 'NEXT'}
          onPress={handleNext}
          variant="primary"
          size="large"
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
};



export default OnboardingScreen;
