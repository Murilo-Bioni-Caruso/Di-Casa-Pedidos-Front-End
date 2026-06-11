import { useState } from 'react';
import { CartaoProduto } from '../components/CartaoProduto';
import { NavegacaoCategorias } from '../components/NavegacaoCategoria';
import { PratoDoDia } from '../components/PratoDoDia';
import { useRestaurante } from '../context/RestauranteContexto';

export function HomePage() {
    const [categoriaAtiva, setCategoriaAtiva] = useState('all');
    const { filtrarProdutos, getPratoDoDia, categorias } = useRestaurante();

    const produtosFiltrados = filtrarProdutos(categoriaAtiva, true);
    const pratoDoDia = getPratoDoDia();

    const nomeCategoria = categoriaAtiva === 'all'
        ? 'Todos os Produtos'
        : categorias.find(c => c.nome.toLowerCase() === categoriaAtiva)?.nome ?? 'Produtos';

    return (
        <div className="min-h-screen bg-gray-50">
            <NavegacaoCategorias categoriaAtiva={categoriaAtiva} aoSelecionarCategoria={setCategoriaAtiva} />

            <main className="container mx-auto px-4 py-6">

                {categoriaAtiva === 'all' && pratoDoDia && (
                    <PratoDoDia produto={pratoDoDia} />
                )}

                <div className="mb-4">
                    <h2 className="text-gray-900">{nomeCategoria}</h2>
                    <p className="text-gray-600">
                        {produtosFiltrados.length}{' '}
                        {produtosFiltrados.length === 1 ? 'produto' : 'produtos'}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {produtosFiltrados.map(produto => (
                        <CartaoProduto key={produto.id} produto={produto} />
                    ))}
                </div>

                {produtosFiltrados.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
