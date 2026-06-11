import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCarrinho } from '../context/CarrinhoContexto';
import { FotoProduto } from './ProdutoFoto';
import { formatarMoeda } from '../util/ConversorDeMoeda';

export function ItemCarrinho({ item }) {
  const { atualizarQuantidade, removerItem } = useCarrinho();

  const diminuir = () => atualizarQuantidade(item.cartKey, item.quantidade - 1);
  const aumentar = () => atualizarQuantidade(item.cartKey, item.quantidade + 1);
  const remover = () => removerItem(item.cartKey);

  const preco = item.precoUnitario ?? item.produto.preco;

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">

      {/* Imagem */}
      <div className="w-20 h-20 shrink-0">
        <FotoProduto
          src={item.produto.imagem}
          alt={item.produto.nome}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col justify-between">

        <div>
          <h4 className="text-gray-900 mb-0.5">{item.produto.nome}</h4>

          {item.variantesSelecionadas?.length > 0 && (
            <p className="text-xs text-gray-500 mb-1">
              {item.variantesSelecionadas.map(v => `${v.label}: ${v.opcaoNome}`).join(' · ')}
            </p>
          )}

          <p className="text-[#FF6B35]">{formatarMoeda(preco)}</p>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
            <button
              onClick={diminuir}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantidade}</span>
            <button
              onClick={aumentar}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button onClick={remover} className="text-red-500 hover:text-red-600 p-2">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
