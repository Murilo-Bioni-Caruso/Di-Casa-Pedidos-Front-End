// View Component: Category Navigation
import { Category } from '../models/types';

interface CategoryNavProps {
  activeCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
}

const categories = [
  { id: 'all' as const, label: 'Todos', emoji: '🍽️' },
  { id: 'marmitas' as const, label: 'Marmitas', emoji: '🍱' },
  { id: 'assados' as const, label: 'Assados', emoji: '🍗' },
  { id: 'bebidas' as const, label: 'Bebidas', emoji: '🥤' },
  { id: 'sobremesas' as const, label: 'Sobremesas', emoji: '🍰' }
];

export const CategoryNav = ({ activeCategory, onSelectCategory }: CategoryNavProps) => {
  return (
    <div className="sticky top-[140px] md:top-[110px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full transition-all
                ${activeCategory === cat.id 
                  ? 'bg-[#FF6B35] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
