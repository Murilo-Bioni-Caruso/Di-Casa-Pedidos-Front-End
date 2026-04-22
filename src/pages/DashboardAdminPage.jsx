import { LayoutAdmin } from '../components/LayoutAdmin';
import { usePedido } from '../context/PedidoContexto';
import { TrendingUp, DollarSign, Package, Clock } from 'lucide-react';

export function DashboardAdminPage() {
  const { pedidos, getPedidosHoje, getFaturamentoHoje } = usePedido();

  const pedidosHoje = getPedidosHoje();
  const faturamentoHoje = getFaturamentoHoje();

  const totalPedidos = pedidos.length;

  const ticketMedio =
    pedidos.length > 0
      ? pedidos.reduce((total, p) => total + p.total, 0) / pedidos.length
      : 0;

  return (
    <LayoutAdmin>
      <div className="space-y-6">

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Pedidos Hoje */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">Pedidos Hoje</p>
              <Package className="w-8 h-8 text-[#FF6B35]" />
            </div>

            <p className="text-gray-900 text-2xl font-bold">
              {pedidosHoje.length}
            </p>

            <p className="text-sm text-gray-500">
              Total: {totalPedidos} pedidos
            </p>
          </div>

          {/* Faturamento Hoje */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">Faturamento Hoje</p>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>

            <p className="text-gray-900 text-2xl font-bold">
              R$ {faturamentoHoje.toFixed(2)}
            </p>

            <p className="text-sm text-gray-500">
              Total geral: R$ {pedidos.reduce((t, p) => t + p.total, 0).toFixed(2)}
            </p>
          </div>

          {/* Ticket Médio */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">Ticket Médio</p>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>

            <p className="text-gray-900 text-2xl font-bold">
              R$ {ticketMedio.toFixed(2)}
            </p>

            <p className="text-sm text-gray-500">
              Valor médio por pedido
            </p>
          </div>

          {/* Pedidos Ativos */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">Em Preparo</p>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>

            <p className="text-gray-900 text-2xl font-bold">
              {
                pedidos.filter(
                  p =>
                    p.status === 'pendente' ||
                    p.status === 'preparando'
                ).length
              }
            </p>

            <p className="text-sm text-gray-500">
              Pedidos ativos
            </p>
          </div>
        </div>

        {/* PEDIDOS RECENTES */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-gray-900 mb-4">
            Pedidos Recentes
          </h2>

          {pedidos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum pedido ainda
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Pedido</th>
                    <th className="text-left py-3 px-4">Cliente</th>
                    <th className="text-left py-3 px-4">Data</th>
                    <th className="text-right py-3 px-4">Total</th>
                    <th className="text-center py-3 px-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidos.slice(0, 10).map(pedido => {
                    const data = new Date(pedido.data);

                    return (
                      <tr key={pedido.id} className="border-b hover:bg-gray-50">

                        <td className="py-3 px-4 text-sm">
                          #{pedido.id.split('-')[1]}
                        </td>

                        <td className="py-3 px-4 text-sm">
                          {pedido.usuario.nome}
                        </td>

                        <td className="py-3 px-4 text-sm">
                          {data.toLocaleDateString('pt-BR')} às{' '}
                          {data.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>

                        <td className="py-3 px-4 text-sm text-right">
                          R$ {pedido.total.toFixed(2)}
                        </td>

                        <td className="py-3 px-4 text-center">
                          <span className={`
                            px-2 py-1 rounded-full text-xs
                            ${pedido.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${pedido.status === 'preparando' ? 'bg-blue-100 text-blue-800' : ''}
                            ${pedido.status === 'pronto' ? 'bg-green-100 text-green-800' : ''}
                            ${pedido.status === 'entregue' ? 'bg-gray-100 text-gray-800' : ''}
                            ${pedido.status === 'cancelado' ? 'bg-red-100 text-red-800' : ''}
                          `}>
                            {pedido.status}
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
    </LayoutAdmin>
  );
}