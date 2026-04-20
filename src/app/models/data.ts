// Model: Mock data for products
import { Product } from './types';

export const products: Product[] = [
  // Marmitas (Main Dishes)
  {
    id: 'm1',
    name: 'Marmita Executiva',
    description: 'Arroz, feijão, frango grelhado, salada e farofa',
    price: 18.90,
    category: 'marmitas',
    image: 'https://images.unsplash.com/photo-1573409157829-fc549dc70bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYmVhbnMlMjBtZWF0JTIwYnJhemlsaWFuJTIwbHVuY2h8ZW58MXx8fHwxNzc0NjE2MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    dayOfWeek: 'monday'
  },
  {
    id: 'm2',
    name: 'Marmita Bife Acebolado',
    description: 'Arroz, feijão, bife acebolado, batata frita e vinagrete',
    price: 22.90,
    category: 'marmitas',
    image: 'https://images.unsplash.com/photo-1760462898692-a3d8c077ddd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwYmVlZiUyMHN0ZWFrJTIwbWVhbHxlbnwxfHx8fDE3NzQ2MTYzODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dayOfWeek: 'tuesday'
  },
  {
    id: 'm3',
    name: 'Marmita Feijoada',
    description: 'Feijoada completa com arroz, couve, farofa e laranja',
    price: 24.90,
    category: 'marmitas',
    image: 'https://images.unsplash.com/photo-1573409157829-fc549dc70bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYmVhbnMlMjBtZWF0JTIwYnJhemlsaWFuJTIwbHVuY2h8ZW58MXx8fHwxNzc0NjE2MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    dayOfWeek: 'wednesday'
  },
  {
    id: 'm4',
    name: 'Marmita Peixe Grelhado',
    description: 'Arroz, feijão, peixe grelhado, legumes e salada',
    price: 26.90,
    category: 'marmitas',
    image: 'https://images.unsplash.com/photo-1573409157829-fc549dc70bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYmVhbnMlMjBtZWF0JTIwYnJhemlsaWFuJTIwbHVuY2h8ZW58MXx8fHwxNzc0NjE2MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    dayOfWeek: 'thursday'
  },
  {
    id: 'm5',
    name: 'Marmita Strogonoff',
    description: 'Strogonoff de frango, arroz branco e batata palha',
    price: 23.90,
    category: 'marmitas',
    image: 'https://images.unsplash.com/photo-1573409157829-fc549dc70bc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwYmVhbnMlMjBtZWF0JTIwYnJhemlsaWFuJTIwbHVuY2h8ZW58MXx8fHwxNzc0NjE2MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    dayOfWeek: 'friday'
  },
  
  // Assados (Roasted/Grilled)
  {
    id: 'a1',
    name: 'Frango Assado Inteiro',
    description: 'Frango temperado e assado, acompanha farofa',
    price: 35.90,
    category: 'assados',
    image: 'https://images.unsplash.com/photo-1634864418654-f0c877ad7897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbiUyMGRpbm5lciUyMHBsYXRlfGVufDF8fHx8MTc3NDYxNjM4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    dayOfWeek: 'saturday'
  },
  {
    id: 'a2',
    name: 'Costela Assada',
    description: 'Costela bovina assada lentamente, acompanha vinagrete',
    price: 42.90,
    category: 'assados',
    image: 'https://images.unsplash.com/photo-1760462898692-a3d8c077ddd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwYmVlZiUyMHN0ZWFrJTIwbWVhbHxlbnwxfHx8fDE3NzQ2MTYzODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dayOfWeek: 'sunday'
  },
  {
    id: 'a3',
    name: 'Lombo Assado',
    description: 'Lombo suíno assado com especiarias',
    price: 38.90,
    category: 'assados',
    image: 'https://images.unsplash.com/photo-1760462898692-a3d8c077ddd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwYmVlZiUyMHN0ZWFrJTIwbWVhbHxlbnwxfHx8fDE3NzQ2MTYzODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  
  // Bebidas (Drinks)
  {
    id: 'b1',
    name: 'Suco de Laranja Natural',
    description: 'Suco de laranja fresco 500ml',
    price: 8.90,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1707569517904-92b134ff5f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlJTIwZHJpbmt8ZW58MXx8fHwxNzc0NTE2Nzk2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'b2',
    name: 'Suco de Maracujá',
    description: 'Suco de maracujá natural 500ml',
    price: 8.90,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1685156328670-bad82b790a56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZydWl0JTIwanVpY2UlMjBiZXZlcmFnZXxlbnwxfHx8fDE3NzQ2MTYzODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'b3',
    name: 'Refrigerante Lata',
    description: 'Refrigerante 350ml - vários sabores',
    price: 5.50,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1685156328670-bad82b790a56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZydWl0JTIwanVpY2UlMjBiZXZlcmFnZXxlbnwxfHx8fDE3NzQ2MTYzODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'b4',
    name: 'Água Mineral',
    description: 'Água mineral sem gás 500ml',
    price: 3.50,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1707569517904-92b134ff5f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlJTIwZHJpbmt8ZW58MXx8fHwxNzc0NTE2Nzk2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  
  // Sobremesas (Desserts)
  {
    id: 's1',
    name: 'Pudim de Leite',
    description: 'Pudim de leite condensado caseiro',
    price: 9.90,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1551024567-92a7053cb4a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWRkaW5nJTIwZmxhbiUyMGNhcmFtZWwlMjBkZXNzZXJ0fGVufDF8fHx8MTc3NDYxNjM4M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 's2',
    name: 'Brigadeiro Gourmet',
    description: 'Brigadeiro gourmet (unidade)',
    price: 3.50,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1649585735470-ea75bc2b6b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydCUyMHNsaWNlfGVufDF8fHx8MTc3NDYxNjM4Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 's3',
    name: 'Torta de Chocolate',
    description: 'Fatia de torta de chocolate com cobertura',
    price: 12.90,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1649585735470-ea75bc2b6b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydCUyMHNsaWNlfGVufDF8fHx8MTc3NDYxNjM4Mnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 's4',
    name: 'Mousse de Maracujá',
    description: 'Mousse de maracujá cremoso',
    price: 8.90,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1551024567-92a7053cb4a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWRkaW5nJTIwZmxhbiUyMGNhcmFtZWwlMjBkZXNzZXJ0fGVufDF8fHx8MTc3NDYxNjM4M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export const getDayOfWeekProducts = (day: string) => {
  return products.filter(p => p.dayOfWeek === day);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};
