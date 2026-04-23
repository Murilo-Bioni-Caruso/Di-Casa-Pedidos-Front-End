import { useState } from 'react';
import { LayoutAdmin } from '../components/LayoutAdmin';
import { useRestaurante } from '../context/RestauranteContexto';
import { Save } from 'lucide-react';
import { diasSemana } from '../models/Constantes';

export const AdminConfiguracoesPage = () => {
  const { configuracoes, atualizarConfiguracoes, atualizarHorario, toggleDiaFuncionamento } = useRestaurante();
  const [salvo, setSalvo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
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
              value={configuracoes.nome}
              onChange={(e) =>
                atualizarConfiguracoes({ nome: e.target.value })
              }
            />

            <input
              placeholder="Endereço"
              value={configuracoes.endereco}
              onChange={(e) =>
                atualizarConfiguracoes({ endereco: e.target.value })
              }
            />

            <input
              placeholder="Telefone"
              value={configuracoes.telefone}
              onChange={(e) =>
                atualizarConfiguracoes({ telefone: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={configuracoes.email}
              onChange={(e) =>
                atualizarConfiguracoes({ email: e.target.value })
              }
            />
          </div>

          {/* HORÁRIOS */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="border-b pb-3">Horário de Funcionamento</h3>

            {diasSemana.map((dia) => {
              const horario = configuracoes.horarioFuncionamento[dia.key];
              const fechado = !horario;

              return (
                <div key={dia.key} className="flex items-center gap-4">

                  <div className="w-32">{dia.label}</div>

                  <button
                    type="button"
                    onClick={() => toggleDiaFuncionamento(dia.key)}
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
                          atualizarHorario(dia.key, 'open', e.target.value)
                        }
                      />

                      <span>às</span>

                      <input
                        type="time"
                        value={horario.close}
                        onChange={(e) =>
                          atualizarHorario(dia.key, 'close', e.target.value)
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
              value={configuracoes.raioEntregaGratis}
              onChange={(e) =>
                atualizarConfiguracoes({
                  raioEntregaGratis: parseFloat(e.target.value) || 0
                })
              }
            />

            <input
              type="number"
              value={configuracoes.taxaPorKm}
              onChange={(e) =>
                atualizarConfiguracoes({
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