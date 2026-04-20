// View: Cart Page
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Header } from '../components/Header';
import { CartItemComponent } from '../components/CartItem';
import { useCart } from '../contexts/CartContext';

export const CartPage = () => {
  const { items, getSubtotal } = useCart();
  const navigate = useNavigate();
  const subtotal = getSubtotal();

  const handleCheckout = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link 
            to="/" 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-gray-900">Meu Carrinho</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-gray-900 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">Adicione produtos para continuar</p>
            <Link 
              to="/"
              className="inline-block bg-[#FF6B35] hover:bg-[#FF5722] text-white px-6 py-3 rounded-full transition-colors"
            >
              Ver Cardápio
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <CartItemComponent key={item.product.id} item={item} />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Taxa de entrega</span>
                  <span>Calcular no checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span>Total</span>
                  <span className="text-[#FF6B35]">
                    R$ {subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-full transition-colors shadow-lg"
              >
                Finalizar Pedido
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
