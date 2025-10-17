import { StripeProvider } from '@stripe/stripe-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { GlobalProvider } from './src/context';
import RootNavigator from './src/pages/RootNavigator';


import { config } from './src/config';

const publishableKey = config.publishableKey;
// Toast configuration
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#4CAF50' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#F44336' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#2196F3' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
};

export default function App() {
	const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null);
	const [appIsReady, setAppIsReady] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	useEffect(() => {
		checkOrientation();
		checkDeviceType();
		const subscription = ScreenOrientation.addOrientationChangeListener(
			handleOrientationChange,
		);
		return () => {
			ScreenOrientation.removeOrientationChangeListener(subscription);
		};
	}, []);

	useEffect(() => {
		async function prepare() {
			try {
				// Reduced splash time for better UX on tablets
				await new Promise(resolve => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const checkOrientation = async () => {
		try {
			// @ts-ignore
			const orientation = await ScreenOrientation.getOrientationAsync();
			setOrientation(orientation);
		} catch (error) {
			console.warn('Error getting orientation:', error);
		}
	};

	const handleOrientationChange = (o: any) => {
		setOrientation(o.orientationInfo.orientation);
	};

	const checkDeviceType = () => {
		const { width, height } = Dimensions.get('window');
		const screenWidth = Math.max(width, height);
		const screenHeight = Math.min(width, height);
		
		// Tablet detection logic
		const isTabletDevice = 
			Platform.OS === 'ios' 
				? screenWidth >= 768 
				: screenWidth >= 600;
		
		setIsTablet(isTabletDevice);
	};

	// Don't render until app is ready
	if (!appIsReady) {
		return null;
	}

	return (
		<StripeProvider
			publishableKey={publishableKey}
			merchantIdentifier='merchant.com.sophali'
			urlScheme='sophali'
		>

			<GlobalProvider>
				<RootNavigator />
				<Toast 
					config={toastConfig}
					position={isTablet ? "top" : "top"} 
					topOffset={isTablet ? 10 : 40}
				/>
			</GlobalProvider>
		</StripeProvider>
		)
}


