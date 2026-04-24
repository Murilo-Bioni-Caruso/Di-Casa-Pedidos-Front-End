import { LayoutAdmin } from '../components/LayoutAdmin';
import { usePedido } from '../context/PedidoContexto';
import { TrendingUp, DollarSign, Package, Clock } from 'lucide-react';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { formatarDataHora } from '../util/DataEHora';
import { DashboardCard } from '../components/DashboardCard';
import { statusConfig } from '../util/StatusConfig';

export function DashboardAdminPage() {
  const {
    pedidos,
    getPedidosHoje,
    getFaturamentoHoje,
    getTicketMedio,
    getTotalFaturamento,
    getPedidosAtivos,
    getPedidosRecentes
  } = usePedido();


  const pedidosHoje = getPedidosHoje();
  const faturamentoHoje = getFaturamentoHoje();
  const totalPedidos = pedidos.length;
  const ticketMedio = getTicketMedio();
  const pedidosAtivos = getPedidosAtivos();
  const pedidosRecentes = getPedidosRecentes();
  const totalFaturamento = getTotalFaturamento();


  return (
    <LayoutAdmin>
      <div className="space-y-6">

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Pedidos Hoje */}

          <DashboardCard
            titulo="Pedidos Hoje"
            valor={pedidosHoje.length}
            descricao={`Total: ${totalPedidos} pedidos`}
            Icon={Package}
            iconColor="text-[#FF6B35]"
          />

          {/* Faturamento Hoje */}
          <DashboardCard
            titulo="Faturamento Hoje"
            valor={formatarMoeda(faturamentoHoje)}
            descricao={`Total geral: ${formatarMoeda(totalFaturamento)}`}
            Icon={DollarSign}
            iconColor="text-green-600"
          />

          {/* Ticket Médio */}
          <DashboardCard
            titulo="Ticket Médio"
            valor={formatarMoeda(ticketMedio)}
            descricao="Valor médio por pedido"
            Icon={TrendingUp}
            iconColor="text-blue-600"
          />

          {/* Pedidos Ativos */}
          <DashboardCard
            titulo="Em Preparo"
            valor={pedidosAtivos.length}
            descricao="Pedidos ativos"
            Icon={Clock}
            iconColor="text-yellow-600"
          />
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
                  {pedidosRecentes.map(pedido => {
                    const data = new Date(pedido.data);
                    const status = statusConfig[pedido.status];
                    const Icon = status?.icon;
                    return (
                      <tr key={pedido.id} className="border-b hover:bg-gray-50">

                        <td className="py-3 px-4 text-sm">
                          #{pedido.id.split('-')[1]}
                        </td>

                        <td className="py-3 px-4 text-sm">
                          {pedido.usuario.nome}
                        </td>

                        <td className="py-3 px-4 text-sm">
                          {formatarDataHora(data)}
                        </td>

                        <td className="py-3 px-4 text-sm text-right">
                          {formatarMoeda(pedido.total)}
                        </td>

                        <td className="py-3 px-4 text-center">
                          {

                            <span
                              className={`
                                inline-flex items-center gap-1
                                px-3 py-1
                                rounded-full text-xs font-medium
                                w-fit
                                ${status?.color}
                              `}
                            >
                              {Icon && <Icon className="w-3 h-3" />}
                              {status?.label || pedido.status}
                            </span>}

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