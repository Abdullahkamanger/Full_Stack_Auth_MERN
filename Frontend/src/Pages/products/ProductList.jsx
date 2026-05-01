import React, { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext.jsx';
import ProductCard from '../../Components/products/ProductCard.jsx';
import { PackageSearch, Loader2 } from 'lucide-react';

const ProductList = () => {
  const { filteredProducts, loading, error } = useContext(ProductContext);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-500">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="animate-pulse font-medium">Synchronizing Inventory...</p>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100 text-red-600">
      {error}
    </div>
  );

  return (
    <div className="py-8">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
          <PackageSearch className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-lg font-medium">No products match your search</p>
          <p className="text-sm">Try adjusting your filters or keywords</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;