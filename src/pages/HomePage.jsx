import { useState } from 'react';
import { CartaoProduto } from '../components/CartaoProduto';
import { NavegacaoCategorias } from '../components/NavegacaoCategoria';
import { useRestaurante } from '../context/RestauranteContexto';
import { Categoria, getDiaAtual } from '../models/Constantes';
import { formatarMoeda } from '../util/ConversorDeMoeda';

export function Home() {
    const [categoriaAtiva, setCategoriaAtiva] = useState('all');
    const { produtos } = useRestaurante();

    // Filtrar produtos
    const produtosFiltrados =
        categoriaAtiva === 'all'
            ? produtos
            : produtos.filter(p => p.categoria === categoriaAtiva);

    // Prato do dia
    const diaAtual = getDiaAtual();
    const pratoDoDia = produtos.find(p => p.diaDaSemana === diaAtual.key);

    // Nome da categoria
    const nomeCategoria = () => {
        if (categoriaAtiva === 'all') return 'Todos os Produtos';
        if (categoriaAtiva === Categoria.MARMITAS) return 'Marmitas';
        if (categoriaAtiva === Categoria.ASSADOS) return 'Assados';
        if (categoriaAtiva === Categoria.BEBIDAS) return 'Bebidas';
        return 'Sobremesas';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavegacaoCategorias categoriaAtiva={categoriaAtiva} aoSelecionarCategoria={setCategoriaAtiva} />

            <main className="container mx-auto px-4 py-6">

                {/* Prato do Dia */}
                {categoriaAtiva === 'all' && pratoDoDia && (
                    <section className="mb-8">
                        <div className="bg-gradient-to-r from-[#FFD93D] to-[#FFA500] rounded-xl p-6 shadow-lg">
                            <h2 className="text-gray-900 mb-4">⭐ Prato do Dia</h2>

                            <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                                <img
                                    src={pratoDoDia.imagem}
                                    alt={pratoDoDia.nome}
                                    className="w-full h-48 object-cover rounded-lg"
                                />

                                <div className="flex flex-col justify-center">
                                    <h3 className="text-gray-900 mb-2">
                                        {pratoDoDia.nome}
                                    </h3>

                                    <p className="text-gray-700 mb-3">
                                        {pratoDoDia.descricao}
                                    </p>

                                    <p className="text-[#FF6B35]">
                                        R$ {formatarMoeda(pratoDoDia.preco)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Título */}
                <div className="mb-4">
                    <h2 className="text-gray-900">
                        {nomeCategoria()}
                    </h2>

                    <p className="text-gray-600">
                        {produtosFiltrados.length}{' '}
                        {produtosFiltrados.length === 1 ? 'produto' : 'produtos'}
                    </p>
                </div>

                {/* Lista de produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {produtosFiltrados.map(produto => (
                        <CartaoProduto key={produto.id} produto={produto} />
                    ))}
                </div>

                {/* Vazio */}
                {produtosFiltrados.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            Nenhum produto encontrado nesta categoria.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}