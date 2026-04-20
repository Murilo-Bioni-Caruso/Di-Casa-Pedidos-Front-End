// View: Home/Menu Page
import { useState } from 'react';
import { Header } from '../components/Header';
import { CategoryNav } from '../components/CategoryNav';
import { ProductCard } from '../components/ProductCard';
import { useRestaurant } from '../contexts/RestaurantContext';
import { Category } from '../models/types';

export const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const { products } = useRestaurant();

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  // Get dish of the day
  const today = new Date().getDay();
  const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = dayMap[today];
  const dishOfTheDay = products.find(p => p.dayOfWeek === todayKey);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />
      
      <main className="container mx-auto px-4 py-6">
        {/* Dish of the Day Section */}
        {activeCategory === 'all' && dishOfTheDay && (
          <section className="mb-8">
            <div className="bg-gradient-to-r from-[#FFD93D] to-[#FFA500] rounded-xl p-6 shadow-lg">
              <h2 className="text-gray-900 mb-4">⭐ Prato do Dia</h2>
              <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                <img 
                  src={dishOfTheDay.image} 
                  alt={dishOfTheDay.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-gray-900 mb-2">{dishOfTheDay.name}</h3>
                  <p className="text-gray-700 mb-3">{dishOfTheDay.description}</p>
                  <p className="text-[#FF6B35]">
                    R$ {dishOfTheDay.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Section Title */}
        <div className="mb-4">
          <h2 className="text-gray-900">
            {activeCategory === 'all' ? 'Todos os Produtos' : 
             activeCategory === 'marmitas' ? 'Marmitas' :
             activeCategory === 'assados' ? 'Assados' :
             activeCategory === 'bebidas' ? 'Bebidas' : 'Sobremesas'}
          </h2>
          <p className="text-gray-600">{filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </main>
    </div>
  );
};