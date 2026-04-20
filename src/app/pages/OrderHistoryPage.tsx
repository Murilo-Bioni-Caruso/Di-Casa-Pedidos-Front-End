// View: Order History Page
import { Link } from 'react-router';
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { useUser } from '../contexts/UserContext';
import { useOrders } from '../contexts/OrderContext';
import { OrderStatus } from '../models/types';

const statusConfig: Record<OrderStatus, { label: string; icon: any; color: string }> = {
  pending: { label: 'Pendente', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  preparing: { label: 'Preparando', icon: Package, color: 'text-blue-600 bg-blue-50' },
  ready: { label: 'Pronto', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  delivered: { label: 'Entregue', icon: Truck, color: 'text-gray-600 bg-gray-50' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'text-red-600 bg-red-50' }
};

export const OrderHistoryPage = () => {
  const { user } = useUser();
  const { getUserOrders } = useOrders();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-2xl text-center">
          <p className="text-gray-600">Faça login para ver seu histórico de pedidos</p>
          <Link to="/register" className="text-[#FF6B35] hover:underline mt-2 inline-block">
            Fazer login
          </Link>
        </main>
      </div>
    );
  }

  const orders = getUserOrders(user.email);

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
          <h1 className="text-gray-900">Meus Pedidos</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-gray-600 mb-2">Nenhum pedido encontrado</h2>
            <p className="text-gray-500 mb-6">Você ainda não fez nenhum pedido</p>
            <Link
              to="/"
              className="inline-block bg-[#FF6B35] hover:bg-[#FF5722] text-white px-6 py-3 rounded-full transition-colors"
            >
              Ver Cardápio
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              const orderDate = new Date(order.timestamp);
              
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Pedido #{order.id.split('-')[1]}</p>
                      <p className="text-sm text-gray-600">
                        {orderDate.toLocaleDateString('pt-BR')} às {orderDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                  </div>

                  <div className="border-t border-b py-4 my-4 space-y-2">
                    {order.items.map(item => (
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

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Forma de pagamento</p>
                      <p className="capitalize">{order.paymentMethod === 'pix' ? 'PIX' : order.paymentMethod === 'credit' ? 'Cartão de Crédito' : 'Dinheiro'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-[#FF6B35]">R$ {order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
