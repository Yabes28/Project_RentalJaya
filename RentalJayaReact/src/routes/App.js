import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import AdminPage from "./AdminPage";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    const PrivateRoute = ({ element, roleRequired }) => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const role = localStorage.getItem("role");
        if (!isLoggedIn || role !== roleRequired) {
            return <Navigate to="/" />;
        }
        return element;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/beranda-admin" element={<PrivateRoute element={<AdminPage />} roleRequired="admin" />} />
                {/* Tambahkan rute lain jika diperlukan */}
            </Routes>
        </Router>
    );
}

export default App;
