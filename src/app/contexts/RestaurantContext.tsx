// Controller: Restaurant Context for managing products and settings
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, RestaurantSettings } from '../models/types';
import { products as initialProducts } from '../models/data';

const defaultSettings: RestaurantSettings = {
  name: 'DiCasa Marmitaria',
  address: 'Rua das Flores, 123 - Centro',
  phone: '(11) 98765-4321',
  email: 'contato@dicasa.com.br',
  openingHours: {
    monday: { open: '11:00', close: '22:00' },
    tuesday: { open: '11:00', close: '22:00' },
    wednesday: { open: '11:00', close: '22:00' },
    thursday: { open: '11:00', close: '22:00' },
    friday: { open: '11:00', close: '22:00' },
    saturday: { open: '11:00', close: '22:00' },
    sunday: { open: '11:00', close: '22:00' }
  },
  latitude: -23.5505,
  longitude: -46.6333,
  freeDeliveryRadius: 5,
  deliveryFeePerKm: 2.5
};

interface RestaurantContextType {
  products: Product[];
  settings: RestaurantSettings;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateSettings: (settings: RestaurantSettings) => void;
  calculateDistance: (address: string) => number;
  calculateDeliveryFee: (distance: number) => number;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dicasa-products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [settings, setSettings] = useState<RestaurantSettings>(() => {
    const saved = localStorage.getItem('dicasa-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('dicasa-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dicasa-settings', JSON.stringify(settings));
  }, [settings]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === product.id ? product : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateSettings = (newSettings: RestaurantSettings) => {
    setSettings(newSettings);
  };

  // Simulated distance calculation based on address
  const calculateDistance = (address: string): number => {
    // Simple simulation: generate distance based on address string length and hash
    const hash = address.toLowerCase().split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    // Generate a distance between 0.5 and 15 km
    const distance = ((hash % 145) + 5) / 10;
    return Math.round(distance * 10) / 10; // Round to 1 decimal
  };

  const calculateDeliveryFee = (distance: number): number => {
    if (distance <= settings.freeDeliveryRadius) {
      return 0;
    }
    const extraDistance = distance - settings.freeDeliveryRadius;
    return Math.round(extraDistance * settings.deliveryFeePerKm * 100) / 100;
  };

  return (
    <RestaurantContext.Provider
      value={{
        products,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        calculateDistance,
        calculateDeliveryFee
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
