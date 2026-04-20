// View: Admin Settings Page
import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { useRestaurant } from '../contexts/RestaurantContext';
import { Save } from 'lucide-react';

export const AdminSettingsPage = () => {
  const { settings, updateSettings } = useRestaurant();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const daysOfWeek = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleHourChange = (day: string, field: 'open' | 'close', value: string) => {
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: {
          ...formData.openingHours[day],
          [field]: value
        }
      }
    });
  };

  const toggleDayClosed = (day: string) => {
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: {
          ...formData.openingHours[day],
          closed: !formData.openingHours[day].closed
        }
      }
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Configurações do Restaurante</h2>
          {saved && (
            <span className="text-green-600 text-sm">✓ Salvo com sucesso!</span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Restaurant Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="text-gray-900 border-b pb-3">Informações do Restaurante</h3>
            
            <div>
              <label className="block text-gray-700 mb-2">Nome do Restaurante</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Endereço</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">E-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="text-gray-900 border-b pb-3">Horário de Funcionamento</h3>
            
            {daysOfWeek.map(day => {
              const hours = formData.openingHours[day.key];
              const isClosed = hours?.closed;

              return (
                <div key={day.key} className="flex items-center gap-4">
                  <div className="w-32">
                    <label className="text-gray-700">{day.label}</label>
                  </div>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!isClosed}
                      onChange={() => toggleDayClosed(day.key)}
                      className="w-4 h-4 text-[#FF6B35]"
                    />
                    <span className="text-sm text-gray-600">Aberto</span>
                  </label>

                  {!isClosed && (
                    <>
                      <input
                        type="time"
                        value={hours?.open || '09:00'}
                        onChange={(e) => handleHourChange(day.key, 'open', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                      />
                      <span className="text-gray-600">às</span>
                      <input
                        type="time"
                        value={hours?.close || '18:00'}
                        onChange={(e) => handleHourChange(day.key, 'close', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                      />
                    </>
                  )}

                  {isClosed && (
                    <span className="text-gray-500">Fechado</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Delivery Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h3 className="text-gray-900 border-b pb-3">Configurações de Entrega</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Raio de Entrega Grátis (km)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.freeDeliveryRadius}
                  onChange={(e) => setFormData({ ...formData, freeDeliveryRadius: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Entregas dentro deste raio não terão taxa
                </p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Taxa por km adicional (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.deliveryFeePerKm}
                  onChange={(e) => setFormData({ ...formData, deliveryFeePerKm: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Cobrado por km além do raio grátis
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF5722] text-white px-8 py-3 rounded-lg transition-colors shadow-lg"
            >
              <Save className="w-5 h-5" />
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
