import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// Pages
import LoginPage from "./Pages/LogIn.jsx";
import SignupPage from "./Pages/SignUp.jsx";
import ProfilePage from "./Pages/Profile.jsx";
import UpdateProfilePage from "./Pages/UpdateProfile.jsx";
import AnimatedPage from "./Components/AnimatePage.jsx";

function App() {

  const location = useLocation(); // This is the key!
  return (

<AuthProvider>
      <Toaster position="top-center" />
      
      {/* 2. Set mode to "wait" so pages don't overlap or flicker */}
      <AnimatePresence mode="wait">
        {/* 3. CRITICAL: Pass location and key to Routes */}
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
          <Route path="/signup" element={<AnimatedPage><SignupPage /></AnimatedPage>} />
          
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
        </Routes>
      <Routes>
          <Route path = "/" element={<Navigate to="/profile" />} />
      </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;