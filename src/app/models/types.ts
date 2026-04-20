// Model: Data structures for the application

export type Category = 'marmitas' | 'assados' | 'bebidas' | 'sobremesas';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  dayOfWeek?: DayOfWeek; // For "dish of the day"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  address: string;
  distance?: number; // in km
  isLoggedIn?: boolean;
}

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  timestamp: number;
  status: OrderStatus;
}

export interface RestaurantSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  openingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  latitude: number;
  longitude: number;
  freeDeliveryRadius: number; // in km
  deliveryFeePerKm: number;
}