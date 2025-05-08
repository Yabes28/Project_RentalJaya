import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/Pembayaran.css';
import Navbar from '../components/Navbar';
import { getPenyewaanById } from '../api/RentalApi';
import { createPembayaran } from '../api/PembayaranApi';

const Pembayaran = () => {
  const { id_penyewaan } = useParams();
  const navigate = useNavigate();
  
  const [penyewaan, setPenyewaan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    fetchRentalDetail();
  }, [id_penyewaan]);

  const fetchRentalDetail = async () => {
    try {
      setLoading(true);
      console.log("ID Penyewaan yang dicari:", id_penyewaan);
      
      if (!id_penyewaan) {
        throw new Error('ID Penyewaan tidak valid');
      }

      const response = await getPenyewaanById(id_penyewaan);
      console.log("Response dari getPenyewaanById:", response);
      
      if (response.status === 'success' && response.data) {
        console.log("Data rental yang diterima:", response.data);
        setPenyewaan(response.data);
      } else {
        throw new Error(response.message || 'Data tidak ditemukan');
      }
    } catch (error) {
      console.error("Error saat fetch rental:", error);
      setError(error.message || 'Gagal mengambil detail rental');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAgreeChange = () => {
    setAgree(!agree);
  };

  const handleSubmit = async () => {
    if (!agree || !paymentMethod) {
      alert('Pastikan semua data sudah lengkap dan syarat disetujui.');
      return;
    }

    try {
      const pembayaranData = {
        penyewaan_id: id_penyewaan,
        metode_pembayaran: paymentMethod,
        jumlah: penyewaan.total_biaya,
      };

      await createPembayaran(pembayaranData);
      alert('Pembayaran berhasil dikonfirmasi');
      navigate('/pesanan');
    } catch (error) {
      alert('Gagal melakukan pembayaran: ' + error.message);
    }
  };

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );

  if (!penyewaan) return null;

  return (
    <div>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Pembayaran</h4>
              </div>
              <div className="card-body">
                {/* Detail Rental */}
                <div className="mb-4">
                  <p><strong>Nomor Pembayaran:</strong> {penyewaan.id_penyewaan}</p>
                  <p><strong>Mobil:</strong> {penyewaan.mobil?.merek} {penyewaan.mobil?.model}</p>
                  <p><strong>Tanggal Mulai:</strong> {new Date(penyewaan.tanggal_mulai).toLocaleDateString('id-ID')}</p>
                  <p><strong>Tanggal Selesai:</strong> {new Date(penyewaan.tanggal_selesai).toLocaleDateString('id-ID')}</p>
                  <p><strong>Total Biaya: Rp {penyewaan.total_biaya.toLocaleString('id-ID')}</strong></p>
                </div>
                <hr />

                {/* Payment Method Options */}
                <div className="mb-3">
                  <label className="form-label">Pilih Metode Pembayaran:</label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="metode_pembayaran"
                      id="transfer"
                      value="TRANSFER"
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="transfer">
                      <i className="fas fa-university payment-icons"></i> Transfer Bank
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="metode_pembayaran"
                      id="cash"
                      value="CASH"
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="cash">
                      <i className="fas fa-money-bill-wave-alt"></i> Tunai
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="metode_pembayaran"
                      id="ewallet"
                      value="EWALLET"
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="ewallet">
                      <i className="fas fa-wallet payment-icons"></i> E-Wallet
                    </label>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agree"
                      checked={agree}
                      onChange={handleAgreeChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="agree">
                      Saya telah membaca dan menyetujui syarat dan ketentuan yang berlaku.
                    </label>
                  </div>
                </div>

                {/* Confirm Payment Button */}
                <button
                  className="btn btn-custom w-100 py-3"
                  onClick={handleSubmit}
                  disabled={!agree || !paymentMethod}
                >
                  Konfirmasi Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembayaran;
