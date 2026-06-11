import { Edit2, Plus, Trash2, X, Upload } from 'lucide-react';
import { useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { useRestaurante } from '../context/RestauranteContexto';
import { formatarMoeda } from '../util/ConversorDeMoeda';
import { diasSemana } from '../models/Constantes';
import { Input } from '../components/Input';
import { TextArea } from '../components/TextArea';
import { Select } from '../components/Select';
import { aceitaApenasLetras } from '../util/Mascaras';
import { InputMoeda } from '../components/InputMoeda';
import { FotoProduto } from '../components/ProdutoFoto';

const TODOS_OS_DIAS = diasSemana.map(d => d.key);

const formInicial = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    imagem: '',
    diaDaSemana: [],
    variantes: []
};

export const AdminCardapiosPage = () => {
    const {
        produtos,
        adicionarProduto,
        atualizarProduto,
        removerProduto,
        filtrarProdutos,
        categorias
    } = useRestaurante();

    const [showModal, setShowModal] = useState(false);
    const [produtoEditado, setProdutoEditado] = useState(null);
    const [categoriaFiltrada, setFiltrarCategoria] = useState('all');
    const [uploadando, setUploadando] = useState(false);
    const [formData, setFormData] = useState(formInicial);

    const categoriasOpcoes = categorias.map(c => ({
        value: c.nome.toLowerCase(),
        label: `${c.emoji} ${c.nome}`
    }));

    const todasCategoriasFiltro = [
        { id: 'all', label: 'Todos', emoji: '🍽️' },
        ...categorias.map(c => ({ id: c.nome.toLowerCase(), label: c.nome, emoji: c.emoji }))
    ];

    const resetForm = () => {
        setFormData({ ...formInicial, categoria: categorias[0]?.nome?.toLowerCase() ?? '' });
        setProdutoEditado(null);
    };

    const handleOpenModal = (produto) => {
        if (produto) {
            setProdutoEditado(produto);
            const dias = Array.isArray(produto.diaDaSemana)
                ? produto.diaDaSemana
                : (produto.diaDaSemana ? [produto.diaDaSemana] : []);
            setFormData({
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco.toString(),
                categoria: produto.categoria,
                imagem: produto.imagem,
                diaDaSemana: dias,
                variantes: Array.isArray(produto.variantes)
                    ? produto.variantes.map((variante) => ({
                        ...variante,
                        opcoes: Array.isArray(variante.opcoes)
                            ? variante.opcoes.map((opcao) => ({
                                ...opcao,
                                preco: Number.isFinite(opcao.preco)
                                    ? opcao.preco
                                    : (Number(produto.preco) || 0) + (Number(opcao.precoExtra) || 0)
                            }))
                            : []
                    }))
                    : []
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

    const handleDiaToggle = (diaKey) => {
        setFormData(prev => {
            const dias = [...prev.diaDaSemana];
            const index = dias.indexOf(diaKey);
            if (index > -1) dias.splice(index, 1);
            else dias.push(diaKey);
            return { ...prev, diaDaSemana: dias };
        });
    };

    const handleMarcarTodos = () => setFormData(prev => ({ ...prev, diaDaSemana: [...TODOS_OS_DIAS] }));
    const handleDesmarcarTodos = () => setFormData(prev => ({ ...prev, diaDaSemana: [] }));

    // ─── Variantes ────────────────────────────────────────

    const adicionarVariante = () => {
        setFormData(prev => ({
            ...prev,
            variantes: [...prev.variantes, { label: '', opcoes: [{ nome: '', preco: 0 }] }]
        }));
    };

    const removerVariante = (i) => {
        setFormData(prev => ({ ...prev, variantes: prev.variantes.filter((_, idx) => idx !== i) }));
    };

    const atualizarVariante = (i, campo, valor) => {
        setFormData(prev => ({
            ...prev,
            variantes: prev.variantes.map((v, idx) => idx === i ? { ...v, [campo]: valor } : v)
        }));
    };

    const adicionarOpcao = (vi) => {
        setFormData(prev => ({
            ...prev,
            variantes: prev.variantes.map((v, idx) =>
                idx === vi ? { ...v, opcoes: [...v.opcoes, { nome: '', preco: 0 }] } : v
            )
        }));
    };

    const removerOpcao = (vi, oi) => {
        setFormData(prev => ({
            ...prev,
            variantes: prev.variantes.map((v, idx) =>
                idx === vi ? { ...v, opcoes: v.opcoes.filter((_, i) => i !== oi) } : v
            )
        }));
    };

    const atualizarOpcao = (vi, oi, campo, valor) => {
        setFormData(prev => ({
            ...prev,
            variantes: prev.variantes.map((v, idx) =>
                idx === vi
                    ? { ...v, opcoes: v.opcoes.map((o, i) => i === oi ? { ...o, [campo]: valor } : o) }
                    : v
            )
        }));
    };

    // ─── Upload ───────────────────────────────────────────

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadando(true);
        try {
            const dados = new FormData();
            dados.append('imagem', file);
            const resposta = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                body: dados
            });
            const json = await resposta.json();
            setFormData(prev => ({ ...prev, imagem: json.url }));
        } catch {
            alert('Erro ao fazer upload da imagem. Verifique se o servidor está rodando.');
        } finally {
            setUploadando(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const variantesLimpas = formData.variantes
            .filter(v => v.label.trim())
            .map(v => ({
                ...v,
                opcoes: v.opcoes
                    .filter(o => o.nome.trim())
                    .map(o => ({
                        nome: o.nome,
                        preco: Number(o.preco) || 0
                    }))
            }));
        const dados = { ...formData, variantes: variantesLimpas };
        if (produtoEditado) {
            atualizarProduto({ ...dados, id: produtoEditado.id });
        } else {
            adicionarProduto(dados);
        }
        handleCloseModal();
    };

    const handleDelete = (produtoId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            removerProduto(produtoId);
        }
    };

    const produtosFiltrados = filtrarProdutos(categoriaFiltrada);
    const todosMarcados = formData.diaDaSemana.length === TODOS_OS_DIAS.length;

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
                    {todasCategoriasFiltro.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFiltrarCategoria(cat.id)}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                                categoriaFiltrada === cat.id
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
                        const cat = categorias.find(c => c.nome.toLowerCase() === produto.categoria);
                        const temVariantes = Array.isArray(produto.variantes) && produto.variantes.length > 0;
                        return (
                            <div key={produto.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="h-48 w-full overflow-hidden">
                                    <FotoProduto src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-gray-900">{produto.nome}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{produto.descricao}</p>
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                                        <span className="text-[#FF6B35]">{formatarMoeda(produto.preco)}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenModal(produto)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(produto.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {cat && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-[10px] rounded uppercase font-bold">
                                                {cat.emoji} {cat.nome}
                                            </span>
                                        )}
                                        {temVariantes && (
                                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] rounded font-bold">
                                                {produto.variantes.length} variante(s)
                                            </span>
                                        )}
                                        {Array.isArray(produto.diaDaSemana) && produto.diaDaSemana.map(d => (
                                            <span key={d} className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] rounded uppercase font-bold">
                                                {d.substring(0, 3)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {produtosFiltrados.length === 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <p className="text-gray-500">Nenhum produto encontrado nesta categoria</p>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between p-4 border-b sticky top-0 bg-white rounded-t-xl">
                            <h2>{produtoEditado ? 'Editar Produto' : 'Novo Produto'}</h2>
                            <button onClick={handleCloseModal}><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <Input
                                placeholder="Nome"
                                value={formData.nome}
                                onChange={(valor) => setFormData({ ...formData, nome: valor })}
                                mask={aceitaApenasLetras}
                            />
                            <TextArea
                                placeholder="Descrição"
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            />
                            <InputMoeda
                                value={formData.preco}
                                onChange={(numero) => setFormData({ ...formData, preco: numero })}
                            />

                            {/* Categoria */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Categoria</label>
                                <Select
                                    value={formData.categoria}
                                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                    options={categoriasOpcoes}
                                />
                            </div>

                            {/* Dias da semana */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">Dias da Semana</label>
                                    <button
                                        type="button"
                                        onClick={todosMarcados ? handleDesmarcarTodos : handleMarcarTodos}
                                        className="text-xs px-3 py-1 rounded-full border border-[#FF6B35] text-[#FF6B35] hover:bg-orange-50"
                                    >
                                        {todosMarcados ? 'Desmarcar todos' : 'Marcar todos'}
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-50 p-3 rounded-lg border">
                                    {diasSemana.map((d) => (
                                        <label key={d.key} className="flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.diaDaSemana.includes(d.key)}
                                                onChange={() => handleDiaToggle(d.key)}
                                                className="w-4 h-4 text-[#FF6B35] rounded"
                                            />
                                            <span className="text-sm text-gray-700">{d.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-1 italic">
                                    Se nenhum dia selecionado, disponível todos os dias.
                                </p>
                            </div>

                            {/* Variantes */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">Variantes (opcional)</label>
                                    <button
                                        type="button"
                                        onClick={adicionarVariante}
                                        className="text-xs px-3 py-1 rounded-full border border-[#FF6B35] text-[#FF6B35] hover:bg-orange-50 flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Adicionar Variante
                                    </button>
                                </div>

                                {formData.variantes.length === 0 && (
                                    <p className="text-xs text-gray-400 italic">
                                        Nenhuma variante. Ex: Tamanho (Pequena/Média/Grande), Sabor, Porção.
                                    </p>
                                )}

                                <div className="space-y-4">
                                    {formData.variantes.map((variante, vi) => (
                                        <div key={vi} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <input
                                                    placeholder="Nome da variante (ex: Tamanho)"
                                                    value={variante.label}
                                                    onChange={(e) => atualizarVariante(vi, 'label', e.target.value)}
                                                    className="flex-1 border border-gray-300 px-2 py-1.5 rounded-lg text-sm focus:ring-1 focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removerVariante(vi)}
                                                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-1.5">
                                                {variante.opcoes.map((opcao, oi) => (
                                                    <div key={oi} className="flex items-center gap-2">
                                                        <input
                                                            placeholder="Nome da opção (ex: Grande)"
                                                            value={opcao.nome}
                                                            onChange={(e) => atualizarOpcao(vi, oi, 'nome', e.target.value)}
                                                            className="flex-1 border border-gray-300 px-2 py-1.5 rounded-lg text-sm focus:ring-1 focus:ring-[#FF6B35] outline-none"
                                                        />
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-xs text-gray-500">R$</span>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="0.5"
                                                                value={opcao.preco}
                                                                onChange={(e) => atualizarOpcao(vi, oi, 'preco', parseFloat(e.target.value) || 0)}
                                                                className="w-24 border border-gray-300 px-2 py-1.5 rounded-lg text-sm focus:ring-1 focus:ring-[#FF6B35] outline-none"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removerOpcao(vi, oi)}
                                                            className="p-1 text-red-400 hover:bg-red-50 rounded"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => adicionarOpcao(vi)}
                                                    className="text-xs text-[#FF6B35] hover:underline mt-1"
                                                >
                                                    + Adicionar opção
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Imagem */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block">Imagem do Produto</label>
                                <div className="flex gap-4 items-start">
                                    {formData.imagem && (
                                        <div className="w-24 h-24 rounded-lg overflow-hidden border flex-shrink-0">
                                            <img src={formData.imagem} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-2">
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="image-upload"
                                                disabled={uploadando}
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className={`flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 cursor-pointer transition-all w-full ${
                                                    uploadando
                                                        ? 'border-gray-200 bg-gray-50 cursor-wait'
                                                        : 'border-gray-300 hover:border-[#FF6B35] hover:bg-orange-50'
                                                }`}
                                            >
                                                <Upload className={`w-5 h-5 ${uploadando ? 'text-gray-300' : 'text-gray-400'}`} />
                                                <span className="text-sm text-gray-600">
                                                    {uploadando ? 'Enviando...' : 'Fazer Upload de Imagem'}
                                                </span>
                                            </label>
                                        </div>
                                        <input
                                            placeholder="Ou cole o link da imagem aqui..."
                                            value={formData.imagem?.startsWith('http') ? formData.imagem : ''}
                                            onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                                            className="w-full border p-2 rounded-lg text-sm focus:ring-[#FF6B35] focus:border-[#FF6B35] outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={uploadando}
                                    className="flex-1 bg-[#FF6B35] text-white py-3 rounded-lg font-bold shadow-lg hover:bg-[#FF5722] transition-colors disabled:opacity-50"
                                >
                                    Salvar Alterações
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-gray-200 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
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
