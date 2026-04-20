// View: Admin Dashboard Page
import { AdminLayout } from '../components/AdminLayout';
import { useOrders } from '../contexts/OrderContext';
import { TrendingUp, DollarSign, Package, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#FF6B35', '#FF8C42', '#FFD93D', '#6BCF7F'];

export const AdminDashboardPage = () => {
  const { orders, getTodayOrders, getTodayRevenue } = useOrders();
  
  const todayOrders = getTodayOrders();
  const todayRevenue = getTodayRevenue();
  const totalOrders = orders.length;
  const averageOrderValue = orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0;

  // Order status distribution
  const statusData = [
    { name: 'Pendente', value: orders.filter(o => o.status === 'pending').length },
    { name: 'Preparando', value: orders.filter(o => o.status === 'preparing').length },
    { name: 'Pronto', value: orders.filter(o => o.status === 'ready').length },
    { name: 'Entregue', value: orders.filter(o => o.status === 'delivered').length }
  ].filter(item => item.value > 0);

  // Revenue by day (last 7 days)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.timestamp);
        return orderDate >= date && orderDate < nextDay;
      });
      
      const revenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
      
      days.push({
        day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        revenue: revenue,
        orders: dayOrders.length
      });
    }
    return days;
  };

  const revenueData = getLast7Days();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Pedidos Hoje</p>
              <Package className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <p className="text-gray-900">{todayOrders.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total: {totalOrders} pedidos</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Receita Hoje</p>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-900">R$ {todayRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">
              Total: R$ {orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Ticket Médio</p>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-900">R$ {averageOrderValue.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Por pedido</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Em Preparo</p>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-gray-900">
              {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Pedidos ativos</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-900 mb-4">Receita dos Últimos 7 Dias</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Receita']}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }}
                />
                <Bar dataKey="revenue" fill="#FF6B35" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-900 mb-4">Status dos Pedidos</h2>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Nenhum pedido registrado
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-gray-900 mb-4">Pedidos Recentes</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhum pedido ainda</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-700">Pedido</th>
                    <th className="text-left py-3 px-4 text-gray-700">Cliente</th>
                    <th className="text-left py-3 px-4 text-gray-700">Data</th>
                    <th className="text-right py-3 px-4 text-gray-700">Total</th>
                    <th className="text-center py-3 px-4 text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map(order => {
                    const date = new Date(order.timestamp);
                    return (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">#{order.id.split('-')[1]}</td>
                        <td className="py-3 px-4 text-sm">{order.user.name}</td>
                        <td className="py-3 px-4 text-sm">
                          {date.toLocaleDateString('pt-BR')} {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 px-4 text-sm text-right">R$ {order.total.toFixed(2)}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`
                            px-2 py-1 rounded-full text-xs
                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.status === 'ready' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'delivered' ? 'bg-gray-100 text-gray-800' : ''}
                            ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                          `}>
                            {order.status === 'pending' && 'Pendente'}
                            {order.status === 'preparing' && 'Preparando'}
                            {order.status === 'ready' && 'Pronto'}
                            {order.status === 'delivered' && 'Entregue'}
                            {order.status === 'cancelled' && 'Cancelado'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
