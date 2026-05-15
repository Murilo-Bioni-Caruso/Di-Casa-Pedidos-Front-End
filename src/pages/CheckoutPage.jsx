import { ArrowLeft, Banknote, CreditCard, Receipt, Smartphone } from 'lucide-react';
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
  const { subtotal, taxaEntrega, total, distancia } = getResumoPedido(itens, usuario);

  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [finalizando, setFinalizando] = useState(false);

  useEffect(() => {
    if (!usuario) {
      navigate(LINKS.LOGIN);
    }
  }, [usuario, navigate]);

  const finalizarPedido = async () => {
    setFinalizando(true);
    try {
      await criarPedidoCompleto({ usuario, itens, metodoPagamento });
      limparCarrinho();
      navigate(LINKS.CONFIRMACAO);
    } catch (erro) {
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
                Cartão de Crédito
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${metodoPagamento === 'dinheiro' ? 'border-[#FF6B35] bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" value="dinheiro" checked={metodoPagamento === 'dinheiro'} onChange={(e) => setMetodoPagamento(e.target.value)} />
                <Banknote className="w-5 h-5" />
                Dinheiro na Entrega
              </label>
            </div>

            {metodoPagamento === 'pix' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">💡 O código PIX será gerado após a confirmação</p>
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
                <div key={item.produto.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantidade}x {item.produto.nome}</span>
                  <span className="text-gray-900">{formatarMoeda(item.produto.preco * item.quantidade)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatarMoeda(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Entrega ({distancia.toFixed(1)} km)</span>
                <span className={taxaEntrega === 0 ? 'text-green-600' : ''}>
                  {taxaEntrega === 0 ? 'Grátis' : formatarMoeda(taxaEntrega)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span>Total</span>
                <span className="text-[#FF6B35]">{formatarMoeda(total)}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm mb-2 text-gray-900">Entregar em:</h3>
              <p>{usuario.nome}</p>
              <p className="text-sm text-gray-600">{usuario.endereco}</p>
              <p className="text-sm text-gray-600">{usuario.telefone}</p>
            </div>

            <button
              onClick={finalizarPedido}
              disabled={finalizando}
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