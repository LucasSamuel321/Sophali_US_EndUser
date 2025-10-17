import { GlobalContext } from "../context";
import { useContext } from "react";


const useOrders = () => {

    const { state, update }: any = useContext(GlobalContext);

    const updateOrders = async (orders: any) => {
        try {
            update({ orders: [...state.orders, ...orders]})
        } catch (error: any) {
            console.log("Update Order Error!: ", error.message);
        }
    }

    return {
        orders: state.orders,
        updateOrders
    }

}

export default useOrders;