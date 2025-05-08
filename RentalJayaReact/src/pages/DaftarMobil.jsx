// src/pages/DaftarMobil.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ganti Link dengan useNavigate
import "../assets/styles/DaftarMobil.css";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import { getAllMobil } from '../api/MobilApi';
import { getFotoMobil } from '../api/index';

const DaftarMobil = () => {
  const navigate = useNavigate(); // Tambahkan useNavigate
  const [mobils, setMobils] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("SEMUA");

  // Array kategori mobil
  const categories = ["SEMUA", "SUV", "MPV", "HATCHBACK", "SPORT"];

  useEffect(() => {
    fetchMobil();
  }, []);

  const fetchMobil = async () => {
    setLoading(true);
    try {
      const response = await getAllMobil({ status: 'Tersedia' });
      console.log(response.data); // Tambahkan log ini
      setMobils(response.data);
    } catch (error) {
      setError("Gagal mengambil data mobil");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter mobil berdasarkan kategori
  const filteredMobils = selectedCategory === "SEMUA" 
    ? mobils 
    : mobils.filter(mobil => mobil.jenis_mobil === selectedCategory);

  // Tambahkan fungsi untuk handle click
  const handleCardClick = (id_mobil) => {
    navigate(`/detail-mobil/${id_mobil}`);
  };

  return (
    <div className="page-wrapper bg-dark text-light">
      <Navbar />
        <div className="container mt-5">
          {/* Filter Buttons */}
          <div className="filter-buttons mb-4 d-flex justify-content-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`btn ${
                  selectedCategory === category 
                    ? 'btn-warning' 
                    : 'btn-outline-warning'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Cars List */}
          <div className="row">
            {loading ? (
              <div className="col-12 text-center">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="col-12 text-center">
                <p className="text-danger">{error}</p>
              </div>
            ) : filteredMobils.length > 0 ? (
              filteredMobils.map((mobil) => (
                <div className="col-md-4 mb-4" key={mobil.id_mobil}>
                  <div 
                    className="card bg-dark text-light h-100 car-card" // Tambahkan class car-card
                    onClick={() => handleCardClick(mobil.id_mobil)}
                    style={{ cursor: 'pointer' }} // Tambahkan cursor pointer
                  >
                    <img
                      src={getFotoMobil(mobil?.foto)}
                      alt={`${mobil.merek} ${mobil.model}`}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h4>
                        <b>{mobil.merek} {mobil.model}</b>
                      </h4>
                      <div className="badge bg-warning text-dark mb-2">
                        {mobil.jenis_mobil}
                      </div>
                      <p className="card-text">
                        <i className="fas fa-users text-warning"></i> {mobil.kapasitas_penumpang} Orang
                      </p>
                      <p className="card-text">
                        <i className="fas fa-gas-pump text-warning"></i> {mobil.bahan_bakar}
                      </p>
                      <p className="fw-bold mt-auto">
                        Rp {parseInt(mobil.harga_sewa).toLocaleString('id-ID')}/hari
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Tidak ada mobil yang tersedia</p>
              </div>
            )}
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default DaftarMobil;