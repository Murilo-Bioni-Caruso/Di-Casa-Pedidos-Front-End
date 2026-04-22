import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { useRestaurante } from '../context/RestauranteContexto';
import { formatarMoeda } from '../util/ConversorDeMoeda';

export const AdminCardapiosPage = () => {
    const {
        produtos,
        adicionarProduto,
        atualizarProduto,
        removerProduto
    } = useRestaurante();

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        categoria: 'marmitas',
        imagem: ''
    });

    const resetForm = () => {
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            categoria: 'marmitas',
            imagem: ''
        });
        setEditingProduct(null);
    };

    const handleOpenModal = (produto) => {
        if (produto) {
            setEditingProduct(produto);
            setFormData({
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco.toString(),
                categoria: produto.categoria,
                imagem: produto.imagem
            });
        } else {
            resetForm();
        }

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const produtoData = {
            id: editingProduct?.id || `produto-${Date.now()}`,
            nome: formData.nome,
            descricao: formData.descricao,
            preco: parseFloat(formData.preco),
            categoria: formData.categoria,
            imagem:
                formData.imagem ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
        };

        if (editingProduct) {
            atualizarProduto(produtoData);
        } else {
            adicionarProduto(produtoData);
        }

        handleCloseModal();
    };

    const handleDelete = (produtoId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            removerProduto(produtoId);
        }
    };

    const produtosFiltrados =
        filterCategory === 'all'
            ? produtos
            : produtos.filter((p) => p.categoria === filterCategory);

    const categoriaLabels = {
        all: 'Todos',
        marmitas: 'Marmitas',
        assados: 'Assados',
        bebidas: 'Bebidas',
        sobremesas: 'Sobremesas'
    };

    return (
        <LayoutAdmin>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-gray-900">Gerenciar Cardápio</h2>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Adicionar Produto
                    </button>
                </div>

                {/* Filtro */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {['all', 'marmitas', 'assados', 'bebidas', 'sobremesas'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap ${filterCategory === cat
                                    ? 'bg-[#FF6B35] text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {categoriaLabels[cat]}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produtosFiltrados.map((produto) => (
                        <div key={produto.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <img
                                src={produto.imagem}
                                alt={produto.nome}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="text-gray-900">{produto.nome}</h3>
                                <p className="text-sm text-gray-600 mt-1">{produto.descricao}</p>

                                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                                    <span className="text-[#FF6B35]">
                                        {formatarMoeda(produto.preco)}
                                    </span>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenModal(produto)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(produto.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                    {categoriaLabels[produto.categoria]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* vazio */}
                {produtosFiltrados.length === 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <p className="text-gray-500">
                            Nenhum produto encontrado nesta categoria
                        </p>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">

                        {/* header */}
                        <div className="flex justify-between p-4 border-b">
                            <h2>
                                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                            </h2>

                            <button onClick={handleCloseModal}>
                                <X />
                            </button>
                        </div>

                        {/* form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">

                            <input
                                placeholder="Nome"
                                value={formData.nome}
                                onChange={(e) =>
                                    setFormData({ ...formData, nome: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <textarea
                                placeholder="Descrição"
                                value={formData.descricao}
                                onChange={(e) =>
                                    setFormData({ ...formData, descricao: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="number"
                                placeholder="Preço"
                                value={formData.preco}
                                onChange={(e) =>
                                    setFormData({ ...formData, preco: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <select
                                value={formData.categoria}
                                onChange={(e) =>
                                    setFormData({ ...formData, categoria: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            >
                                <option value="marmitas">Marmitas</option>
                                <option value="assados">Assados</option>
                                <option value="bebidas">Bebidas</option>
                                <option value="sobremesas">Sobremesas</option>
                            </select>

                            <input
                                placeholder="Imagem URL"
                                value={formData.imagem}
                                onChange={(e) =>
                                    setFormData({ ...formData, imagem: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            />

                            <div className="flex gap-3">
                                <button className="flex-1 bg-[#FF6B35] text-white py-2 rounded">
                                    Salvar
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-gray-200 py-2 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </LayoutAdmin>
    );
};