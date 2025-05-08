import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { getAllPengembalian, updatePengembalian } from '../api/PengembalianApi';
import { Modal, Button } from 'react-bootstrap';
import '../assets/styles/PengembalianPage.css';
import '../assets/styles/Common.css';

const PengembalianPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pengembalian, setPengembalian] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPengembalian, setSelectedPengembalian] = useState(null);
  const [dendaKeterlambatan, setDendaKeterlambatan] = useState(0.00);
  const [dendaKerusakan, setDendaKerusakan] = useState(0.00);
  const [totalDenda, setTotalDenda] = useState(0.00);
  const [statusFilter, setStatusFilter] = useState('semua');
  const [searchId, setSearchId] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchPengembalian = async () => {
      try {
        const response = await getAllPengembalian();
        setPengembalian(response.data);
      } catch (error) {
        console.error('Error fetching pengembalian data:', error.response ? error.response.data : error.message);
      }
    };

    fetchPengembalian();
  }, []);

  const handleConfirmClick = (item) => {
    setSelectedPengembalian(item);
    setDendaKeterlambatan(item.denda_keterlambatan || 0.00);
    setDendaKerusakan(item.denda_kerusakan || 0.00);
    setTotalDenda(item.total_denda || 0.00);
    setShowModal(true);
  };

  useEffect(() => {
    const total = Number(dendaKeterlambatan) + Number(dendaKerusakan);
    setTotalDenda(total);
  }, [dendaKeterlambatan, dendaKerusakan]);

  const handleUpdate = async () => {
    const updatedData = {
      ...selectedPengembalian,
      denda_keterlambatan: dendaKeterlambatan,
      denda_kerusakan: dendaKerusakan,
      total_denda: totalDenda,
      status: 'selesai',
    };

    console.log('Data yang akan dikirim:', updatedData);

    try {
      await updatePengembalian(selectedPengembalian.id_pengembalian, updatedData);
      setShowModal(false);
      const response = await getAllPengembalian();
      setPengembalian(response.data);
    } catch (error) {
      console.error('Error updating pengembalian:', error);
    }
  };

  const handleDetailClick = (item) => {
    setSelectedPengembalian(item);
    setShowDetailModal(true);
  };

  const filteredPengembalian = pengembalian.filter(item => {
    if (statusFilter === 'selesai' && item.status !== 'selesai') return false;
    if (statusFilter === 'pending' && item.status !== 'pending') return false;
    if (searchId && !item.id_pengembalian.toString().includes(searchId)) return false;
    return true;
  });

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <main className="content">
        <h3>Data Pengembalian</h3>
        
        <div className="search-filter-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Cari berdasarkan ID Pengembalian"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          <div className="filter-buttons">
            <Button variant={statusFilter === 'semua' ? 'primary' : 'secondary'} onClick={() => setStatusFilter('semua')}>Semua</Button>
            <Button variant={statusFilter === 'selesai' ? 'primary' : 'secondary'} onClick={() => setStatusFilter('selesai')}>Selesai</Button>
            <Button variant={statusFilter === 'pending' ? 'primary' : 'secondary'} onClick={() => setStatusFilter('pending')}>Pending</Button>
          </div>
        </div>

        <table className="transaction-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Mobil</th>
              <th>Nama Penyewa</th>
              <th>Tanggal Pengembalian</th>
              <th>Status</th>
              <th>Konfirmasi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPengembalian.length > 0 ? (
              filteredPengembalian.map((item, index) => (
                <tr key={item.id_pengembalian}>
                  <td>{index + 1}</td>
                  <td>{item.penyewaan.mobil?.merek} {item.penyewaan.mobil?.model}</td>
                  <td>{item.penyewaan.user?.name}</td>
                  <td>{new Date(item.tanggal_kembali).toLocaleDateString('id-ID')}</td>
                  <td>
                    <span className={`badge ${item.status === 'selesai' ? 'bg-success' : 'bg-danger'}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {item.status === 'selesai' ? (
                      <Button variant="info" onClick={() => handleDetailClick(item)}>Detail</Button>
                    ) : (
                      <Button variant="success" onClick={() => handleConfirmClick(item)}>Konfirmasi</Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Tidak ada data pengembalian.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal className="modal-pengembalian" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Pengembalian</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>ID Pengembalian: {selectedPengembalian?.id_pengembalian}</p>
            <p>Nama Penyewa: {selectedPengembalian?.penyewaan.user?.name}</p>
            <p>Mobil: {selectedPengembalian?.penyewaan.mobil?.merek} {selectedPengembalian?.penyewaan.mobil?.model}</p>
            <p>Kondisi Mobil: {selectedPengembalian?.kondisi_mobil}</p>
            <div>
              <label>Denda Keterlambatan:</label>
              <input type="number" value={dendaKeterlambatan} onChange={(e) => setDendaKeterlambatan(e.target.value)} />
            </div>
            <div>
              <label>Denda Kerusakan:</label>
              <input type="number" value={dendaKerusakan} onChange={(e) => setDendaKerusakan(e.target.value)} />
            </div>
            <div>
              <label>Total Denda:</label>
              <input type="number" value={totalDenda} readOnly />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Tutup
            </Button>
            <Button variant="success" onClick={handleUpdate}>
              Konfirmasi
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detail Pengembalian</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>ID Pengembalian: {selectedPengembalian?.id_pengembalian}</p>
            <p>Nama Penyewa: {selectedPengembalian?.penyewaan.user?.name}</p>
            <p>Mobil: {selectedPengembalian?.penyewaan.mobil?.merek} {selectedPengembalian?.penyewaan.mobil?.model}</p>
            <p>Kondisi Mobil: {selectedPengembalian?.kondisi_mobil}</p>
            <p>Denda Keterlambatan: {selectedPengembalian?.denda_keterlambatan}</p>
            <p>Denda Kerusakan: {selectedPengembalian?.denda_kerusakan}</p>
            <p>Total Denda: {selectedPengembalian?.total_denda}</p>
            <p>Status: {selectedPengembalian?.status}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default PengembalianPage; 