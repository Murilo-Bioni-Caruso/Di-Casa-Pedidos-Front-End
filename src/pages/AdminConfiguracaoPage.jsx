import { useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { useRestaurante } from '../context/RestauranteContexto';
import { Save } from 'lucide-react';
import { diasSemana } from '../models/Constantes';

export const AdminConfiguracoesPage = () => {
  const { configuracoes, atualizarConfiguracoes } = useRestaurante();

  const [formData, setFormData] = useState(configuracoes);
  const [salvo, setSalvo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    atualizarConfiguracoes(formData);
    setSalvo(true);

    setTimeout(() => setSalvo(false), 3000);
  };

  const handleHorarioChange = (dia, campo, valor) => {
    setFormData({
      ...formData,
      horarioFuncionamento: {
        ...formData.horarioFuncionamento,
        [dia]: {
          ...formData.horarioFuncionamento[dia],
          [campo]: valor
        }
      }
    });
  };

  const toggleFechado = (dia) => {
    const atual = formData.horarioFuncionamento[dia];

    setFormData({
      ...formData,
      horarioFuncionamento: {
        ...formData.horarioFuncionamento,
        [dia]: atual
          ? null
          : { open: '09:00', close: '18:00' }
      }
    });
  };

  return (
    <LayoutAdmin>
      <div className="max-w-4xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Configurações do Restaurante</h2>

          {salvo && (
            <span className="text-green-600 text-sm">
              ✓ Salvo com sucesso!
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* INFO RESTAURANTE */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="border-b pb-3">Informações</h3>

            <input
              placeholder="Nome"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />

            <input
              placeholder="Endereço"
              value={formData.endereco}
              onChange={(e) =>
                setFormData({ ...formData, endereco: e.target.value })
              }
            />

            <input
              placeholder="Telefone"
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* HORÁRIOS */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="border-b pb-3">Horário de Funcionamento</h3>

            {diasSemana.map((dia) => {
              const horario = formData.horarioFuncionamento[dia.key];
              const fechado = !horario;

              return (
                <div key={dia.key} className="flex items-center gap-4">

                  <div className="w-32">{dia.label}</div>

                  <button
                    type="button"
                    onClick={() => toggleFechado(dia.key)}
                    className="text-sm text-blue-600"
                  >
                    {fechado ? 'Abrir' : 'Fechar'}
                  </button>

                  {!fechado ? (
                    <>
                      <input
                        type="time"
                        value={horario.open}
                        onChange={(e) =>
                          handleHorarioChange(dia.key, 'open', e.target.value)
                        }
                      />

                      <span>às</span>

                      <input
                        type="time"
                        value={horario.close}
                        onChange={(e) =>
                          handleHorarioChange(dia.key, 'close', e.target.value)
                        }
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

            <input
              type="number"
              placeholder="Raio grátis (km)"
              value={formData.raioEntregaGratis}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  raioEntregaGratis: parseFloat(e.target.value) || 0
                })
              }
            />

            <input
              type="number"
              placeholder="Taxa por km"
              value={formData.taxaPorKm}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  taxaPorKm: parseFloat(e.target.value) || 0
                })
              }
            />
          </div>

          {/* BOTÃO */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-3 rounded-lg"
            >
              <Save className="w-5 h-5" />
              Salvar
            </button>
          </div>

        </form>
      </div>
    </LayoutAdmin>
  );
};