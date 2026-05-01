import React, { useState, useContext, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { ProductContext } from '../../Context/ProductContext.jsx';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(ProductContext);
  const [isSearching, setIsSearching] = useState(false);

  // Trigger the "Loading" animation whenever searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      setTimeout(() => {
        setIsSearching(true);
        const delay = setTimeout(() => {
          setIsSearching(false);
        }, 800); // 800ms delay to ensure the user sees the animation
        return () => clearTimeout(delay);
      }, 0);
    }
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-md group">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search inventory..."
          className="w-full bg-slate-100 border-none focus:ring-2 focus:ring-blue-500/20 py-2 pl-10 pr-10 rounded-xl text-sm transition-all duration-300 outline-none"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="absolute right-3">
            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        )}
      </div>

      {/* Animated Dropdown Loading Element */}
      <div className={`absolute top-12 left-0 w-full bg-white border border-slate-100 shadow-xl rounded-xl p-3 z-50 transition-all duration-300 transform ${
        isSearching ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          <span>Searching for "{searchTerm}"...</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;