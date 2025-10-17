import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationProvider } from '../context/NavigationContext'
import { NotificationProvider } from '../context/NotificationContext'
import { useResponsive } from '../hooks/useResponsive'

// Auth and misc screens
import MainTabNavigator from '../components/Navigation/MainTabNavigator'
import AIBot from './AIBot'
import Cart from './Cart'
import Checkout from './Checkout'
import FoodTruckDetail from './FoodTruckDetail'
import LoginScreen from './Login/login'
import OnboardingScreen from './Onboarding'
import OrderDetail from './OrderReceipt/components/OrderDetail'
import ProductDetail from './ProductDetail'
import Buddies from './Profile/components/Buddies'
import RegisterScreen from './Register'
import Splash from './Splash'
import AddPaymentMethod from './Wallet/components/AddPaymentMethod'
import TopUp from './Wallet/components/Topup'

const Stack = createStackNavigator()

export default function RootNavigator() {
	const { isTablet } = useResponsive();
	
	return (
		<NavigationProvider>
			<NotificationProvider>
				<NavigationContainer>
					<Stack.Navigator 
						screenOptions={{ 
							headerShown: false,
							cardStyle: {
								backgroundColor: '#ffffff',
							},
							transitionSpec: {
								open: {
									animation: 'timing',
									config: {
										duration: isTablet ? 300 : 250,
									},
								},
								close: {
									animation: 'timing',
									config: {
										duration: isTablet ? 300 : 250,
									},
								},
							},
						}} 
						initialRouteName="Splash"
					>
						<Stack.Screen name="Splash" component={Splash} />
						<Stack.Screen name="Onboarding" component={OnboardingScreen} />
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Register" component={RegisterScreen} />
						<Stack.Screen name="MainApp" component={MainTabNavigator} />
						<Stack.Screen name="FoodTruckDetail" component={FoodTruckDetail} />
						<Stack.Screen name="ProductDetail" component={ProductDetail} />
						<Stack.Screen name="OrderDetail" component={OrderDetail} />
						<Stack.Screen name="Buddies" component={Buddies} />
						<Stack.Screen name="AIBot" component={AIBot} />
						<Stack.Screen name="TopUp" component={TopUp} />
						<Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
						<Stack.Screen name="Cart" component={Cart} />
						<Stack.Screen name="Checkout" component={Checkout} />
					</Stack.Navigator>
				</NavigationContainer>
			</NotificationProvider>
		</NavigationProvider>
	)
}


