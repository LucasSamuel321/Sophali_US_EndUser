// Comprehensive Type Definitions - Backend Schema Compatible

// Essential Inclusion Schema
export interface EssentialInclusion {
  id: string;
  name: string;
  description?: string;
}

// Variation Element Schema
export interface VariationElement {
  name: string;
  extra_price: number;
}

// Frontend Variation (for UI state management)
export interface FrontendVariation {
  id: string;
  name: string;
  description: string;
  selectedOption: string;
  elements: VariationElement[];
}

// Backend Variation Schema (matches backend exactly)
export interface Variation {
  id: string;
  name: string; // Meat, Spicy, Size
  description: string;
  element: VariationElement | null;
}

// AddOn Schema
export interface AddOn {
  id: string;
  name: string;
  extraPrice: number;
  isActive: boolean;
  selected?: boolean; // Frontend only
}

// Promotion Schema
export interface Promotion {
  id: string;
  name: string;
  description?: string;
  discountPercentage?: number;
  discountAmount?: number;
  isActive: boolean;
}

export interface MainItem {
  id: string;
  name: string;
  categoryId: string;
  foodTruckId: string;
  imageUrl: string;
  description: string;
  basePrice: number;
  star: number;
  calories: number[];
  prepareTime: number;
  essentialInclusions: EssentialInclusion[];
  addOns: AddOn[];
  variants: FrontendVariation[]; // Use frontend variation for UI
  promotions: Promotion[];
  isActive: boolean;
}

export interface Side {
  id: string;
  name: string;
  description: string;
  foodTruckId: string;
  star: number;
  calories: number[];
  prepareTime: number;
  promotions: Promotion[];
  variants: FrontendVariation[]; // Use frontend variation for UI
  imageUrl: string;
  basePrice: number;
  isActive: boolean;
}

export interface Drink {
  id: string;
  name: string;
  description: string;
  foodTruckId: string;
  variants: FrontendVariation[]; // Use frontend variation for UI
  imageUrl: string;
  basePrice: number;
  star: number;
  calories: number[];
  prepareTime: number;
  promotions: Promotion[];
  isActive: boolean;
}

export interface Combo {
  id: string;
  name: string;
  foodTruckId: string;
  imageUrl: string;
  description: string;
  basePrice: number;
  star: number;
  calories: number[];
  prepareTime: number;
  mainItems: string[]; // ObjectId references
  sides: string[]; // ObjectId references
  drinks: string[]; // ObjectId references
  promotions: Promotion[];
  isActive: boolean;
  // Frontend combo components (populated data)
  mainItem?: MainItem;
  side?: Side;
  drink?: Drink;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: (MainItem | Side | Drink | Combo)[];
  isExpanded?: boolean;
}

// Form data types for creating/editing items
export interface MainItemFormData {
  name: string;
  categoryId: string;
  description: string;
  basePrice: string;
  imageUrl: string;
  star: number;
  calories?: number[];
  prepareTime?: number;
  essentialInclusions?: EssentialInclusion[];
  addOns?: AddOn[];
  variants?: Variation[];
  promotions?: Promotion[];
  isActive?: boolean;
}

export interface SideFormData {
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  star?: number;
  calories?: number[];
  prepareTime?: number;
  variants?: Variation[];
  promotions?: Promotion[];
  isActive?: boolean;
}

export interface DrinkFormData {
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  star?: number;
  calories?: number[];
  prepareTime?: number;
  variants?: Variation[];
  promotions?: Promotion[];
  isActive?: boolean;
}

export interface ComboFormData {
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  star?: number;
  calories?: number[];
  prepareTime?: number;
  mainItems?: string[];
  sides?: string[];
  drinks?: string[];
  promotions?: Promotion[];
  isActive?: boolean;
}


export interface OperationalHours {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  openTime?: number;   // e.g., 9 for 09:00, 13.5 for 13:30
  closeTime?: number;  // e.g., 17 for 17:00, 15.5 for 15:30
  closed?: boolean;
}

export interface FoodTruck {
  id: string;
  name: string;
  owner: string; // user id
  address: string;
  description: string;
  phoneNumber: string;
  logoImageUrl: string;
  coverImageUrl: string;
  star?: number;
  maxPrice: number;
  minPrice: number;
  freeDelivery?: boolean;
  active?: boolean;
  operationalHours?: OperationalHours[];
}

// Cart Item Type Enum (matches backend)
export enum CartItemType {
  EATNOW,
  EATLATER,
  GIFT,
  ALREADYPAID
}
// Cart Item Schema (matches backend exactly)
export interface CartItem {
  id?: string;
  owner: string; // ref: "User",
  foodTruckId: string;
  itemType: any; // default: "mainItem"
  itemId: string;
  quantity: number;
  // removedInclusions: EssentialInclusion | null;
  variants: Variation[];
  addOns?: AddOn[];
  promotions: Promotion[];
  isGift: boolean;
  variantsForMainItem: Variation[];
  variantsForSide: Variation[];
  variantsForDrink: Variation[];
  addOnsForMainItem: AddOn[];
  addOnsForSide: AddOn[];
  eatingType: CartItemType; // Number enum
  totalPrice: number;
  itemData?: any;
}

export type GlobalValueType = {
  isAuthenticated: string;
  chattingHistory: Object;
  userData: any;
  orders: Array<{
      id: string;
      name: string;
      amount: number;
      price: number;
      star: number;
      description: string;
      calories: string;
      prepareTime: string;
  }>;
  foodTrucks: Array<any>;
  foods: {
      mainItems?: Array<any>;
      sides?: Array<any>;
      drinks?: Array<any>;
      combos?: Array<any>;
  } | null;
  cartItems: CartItem[]
}

export enum Gender {
  Male,
  Female
}

