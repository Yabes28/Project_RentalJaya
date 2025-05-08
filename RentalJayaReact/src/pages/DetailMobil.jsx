// src/pages/DetailMobil.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles/DetailMobil.css";
import Navbar from "../components/Navbar";
import withAuth from '../components/withAuth';
import { getMobilById } from "../api/MobilApi";
import { getFotoMobil } from '../api/index';
import { createPenyewaan } from "../api/RentalApi";
import { toast } from 'react-toastify';

const DetailMobil = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mobil, setMobil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    tanggal_mulai: "",
    tanggal_selesai: "",
    durasi: 0,
    total_biaya: 0
  });

  useEffect(() => {
    fetchMobilDetail();
  }, [id]);

  const fetchMobilDetail = async () => {
    try {
      setLoading(true);
      const response = await getMobilById(id);
      if (response.status === 'success') {
        setMobil(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message || 'Gagal mengambil detail mobil');
    } finally {
      setLoading(false);
    }
  };

  const hitungDurasi = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    if (newFormData.tanggal_mulai && newFormData.tanggal_selesai) {
      const durasi = hitungDurasi(newFormData.tanggal_mulai, newFormData.tanggal_selesai);
      const total_biaya = durasi * mobil.harga_sewa;
      
      newFormData.durasi = durasi;
      newFormData.total_biaya = total_biaya;
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
          const userData = JSON.parse(localStorage.getItem('userData'));
          
          // Buat penyewaan
          const responsePenyewaan = await createPenyewaan({
              mobil_id: mobil.id_mobil,
              user_id: userData.id,
              tanggal_mulai: formData.tanggal_mulai,
              tanggal_selesai: formData.tanggal_selesai,
              total_biaya: formData.total_biaya
          });

          console.log("Response penyewaan:", responsePenyewaan);

          // Cek apakah penyewaan berhasil dibuat
          if (responsePenyewaan.status === 'success' && responsePenyewaan.data.id_penyewaan) {
              toast.success('Penyewaan berhasil dibuat!');
              navigate(`/pembayaran/${responsePenyewaan.data.id_penyewaan}`);
          } else {
              throw new Error('Data penyewaan tidak valid');
          }
      } catch (error) {
          console.error('Error:', error);
          toast.error('Gagal membuat penyewaan: ' + (error.message || 'Unknown error'));
      }
  };

  if (loading) return (
    <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-dark text-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );

  if (!mobil) return null;

  return (
    <div className="bg-dark text-light">
      <Navbar />

      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col-md-8">
            <div className="card bg-dark text-light">
              <img
                src={getFotoMobil(mobil?.foto)}
                alt={`${mobil.merek} ${mobil.model}`}
                className="card-img-top"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h1 className="card-title mb-3 text-light">{mobil.merek} {mobil.model}</h1>
                <div className="badge bg-warning text-dark mb-4">
                  <i className="fas fa-car me-2"></i>
                  {mobil.jenis_mobil}
                </div>
                
                <div className="row mb-4">
                  {/* Kapasitas Penumpang */}
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-users text-warning me-3 fa-lg"></i>
                      <div>
                        <small className="text-light opacity-75 d-block">Kapasitas</small>
                        <span className="text-light">{mobil.kapasitas_penumpang} Orang</span>
                      </div>
                    </div>
                  </div>

                  {/* Bahan Bakar */}
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-gas-pump text-warning me-3 fa-lg"></i>
                      <div>
                        <small className="text-light opacity-75 d-block">Bahan Bakar</small>
                        <span className="text-light">{mobil.bahan_bakar}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tahun */}
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-calendar-alt text-warning me-3 fa-lg"></i>
                      <div>
                        <small className="text-light opacity-75 d-block">Tahun</small>
                        <span className="text-light">{mobil.tahun_pembuatan}</span>
                      </div>
                    </div>
                  </div>

                  {/* Nomor Polisi */}
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-id-card text-warning me-3 fa-lg"></i>
                      <div>
                        <small className="text-light opacity-75 d-block">Nomor Polisi</small>
                        <span className="text-light">{mobil.nomor_polisi}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark text-light">
              <div className="card-body">
                <h3 className="text-warning mb-4">Rp {parseInt(mobil.harga_sewa).toLocaleString('id-ID')} / hari</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Tanggal Mulai</label>
                    <input
                      type="date"
                      className="form-control"
                      name="tanggal_mulai"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.tanggal_mulai}
                      onChange={handleDateChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tanggal Selesai</label>
                    <input
                      type="date"
                      className="form-control"
                      name="tanggal_selesai"
                      min={formData.tanggal_mulai}
                      value={formData.tanggal_selesai}
                      onChange={handleDateChange}
                      required
                    />
                  </div>

                  {formData.durasi > 0 && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Durasi Sewa</label>
                        <input
                          type="text"
                          className="form-control"
                          value={`${formData.durasi} Hari`}
                          readOnly
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Total Biaya</label>
                        <input
                          type="text"
                          className="form-control"
                          value={`Rp ${formData.total_biaya.toLocaleString('id-ID')}`}
                          readOnly
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="btn btn-warning w-100"
                    disabled={formData.durasi <= 0}
                  >
                    Sewa Sekarang
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DetailMobil);