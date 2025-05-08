import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/DaftarPemesanan.css';
import Navbar from "../components/Navbar";
import { getPenyewaan } from '../api/RentalApi';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import { createPengembalian } from '../api/PengembalianApi';

const DaftarPemesanan = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [kondisiMobil, setKondisiMobil] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetailBooking, setSelectedDetailBooking] = useState(null);
  const navigate = useNavigate();

  const fetchPenyewaan = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Silakan login terlebih dahulu');
        navigate('/login');
        return;
      }

      console.log("Mencoba mengambil data penyewaan...");
      const response = await getPenyewaan();
      console.log("Response dari getPenyewaan:", response);
      
      if (response.status === 'success') {
        console.log("Data penyewaan berhasil diambil:", response.data);
        setBookings(response.data);
      } else {
        console.error("Gagal mengambil data:", response);
        toast.error('Gagal mengambil data penyewaan');
      }
    } catch (error) {
      console.error("Error lengkap:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      
      if (error.message === 'User ID tidak ditemukan') {
        toast.error('Silakan login terlebih dahulu');
        navigate('/login');
      } else {
        toast.error(`Gagal mengambil data: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPenyewaan();
  }, [navigate]);

  const handlePengembalian = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleShowDetail = (booking) => {
    setSelectedDetailBooking(booking);
    setShowDetailModal(true);
  };

  const handleSubmitPengembalian = async (e) => {
    e.preventDefault();
    try {
      const response = await createPengembalian({
        penyewaan_id: selectedBooking.id_penyewaan,
        kondisi_mobil: kondisiMobil,
        tanggal_kembali: new Date().toISOString().split('T')[0]
      });

      if (response.status === 'success') {
        toast.success('Pengembalian berhasil disubmit');
        setShowModal(false); // Tutup modal
        setKondisiMobil(''); // Reset form
        
        // Refresh data penyewaan
        await fetchPenyewaan(); // Panggil fungsi untuk memperbarui data
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error submitting pengembalian:', error);
      toast.error(error.message || 'Gagal submit pengembalian');
    }
  };

  return (
    <div>
      <Navbar />
        <div className="container">
          <h1 className="text-center mb-4">Daftar Pemesanan Saya</h1>
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr className="table-active">
                  <th scope="col">No</th>
                  <th scope="col">ID Penyewaan</th>
                  <th scope="col">Mobil</th>
                  <th scope="col">Plat Nomor</th>
                  <th scope="col">Tanggal Sewa</th>
                  <th scope="col">Tanggal Kembali</th>
                  <th scope="col">Total Biaya</th>
                  <th scope="col">Status Penyewaan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={booking.id_penyewaan}>
                      <th scope="row">{index + 1}</th>
                      <td>{booking.id_penyewaan}</td>
                      <td>{booking.mobil?.merek} {booking.mobil?.model}</td>
                      <td>{booking.mobil?.nomor_polisi}</td>
                      <td>{new Date(booking.tanggal_mulai).toLocaleDateString('id-ID')}</td>
                      <td>{new Date(booking.tanggal_selesai).toLocaleDateString('id-ID')}</td>
                      <td>Rp {booking.total_biaya?.toLocaleString('id-ID')}</td>
                      <td>
                        <span className={`badge ${
                          booking.status === 'selesai' ? 'bg-success' : 
                          booking.status === 'aktif' ? 'bg-warning' :
                          'bg-danger'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-info btn-sm me-2"
                          onClick={() => handleShowDetail(booking)}
                        >
                          Detail
                        </button>
                        {booking.status === 'aktif' && !booking.pengembalians?.length && (
                          <button 
                            className="btn btn-warning btn-sm"
                            onClick={() => handlePengembalian(booking)}
                          >
                            Pengembalian
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      Tidak ada pemesanan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Modal Detail Pemesanan */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
              <Modal.Header closeButton className="bg-dark text-light">
                <Modal.Title>Detail Pemesanan</Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-dark text-light">
                {selectedDetailBooking && (
                  <div>
                    <h5>Informasi Mobil</h5>
                    <table className="table table-dark">
                      <tbody>
                        <tr>
                          <td>Merek & Model</td>
                          <td>: {selectedDetailBooking.mobil?.merek} {selectedDetailBooking.mobil?.model}</td>
                        </tr>
                        <tr>
                          <td>Nomor Polisi</td>
                          <td>: {selectedDetailBooking.mobil?.nomor_polisi}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h5 className="mt-4">Informasi Penyewaan</h5>
                    <table className="table table-dark">
                      <tbody>
                        <tr>
                          <td>ID Penyewaan</td>
                          <td>: {selectedDetailBooking.id_penyewaan}</td>
                        </tr>
                        <tr>
                          <td>Tanggal Mulai</td>
                          <td>: {new Date(selectedDetailBooking.tanggal_mulai).toLocaleDateString('id-ID')}</td>
                        </tr>
                        <tr>
                          <td>Tanggal Selesai</td>
                          <td>: {new Date(selectedDetailBooking.tanggal_selesai).toLocaleDateString('id-ID')}</td>
                        </tr>
                        <tr>
                          <td>Total Biaya</td>
                          <td>: Rp {selectedDetailBooking.total_biaya?.toLocaleString('id-ID')}</td>
                        </tr>
                        <tr>
                          <td>Status</td>
                          <td>
                            <span className={`badge ${
                              selectedDetailBooking.status === 'selesai' ? 'bg-success' : 
                              selectedDetailBooking.status === 'aktif' ? 'bg-warning' :
                              'bg-danger'
                            }`}>
                              {selectedDetailBooking.status.charAt(0).toUpperCase() + selectedDetailBooking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer className="bg-dark text-light">
                <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                  Tutup
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal Pengembalian */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton className="bg-dark text-light">
                <Modal.Title>Form Pengembalian Mobil</Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-dark text-light">
                <Form onSubmit={handleSubmitPengembalian}>
                  <Form.Group className="mb-3">
                    <Form.Label>Detail Mobil</Form.Label>
                    <p className="text-warning">
                      {selectedBooking?.mobil?.merek} {selectedBooking?.mobil?.model} - {selectedBooking?.mobil?.nomor_polisi}
                    </p>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Kondisi Mobil</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={kondisiMobil}
                      onChange={(e) => setKondisiMobil(e.target.value)}
                      placeholder="Deskripsikan kondisi mobil saat pengembalian..."
                      required
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Batal
                    </Button>
                    <Button 
                      variant="warning" 
                      type="submit"
                      disabled={!kondisiMobil.trim()}
                    >
                      Submit Pengembalian
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
  );
};

export default DaftarPemesanan;