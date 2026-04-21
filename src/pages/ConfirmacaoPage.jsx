import { CheckCircle, Home, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LINKS } from '../rotas/Links';
import { formatarMoeda } from '../util/ConversorDeMoeda';

export function ConfirmacaoPage() {
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const ultimoPedido = localStorage.getItem('ultimo-pedido');
    if (ultimoPedido) {
      setPedido(JSON.parse(ultimoPedido));
    }
  }, []);

  // 🔥 loading
  if (!pedido) {
    return (
      <div className="min-h-screen bg-gray-50">

        <main className="container mx-auto px-4 py-12 max-w-2xl text-center">
          <p className="text-gray-600">
            Carregando informações do pedido...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">

          {/* Sucesso */}
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />

            <h1 className="text-green-600 mb-2">
              Pedido Confirmado!
            </h1>

            <p className="text-gray-600">
              Seu pedido foi realizado com sucesso
            </p>
          </div>

          {/* ID */}
          <div className="bg-linear-to-r from-[#FF6B35] to-[#FF8C42] text-white rounded-lg p-6 mb-6">
            <p className="text-sm opacity-90 mb-1">
              Número do Pedido
            </p>

            <p>{pedido.id}</p>
          </div>

          {/* Conteúdo */}
          <div className="text-left space-y-4 mb-6">

            {/* Itens */}
            <div className="border-b pb-4">
              <h3 className="text-gray-900 mb-2">
                📦 Resumo do Pedido
              </h3>

              {pedido.itens.map(item => (
                <div
                  key={item.produto.id}
                  className="flex justify-between text-sm py-1"
                >
                  <span className="text-gray-600">
                    {item.quantidade}x {item.produto.nome}
                  </span>

                  <span className="text-gray-900">
                    {formatarMoeda(item.produto.preco * item.quantidade)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totais */}
            <div className="border-b pb-4">
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatarMoeda(pedido.subtotal)}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-gray-600">Taxa de entrega</span>
                <span>
                  {pedido.taxaEntrega === 0
                    ? 'Grátis'
                    : formatarMoeda(pedido.taxaEntrega)}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span>Total Pago</span>
                <span className="text-[#FF6B35]">
                  {formatarMoeda(pedido.total)}
                </span>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h3 className="text-gray-900 mb-2">
                🏠 Endereço de Entrega
              </h3>

              <p>{pedido.usuario.nome}</p>
              <p className="text-sm text-gray-600">
                {pedido.usuario.endereco}
              </p>
            </div>

            {/* Pagamento */}
            <div>
              <h3 className="text-gray-900 mb-2">
                💳 Forma de Pagamento
              </h3>

              <p className="capitalize">
                {pedido.metodoPagamento}
              </p>
            </div>
          </div>

          {/* Tempo */}
          <div className="bg-[#FFD93D] rounded-lg p-4 mb-6">
            <Package className="w-8 h-8 text-gray-800 mx-auto mb-2" />

            <p className="text-gray-800">
              ⏱️ Tempo estimado de entrega: <strong>40-60 minutos</strong>
            </p>
          </div>

          {/* Voltar */}
          <Link
            to={LINKS.HOME}
            className="inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-4 rounded-full transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            Voltar ao Cardápio
          </Link>
        </div>
      </main>
    </div>
  );
}