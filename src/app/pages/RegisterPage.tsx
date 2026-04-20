// View: Registration Page
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, User, Mail, MapPin, Truck } from 'lucide-react';
import { Header } from '../components/Header';
import { useUser } from '../contexts/UserContext';
import { useRestaurant } from '../contexts/RestaurantContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { user, saveUser } = useUser();
  const { calculateDistance, calculateDeliveryFee, settings } = useRestaurant();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || ''
  });

  const [calculatedDistance, setCalculatedDistance] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  // Calculate distance and delivery fee when address changes
  useEffect(() => {
    if (formData.address.trim().length > 10) {
      const distance = calculateDistance(formData.address);
      setCalculatedDistance(distance);
      setDeliveryFee(calculateDeliveryFee(distance));
    } else {
      setCalculatedDistance(0);
      setDeliveryFee(0);
    }
  }, [formData.address, calculateDistance, calculateDeliveryFee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUser({
      ...formData,
      distance: calculatedDistance,
      isLoggedIn: true
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <Link 
            to="/cart" 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-gray-900">Seus Dados</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <User className="w-5 h-5" />
              Nome Completo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Mail className="w-5 h-5" />
              E-mail
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <MapPin className="w-5 h-5" />
              Endereço de Entrega
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
              placeholder="Rua, número, bairro"
              required
              minLength={10}
            />
            
            {/* Automatic Distance Calculation Display */}
            {calculatedDistance > 0 && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2 text-orange-900 mb-2">
                  <Truck className="w-5 h-5" />
                  <span className="font-semibold">Informações de Entrega</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>📍 Distância calculada: <strong>{calculatedDistance} km</strong></p>
                  <p>
                    💵 Taxa de entrega: {' '}
                    <strong className={deliveryFee === 0 ? 'text-green-600' : 'text-orange-600'}>
                      {deliveryFee === 0 ? 'GRÁTIS!' : `R$ ${deliveryFee.toFixed(2)}`}
                    </strong>
                  </p>
                  <p className="text-gray-600 mt-2">
                    💡 Entregas até {settings.freeDeliveryRadius} km são gratuitas
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white py-4 rounded-full transition-colors shadow-lg"
          >
            Continuar para Pagamento
          </button>
        </form>
      </main>
    </div>
  );
};