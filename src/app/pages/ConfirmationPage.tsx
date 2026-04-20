// View: Order Confirmation Page
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CheckCircle, Home, Package } from 'lucide-react';
import { Header } from '../components/Header';
import { Order } from '../models/types';

export const ConfirmationPage = () => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('dicasa-last-order');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-2xl text-center">
          <p className="text-gray-600">Carregando informações do pedido...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-green-600 mb-2">Pedido Confirmado!</h1>
            <p className="text-gray-600">Seu pedido foi realizado com sucesso</p>
          </div>

          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white rounded-lg p-6 mb-6">
            <p className="text-sm opacity-90 mb-1">Número do Pedido</p>
            <p className="text-white">{order.id}</p>
          </div>

          <div className="text-left space-y-4 mb-6">
            <div className="border-b pb-4">
              <h3 className="text-gray-900 mb-2">📦 Resumo do Pedido</h3>
              {order.items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm py-1">
                  <span className="text-gray-600">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="text-gray-900">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">R$ {order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Taxa de entrega</span>
                <span className="text-gray-900">
                  {order.deliveryFee === 0 ? 'Grátis' : `R$ ${order.deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span>Total Pago</span>
                <span className="text-[#FF6B35]">
                  R$ {order.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">🏠 Endereço de Entrega</h3>
              <p className="text-gray-700">{order.user.name}</p>
              <p className="text-sm text-gray-600">{order.user.address}</p>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">💳 Forma de Pagamento</h3>
              <p className="text-gray-700 capitalize">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="bg-[#FFD93D] rounded-lg p-4 mb-6">
            <Package className="w-8 h-8 text-gray-800 mx-auto mb-2" />
            <p className="text-gray-800">
              ⏱️ Tempo estimado de entrega: <strong>40-60 minutos</strong>
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-4 rounded-full transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            Voltar ao Cardápio
          </Link>
        </div>
      </main>
    </div>
  );
};
