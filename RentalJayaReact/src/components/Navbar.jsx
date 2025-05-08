import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { List, LogOut, User2 } from "lucide-react";
import "../assets/styles/Navbar.css";
import { getUserProfile, logout } from "../api/apiAuth";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await getUserProfile();
                    if (response.status === 'success') {
                        setUserData(response.data.user);
                        setIsLoggedIn(true);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                }
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            setIsLoggedIn(false);
            setUserData(null);
            window.location.href = "/Beranda";
        } catch (error) {
            console.error("Error during logout:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            setIsLoggedIn(false);
            setUserData(null);
            window.location.href = "/Beranda";
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt="Rental Jaya Logo" height="40" />
                    Rental Jaya
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Beranda">
                                Beranda
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/daftar-mobil">
                                Daftar Mobil
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/tentang-kami">
                                Tentang Kami
                            </NavLink>
                        </li>
                    </ul>

                    <div className="d-flex ms-3">
                        {!isLoggedIn ? (
                            <NavLink to="/Login" className="btn btn-custom me-2">
                                Masuk/Daftar
                            </NavLink>
                        ) : (
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    onClick={toggleDropdown}
                                >
                                    <User2 size={20} className="me-2" />
                                    {userData?.name || "Pengguna"}
                                </button>
                                <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}>
                                    <li>
                                        <NavLink className="dropdown-item" to="/profil">
                                            <User2 size={20} className="me-2" />
                                            Profil
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/Pesanan">
                                            <List size={20} className="me-2" />
                                            Pesanan
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button 
                                            className="dropdown-item" 
                                            onClick={handleLogout}
                                        >
                                            <LogOut size={20} className="me-2" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
