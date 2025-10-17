import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation as useNavigationExpo } from '@react-navigation/native';
import axios from 'axios';
import { useContext } from 'react';
import { config } from '../config';
import { GlobalContext, initialValue, useNavigation } from '../context';
import { toast } from './use-toast';
import useFoodTrucks from './useFoodTrucks';
import useFoods from './useFoods';
import useCartItems from './useCartItems';
import { Alert } from 'react-native';

const useAuth = () => {
    const { state, update }: any = useContext(GlobalContext);
    const { setActiveTab } = useNavigation();
    const navigation = useNavigationExpo();
    const { getFoodTrucksNearYou } = useFoodTrucks();
    const { getFoods } = useFoods();
    const { getCartItems } = useCartItems();

    const signup = async (data: any) => {
        try {

            const request: any = await axios.post(`${config.serverUrl}/enduser/register`, data)
            const result = request.data;

            if (result.status === 'success') {
                toast({
                    title: "Success!",
                    description: "Sign Up Success! Please login.",
                    type: "success",
                });

                navigation.navigate('Login' as never)
            } else {
                toast({
                    title: "Error!",
                    description: result.message,
                    type: "error",
                })
            }
            return;
        } catch (error: any) {
            console.log("message", error.response)
            console.log("Sign Up Error!: ", error);
            toast({
                title: "Error!",
                description: "Something went wrong!",
                type: "error",
            })
        }
    }

    const signin = async (data: any) => {
        try {
            const response: any = await axios.post(`${config.serverUrl}/enduser/login`, data);
            const result = response.data;

            if (result.status === 'success') {
                toast({
                    title: "Success!",
                    description: "Sign in Success!",
                    type: "success",
                });
                update({ userData: {...result.data} });
                getDataForHomePage(result.data);
                getCartItems();
                // Use useRouter from expo-router for navigation
                navigation.navigate('Onboarding' as never);
                return true;
            } else {
                toast({
                    title: "Error!",
                    description: result.message,
                    type: "error",
                });
                return false;
            }
        } catch (error: any) {
            console.log("Sign In Error!: ", error.message);
            toast({
                title: error.status,
                description: error.message,
                type: "error",
            });
            return false
        }
    }

    const getDataForHomePage = async(userData: any) => {
        const foodTrucks: any = await getFoodTrucksNearYou(userData);
        if(foodTrucks) {
            await getFoods(foodTrucks.map((foodTruck: any) => foodTruck.id));
        } 
    }

    const signout = async () => {
        try {
            await AsyncStorage.removeItem('isAuthenticated');
            await AsyncStorage.removeItem('userData');
            update({ ...initialValue })
        } catch (error: any) {
            console.log("Sign Up Error!: ", error.message);
            toast({
                title: error.status,
                description: error.message,
                type: "error",
            });
        }
    }

    const assign = (data:any) => {
        update({userData: {...data}})
    }

    const fetchUserData = async () => {
        try {
          const response = await axios.post(`${config.serverUrl}/enduser/get-userData`, { id: state.userData?.id});
          if (response.data.status === "success") {
            // Alert.alert(`${response.data.paymentMethods.length}`)
            update({
                ...state,
                userData: response.data?.userData
            });
          } else {
            Alert.alert("Error", response.data.message)
          }
        } catch (error) {
          console.log('Error fetching payment methods:', error);
        }
    }

    return {
        isAuth: state.isAuthenticated,
        userData: state.userData,
        signup,
        signin,
        signout,
        assign,
        fetchUserData,
    }
}

export default useAuth;