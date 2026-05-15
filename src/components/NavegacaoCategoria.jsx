import { categoriasEmojis } from "../util/CategoriasEmojis";


export function NavegacaoCategorias({ categoriaAtiva, aoSelecionarCategoria }) {
  return (
    <div className="sticky top-[var(--header-height,140px)] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categoriasEmojis.map((cat) => (
            <button
              key={cat.id}
              onClick={() => aoSelecionarCategoria(cat.id)}
              className={`
                shrink-0 px-4 py-2 rounded-full transition-all
                ${
                  categoriaAtiva === cat.id
                    ? 'bg-[#FF6B35] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}