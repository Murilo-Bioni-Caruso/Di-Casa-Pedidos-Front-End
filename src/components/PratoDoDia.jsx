import { formatarMoeda } from '../util/ConversorDeMoeda';

export function PratoDoDia({ produto }) {
  if (!produto) return null;

  return (
    <section className="mb-8">
      <div className="bg-linear-to-r from-[#FFD93D] to-[#FFA500] rounded-xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">⭐ Prato do Dia</h2>

        <div className="grid md:grid-cols-[1fr_2fr] gap-4">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-48 object-cover rounded-lg"
          />

          <div className="flex flex-col justify-center">
            <h3 className="text-gray-900 mb-2">
              {produto.nome}
            </h3>

            <p className="text-gray-700 mb-3">
              {produto.descricao}
            </p>

            <p className="text-[#FF6B35]">
              {formatarMoeda(produto.preco)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}