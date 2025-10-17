import axios from "axios";
import { useContext } from "react";
import { config } from "../config";
import { GlobalContext } from "../context";
import { toast } from "./use-toast";

const useFoods = () => {
    const { state, update }: any = useContext(GlobalContext);

    const getFoods = async (foodTruckIds: Array<string>) => {
        try {
            const result = await axios.post(`${config.serverUrl}/enduser/foods/getFoods`, { foodTruckIds });
            if(result.data.status === 'success') {
                update({ foods: result.data.data });
            } else {
                toast({
                    type: "error",
                    title: "Error!",
                    description: "Something went wrong."
                });
            }
        
        } catch (error: any) {
            console.log("Get Foods Error!: ", error.message);
            toast({
                type: "error",
                title: "Error!",
                description: "Failed to fetch foods."
            });
        }
    }



    return {
        foods: state.foods,
        getFoods: getFoods,
    }
}

export default useFoods;