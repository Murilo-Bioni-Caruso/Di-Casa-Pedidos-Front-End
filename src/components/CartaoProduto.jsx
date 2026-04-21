import { Plus } from 'lucide-react';
import { useCarrinho } from '../context/CarrinhoContexto';
import { FotoProduto } from './ProdutoFoto';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { diasSemana } from '../models/Constantes';



export function CartaoProduto({ produto }) {
  const { adicionarItem } = useCarrinho();

  const adicionarAoCarrinho = () => {
    adicionarItem(produto);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      
      {/* Imagem */}
      <div className="relative h-48 overflow-hidden">
        <FotoProduto
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {produto.diaDaSemana && (
          <div className="absolute top-2 left-2 bg-[#FFD93D] text-[#333] px-3 py-1 rounded-full">
            <span>🌟 {diasSemana.find(d => d.key === produto.diaDaSemana)?.label}</span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="mb-2 text-gray-900">{produto.nome}</h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {produto.descricao}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[#FF6B35]">
            {formatarMoeda(produto.preco)}
          </span>

          <button
            onClick={adicionarAoCarrinho}
            className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}