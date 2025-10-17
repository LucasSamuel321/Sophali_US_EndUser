import axios from "axios";
import { useContext } from "react";
import { config } from "../config";
import { GlobalContext } from "../context";
import { toast } from "./use-toast";

const useFoodTrucks = () => {
    const { state, update }: any = useContext(GlobalContext);

    const getFoodTrucksNearYou = async (userData: any, radius: number = 20) => {
        try {
            const composedTruckAddress = `${userData.streetNumber.trim()} ${userData.streetDirection.trim()} ${userData.streetName.trim()}, ${userData.city.trim()}, ${userData.state.trim()} ${userData.zipCode.trim()}, United States`.replace(/\s+/g, ' ').replace(/,\s+,/g, ', ');
        
            const result = await axios.post(`${config.serverUrl}/enduser/get-food-trucks-near-you`, {
                location: composedTruckAddress,
                radius: radius,
            });
            if(result.data.status === 'success') {
                update({ foodTrucks: result.data.data });
                return result.data.data;
            } else {
                toast({
                    title: "Error!",
                    description: result.data.message,
                    type: "error",
                })
                return false;
            } 
        } catch (error: any) {
            console.log("Get Food Trucks Near You Error!: ", error.message);
            toast({
                title: "Error!",
                description: error.message,
                type: "error",
            })
            return false;
        }
    }

    return {
        getFoodTrucksNearYou,
        foodTrucks: state.foodTrucks
    }

}

export default useFoodTrucks;