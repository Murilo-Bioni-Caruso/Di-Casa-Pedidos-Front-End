import { ArrowLeft, Banknote, CreditCard, MapPin, Receipt, Smartphone, Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContexto';
import { usePedido } from '../context/PedidoContexto';
import { useUsuario } from '../context/UsuarioContexto';
import { LINKS } from '../rotas/Links';
import { formatarMoeda } from '../util/ConversorDeMoeda';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { itens, limparCarrinho } = useCarrinho();
  const { usuario } = useUsuario();
  const { getResumoPedido, criarPedidoCompleto } = usePedido();
  const resumo = getResumoPedido(itens, usuario);

  const [tipoEntrega, setTipoEntrega] = useState('entrega');
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [valorDinheiro, setValorDinheiro] = useState('');
  const [finalizando, setFinalizando] = useState(false);

  const taxaEntrega = tipoEntrega === 'retirada' ? 0 : resumo.taxaEntrega;
  const total = resumo.subtotal + taxaEntrega;
  const subtotal = resumo.subtotal;
  const distancia = resumo.distancia;

  const troco = valorDinheiro ? parseFloat(valorDinheiro) - total : null;
  const dinheiroInsuficiente = metodoPagamento === 'dinheiro' && (
    !valorDinheiro || parseFloat(valorDinheiro) < total
  );

  useEffect(() => {
    if (!usuario) {
      navigate(LINKS.CARRINHO);
    }
  }, [usuario, navigate]);

  const finalizarPedido = async () => {
    setFinalizando(true);
    try {
      const extras = metodoPagamento === 'dinheiro' ? { trocoPara: parseFloat(valorDinheiro) } : {};
      await criarPedidoCompleto({ usuario, itens, metodoPagamento, tipoEntrega, ...extras });
      limparCarrinho();
      navigate(LINKS.CONFIRMACAO);
    } catch {
      alert('Erro ao finalizar pedido. Verifique se o servidor está rodando.');
    } finally {
      setFinalizando(false);
    }
  };

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6 max-w-4xl">

        {/* Voltar */}
        <div className="mb-6 flex items-center gap-4">
          <Link to={LINKS.CADASTRO} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-gray-900">Pagamento</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Forma de pagamento */}
          <div className="bg-white rounded-xl shadow-lg p-6">

            {/* Tipo de entrega */}
            <h2 className="text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Tipo de Entrega
            </h2>
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setTipoEntrega('entrega')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition-all ${tipoEntrega === 'entrega' ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                <MapPin className="w-4 h-4" /> Entrega
              </button>
              <button
                type="button"
                onClick={() => setTipoEntrega('retirada')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition-all ${tipoEntrega === 'retirada' ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                <Store className="w-4 h-4" /> Retirada no Local
              </button>
            </div>

            <h2 className="text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Forma de Pagamento
            </h2>

            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${metodoPagamento === 'pix' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" value="pix" checked={metodoPagamento === 'pix'} onChange={(e) => setMetodoPagamento(e.target.value)} />
                <Smartphone className="w-5 h-5" />
                PIX
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${metodoPagamento === 'cartao' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" value="cartao" checked={metodoPagamento === 'cartao'} onChange={(e) => setMetodoPagamento(e.target.value)} />
                <CreditCard className="w-5 h-5" />
                Cartão na Entrega
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${metodoPagamento === 'dinheiro' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" value="dinheiro" checked={metodoPagamento === 'dinheiro'} onChange={(e) => setMetodoPagamento(e.target.value)} />
                <Banknote className="w-5 h-5" />
                Dinheiro na Entrega
              </label>
            </div>

            {metodoPagamento === 'pix' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">💡 A chave PIX será exibida na tela de confirmação</p>
              </div>
            )}

            {metodoPagamento === 'dinheiro' && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg space-y-3">
                <p className="text-sm text-yellow-800">💵 Informe o valor que vai pagar para levarmos o troco</p>
                <div>
                  <label className="text-yellow-900 text-sm font-medium mb-1 block">
                    Vou pagar com (R$)
                  </label>
                  <input
                    type="number"
                    min={total}
                    max={total * 10}
                    step="0.01"
                    value={valorDinheiro}
                    onChange={(e) => setValorDinheiro(e.target.value)}
                    placeholder={formatarMoeda(total).replace('R$ ', '')}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                  />
                  {valorDinheiro && parseFloat(valorDinheiro) < total && (
                    <p className="text-red-600 text-xs mt-1">Valor insuficiente. Total: {formatarMoeda(total)}</p>
                  )}
                  {troco !== null && troco >= 0 && (
                    <p className="text-green-700 text-sm mt-2 font-semibold">Troco: {formatarMoeda(troco)}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Resumo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-gray-900 mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Resumo do Pedido
            </h2>

            <div className="space-y-3 mb-6">
              {itens.map(item => (
                <div key={item.cartKey ?? item.produto.id} className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-600">{item.quantidade}x {item.produto.nome}</span>
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

            <div className="border-t pt-3 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatarMoeda(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {tipoEntrega === 'retirada' ? 'Retirada no local' : `Entrega (${distancia.toFixed(1)} km)`}
                </span>
                <span className="text-green-600">
                  {tipoEntrega === 'retirada' ? 'Grátis' : taxaEntrega === 0 ? 'Grátis' : formatarMoeda(taxaEntrega)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span>Total</span>
                <span className="text-[#FF6B35]">{formatarMoeda(total)}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm mb-2 text-gray-900">
                {tipoEntrega === 'retirada' ? 'Retirar em:' : 'Entregar em:'}
              </h3>
              <p>{usuario.nome}</p>
              {tipoEntrega === 'retirada' ? (
                <p className="text-sm text-purple-700 font-medium">Retirada no estabelecimento</p>
              ) : (
                <p className="text-sm text-gray-600">{usuario.endereco}</p>
              )}
              <p className="text-sm text-gray-600">{usuario.telefone}</p>
            </div>

            <button
              onClick={finalizarPedido}
              disabled={finalizando || dinheiroInsuficiente}
              className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-full transition-colors shadow-lg disabled:opacity-50"
            >
              {finalizando ? 'Finalizando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}