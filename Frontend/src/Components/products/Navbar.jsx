import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Package, User, LogOut } from 'lucide-react';
import SearchBar from './SearchBar';
import { ProductContext } from '../../Context/ProductContext.jsx';
import { useAuth } from '../../Context/UserContext.jsx';

const Navbar = () => {
  const { openModal } = React.useContext(ProductContext);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null; // Hide navbar on login/signup pages if handled by redirect

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 hidden sm:block text-lg">ShopMart <span className="text-blue-600">Admin</span></span>
        </Link>

        {/* Searchbar stays in the middle */}
        <div className="flex-1 flex justify-center max-w-xl">
          <SearchBar />
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => openModal()} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden md:block">New Product</span>
          </button>
          
          <Link to="/profile" className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Profile">
            <User className="w-5 h-5" />
          </Link>

          <button 
            onClick={async () => { await logout(); navigate('/login'); }}
            className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" 
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;