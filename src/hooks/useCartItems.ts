import axios from "axios";
import { useContext } from "react";
import { config } from "../config";
import { GlobalContext } from "../context";
import { AddOn, CartItem, Variation } from "../types";
import { toast } from "./use-toast";

const useCartItems = () => {
    const { state, update }: any = useContext(GlobalContext);

    // Utility function to process variants (frontend to backend format)
    const processVariants = (variants: any[]): Variation[] => {
        return variants
            .filter((variant: any) => variant.selectedOption)
            .map((variant: any) => {
                const selectedElement = variant.elements.find((element: any) => element.name === variant.selectedOption);
                return {
                    id: variant.id,
                    name: variant.name,
                    description: variant.description || '',
                    element: selectedElement ? {
                        name: selectedElement.name,
                        extra_price: selectedElement.extra_price || 0
                    } : null
                };
            });
    };

    // Utility function to process addOns (frontend to backend format)
    const processAddOns = (addOns: any[]): AddOn[] => {
        return addOns
            .filter((addOn: any) => addOn.selected)
            .map((addOn: any) => ({
                id: addOn.id,
                name: addOn.name,
                extraPrice: addOn.extraPrice,
                isActive: addOn.isActive !== undefined ? addOn.isActive : true
            }));
    };

    // Enhanced addToCart function that handles all item types
    const addSearchedItemToCart = async (itemData: any) => {
        try {
            let cartItem: CartItem;

            // Convert eating type to enum

            if (itemData.type === 'combo') {
                // Handle combo items with mainItem, side, drink components
                cartItem = {
                    owner: state.userData.id,
                    itemType: itemData.type,
                    foodTruckId: itemData.foodTruckId,
                    itemId: itemData.foodId,
                    quantity: itemData.quantity,
                    // removedInclusions: null,
                    variants: [], // Combos don't have direct variants
                    addOns: [], // Combos don't have direct addOns
                    promotions: [],
                    isGift: false,
                    variantsForMainItem: itemData.mainItemVariants ? processVariants(itemData.mainItemVariants) : [],
                    variantsForSide: itemData.sideVariants ? processVariants(itemData.sideVariants) : [],
                    variantsForDrink: itemData.drinkVariants ? processVariants(itemData.drinkVariants) : [],
                    addOnsForMainItem: itemData.mainItemAddOns ? processAddOns(itemData.mainItemAddOns) : [],
                    addOnsForSide: itemData.sideAddOns ? processAddOns(itemData.sideAddOns) : [],
                    eatingType: itemData.eatingType,
                    totalPrice: itemData.totalPrice
                };
            } else if(itemData.type === 'mainItem' || itemData.type === 'side') {
                // Handle mainItem, side items
                cartItem = {
                    owner: state.userData.id,
                    itemType: itemData.type,
                    itemId: itemData.foodId,
                    foodTruckId: itemData.foodTruckId,
                    quantity: itemData.quantity,
                    variants: itemData.variants ? processVariants(itemData.variants) : [],
                    addOns: itemData.addOns ? processAddOns(itemData.addOns) : [],
                    promotions: [],
                    isGift: false,
                    variantsForMainItem: [],
                    variantsForSide: [],
                    variantsForDrink: [],
                    addOnsForMainItem: [],
                    addOnsForSide: [],
                    eatingType: itemData.eatingType,
                    totalPrice: itemData.totalPrice
                };
            } else {
                // Handle drink items
                cartItem = {
                    owner: state.userData.id,
                    itemType: itemData.type,
                    itemId: itemData.foodId,
                    foodTruckId: itemData.foodTruckId,
                    quantity: itemData.quantity,
                    // removedInclusions: null,
                    variants: itemData.foodVariants ? processVariants(itemData.foodVariants) : [],
                    promotions: [],
                    isGift: false,
                    variantsForMainItem: [],
                    variantsForSide: [],
                    variantsForDrink: [],
                    addOnsForMainItem: [],
                    addOnsForSide: [],
                    eatingType: itemData.eatingType,
                    totalPrice: itemData.totalPrice
                };
            } 
            // console.log("cartItem", cartItem);
            const result = await axios.post(`${config.serverUrl}/enduser/cart/addSearchedItemToCart`, cartItem);
            if (result.data.status === 'success') {
                console.log("result", result.data.data);
                // update({ cartItems: [...state.cartItems, cartItem] });
                getCartItems();
                toast({
                    type: "success",
                    title: "Success!",
                    description: "Item added to cart successfully."
                });
            } else {
                toast({
                    type: "error",
                    title: "Error!",
                    description: "Failed to add to cart."
                });
            }
        } catch (error: any) {
            console.log("Add To Cart Error!: ", error.message);
            toast({
                type: "error",
                title: "Error!",
                description: "Failed to add to cart."
            });
        }
    }

    const getCartItems = async () => {
        try {
            const result = await axios.post(`${config.serverUrl}/enduser/cart/getCartItems`, { owner: state.userData?.id });
            if(result.data.status === 'success') {
                update({ cartItems: result.data.data });
                // console.log("cartItems_length", result.data.data[0].itemData)
            }
        }
        catch (error: any) {
            console.log("Get Cart Items Error!: ", error.message);
            toast({
                type: "error",
                title: "Error!",
                description: "Failed to fetch cart items."
            });
        }
    }

    const removeFromCart = async (cartItemId: string) => {
        // try {
        //     const result = await axios.delete(`${config.serverUrl}/enduser/cart/removeFromCart/${cartItemId}`);
        //     if(result.data.status === 'success') {
        //         const updatedCartItems = state.cartItems.filter((item: CartItem) => item.id !== cartItemId);
        //         update({ cartItems: updatedCartItems });
        //         toast({
        //             type: "success",
        //             title: "Success!",
        //             description: "Item removed from cart."
        //         });
        //     }
        // } catch (error: any) {
        //     console.log("Remove From Cart Error!: ", error.message);
        //     toast({
        //         type: "error",
        //         title: "Error!",
        //         description: "Failed to remove item from cart."
        //     });
        // }
    }

    const updateCartItemQuantity = async (cartItemId: string, newQuantity: number) => {
        try {
            const result = await axios.post(`${config.serverUrl}/enduser/cart/update-quantity`, {
                id: cartItemId,
                quantity: newQuantity
            });
            if(result.data.status === 'success') {
                const updatedCartItems = state.cartItems.map((item: CartItem) => 
                    item.id === cartItemId ? { ...item, quantity: newQuantity } : item
                );
                update({ cartItems: updatedCartItems });
            }
        } catch (error: any) {
            console.log("Update Cart Quantity Error!: ", error.message);
            toast({
                type: "error",
                title: "Error!",
                description: "Failed to update quantity."
            });
        }
    }

    const clearCart = async () => {
        try {
            const result = await axios.delete(`${config.serverUrl}/enduser/cart/clearCart`);
            if(result.data.status === 'success') {
                update({ cartItems: [] });
                toast({
                    type: "success",
                    title: "Success!",
                    description: "Cart cleared successfully."
                });
            }
        } catch (error: any) {
            console.log("Clear Cart Error!: ", error.message);
            toast({
                type: "error",
                title: "Error!",
                description: "Failed to clear cart."
            });
        }
    }

    const getCartTotal = () => {
        return state.cartItems.reduce((total: number, item: CartItem) => total + (item.totalPrice || 0), 0);
    }

    const getCartItemCount = () => {
        return state.cartItems.reduce((count: number, item: CartItem) => count + item.quantity, 0);
    }

    const totalPrice = () => {
        return state.cartItems.reduce((total: number, item: CartItem) => total + ((item.totalPrice * item.quantity) || 0), 0);
    }

    return {
        cartItems: state.cartItems,
        getCartItems: getCartItems,
        addSearchedItemToCart: addSearchedItemToCart,
        removeFromCart: removeFromCart,
        updateCartItemQuantity: updateCartItemQuantity,
        clearCart: clearCart,
        getCartTotal: getCartTotal,
        getCartItemCount: getCartItemCount,
        totalPrice: totalPrice,
    }
}

export default useCartItems;