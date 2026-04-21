import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartaoProduto } from '../components/CartaoProduto';
import { useCarrinho } from '../context/CarrinhoContexto';
import { LINKS } from '../rotas/Links';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { ItemCarrinho } from '../components/ItemCarrinho';

export function CarrinhoPage() {
  const { itens, getSubtotal } = useCarrinho();
  const navigate = useNavigate();

  const subtotal = getSubtotal();

  const finalizarPedido = () => {
    navigate(LINKS.CADASTRO);
  };

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

          <h1 className="text-gray-900">Meu Carrinho</h1>
        </div>

        {/* Carrinho vazio */}
        {itens.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />

            <h2 className="text-gray-900 mb-2">
              Seu carrinho está vazio
            </h2>

            <p className="text-gray-600 mb-6">
              Adicione produtos para continuar
            </p>

            <Link
              to={LINKS.HOME}
              className="inline-block bg-[#FF6B35] hover:bg-[#FF5722] text-white px-6 py-3 rounded-full transition-colors"
            >
              Ver Cardápio
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de itens */}
            <div className="space-y-4 mb-6">
              {itens.map(item => (
                <ItemCarrinho key={item.produto.id} item={item} />
              ))}
            </div>

            {/* Resumo */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-3 mb-6">

                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    {formatarMoeda(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Taxa de entrega</span>
                  <span>Calcular no checkout</span>
                </div>

                <div className="border-t pt-3 flex justify-between">
                  <span>Total</span>
                  <span className="text-[#FF6B35]">
                    {formatarMoeda(subtotal)}
                  </span>
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