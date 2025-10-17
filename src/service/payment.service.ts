import axios from 'axios';
import { config } from '../config';
import { toast } from '../hooks/use-toast';

const paymentService = {


    fetchPaymentIntentClientSecretForTopupViaCard: async(amount: number = 100, user_id: string) => {
      try {
          const response: any = await axios.post(`${config.serverUrl}/enduser/createPaymentIntentForTopupViaCard`, {
              amount: amount, // Ensure amount is in cents and rounded
              currency: 'usd',
              user_id
          })

          if(response.data.status === "success") {
              // toast({
              //     title: "Success",
              //     description: "PaymentIntent Success!",
              //     type: "success",
              // })
              const client_secret  = response.data.data;
              return client_secret;
          } else {
              toast({
                  title: "Failed",
                  description: "PaymentIntent Failed!",
                  type: "error",
              })
              return null;
          }

      } catch (error) {
          console.error('Error fetching payment intent:', error);
          throw new Error('Unable to create payment intent. Please try again.');
      }
    },

    chargeNowByBank: async (amount: Number, customerId: string, user_id: string, paymentMethodId: string) => {
        
        try {
          const response = await axios.post(`${config.serverUrl}/enduser/createPaymentIntentForTopupViaBankAccount`, 
            { 
                customerId,
                amount,
                currency: 'usd',
                user_id,
                paymentMethodId
            });
          if (response.data.status === "success") {
            // Alert.alert(`${response.data.paymentMethods.length}`)
            // update({
            //     ...state,
            //     userData: {
            //         ...state.userData,
            //         paymentMethods: response.data.paymentMethods
            //     }
            // });
            return {
                clientSecret: response.data?.clientSecret, 
                paymentIntentId: response.data?.paymentIntentId
            }
          } else {
              return {
                clientSecret: null,
                paymentIntentId: null
              }
          }
        } catch (error) {
          console.log('Error charging now:', error);
          return {
            clientSecret: null,
            paymentIntentId: null
          }
        }
    },

    verifySetupMicrodeposits: async (setupIntentId: string, amounts: [number, number]) => {
        try {
          const response = await axios.post(`${config.serverUrl}/enduser/verify-setup-microdeposits`, {
            setupIntentId,
            amounts
          });
          
          if (response.data.error) {
            return {
              verified: false,
              error: response.data.error
            }
          } else {
            return {
              verified: true,
              message: 'Bank account verified.'
            }
          }
        } catch (error) {
          console.log('Error verifying setup microdeposits:', error);
          return {
            verified: false,
            error: 'Failed to verify microdeposits. Please try again.'
          }
        }
    },

    verifyPaymentMicrodeposits: async (paymentIntentId: string, amounts: [number, number]) => {
        try {
          const response = await axios.post(`${config.serverUrl}/enduser/verify-payment-microdeposits`, {
            paymentIntentId,
            amounts
          });
          
          if (response.data.error) {
            return {
              verified: false,
              error: response.data.error
            }
          } else {
            return {
              verified: true,
              message: 'Payment micro-deposits verified.'
            }
          }
        } catch (error) {
          console.log('Error verifying payment microdeposits:', error);
          return {
            verified: false,
            error: 'Failed to verify payment microdeposits. Please try again.'
          }
        }
    },

    setupIntentForPaymnetViaBank: async (stripe_account_id: string) => {
        try {
          const response = await axios.post(`${config.serverUrl}/enduser/setupIntentForPaymentViaBankAccount`, {
            customerId: stripe_account_id
          });
          if (response.data.status === "success") {
            return {
              success: true,
              clientSecret: response.data.clientSecret
            }
          } else {
            return {
              success: false,
              error: response.data.message
            }
          }
        } catch (error) {
          console.log('Error getting setup intent:', error);
          return {
            success: false,
            error: 'Failed to get setup intent. Please try again.'
          }
        }
    },

    confirmSetupIntent: async (setupIntentId: string, paymentMethodId: string) => {
        try {
          const response = await axios.post(`${config.serverUrl}/enduser/confirm-setup-intent`, {
            setupIntentId,
            paymentMethodId
          });
          
          if (response.data.status === "success") {
            return {
              success: true,
              data: response.data.data
            }
          } else {
            return {
              success: false,
              error: response.data.message
            }
          }
        } catch (error) {
          console.log('Error confirming setup intent:', error);
          return {
            success: false,
            error: 'Failed to confirm setup intent. Please try again.'
          }
        }
    },

    paymentViaWallet: async(amount: any, user_id: string, foodTruckId: string) => {
      try {
        const response = await axios.post(`${config.serverUrl}/enduser/pay-by-wallet`, {
          amount,
          user_id,
          foodTruckId
        });
        
        if (response.data.status === "success") {
          return {
            success: true,
            data: response.data.data
          }
        } else {
          return {
            success: false,
            error: response.data.message
          }
        }
      } catch (error) {
        console.log('Error confirming setup intent:', error);
        return {
          success: false,
          error: 'Failed to confirm setup intent. Please try again.'
        }
      }
    },
    createPaymentIntentForDirectDebit: async(amount: any, user_id: string, foodTruckId: string) => {
      try {
        const response = await axios.post(`${config.serverUrl}/enduser/pay-by-wallet`, {
          amount,
          user_id,
          foodTruckId
        });
        
        if (response.data.status === "success") {
          return {
            success: true,
            data: response.data.data
          }
        } else {
          return {
            success: false,
            error: response.data.message
          }
        }
      } catch (error) {
        console.log('Error confirming setup intent:', error);
        return {
          success: false,
          error: 'Failed to confirm setup intent. Please try again.'
        }
      }
    }

}

export default paymentService;
