import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContexto';
import { useUsuario } from '../context/UsuarioContexto';
import { LINKS } from '../rotas/Links';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { ItemCarrinho } from '../components/ItemCarrinho';

export function CarrinhoPage() {
  const { itens, getSubtotal, limparCarrinho } = useCarrinho();
  const { usuario } = useUsuario();
  const navigate = useNavigate();
  const [showModalConvidado, setShowModalConvidado] = useState(false);
  const [confirmarLimpar, setConfirmarLimpar] = useState(false);

  const subtotal = getSubtotal();

  const finalizarPedido = () => {
    if (!usuario) {
      setShowModalConvidado(true);
      return;
    }
    navigate(LINKS.CADASTRO, { state: { from: LINKS.CARRINHO } });
  };

  const handleLimpar = () => {
    if (!confirmarLimpar) {
      setConfirmarLimpar(true);
      return;
    }
    limparCarrinho();
    setConfirmarLimpar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Modal: convidado vs logado */}
      {showModalConvidado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h2 className="text-gray-900 mb-1 text-center">Como deseja continuar?</h2>
            <p className="text-gray-500 text-sm text-center mb-6">Escolha como prefere fazer seu pedido</p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowModalConvidado(false);
                  navigate(LINKS.LOGIN, { state: { from: LINKS.CARRINHO } });
                }}
                className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-xl transition-colors text-left px-5"
              >
                <div className="font-semibold mb-0.5">🔑 Entrar / Criar conta</div>
                <div className="text-xs opacity-90">Histórico de pedidos, dados salvos</div>
              </button>

              <button
                onClick={() => {
                  setShowModalConvidado(false);
                  navigate(LINKS.CADASTRO, { state: { from: LINKS.CARRINHO, modoConvidado: true } });
                }}
                className="w-full border-2 border-gray-300 hover:border-[#FF6B35] text-gray-700 py-4 rounded-xl transition-colors text-left px-5"
              >
                <div className="font-semibold mb-0.5">👤 Continuar sem conta</div>
                <div className="text-xs text-gray-500">Só nome, telefone e endereço</div>
              </button>
            </div>

            <button
              onClick={() => setShowModalConvidado(false)}
              className="w-full mt-3 text-gray-500 text-sm py-2 hover:text-gray-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 max-w-4xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={LINKS.HOME} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-gray-900">Meu Carrinho</h1>
          </div>

          {itens.length > 0 && (
            <div className="flex items-center gap-2">
              {confirmarLimpar ? (
                <>
                  <span className="text-sm text-gray-600">Tem certeza?</span>
                  <button
                    onClick={handleLimpar}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-full text-sm transition-colors"
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => setConfirmarLimpar(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1.5 rounded-full text-sm transition-colors"
                  >
                    Não
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLimpar}
                  className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-full transition-colors shadow-md"
                >
                  🗑 Limpar
                </button>
              )}
            </div>
          )}
        </div>

        {/* Carrinho vazio */}
        {itens.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-gray-900 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-600 mb-6">Adicione produtos para continuar</p>
            <Link
              to={LINKS.HOME}
              className="inline-block bg-[#FF6B35] hover:bg-[#FF5722] text-white px-6 py-3 rounded-full transition-colors"
            >
              Ver Cardápio
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {itens.map(item => (
                <ItemCarrinho key={item.produto.id} item={item} />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatarMoeda(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Taxa de entrega</span>
                  <span>Calcular no checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span>Total</span>
                  <span className="text-[#FF6B35]">{formatarMoeda(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={finalizarPedido}
                className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-full transition-colors shadow-lg"
              >
                Finalizar Pedido
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
