import { useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { useRestaurante } from '../context/RestauranteContexto';
import { Save, Trash2, Plus } from 'lucide-react';
import { diasSemana } from '../models/Constantes';

const TIPOS_PIX = ['CPF', 'CNPJ', 'Email', 'Telefone', 'Chave aleatória'];

export const AdminConfiguracoesPage = () => {
  const { configuracoes, atualizarConfiguracoes } = useRestaurante();
  const [salvo, setSalvo] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [novaChave, setNovaChave] = useState({ tipo: 'Email', chave: '' });

  const [local, setLocal] = useState(() => ({
    ...configuracoes,
    chavesPix: [...(configuracoes.chavesPix || [])]
  }));

  const set = (campo, valor) =>
    setLocal(prev => ({ ...prev, [campo]: valor }));

  const setHorario = (dia, campo, valor) =>
    setLocal(prev => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: { ...prev.horarioFuncionamento[dia], [campo]: valor }
      }
    }));

  const toggleDia = (dia) =>
    setLocal(prev => ({
      ...prev,
      horarioFuncionamento: {
        ...prev.horarioFuncionamento,
        [dia]: prev.horarioFuncionamento[dia] ? null : { open: '09:00', close: '18:00' }
      }
    }));

  const adicionarChavePix = () => {
    if (!novaChave.chave.trim()) return;
    setLocal(prev => ({ ...prev, chavesPix: [...(prev.chavesPix || []), { ...novaChave }] }));
    setNovaChave({ tipo: 'Email', chave: '' });
  };

  const removerChavePix = (index) =>
    setLocal(prev => ({ ...prev, chavesPix: (prev.chavesPix || []).filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSalvando(true);
    try {
      await atualizarConfiguracoes(local);
      setSalvo(true);
      setTimeout(() => setSalvo(false), 3000);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <LayoutAdmin>
      <div className="max-w-4xl">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Configurações do Restaurante</h2>
          {salvo && <span className="text-green-600 text-sm">✓ Salvo com sucesso!</span>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* INFO RESTAURANTE */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="border-b pb-3">Informações</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                placeholder="Nome do restaurante"
                value={local.nome}
                onChange={(e) => set('nome', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input
                placeholder="Endereço"
                value={local.endereco}
                onChange={(e) => set('endereco', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                placeholder="Telefone"
                value={local.telefone}
                onChange={(e) => set('telefone', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                placeholder="Email"
                value={local.email}
                onChange={(e) => set('email', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="filtrarPorDia"
                checked={local.filtrarPorDia}
                onChange={(e) => set('filtrarPorDia', e.target.checked)}
                className="w-4 h-4 text-[#FF6B35] rounded focus:ring-[#FF6B35]"
              />
              <label htmlFor="filtrarPorDia" className="text-sm text-gray-700 font-medium cursor-pointer">
                Filtrar cardápio automaticamente por dia da semana
              </label>
            </div>
          </div>

          {/* HORÁRIOS */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="border-b pb-3">Horário de Funcionamento</h3>

            {diasSemana.map((dia) => {
              const horario = local.horarioFuncionamento[dia.key];
              const fechado = !horario;

              return (
                <div key={dia.key} className="flex items-center gap-4">
                  <div className="w-32">{dia.label}</div>

                  <button
                    type="button"
                    onClick={() => toggleDia(dia.key)}
                    className="text-sm text-blue-600"
                  >
                    {fechado ? 'Abrir' : 'Fechar'}
                  </button>

                  {!fechado ? (
                    <>
                      <input
                        type="time"
                        value={horario.open}
                        onChange={(e) => setHorario(dia.key, 'open', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                      <span>às</span>
                      <input
                        type="time"
                        value={horario.close}
                        onChange={(e) => setHorario(dia.key, 'close', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    </>
                  ) : (
                    <span className="text-gray-500">Fechado</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* ENTREGA */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="border-b pb-3">Entrega</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Raio de entrega grátis (km)
              </label>
              <p className="text-xs text-gray-500 mb-2">Entregas dentro desse raio não cobram taxa</p>
              <input
                type="number"
                value={local.raioEntregaGratis}
                onChange={(e) => set('raioEntregaGratis', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taxa por km (R$)
              </label>
              <p className="text-xs text-gray-500 mb-2">Valor cobrado por km acima do raio grátis</p>
              <input
                type="number"
                value={local.taxaPorKm}
                onChange={(e) => set('taxaPorKm', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* PIX */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="border-b pb-3">Chaves PIX</h3>

            {(local.chavesPix || []).length === 0 && (
              <p className="text-sm text-gray-500">Nenhuma chave cadastrada.</p>
            )}

            {(local.chavesPix || []).map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xs font-semibold text-gray-500 w-24 shrink-0">{item.tipo}</span>
                <span className="text-sm text-gray-800 flex-1 font-mono break-all">{item.chave}</span>
                <button
                  type="button"
                  onClick={() => removerChavePix(i)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <select
                value={novaChave.tipo}
                onChange={(e) => setNovaChave({ ...novaChave, tipo: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                {TIPOS_PIX.map(t => <option key={t}>{t}</option>)}
              </select>
              <input
                type="text"
                placeholder="Chave PIX"
                value={novaChave.chave}
                onChange={(e) => setNovaChave({ ...novaChave, chave: e.target.value })}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={adicionarChavePix}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </div>
          </div>

          {/* BOTÃO */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={salvando}
              className="flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>

        </form>
      </div>
    </LayoutAdmin>
  );
};
