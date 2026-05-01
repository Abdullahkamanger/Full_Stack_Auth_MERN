import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/UserContext.jsx";
import { ProductProvider } from "./Context/ProductContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Navbar from "./Components/products/Navbar.jsx";
import AnimatedPage from "./Components/AnimatePage.jsx";

// Pages
import LoginPage from "./Pages/LogIn.jsx";
import SignupPage from "./Pages/SignUp.jsx";
import ProfilePage from "./Pages/Profile.jsx";
import UpdateProfilePage from "./Pages/UpdateProfile.jsx";
import ProductList from "./Pages/products/ProductList.jsx";
import ProductDetails from "./Pages/products/ProductDetails.jsx";
import AddEditProduct from "./Pages/products/AddEditProduct.jsx";

import { useAuth } from "./Context/UserContext.jsx";

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <ProductProvider>
      <Toaster position="top-center" />
      <Navbar />
      
      <div className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes (Redirect if authenticated) */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" replace /> : <AnimatedPage><LoginPage /></AnimatedPage>
            } />
            <Route path="/signup" element={
              isAuthenticated ? <Navigate to="/" replace /> : <AnimatedPage><SignupPage /></AnimatedPage>
            } />
            
            {/* Protected Auth Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <AnimatedPage><ProfilePage /></AnimatedPage>
              </ProtectedRoute>
            } />
            
            <Route path="/update-profile" element={
              <ProtectedRoute>
                <AnimatedPage><UpdateProfilePage /></AnimatedPage>
              </ProtectedRoute>
            } />

            {/* Protected Product Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <AnimatedPage><ProductList /></AnimatedPage>
              </ProtectedRoute>
            } />
            
            <Route path="/product/:id" element={
              <ProtectedRoute>
                <AnimatedPage><ProductDetails /></AnimatedPage>
              </ProtectedRoute>
            } />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>

      {/* Modal component stays outside the main Routes but inside Providers */}
      <AddEditProduct />
    </ProductProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;