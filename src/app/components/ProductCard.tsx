// View Component: Product Card
import { Plus } from 'lucide-react';
import { Product } from '../models/types';
import { useCart } from '../contexts/CartContext';
import { ProductPhoto } from './ProductPhoto';

interface ProductCardProps {
  product: Product;
}

const dayLabels = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo'
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <ProductPhoto 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.dayOfWeek && (
          <div className="absolute top-2 left-2 bg-[#FFD93D] text-[#333] px-3 py-1 rounded-full">
            <span>🌟 {dayLabels[product.dayOfWeek]}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-[#FF6B35]">
            R$ {product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
