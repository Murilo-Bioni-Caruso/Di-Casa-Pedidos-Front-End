import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, GripVertical } from 'lucide-react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { useRestaurante } from '../context/RestauranteContexto';

const emojisRapidos = ['🍱', '🍗', '🥤', '🍰', '🍜', '🫕', '🥩', '🍔', '🌮', '🍕', '🥗', '🍛', '☕', '🎂', '🍦', '🥪'];

const formVazio = { nome: '', emoji: '🍽️', ativo: true, ordem: 0 };

export const AdminCategoriasPage = () => {
    const { categorias, adicionarCategoria, atualizarCategoria, removerCategoria, recarregarCategorias } = useRestaurante();

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [formData, setFormData] = useState(formVazio);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    const handleAbrirNova = () => {
        setEditando(null);
        setFormData({ ...formVazio, ordem: categorias.length });
        setErro('');
        setShowModal(true);
    };

    const handleEditar = (cat) => {
        setEditando(cat);
        setFormData({ nome: cat.nome, emoji: cat.emoji || '🍽️', ativo: cat.ativo, ordem: cat.ordem });
        setErro('');
        setShowModal(true);
    };

    const handleFechar = () => {
        setShowModal(false);
        setEditando(null);
        setErro('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nome.trim()) {
            setErro('Nome é obrigatório.');
            return;
        }
        setSalvando(true);
        setErro('');
        try {
            if (editando) {
                await atualizarCategoria({ ...editando, ...formData });
            } else {
                await adicionarCategoria(formData);
            }
            handleFechar();
        } catch {
            setErro('Erro ao salvar categoria.');
        } finally {
            setSalvando(false);
        }
    };

    const handleRemover = async (cat) => {
        if (!window.confirm(`Remover categoria "${cat.nome}"? Os produtos vinculados perderão a categoria.`)) return;
        try {
            await removerCategoria(cat.id);
        } catch {
            alert('Erro ao remover categoria.');
        }
    };

    const handleToggleAtivo = async (cat) => {
        await atualizarCategoria({ ...cat, ativo: !cat.ativo });
    };

    return (
        <LayoutAdmin>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-gray-900">Categorias</h2>
                        <p className="text-sm text-gray-500">Gerencie as categorias do cardápio</p>
                    </div>
                    <button
                        onClick={handleAbrirNova}
                        className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF5722] text-white px-4 py-2 rounded-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Nova Categoria
                    </button>
                </div>

                {/* Lista */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {categorias.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            Nenhuma categoria cadastrada. Clique em "Nova Categoria" para começar.
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-4 py-3 text-sm text-gray-600">Categoria</th>
                                    <th className="text-center px-4 py-3 text-sm text-gray-600">Ordem</th>
                                    <th className="text-center px-4 py-3 text-sm text-gray-600">Status</th>
                                    <th className="text-right px-4 py-3 text-sm text-gray-600">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...categorias]
                                    .sort((a, b) => a.ordem - b.ordem)
                                    .map((cat) => (
                                    <tr key={cat.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <GripVertical className="w-4 h-4 text-gray-300" />
                                                <span className="text-2xl">{cat.emoji}</span>
                                                <span className="font-medium text-gray-900">{cat.nome}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600">{cat.ordem}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleToggleAtivo(cat)}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                                                    cat.ativo
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                            >
                                                {cat.ativo ? 'Ativa' : 'Inativa'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditar(cat)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleRemover(cat)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                    💡 O nome da categoria deve coincidir (sem maiúsculas) com o campo "categoria" dos produtos.
                    Ex: categoria "Marmitas" → produtos com categoria "marmitas".
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex justify-between p-4 border-b">
                            <h2>{editando ? 'Editar Categoria' : 'Nova Categoria'}</h2>
                            <button onClick={handleFechar}><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {erro && (
                                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg">
                                    {erro}
                                </div>
                            )}

                            {/* Emoji */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Emoji</label>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-4xl">{formData.emoji}</span>
                                    <input
                                        value={formData.emoji}
                                        onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                                        maxLength={2}
                                        className="w-20 border border-gray-300 px-3 py-2 rounded-lg text-center text-xl focus:ring-2 focus:ring-[#FF6B35] outline-none"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {emojisRapidos.map(e => (
                                        <button
                                            key={e}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, emoji: e })}
                                            className={`text-xl p-1.5 rounded-lg hover:bg-gray-100 transition-colors ${formData.emoji === e ? 'bg-orange-100 ring-2 ring-[#FF6B35]' : ''}`}
                                        >
                                            {e}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Nome */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Nome *</label>
                                <input
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    placeholder="Ex: Marmitas, Assados, Bebidas..."
                                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none"
                                    required
                                />
                            </div>

                            {/* Ordem */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Ordem de exibição</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.ordem}
                                    onChange={(e) => setFormData({ ...formData, ordem: parseInt(e.target.value) || 0 })}
                                    className="w-24 border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#FF6B35] outline-none"
                                />
                            </div>

                            {/* Ativo */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.ativo}
                                    onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
                                    className="w-4 h-4 text-[#FF6B35]"
                                />
                                <span className="text-sm text-gray-700">Categoria ativa (visível para clientes)</span>
                            </label>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={salvando}
                                    className="flex-1 bg-[#FF6B35] text-white py-3 rounded-lg font-bold hover:bg-[#FF5722] transition-colors disabled:opacity-50"
                                >
                                    {salvando ? 'Salvando...' : 'Salvar'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleFechar}
                                    className="flex-1 bg-gray-200 py-3 rounded-lg font-bold hover:bg-gray-300"
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
