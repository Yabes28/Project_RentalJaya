import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAllPenyewaan } from '../api/RentalApi'; // Pastikan Anda memiliki API untuk mengambil data penyewaan
import { Modal, Button } from 'react-bootstrap';
import '../assets/styles/PenyewaanPage.css';
import '../assets/styles/Common.css'; // Menggunakan gaya yang sama dengan UserPage

const PenyewaanPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [penyewaan, setPenyewaan] = useState([]);
  const [statusFilter, setStatusFilter] = useState('semua');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPenyewaan, setSelectedPenyewaan] = useState(null);

  useEffect(() => {
    fetchPenyewaan();
  }, []);

  const fetchPenyewaan = async () => {
    try {
      const response = await getAllPenyewaan();
      setPenyewaan(response.data);
    } catch (error) {
      console.error('Error fetching penyewaan:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPenyewaan = penyewaan.filter(item => {
    // Hanya tampilkan penyewaan dengan status 'aktif' atau 'selesai'
    if (statusFilter === 'selesai' && item.status !== 'selesai') return false;
    if (statusFilter === 'aktif' && item.status !== 'aktif') return false;
    if (searchTerm && !item.id_pengembalian.toString().includes(searchTerm)) return false;
    return true;
  });

  const handleDetailClick = (item) => {
    setSelectedPenyewaan(item);
    setShowDetailModal(true);
  };

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <main className="content">
        <h3>Data Penyewaan</h3>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cari penyewaan..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <Button variant={statusFilter === 'semua' ? 'primary' : 'secondary'} onClick={() => setStatusFilter('semua')}>Semua</Button>
          <Button variant={statusFilter === 'aktif' ? 'primary' : 'secondary'} onClick={() => setStatusFilter('aktif')}>Aktif</Button>
          <Button variant={statusFilter === 'selesai' ? 'primary' : 'secondary'} onClick={() => setStatusFilter('selesai')}>Selesai</Button>
        </div>

        {/* Penyewaan List Table */}
        <table className="transaction-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Penyewa</th>
              <th>Mobil</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPenyewaan.length > 0 ? (
              filteredPenyewaan.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.user.name}</td>
                  <td>{item.mobil ? `${item.mobil.merek} ${item.mobil.model}` : 'N/A'}</td>
                  <td>{new Date(item.tanggal_mulai).toLocaleDateString('id-ID')}</td>
                  <td>{new Date(item.tanggal_selesai).toLocaleDateString('id-ID')}</td>
                  <td>
                    <span className={`badge ${item.status === 'aktif' ? 'badge-warning' : 'badge-success'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="info" onClick={() => handleDetailClick(item)}>Detail</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">Tidak ada penyewaan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* Modal untuk detail penyewaan */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Penyewaan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ID Penyewaan: {selectedPenyewaan?.id_penyewaan}</p>
          <p>Nama Penyewa: {selectedPenyewaan?.user.name}</p>
          <p>Mobil: {selectedPenyewaan?.mobil ? `${selectedPenyewaan.mobil.merek} ${selectedPenyewaan.mobil.model}` : 'N/A'}</p>
          <p>Tanggal Penyewaan: {new Date(selectedPenyewaan?.tanggal_mulai).toLocaleDateString('id-ID')}</p>
          <p>Status: {selectedPenyewaan?.status}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PenyewaanPage; 