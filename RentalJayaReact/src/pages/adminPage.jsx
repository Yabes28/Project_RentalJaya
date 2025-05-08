import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/adminPage.css';
import { getCurrentPenyewaan, countPenyewaans } from '../api/RentalApi';
import { countUsers } from '../api/apiAuth';
import { countMobils } from '../api/MobilApi';
import { FaCar, FaUsers, FaClipboardList } from 'react-icons/fa';

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [penyewaan, setPenyewaan] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMobils, setTotalMobils] = useState(0);
  const [totalPenyewaan, setTotalPenyewaan] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchPenyewaan = async () => {
      try {
        const response = await getCurrentPenyewaan();
        setPenyewaan(response.data);

        const userData = await countUsers();
        setTotalUsers(userData.total_users);

        const mobilsData = await countMobils();
        setTotalMobils(mobilsData.total_mobils);

        const penyewaanData = await countPenyewaans();
        setTotalPenyewaan(penyewaanData.total_penyewaan);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchPenyewaan();
  }, []);

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <main className="content">
        <h3>Recap Umum</h3>
        <div className="recap">
          <div className="recap-item">
            <FaCar size={40} />
            <h2>Jumlah Mobil</h2>
            <p>{totalMobils}</p>
          </div>
          <div className="recap-item">
            <FaClipboardList size={40} />
            <h2>Jumlah Sewa Aktif</h2>
            <p>{totalPenyewaan}</p>
          </div>
          <div className="recap-item">
            <FaUsers size={40} />
            <h2>Total Pelanggan</h2>
            <p>{totalUsers}</p>
          </div>
        </div>
        <h3>Transaksi Terbaru</h3>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Mobil</th>
              <th>Nomor Plat</th>
              <th>Tanggal Sewa</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
              <th>Total Biaya</th>
            </tr>
          </thead>
          <tbody>
            {penyewaan.length > 0 ? (
              penyewaan.map((item, index) => (
                <tr key={item.id_penyewaan}>
                  <td>{index + 1}</td>
                  <td>{item.mobil?.merek} {item.mobil?.model}</td>
                  <td>{item.mobil?.nomor_polisi}</td>
                  <td>{new Date(item.tanggal_mulai).toLocaleDateString('id-ID')}</td>
                  <td>{new Date(item.tanggal_selesai).toLocaleDateString('id-ID')}</td>
                  <td>
                    <span className={`badge ${
                      item.status === 'selesai' ? 'bg-success' : 
                      item.status === 'aktif' ? 'bg-warning' :
                      'bg-danger'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td>Rp {item.total_biaya?.toLocaleString('id-ID')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Tidak ada transaksi terbaru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminPage;
