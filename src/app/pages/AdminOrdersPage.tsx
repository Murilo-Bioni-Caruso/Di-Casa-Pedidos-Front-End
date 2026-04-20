// View: Admin Orders Management Page
import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useOrders } from '../contexts/OrderContext';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { Order, OrderStatus } from '../models/types';

const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'preparing', label: 'Preparando', color: 'bg-blue-100 text-blue-800' },
  { value: 'ready', label: 'Pronto', color: 'bg-green-100 text-green-800' },
  { value: 'delivered', label: 'Entregue', color: 'bg-gray-100 text-gray-800' },
  { value: 'cancelled', label: 'Cancelado', color: 'bg-red-100 text-red-800' }
];

export const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const toggleExpanded = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status: OrderStatus) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">Gerenciar Pedidos</h2>
          <div className="text-sm text-gray-600">
            Total: {orders.length} pedidos
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`
              px-4 py-2 rounded-lg whitespace-nowrap transition-colors
              ${filterStatus === 'all' 
                ? 'bg-[#FF6B35] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            Todos ({orders.length})
          </button>
          {statusOptions.map(status => {
            const count = orders.filter(o => o.status === status.value).length;
            return (
              <button
                key={status.value}
                onClick={() => setFilterStatus(status.value)}
                className={`
                  px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                  ${filterStatus === status.value 
                    ? 'bg-[#FF6B35] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {status.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum pedido encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => {
              const isExpanded = expandedOrder === order.id;
              const orderDate = new Date(order.timestamp);

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Order Header */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleExpanded(order.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gray-900">
                            Pedido #{order.id.split('-')[1]}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {statusOptions.find(s => s.value === order.status)?.label}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>{order.user.name} • {order.user.email}</p>
                          <p className="text-xs mt-1">
                            {orderDate.toLocaleDateString('pt-BR')} às {orderDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-[#FF6B35]">R$ {order.total.toFixed(2)}</p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Details (Expanded) */}
                  {isExpanded && (
                    <div className="border-t px-4 py-4 bg-gray-50 space-y-4">
                      {/* Items */}
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Itens do Pedido</h4>
                        <div className="space-y-2">
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
                        <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">R$ {order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Taxa de entrega</span>
                            <span className="text-gray-900">
                              {order.deliveryFee === 0 ? 'Grátis' : `R$ ${order.deliveryFee.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span className="text-[#FF6B35]">R$ {order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Informações de Entrega</h4>
                        <div className="text-sm text-gray-600">
                          <p className="text-gray-900">{order.user.name}</p>
                          <p>{order.user.address}</p>
                          <p>{order.user.email}</p>
                          {order.user.distance && (
                            <p className="mt-1">Distância: {order.user.distance} km</p>
                          )}
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Forma de Pagamento</h4>
                        <p className="text-sm text-gray-600 capitalize">
                          {order.paymentMethod === 'pix' ? 'PIX' : order.paymentMethod === 'credit' ? 'Cartão de Crédito' : 'Dinheiro'}
                        </p>
                      </div>

                      {/* Status Update */}
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Atualizar Status</h4>
                        <div className="flex gap-2 flex-wrap">
                          {statusOptions.map(status => (
                            <button
                              key={status.value}
                              onClick={() => handleStatusChange(order.id, status.value)}
                              className={`
                                px-3 py-2 rounded-lg text-sm transition-colors
                                ${order.status === status.value
                                  ? status.color + ' font-semibold'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }
                              `}
                            >
                              {status.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
