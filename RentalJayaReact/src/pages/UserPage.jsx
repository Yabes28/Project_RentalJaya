import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/adminPage.css';
import '../assets/styles/Common.css';
import { fetchAllUsers, deleteUser } from '../api/apiAuth';
import { Modal, Button } from 'react-bootstrap';

// Fungsi untuk memformat tanggal
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const UserPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null); 

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchAllUsers();
      console.log(response.data);
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users berdasarkan email
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().startsWith(searchEmail.toLowerCase())
  );

  const handleDetailClick = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleDelete = (id) => {
    setUserIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (userIdToDelete) {
      try {
        await deleteUser(userIdToDelete);
        alert('Pengguna berhasil dihapus!');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Gagal menghapus pengguna');
      } finally {
        setShowConfirmModal(false);
        setUserIdToDelete(null);
      }
    }
  };

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <main className="content">
        <h1>Daftar Pengguna</h1>
        {loading ? (
          <p>Loading data pengguna...</p>
        ) : (
          <div>
            {/* Search Bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Cari berdasarkan Email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>

            <table className="transaction-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>No Telepon</th>
                  <th>Alamat</th>
                  <th>No SIM</th>
                  <th>Tanggal Registrasi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id_user}>
                      <td>{index + 1}</td>
                      <td>{user.name || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td>{user.no_telp || 'N/A'}</td>
                      <td>{user.alamat || 'N/A'}</td>
                      <td>{user.no_sim || 'N/A'}</td>
                      <td>{formatDate(user.created_at) || 'N/A'}</td>
                      <td>
                        <Button variant="info" onClick={() => handleDetailClick(user)}>Detail</Button>
                        <Button variant="danger" onClick={() => handleDelete(user.id_user)}>Hapus</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Tidak ada pengguna.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal untuk detail pengguna */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pengguna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Nama: {selectedUser?.name}</p>
          <p>Email: {selectedUser?.email}</p>
          <p>No Telepon: {selectedUser?.no_telp}</p>
          <p>Alamat: {selectedUser?.alamat}</p>
          <p>No SIM: {selectedUser?.no_sim}</p>
          <p>Tanggal Registrasi: {formatDate(selectedUser?.created_at)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus pengguna ini?</p>
          <p>Dengan menghapus pengguna ini, data pengguna beserta data transaksi akan hilang secara permanen.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserPage;
