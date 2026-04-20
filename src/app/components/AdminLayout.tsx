// View Component: Admin Layout
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, LayoutDashboard, UtensilsCrossed, Package, Settings as SettingsIcon } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Cardápio', icon: UtensilsCrossed },
    { path: '/admin/orders', label: 'Pedidos', icon: Package },
    { path: '/admin/settings', label: 'Configurações', icon: SettingsIcon }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white mb-1">Painel Administrativo</h1>
              <p className="text-sm opacity-90">DiCasa Marmitaria</p>
            </div>
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Ver Site</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <nav className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                  ${active 
                    ? 'bg-[#FF6B35] text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};
