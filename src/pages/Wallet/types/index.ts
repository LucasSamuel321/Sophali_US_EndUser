export interface Transaction {
  id: string;
  merchant: string;
  merchantIcon: any;
  date: string;
  time: string;
  amount: number;
  type: 'expense' | 'income' | 'gift' | 'coupon';
  transactionType: string;
}

export interface WalletCard {
  id: string;
  type: 'card' | 'google_pay' | 'apple_pay';
  isDefault: boolean;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cardholderName?: string;
  googlePayToken?: string;
  applePayToken?: string;
  isActive: boolean;
  color: string;
}

export interface PurchasedItem {
  id: string;
  title: string;
  subtitle: string;
  balance: number;
  color: string;
  showGiftButton?: boolean;
}
