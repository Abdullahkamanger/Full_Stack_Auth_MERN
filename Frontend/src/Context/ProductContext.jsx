import { createContext, useState, useEffect } from "react";
import api from "../api/ApiInstance.js";
import { useAuth } from "./UserContext.jsx";
import toast from "react-hot-toast";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalProductId, setModalProductId] = useState(null);

    const openModal = (id = null) => {
        setModalProductId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalProductId(null);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (!isAuthenticated) {
                setProducts([]);
                setLoading(false);
                setError(null);
                return;
            }

            setLoading(true);
            try {
                const response = await api.get("/products");
                const data = response.data;
                setProducts(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [isAuthenticated]);


    const filteredProducts = products.filter((product) => {
        const title = product?.title || "";
        const search = searchTerm || "";
        return title.toLowerCase().includes(search.toLowerCase());
    });

    const confirmDelete = async (id) => {
        const loadingToast = toast.loading("Deleting product...");
        try {
            const res = await api.delete(`/products/${id}`);
            if (res.status === 200) {
                toast.success("Product deleted successfully!", { id: loadingToast });
                setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
            } else {
                toast.error("Failed to delete product.", { id: loadingToast });
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Error deleting product.", { id: loadingToast });
        }
    };

    const deleteProduct = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3">
                <p className="font-medium text-slate-800">Are you sure you want to delete this product?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            confirmDelete(id);
                        }}
                        className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            position: 'top-center',
            style: {
                minWidth: '300px',
                padding: '16px',
                borderRadius: '16px',
                background: '#fff',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
        });
    };

    const addProduct = async (newProduct) => {
        const loadingToast = toast.loading("Adding product...");
        try {
            const res = await api.post("/products", newProduct);
            setProducts(prev => [...prev, res.data.newProduct]);
            toast.success("Product added successfully!", { id: loadingToast });
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Error adding product.", { id: loadingToast });
        }
    };

    const updateProduct = async (id, updatedData) => {
        const loadingToast = toast.loading("Updating product...");
        try {
            const res = await api.put(`/products/${id}`, updatedData)
            if (res.status === 200) {
                setProducts(prev => prev.map(p => String(p.id) === String(id) ? res.data.updatedProduct : p));
                toast.success("Product updated successfully!", { id: loadingToast });
            } else {
                toast.error("Failed to update product.", { id: loadingToast });
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Error updating product.", { id: loadingToast });
        }
    };


    return (
        <ProductContext.Provider
            value={{
                products,
                filteredProducts,
                deleteProduct,
                addProduct,
                updateProduct,
                loading,
                error,
                searchTerm,
                setSearchTerm,
                isModalOpen,
                modalProductId,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};