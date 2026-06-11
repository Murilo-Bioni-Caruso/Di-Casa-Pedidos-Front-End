import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useCarrinho } from '../context/CarrinhoContexto';
import { FotoProduto } from './ProdutoFoto';
import { formatarMoeda } from '../util/ConversorDeMoeda';

export function CartaoProduto({ produto }) {
  const { adicionarItem } = useCarrinho();
  const [showModal, setShowModal] = useState(false);
  const [selecoes, setSelecoes] = useState({});

  const temVariantes = Array.isArray(produto.variantes) && produto.variantes.length > 0;
  const precoBase = Number(produto.preco) || 0;
  const getPrecoOpcao = (opcao) => Number.isFinite(opcao?.preco)
    ? opcao.preco
    : precoBase + (Number(opcao?.precoExtra) || 0);

  const handleAdicionar = () => {
    if (temVariantes) {
      setSelecoes({});
      setShowModal(true);
    } else {
      adicionarItem(produto);
    }
  };

  const handleConfirmar = () => {
    const variantesSelecionadas = Object.entries(selecoes).map(([label, opcao]) => ({
      label,
      opcaoNome: opcao.nome,
      preco: getPrecoOpcao(opcao)
    }));

    adicionarItem(produto, variantesSelecionadas.length > 0 ? variantesSelecionadas : null);
    setShowModal(false);
  };

  const opcaoSelecionada = Object.values(selecoes)[0];
  const precoFinalSelecionado = opcaoSelecionada ? getPrecoOpcao(opcaoSelecionada) : precoBase;

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">

        {/* Imagem */}
        <div className="relative h-48 overflow-hidden">
          <FotoProduto
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {temVariantes && (
            <div className="absolute top-2 right-2 bg-[#FF6B35] text-white text-xs px-2 py-1 rounded-full font-semibold">
              Personalizável
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
            <div>
              <span className="text-[#FF6B35]">
                {formatarMoeda(precoBase)}
              </span>
            </div>

            <button
              onClick={handleAdicionar}
              className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de variantes */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white rounded-t-2xl">
              <div>
                <h3 className="text-gray-900">{produto.nome}</h3>
                <p className="text-sm text-gray-500">{produto.descricao}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-5">
              {produto.variantes.map((variante) => (
                <div key={variante.label}>
                  <div className="flex items-center gap-2 mb-2">
                    
                  </div>

                  <div className="space-y-2">
                    <label
                      className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        !selecoes[variante.label]
                          ? 'border-[#FF6B35] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={variante.label}
                          checked={!selecoes[variante.label]}
                          onChange={() => setSelecoes(prev => {
                            const novasSelecoes = { ...prev };
                            delete novasSelecoes[variante.label];
                            return novasSelecoes;
                          })}
                          className="text-[#FF6B35]"
                        />
                        <span className="text-gray-900">{variante.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">
                        {formatarMoeda(produto.preco)}
                      </span>
                    </label>

                    {variante.opcoes.map((opcao) => {
                      const selecionada = selecoes[variante.label]?.nome === opcao.nome;
                      const precoOpcao = getPrecoOpcao(opcao);
                      return (
                        <label
                          key={opcao.nome}
                          className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selecionada
                              ? 'border-[#FF6B35] bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={variante.label}
                              checked={selecionada}
                              onChange={() => setSelecoes(prev => ({ ...prev, [variante.label]: opcao }))}
                              className="text-[#FF6B35]"
                            />
                            <span className="text-gray-900">{opcao.nome}</span>
                          </div>
                          <span className={`text-sm font-semibold ${
                            precoOpcao > produto.preco ? 'text-[#FF6B35]' : 'text-green-600'
                          }`}>
                            {formatarMoeda(precoOpcao)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={handleConfirmar}
                className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-3 rounded-full font-semibold transition-colors shadow-md"
              >
                Adicionar — {formatarMoeda(precoFinalSelecionado)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
