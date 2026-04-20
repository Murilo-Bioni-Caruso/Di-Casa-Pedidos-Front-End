// View Component: Cart Item
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../models/types';
import { useCart } from '../contexts/CartContext';
import { ProductPhoto } from './ProductPhoto';

interface CartItemProps {
  item: CartItemType;
}

export const CartItemComponent = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
      <ProductPhoto
        src={item.product.image} 
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-gray-900 mb-1">{item.product.name}</h4>
          <p className="text-[#FF6B35]">
            R$ {item.product.price.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => removeItem(item.product.id)}
            className="text-red-500 hover:text-red-600 p-2"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
