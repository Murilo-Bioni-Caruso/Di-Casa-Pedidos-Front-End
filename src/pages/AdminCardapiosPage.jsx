import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { useRestaurante } from '../context/RestauranteContexto';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { categoriasEmojis } from '../util/CategoriasEmojis';
import { Categoria } from '../models/Constantes';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea';
import { Select } from '../components/Select';
import { aceitaApenasLetras, formatarMoedaInput } from '../util/Mascaras';
import { InputMoeda } from '../components/InputMoeda';

export const AdminCardapiosPage = () => {
    const {
        produtos,
        adicionarProduto,
        atualizarProduto,
        removerProduto,
        filtrarProdutos
    } = useRestaurante();

    const [showModal, setShowModal] = useState(false);
    const [produtoEditado, setProdutoEditado] = useState(null);
    const [categoriaFiltrada, setFiltrarCategoria] = useState('all');
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: 0,
        categoria: 'marmitas',
        imagem: ''
    });

    const resetForm = () => {
        setFormData({
            nome: '',
            descricao: '',
            preco: 0,
            categoria: 'marmitas',
            imagem: ''
        });
        setProdutoEditado(null);
    };

    const handleOpenModal = (produto) => {
        if (produto) {
            setProdutoEditado(produto);
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

        if (produtoEditado) {
            atualizarProduto({
                ...formData,
                id: produtoEditado.id
            });
        } else {
            adicionarProduto(formData);
        }

        handleCloseModal();
    };

    const handleDelete = (produtoId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            removerProduto(produtoId);
        }
    };

    const produtosFiltrados = filtrarProdutos(categoriaFiltrada);

    return (
        <LayoutAdmin>
            <div className="space-y-6">
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
                    {categoriasEmojis.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFiltrarCategoria(cat.id)}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap ${categoriaFiltrada === cat.id
                                ? 'bg-[#FF6B35] text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {cat.emoji} {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produtosFiltrados.map((produto) => {
                        const categoria = categoriasEmojis.find(
        (c) => c.id === produto.categoria
    );
                        return (
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
                                    {categoria?.emoji} {categoria?.label}
                                </span>
                            </div>
                        </div>
                    )})}
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
                                {produtoEditado ? 'Editar Produto' : 'Novo Produto'}
                            </h2>

                            <button onClick={handleCloseModal}>
                                <X />
                            </button>
                        </div>

                        {/* form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <Input
                                placeholder="Nome"
                                value={formData.nome}
                                onChange={(e) =>
                                    setFormData({ ...formData, nome: e.target.value })
                                }
                                mask={aceitaApenasLetras}
                            />
                            <TextArea
                                placeholder="Descrição"
                                value={formData.descricao}
                                onChange={(e) =>
                                    setFormData({ ...formData, descricao: e.target.value })
                                }
                            />
                            <InputMoeda
                                value={formData.preco}
                                onChange={(numero) =>
                                    setFormData({
                                        ...formData,
                                        preco: numero
                                    })
                                }
                            />
                            <Select
                                value={formData.categoria}
                                onChange={(e) =>
                                    setFormData({ ...formData, categoria: e.target.value })
                                }
                                options={[
                                    { value: Categoria.MARMITAS, label: 'Marmitas' },
                                    { value: Categoria.ASSADOS, label: 'Assados' },
                                    { value: Categoria.BEBIDAS, label: 'Bebidas' },
                                    { value: Categoria.SOBREMESAS, label: 'Sobremesas' }
                                ]}
                            />
                            <Input
                                placeholder="Imagem URL"
                                value={formData.imagem}
                                onChange={(e) =>
                                    setFormData({ ...formData, imagem: e.target.value })
                                }
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