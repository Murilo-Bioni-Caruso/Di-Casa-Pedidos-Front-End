import { ArrowLeft, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePedido } from '../context/PedidoContexto';
import { useUsuario } from '../context/UsuarioContexto';
import { OrderStatus, pagamentoConfig } from '../models/Constantes';
import { LINKS } from '../rotas/Links';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { formatarDataHora } from '../util/DataEHora';
import { statusConfig } from '../util/StatusConfig';
import { UsuarioNaoLogado } from '../components/UsuarioNaoLogado';
import { StatusBadge } from '../components/StatusBadge';

export function HistoricoPedidosPage() {
  const { usuario } = useUsuario();
  const { getPedidosUsuario } = usePedido();

  // 🔒 Se não estiver logado
  if (!usuario) {
    return (
      <UsuarioNaoLogado mensagem="Faça login para ver seu histórico de pedidos" />
    );
  }

  const pedidos = getPedidosUsuario(usuario.telefone);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6 max-w-4xl">

        {/* Voltar */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            to={LINKS.HOME}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          <h1 className="text-gray-900">
            {usuario.isConvidado ? 'Acompanhar Pedido' : 'Meus Pedidos'}
          </h1>
        </div>

        {/* Sem pedidos */}
        {pedidos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />

            <h2 className="text-gray-600 mb-2">
              Nenhum pedido encontrado
            </h2>

            <p className="text-gray-500 mb-6">
              Você ainda não fez nenhum pedido
            </p>

            <Link
              to={LINKS.HOME}
              className="inline-block bg-[#FF6B35] hover:bg-[#FF5722] text-white px-6 py-3 rounded-full transition-colors"
            >
              Ver Cardápio
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map(pedido => {
              const status = statusConfig[pedido.status] || statusConfig[OrderStatus.PENDENTE];
              const dataPedido = pedido.timestamp || pedido.dataHora || pedido.data;

              return (
                <div key={pedido.id} className="bg-white rounded-xl shadow-lg p-6">

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Pedido #{pedido.id.split('-')[1]}
                      </p>

                      <p className="text-sm text-gray-600">
                        {formatarDataHora(dataPedido)}
                      </p>
                    </div>
                    <StatusBadge status={pedido.status || OrderStatus.PENDENTE} />
                    {pedido.horarioEntrega && (
                      <div className="mt-2 text-sm text-orange-600 font-medium">
                        ⏱️ Entrega prevista: entre {pedido.horarioEntrega.minimo} e {pedido.horarioEntrega.maximo}
                      </div>
                    )}
                  </div>

                  {/* Itens */}
                  <div className="border-t border-b py-4 my-4 space-y-2">
                    {pedido.itens.map(item => (
                      <div key={item.produto.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantidade}x {item.produto.nome}
                        </span>

                        <span className="text-gray-900">
                          {formatarMoeda(item.produto.preco * item.quantidade)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Forma de pagamento
                      </p>

                      <p>
                        {pagamentoConfig[pedido.metodoPagamento] || 'Desconhecido'}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>

                      <p className="text-[#FF6B35]">
                        {formatarMoeda(pedido.total)}
                      </p>
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
}