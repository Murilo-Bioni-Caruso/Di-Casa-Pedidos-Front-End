import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { usePedido } from '../context/PedidoContexto';
import { OrderStatus } from '../models/Constantes';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { formatarDataHora } from '../util/DataEHora';

const statusOptions = [
    { value: OrderStatus.PENDENTE, label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
    { value: OrderStatus.PREPARANDO, label: 'Preparando', color: 'bg-blue-100 text-blue-800' },
    { value: OrderStatus.PRONTO, label: 'Pronto', color: 'bg-green-100 text-green-800' },
    { value: OrderStatus.ENTREGUE, label: 'Entregue', color: 'bg-gray-100 text-gray-800' },
    { value: OrderStatus.CANCELADO, label: 'Cancelado', color: 'bg-red-100 text-red-800' }
];

export function AdminPedidosPage() {
    const { pedidos, atualizarStatusPedido } = usePedido();

    const [expandedPedido, setExpandedPedido] = useState(null);
    const [filtroStatus, setFiltroStatus] = useState('all');

    const pedidosFiltrados =
        filtroStatus === 'all'
            ? pedidos
            : pedidos.filter(p => p.status === filtroStatus);

    const toggleExpandido = (pedidoId) => {
        setExpandedPedido(expandedPedido === pedidoId ? null : pedidoId);
    };

    const getCorStatus = (status) => {
        return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
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

                    {statusOptions.map(status => {
                        const count = pedidos.filter(p => p.status === status.value).length;

                        return (
                            <button
                                key={status.value}
                                onClick={() => setFiltroStatus(status.value)}
                                className={`
                  px-4 py-2 rounded-lg
                  ${filtroStatus === status.value
                                        ? 'bg-[#FF6B35] text-white'
                                        : 'bg-white text-gray-700'}
                `}
                            >
                                {status.label} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* Lista */}
                {pedidosFiltrados.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Nenhum pedido encontrado</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pedidosFiltrados.map(pedido => {
                            const expandido = expandedPedido === pedido.id;
                            const data = new Date(pedido.data);

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
                                                    {formatarDataHora(data)}
                                                </p>

                                                <p className="text-sm text-gray-600">
                                                    {pedido.usuario.nome} • {pedido.usuario.telefone}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Total</p>
                                                    <p className="text-[#FF6B35]">
                                                        {formatarMoeda(pedido.total)}
                                                    </p>
                                                </div>

                                                {expandido
                                                    ? <ChevronUp />
                                                    : <ChevronDown />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expandido */}
                                    {expandido && (
                                        <div className="border-t p-4 space-y-4 bg-gray-50">

                                            {/* Itens */}
                                            <div>
                                                <h4 className="text-sm mb-2">Itens</h4>

                                                {pedido.itens.map(item => (
                                                    <div key={item.produto.id} className="flex justify-between text-sm">
                                                        <span>
                                                            {item.quantidade}x {item.produto.nome}
                                                        </span>

                                                        <span>
                                                            {formatarMoeda(item.produto.preco * item.quantidade)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Endereço */}
                                            <div>
                                                <h4 className="text-sm mb-2">Entrega</h4>
                                                <p>{pedido.usuario.endereco}</p>
                                            </div>

                                            {/* Pagamento */}
                                            <div>
                                                <h4 className="text-sm mb-2">Pagamento</h4>
                                                <p>{pedido.metodoPagamento}</p>
                                            </div>

                                            {/* Status */}
                                            <div>
                                                <h4 className="text-sm mb-2">Status</h4>

                                                <div className="flex gap-2 flex-wrap">
                                                    {statusOptions.map(status => (
                                                        <button
                                                            key={status.value}
                                                            onClick={() =>
                                                                atualizarStatusPedido(pedido.id, status.value)
                                                            }
                                                            className={`
                                px-3 py-2 rounded-lg text-sm
                                ${pedido.status === status.value
                                                                    ? status.color
                                                                    : 'bg-white border'}
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
        </LayoutAdmin>
    );
}