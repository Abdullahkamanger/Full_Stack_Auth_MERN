import React, { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext.jsx';
import { ArrowLeft, Star, Tag, Box, Edit3, ShoppingBag, ShieldCheck, Truck, RotateCcw, MessageSquare, Info } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, openModal } = useContext(ProductContext);

  // LOGIC: Find the specific product from the Context array
  const product = products.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-slate-500 mb-4">Product not found.</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded-xl">
          Return to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Catalog
        </button>
        <button 
          onClick={() => openModal(product.id)} 
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold transition-all active:scale-95"
        >
          <Edit3 className="w-4 h-4" /> Edit Specifications
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left: Product Media */}
        <div className="space-y-4">
          <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-white border border-slate-200 p-8 flex items-center justify-center shadow-xl shadow-slate-100">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-700" 
            />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square bg-white border border-slate-100 rounded-2xl overflow-hidden p-2 shadow-sm">
                  <img src={img} alt={`${product.title} ${i}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-xl shadow-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-500" /> {product.rating}
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">{product.sku}</span>
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
            {product.title}
          </h1>
          <p className="text-slate-400 text-sm font-medium mb-6">{product.brand}</p>
          
          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                <Tag className="w-12 h-12 text-slate-900" />
              </div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Price</span>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-black text-slate-900">${product.price}</p>
                {product.discountPercentage > 0 && (
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-lg">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                <Box className="w-12 h-12 text-blue-600" />
              </div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Availability</span>
              <p className={`text-2xl font-black mt-1 ${product.stock < 10 ? 'text-red-500' : 'text-blue-600'}`}>
                {product.stock} {product.availabilityStatus || 'Units'}
              </p>
            </div>
          </div>

          {/* Detailed Specs List */}
          <div className="space-y-4 border-t border-slate-100 pt-8 mb-8">
            <div className="grid grid-cols-2 gap-y-4">
              <div className="flex items-center gap-4 text-slate-700">
                <div className="bg-slate-100 p-2 rounded-xl"><ShieldCheck className="w-4 h-4 text-slate-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Warranty</span>
                  <span className="text-sm font-semibold">{product.warrantyInformation || 'N/A'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <div className="bg-slate-100 p-2 rounded-xl"><Truck className="w-4 h-4 text-slate-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Shipping</span>
                  <span className="text-sm font-semibold">{product.shippingInformation || 'N/A'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <div className="bg-slate-100 p-2 rounded-xl"><RotateCcw className="w-4 h-4 text-slate-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Return Policy</span>
                  <span className="text-sm font-semibold">{product.returnPolicy || 'N/A'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <div className="bg-slate-100 p-2 rounded-xl"><Info className="w-4 h-4 text-slate-500" /></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Weight</span>
                  <span className="text-sm font-semibold">{product.weight}g</span>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-auto w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-slate-900/10">
            <ShoppingBag className="w-5 h-5" />
            Buy Now
          </button>
        </div>
      </div>

      {/* Reviews & Extra Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
          </div>
          
          {product.reviews && product.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((rev, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-slate-900">{rev.reviewerName}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{new Date(rev.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-500" /> {rev.rating}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 p-10 rounded-3xl text-center text-slate-400">
              No reviews yet for this product.
            </div>
          )}
        </div>

        {/* Technical Specs */}
        <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Technical Specs</h2>
          <div className="space-y-4 text-sm">
             <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-400 font-medium">Barcode</span>
              <span className="font-bold text-slate-900">{product.meta?.barcode || 'N/A'}</span>
            </div>
             <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-400 font-medium">Dimensions</span>
              <span className="font-bold text-slate-900">
                {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth}
              </span>
            </div>
             <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-400 font-medium">Min. Order</span>
              <span className="font-bold text-slate-900">{product.minimumOrderQuantity} units</span>
            </div>
             <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-400 font-medium">Added On</span>
              <span className="font-bold text-slate-900">{new Date(product.meta?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-2xl flex items-center justify-center">
             {product.meta?.qrCode && (
               <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">QR Code</p>
                 <img src={product.meta.qrCode} alt="QR Code" className="w-32 h-32 opacity-80" />
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;