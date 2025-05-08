import React, { useState } from 'react';
import '../assets/styles/Sidebar.css';
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaTachometerAlt, FaCar, FaUsers, FaClipboardList } from 'react-icons/fa';
import { LogOut } from 'lucide-react';

const Sidebar = ({ toggleSidebar, sidebarOpen }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            setIsLoggedIn(false);
            window.location.href = "/Beranda";
        } catch (error) {
            console.error("Error during logout:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            setIsLoggedIn(false);
            window.location.href = "/Beranda";s
        }
    };

    return (
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <div className="toggle-icon" onClick={toggleSidebar}>
                {sidebarOpen ? <FaTimes /> : <FaBars />}
            </div>
            <div className="logo">
                <img src={logo} alt="Rental Jaya Logo" height="40" />
                {sidebarOpen && <span>Rental Jaya</span>}
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/adminPage">
                            <FaTachometerAlt size={24} />
                            {sidebarOpen && <span className="menu-text">Dashboard</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mobilPage">
                            <FaCar size={24} />
                            {sidebarOpen && <span className="menu-text">Mobil</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/userPage">
                            <FaUsers size={24} />
                            {sidebarOpen && <span className="menu-text">User</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/penyewaanPage">
                            <FaClipboardList size={24} />
                            {sidebarOpen && <span className="menu-text">Penyewaan</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pengembalianPage">
                            <FaClipboardList size={24} />
                            {sidebarOpen && <span className="menu-text">Pengembalian</span>}
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <button className="logout-btn" onClick={handleLogout}>
                {sidebarOpen ? <LogOut size={24} className="me-2" /> : <LogOut size={24} />}
                {sidebarOpen && <span className="menu-text">Logout</span>}
            </button>
        </aside>
    );
};

export default Sidebar;
