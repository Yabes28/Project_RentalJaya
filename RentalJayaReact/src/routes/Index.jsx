// src/routes/index.jsx
import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Routes,
    Navigate // Tambahkan ini
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
import Beranda from '../pages/Beranda';
import DaftarMobil from '../pages/DaftarMobil';
import TentangKami from '../pages/TentangKami';
import Pembayaran from '../pages/Pembayaran';
import Profil from '../pages/Profil';
import Pesanan from '../pages/DaftarPemesanan';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminPage from '../pages/adminPage';
import DetailMobil from '../pages/DetailMobil';
import UserPage from '../pages/UserPage';
import MobilPage from '../pages/MobilPage';
import PengembalianPage from '../pages/PengembalianPage';
import PenyewaanPage from '../pages/PenyewaanPage';

// Auth middleware component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Beranda />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/daftar-mobil" element={<DaftarMobil />} />
        <Route path="/detail-mobil/:id" element={<DetailMobil />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/pembayaran/:id_penyewaan"
          element={
            <PrivateRoute>
              <Pembayaran />
            </PrivateRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route
          path="/pesanan"
          element={
            <PrivateRoute>
              <Pesanan />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/adminPage"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/userPage"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/mobilPage"
          element={
            <PrivateRoute>
              <MobilPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/penyewaanPage"
          element={
            <PrivateRoute>
              <PenyewaanPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pengembalianPage"
          element={
            <PrivateRoute>
              <PengembalianPage />
            </PrivateRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;