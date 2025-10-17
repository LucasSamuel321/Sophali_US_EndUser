import axios from "axios";
import { useContext } from "react";
import { config } from "../config";
import { GlobalContext } from "../context";
import { Alert } from "react-native";
import { toast } from "./use-toast";


const usePayments = () => {
    const { state, update }: any = useContext(GlobalContext);

    

    const addCard = async (cardData: any) => {
        const response = await axios.post(`${config.serverUrl}/enduser/addCard`, cardData);
        return response.data;
    }

    const fetchExistingPaymentMethods = async () => {
        try {
          const response = await axios.post(`${config.serverUrl}/enduser/my-payment-methods`, { id: state.userData?.id});
          if (response.data.status === "success") {
            // Alert.alert(`${response.data.paymentMethods.length}`)
            update({
                ...state,
                userData: {
                    ...state.userData,
                    paymentMethods: response.data.paymentMethods
                }
            });
          }
        } catch (error) {
          console.log('Error fetching payment methods:', error);
        }
    };
    
    

    return {
        paymentMethods: state.userData?.paymentMethods || [],
        addCard,
        fetchExistingPaymentMethods,
        
    }
}

export default usePayments;