import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

// Pages
import LoginPage from "./Pages/LogIn.jsx";
import SignupPage from "./Pages/SignUp.jsx";
import ProfilePage from "./Pages/Profile.jsx";
import UpdateProfilePage from "./Pages/UpdateProfile.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/update-profile" element={
            <ProtectedRoute>
              <UpdateProfilePage />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/profile" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;