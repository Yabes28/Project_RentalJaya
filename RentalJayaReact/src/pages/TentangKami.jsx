import React from "react";
import "../assets/styles/TentangKami.css";
import logo from "../assets/images/logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TentangKami = () => {
    return (
        <div className="bg-dark text-light">
            <Navbar />
            {/* Tentang Kami Section */}
            <div className="about-section">
                <div className="about-content text-center">
                    <img src={logo} alt="Rental Jaya Logo" className="about-logo" />
                    <h1 className="display-5 fw-bold mb-4">Rental Jaya</h1>
                    <p className="lead mb-5">
                        Rental Jaya hadir untuk memenuhi kebutuhan transportasi Anda dengan
                        layanan sewa mobil yang nyaman, aman, dan terpercaya. Kami
                        menawarkan berbagai pilihan kendaraan mulai dari mobil keluarga,
                        city car, hingga SUV, yang siap mendukung setiap perjalanan Anda.
                        Dengan pelayanan profesional dan harga yang kompetitif, Rental Jaya
                        siap menjadi mitra terbaik untuk perjalanan bisnis, liburan, maupun
                        keperluan pribadi Anda.
                    </p>
                    <p className="lead">
                        Nikmati pengalaman berkendara yang menyenangkan bersama Rental Jaya.
                        Pemesanan mudah, layanan prima!
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TentangKami;
