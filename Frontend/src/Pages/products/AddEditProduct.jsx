import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext.jsx';
import { Save, PackagePlus, DollarSign, Tag, ImageIcon, X, Box } from 'lucide-react';

const AddEditProduct = () => {
  const { products, addProduct, updateProduct, isModalOpen, closeModal, modalProductId } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
    description: '',
    brand: '',
    stock: '',
    discountPercentage: '',
    sku: '',
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: 'In Stock',
    returnPolicy: '',
    minimumOrderQuantity: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOGIC: Check if we are in "Edit Mode"
  useEffect(() => {
    if (modalProductId) {
      const existingProduct = products.find(p => String(p.id) === String(modalProductId));
      if (existingProduct) {
        setFormData(existingProduct);
      }
    } else {
      // Reset form when opening to add a new product
      setFormData({
        title: '',
        price: '',
        category: '',
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
        description: '',
        brand: '',
        stock: '',
        discountPercentage: '',
        sku: '',
        warrantyInformation: '',
        shippingInformation: '',
        availabilityStatus: 'In Stock',
        returnPolicy: '',
        minimumOrderQuantity: 1
      });
    }
  }, [modalProductId, products, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Artificial delay for that "Sleek" processing feel
    setTimeout(() => {
      if (modalProductId) {
        updateProduct(modalProductId, formData);
      } else {
        // For new products, we might need a numeric ID if the backend doesn't auto-generate it
        // But since we have a numeric ID in the model, let's ensure it's handled.
        // Usually the backend should handle this, or we can just send it.
        const newProductData = {
          ...formData,
          id: formData.id || Date.now() // temporary ID if not present
        };
        addProduct(newProductData);
      }
      setIsSubmitting(false);
      closeModal(); // Head back to inventory by closing the modal
    }, 1000);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-900/20 overflow-hidden animate-modal-in max-h-[90vh] flex flex-col">
        <div className="bg-slate-900 p-8 text-white flex justify-between items-start shrink-0">
          <div>
            <h1 className="text-2xl font-bold">{modalProductId ? 'Edit Product' : 'New Product'}</h1>
            <p className="text-slate-400 text-sm mt-1">Fill in the details to update your catalog.</p>
          </div>
          <div className="flex items-center gap-4">
            <PackagePlus className="w-10 h-10 text-blue-500 opacity-50 hidden sm:block" />
            <button 
              onClick={closeModal}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" /> Product Name
              </label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Wireless Headphones"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Brand Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Box className="w-4 h-4 text-slate-400" /> Brand
              </label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Apple, Sony"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" /> Price
              </label>
              <input
                required
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Discount Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" /> Discount %
              </label>
              <input
                type="number"
                step="0.01"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Stock Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Save className="w-4 h-4 text-slate-400" /> Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Category Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
              >
                <option value="">Select Category</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
              </select>
            </div>

            {/* SKU Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" /> SKU
              </label>
              <input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="BEA-ESS-001"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

             {/* Thumbnail Input */}
             <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Image URL
              </label>
              <input
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <PackagePlus className="w-4 h-4 text-slate-400" /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Provide a detailed description..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Warranty Info */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Warranty Information</label>
              <input
                name="warrantyInformation"
                value={formData.warrantyInformation}
                onChange={handleChange}
                placeholder="1 month warranty"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Shipping Info */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Shipping Information</label>
              <input
                name="shippingInformation"
                value={formData.shippingInformation}
                onChange={handleChange}
                placeholder="Ships overnight"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Return Policy */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Return Policy</label>
              <input
                name="returnPolicy"
                value={formData.returnPolicy}
                onChange={handleChange}
                placeholder="30 days return policy"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Min Order */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Minimum Order Qty</label>
              <input
                type="number"
                name="minimumOrderQuantity"
                value={formData.minimumOrderQuantity}
                onChange={handleChange}
                placeholder="1"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 shrink-0"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                {modalProductId ? 'Update Product' : 'Save Product'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;