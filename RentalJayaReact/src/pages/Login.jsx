// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/styles/Login.css";
import { SignIn } from "../api/apiAuth";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const response = await SignIn({
                email: formData.email,
                password: formData.password
            });
    
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
    
                alert('Login berhasil!');
    
                if (response.role === 'admin') {
                    navigate('/adminPage');
                } else {
                    navigate('/beranda');
                }
            } else {
                setError('Login gagal. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark text-light">
            <Navbar />
            <div className="login-container">
                <div className="login-form">
                    <h3 className="text-center mb-4">Masuk ke Rental Jaya</h3>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-warning"
                                disabled={loading || !formData.email || !formData.password}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </>
                                ) : (
                                    'Masuk'
                                )}
                            </button>
                        </div>
                        <div className="text-center mt-3">
                            <a href="#" className="text-warning">
                                Lupa password?
                            </a>
                        </div>
                        <div className="text-center mt-3">
                            <span>Belum punya akun? </span>
                            <a href="/register" className="text-warning">
                                Daftar
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;