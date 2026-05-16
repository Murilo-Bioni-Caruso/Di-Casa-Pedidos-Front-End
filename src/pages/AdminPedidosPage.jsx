import { Banknote, ChevronDown, ChevronUp, CreditCard, MapPin, Package, Smartphone } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { usePedido } from '../context/PedidoContexto';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { formatarDataHora } from '../util/DataEHora';
import { statusConfig } from '../util/StatusConfig';

export function AdminPedidosPage() {
  const {
    pedidos,
    atualizarStatusPedido,
    filtrarPedidos,
    contarPedidosPorStatus
  } = usePedido();

  const [expandedPedido, setExpandedPedido] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('all');
  const scrollSalvo = useRef(null);

  useLayoutEffect(() => {
    if (scrollSalvo.current !== null) {
      window.scrollTo(0, scrollSalvo.current);
      scrollSalvo.current = null;
    }
  });

  const pedidosExibidos = filtrarPedidos(filtroStatus);

  const pagamentoBadge = {
    pix:      { label: 'PIX',      icon: Smartphone, cor: 'text-green-700 bg-green-100' },
    dinheiro: { label: 'Dinheiro', icon: Banknote,   cor: 'text-yellow-700 bg-yellow-100' },
    cartao:   { label: 'Cartão',   icon: CreditCard, cor: 'text-blue-700 bg-blue-100' },
  };

  const proximoStatus = {
    pendente:   { key: 'preparando', label: 'Iniciar Preparo',   cor: 'bg-blue-600 hover:bg-blue-700' },
    preparando: { key: 'pronto',     label: 'Marcar Pronto',     cor: 'bg-green-600 hover:bg-green-700' },
    pronto:     { key: 'entregue',   label: 'Confirmar Entrega', cor: 'bg-gray-700 hover:bg-gray-800' },
  };

  const avancarStatus = (e, pedidoId, statusAtual) => {
    e.stopPropagation();
    e.currentTarget.blur();
    const proximo = proximoStatus[statusAtual];
    if (!proximo) return;
    scrollSalvo.current = window.scrollY;
    atualizarStatusPedido(pedidoId, proximo.key);
  };

  const toggleExpandido = (pedidoId) => {
    setExpandedPedido(expandedPedido === pedidoId ? null : pedidoId);
  };

  return (
    <LayoutAdmin>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">Gerenciar Pedidos</h2>
          <div className="text-sm text-gray-600">
            Total: {pedidos.length} pedidos
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-2">

          {/* TODOS */}
          <button
            onClick={() => setFiltroStatus('all')}
            className={`
              px-4 py-2 rounded-lg
              ${filtroStatus === 'all'
                ? 'bg-[#FF6B35] text-white'
                : 'bg-white text-gray-700'}
            `}
          >
            Todos ({pedidos.length})
          </button>

          {/* STATUS DINÂMICO */}
          {Object.entries(statusConfig).map(([key, status]) => {
            const count = contarPedidosPorStatus(key);
            const Icone = status.icon;

            return (
              <button
                key={key}
                onClick={() => setFiltroStatus(key)}
                className={`
                  px-4 py-2 rounded-lg flex items-center gap-2
                  ${filtroStatus === key
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-white text-gray-700'}
                `}
              >
                <Icone className="w-4 h-4" />
                {status.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Lista */}
        {pedidosExibidos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum pedido encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidosExibidos.map(pedido => {
              const expandido = expandedPedido === pedido.id;
              const status = statusConfig[pedido.status];

              const pag = pagamentoBadge[pedido.metodoPagamento];
              const PagIcon = pag?.icon;

              return (
                <div key={pedido.id} className="bg-white rounded-xl shadow-lg">

                  {/* Header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleExpandido(pedido.id)}
                  >
                    <div className="flex justify-between">

                      <div>
                        <p className="text-gray-900">
                          Pedido #{pedido.id.split('-')[1]}
                        </p>

                        <p className="text-sm text-gray-600">
                          {formatarDataHora(new Date(pedido.data))}
                        </p>

                        <p className="text-sm text-gray-600">
                          {pedido.usuario.nome} • {pedido.usuario.telefone}
                        </p>

                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {pag && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${pag.cor}`}>
                              <PagIcon className="w-3 h-3" />
                              {pag.label}
                              {pedido.metodoPagamento === 'dinheiro' && pedido.trocoPara && (
                                <span className="ml-1">• troco p/ {formatarMoeda(pedido.trocoPara)}</span>
                              )}
                            </span>
                          )}
                          {pedido.tipoEntrega === 'retirada' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium text-purple-700 bg-purple-100">
                              <MapPin className="w-3 h-3" /> Retirada no local
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">

                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-[#FF6B35]">
                            {formatarMoeda(pedido.total)}
                          </p>
                        </div>

                        {proximoStatus[pedido.status] && (
                          <button
                            onClick={(e) => avancarStatus(e, pedido.id, pedido.status)}
                            className={`px-3 py-1.5 text-white text-xs rounded-lg transition-colors ${proximoStatus[pedido.status].cor}`}
                          >
                            {proximoStatus[pedido.status].label}
                          </button>
                        )}

                        <span className={`px-2 py-1 rounded ${status.color}`}>
                          {status.label}
                        </span>

                        {expandido ? <ChevronUp /> : <ChevronDown />}
                      </div>
                    </div>
                  </div>

                  {/* Expandido */}
                  {expandido && (
                    <div className="border-t p-4 space-y-4 bg-gray-50">

                      {/* Itens */}
                      <div>
                        <h4 className="text-sm mb-2">Itens</h4>

                        {pedido.itens?.map(item => (
                          <div key={item.produto?.id} className="flex justify-between text-sm">
                            <span>
                              {item.quantidade}x {item.produto?.nome}
                            </span>

                            <span>
                              {formatarMoeda(item.produto?.preco * item.quantidade)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Status */}
                      <div>
                        <h4 className="text-sm mb-2">Status</h4>

                        <div className="flex gap-2 flex-wrap">
                          {Object.entries(statusConfig).map(([key, status]) => {
                            const Icone = status.icon;

                            return (
                              <button
                                key={key}
                                onClick={() =>
                                  atualizarStatusPedido(pedido.id, key)
                                }
                                className={`
                                  px-3 py-2 rounded-lg text-sm flex items-center gap-2
                                  ${pedido.status === key
                                    ? status.color
                                    : 'bg-white border'}
                                `}
                              >
                                <Icone className="w-4 h-4" />
                                {status.label}
                              </button>
                            );
                          })}
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
    </LayoutAdmin>
  );
}