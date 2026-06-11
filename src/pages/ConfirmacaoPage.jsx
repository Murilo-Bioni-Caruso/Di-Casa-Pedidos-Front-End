import { CheckCircle, Copy, Home, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useRestaurante } from '../context/RestauranteContexto';
import { LINKS } from '../rotas/Links';
import { formatarMoeda } from '../util/ConversorDeMoeda';


export function ConfirmacaoPage() {
  const [pedido, setPedido] = useState(null);
  const [copiado, setCopiado] = useState(null);
  const { configuracoes } = useRestaurante();

  useEffect(() => {
    const ultimoPedido = sessionStorage.getItem('ultimo-pedido');
    if (ultimoPedido) setPedido(JSON.parse(ultimoPedido));
  }, []);

  const copiarChave = (chave) => {
    navigator.clipboard.writeText(chave);
    setCopiado(chave);
    setTimeout(() => setCopiado(null), 3000);
  };

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
                  key={item.cartKey ?? item.produto.id}
                  className="flex justify-between text-sm py-1"
                >
                  <div>
                    <span className="text-gray-600">
                      {item.quantidade}x {item.produto.nome}
                    </span>
                    {item.variantesSelecionadas?.length > 0 && (
                      <p className="text-xs text-gray-400">
                        {item.variantesSelecionadas.map(v => `${v.label}: ${v.opcaoNome}`).join(' · ')}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-900">
                    {formatarMoeda((item.precoUnitario ?? item.produto.preco) * item.quantidade)}
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

            {/* Endereço / Retirada */}
            <div>
              <h3 className="text-gray-900 mb-2">
                {pedido.tipoEntrega === 'retirada' ? '🏪 Retirada no Local' : '🏠 Endereço de Entrega'}
              </h3>

              <p>{pedido.usuario.nome}</p>
              {pedido.tipoEntrega === 'retirada' ? (
                <p className="text-sm text-purple-700 font-medium">Retirar no estabelecimento</p>
              ) : (
                <p className="text-sm text-gray-600">{pedido.usuario.endereco}</p>
              )}
            </div>

            {/* Pagamento */}
            <div>
              <h3 className="text-gray-900 mb-2">
                💳 Forma de Pagamento
              </h3>

              <p className="capitalize">{pedido.metodoPagamento}</p>

              {pedido.metodoPagamento === 'dinheiro' && pedido.trocoPara && (
                <p className="text-sm text-gray-600 mt-1">
                  Troco para {formatarMoeda(pedido.trocoPara)} —{' '}
                  <span className="text-green-700 font-semibold">
                    Troco: {formatarMoeda(pedido.trocoPara - pedido.total)}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* PIX */}
          {pedido?.metodoPagamento === 'pix' && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-6 mb-6">
              <p className="font-semibold text-green-800 mb-4 text-center">💚 Pague com PIX para confirmar seu pedido</p>

              {configuracoes?.chavesPix?.length > 0 ? (
                <div className="space-y-3">
                  {configuracoes.chavesPix.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white border border-green-200 rounded-lg p-3">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">{item.tipo}</p>
                        <p className="text-sm font-mono text-gray-800 break-all">{item.chave}</p>
                      </div>
                      <button
                        onClick={() => copiarChave(item.chave)}
                        className="shrink-0 flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-lg transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        {copiado === item.chave ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-green-700 text-center">Entre em contato para obter a chave PIX.</p>
              )}
            </div>
          )}

          {/* Tempo */}
          <div className="bg-[#FFD93D] rounded-lg p-4 mb-6">
            <Package className="w-8 h-8 text-gray-800 mx-auto mb-2" />
            <p className="text-gray-800">
              ⏱️ Seu pedido está <strong>aguardando confirmação</strong>. O horário de entrega será informado quando começar o preparo.
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