// View: Checkout Page
import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, CreditCard, Smartphone, Banknote, Receipt } from 'lucide-react';
import { Header } from '../components/Header';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useRestaurant } from '../contexts/RestaurantContext';
import { useOrders } from '../contexts/OrderContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();
  const { user } = useUser();
  const { calculateDeliveryFee } = useRestaurant();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState<string>('pix');

  if (!user) {
    navigate('/register');
    return null;
  }

  const subtotal = getSubtotal();
  const distance = user.distance || 0;
  const deliveryFee = calculateDeliveryFee(distance);
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Create order
    const order = {
      id: `ORDER-${Date.now()}`,
      user,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      timestamp: Date.now(),
      status: 'pending' as const
    };

    // Save order using context
    addOrder(order);
    localStorage.setItem('dicasa-last-order', JSON.stringify(order));

    // Clear cart and navigate to confirmation
    clearCart();
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link 
            to="/register" 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-gray-900">Pagamento</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Forma de Pagamento
            </h2>

            <div className="space-y-3">
              <label className={`
                flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                ${paymentMethod === 'pix' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}
              `}>
                <input
                  type="radio"
                  name="payment"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#FF6B35]"
                />
                <Smartphone className="w-5 h-5" />
                <span>PIX</span>
              </label>

              <label className={`
                flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                ${paymentMethod === 'credit' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}
              `}>
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#FF6B35]"
                />
                <CreditCard className="w-5 h-5" />
                <span>Cartão de Crédito</span>
              </label>

              <label className={`
                flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                ${paymentMethod === 'cash' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}
              `}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#FF6B35]"
                />
                <Banknote className="w-5 h-5" />
                <span>Dinheiro na Entrega</span>
              </label>
            </div>

            {paymentMethod === 'pix' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 O código PIX será gerado após a confirmação do pedido
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-900 mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Resumo do Pedido
            </h2>

            <div className="space-y-3 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="text-gray-900">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Taxa de entrega ({distance.toFixed(1)} km)
                </span>
                <span className={deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}>
                  {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span>Total</span>
                <span className="text-[#FF6B35]">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm mb-2 text-gray-900">Entregar em:</h3>
              <p className="text-gray-700">{user.name}</p>
              <p className="text-sm text-gray-600">{user.address}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-full transition-colors shadow-lg"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};