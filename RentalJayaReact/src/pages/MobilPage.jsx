import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../assets/styles/MobilPage.css';
import '../assets/styles/Common.css';
import { getAllMobil, createMobil, deleteMobil, updateMobil } from '../api/MobilApi';
import { getFotoMobil } from '../api/index';
import { Modal, Button } from 'react-bootstrap';

const MobilPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [addFormData, setAddFormData] = useState({
    merek: '',
    model: '',
    tahun_pembuatan: '',
    nomor_polisi: '',
    bahan_bakar: '',
    kapasitas_penumpang: '',
    harga_sewa: '',
    foto: null,
    jenis_mobil: '',
  });
  const [updateFormData, setUpdateFormData] = useState({
    id_mobil: null,
    merek: '',
    model: '',
    tahun_pembuatan: '',
    nomor_polisi: '',
    bahan_bakar: '',
    kapasitas_penumpang: '',
    harga_sewa: '',
    foto: null,
    jenis_mobil: '',
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null);

  useEffect(() => {
    fetchMobils();
  }, []);

  useEffect(() => {
    filterCars();
  }, [searchTerm, cars, filterStatus]);

  const fetchMobils = async () => {
    try {
      const response = await getAllMobil({ search: searchTerm });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchMobils();
  };

  const filterCars = () => {
    let filtered = cars.filter(car =>
      car.merek.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== 'all') {
      filtered = filtered.filter(car => car.status === filterStatus);
    }

    setFilteredCars(filtered);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleDelete = (id) => {
    setCarIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (carIdToDelete) {
      try {
        await deleteMobil(carIdToDelete);
        setCars(cars.filter((car) => car.id_mobil !== carIdToDelete));
        alert('Mobil berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting car:', error);
        alert('Gagal menghapus mobil: ' + (error.response ? error.response.data.message : error.message));
      } finally {
        setShowConfirmModal(false);
        setCarIdToDelete(null);
      }
    } else {
      alert('ID mobil tidak valid.');
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value, files } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: files ? files[0] : value,
    });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value, files } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMobil(addFormData);
      fetchMobils();
      resetAddForm();
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Gagal menambahkan mobil: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleUpdateClick = (car) => {
    setUpdateFormData({
      id_mobil: car.id_mobil,
      merek: car.merek,
      model: car.model,
      tahun_pembuatan: car.tahun_pembuatan,
      nomor_polisi: car.nomor_polisi,
      bahan_bakar: car.bahan_bakar,
      kapasitas_penumpang: car.kapasitas_penumpang,
      harga_sewa: car.harga_sewa,
      foto: null,
      jenis_mobil: car.jenis_mobil,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMobil(updateFormData.id_mobil, updateFormData);
      fetchMobils();
      resetUpdateForm();
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Gagal mengupdate mobil: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const resetAddForm = () => {
    setAddFormData({
      merek: '',
      model: '',
      tahun_pembuatan: '',
      nomor_polisi: '',
      bahan_bakar: '',
      kapasitas_penumpang: '',
      harga_sewa: '',
      foto: null,
      jenis_mobil: '',
    });
  };

  const resetUpdateForm = () => {
    setUpdateFormData({
      id_mobil: null,
      merek: '',
      model: '',
      tahun_pembuatan: '',
      nomor_polisi: '',
      bahan_bakar: '',
      kapasitas_penumpang: '',
      harga_sewa: '',
      foto: null,
      jenis_mobil: '',
    });
  };

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <main className="content">
        <h3>Data Mobil</h3>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cari mobil..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="filter-buttons">
          <button className="btn btn-secondary" onClick={() => handleFilterChange('all')}>Semua</button>
          <button className="btn btn-secondary" onClick={() => handleFilterChange('Tersedia')}>Tersedia</button>
          <button className="btn btn-secondary" onClick={() => handleFilterChange('Disewa')}>Disewakan</button>
        </div>

        {/* Add Car Form */}
        <div className="card">
          <h2 className="card-title">Tambah Mobil</h2>
          <form onSubmit={handleAddSubmit}>
            <div className="form-container">
              <div className="form-column">
                <input
                  type="text"
                  name="merek"
                  className="form-control-admin"
                  placeholder="Merk"
                  value={addFormData.merek}
                  onChange={handleAddInputChange}
                  required
                />
                <input
                  type="text"
                  name="model"
                  className="form-control-admin"
                  placeholder="Model"
                  value={addFormData.model}
                  onChange={handleAddInputChange}
                  required
                />
                <input
                  type="number"
                  name="tahun_pembuatan"
                  className="form-control-admin"
                  placeholder="Tahun Pembuatan"
                  value={addFormData.tahun_pembuatan}
                  onChange={handleAddInputChange}
                  required
                />
                <input
                  type="text"
                  name="nomor_polisi"
                  className="form-control-admin"
                  placeholder="Nomor Polisi"
                  value={addFormData.nomor_polisi}
                  onChange={handleAddInputChange}
                  required
                />
                <select
                  name="jenis_mobil"
                  className="form-control-admin"
                  value={addFormData.jenis_mobil}
                  onChange={handleAddInputChange}
                  required
                >
                  <option value="">Pilih Jenis Mobil</option>
                  <option value="MPV">MPV</option>
                  <option value="SUV">SUV</option>
                  <option value="HATCHBACK">HATCHBACK</option>
                  <option value="SPORT">SPORT</option>
                </select>
              </div>
              <div className="form-column">
                <input
                  type="number"
                  name="kapasitas_penumpang"
                  className="form-control-admin"
                  placeholder="Kapasitas Penumpang"
                  value={addFormData.kapasitas_penumpang}
                  onChange={handleAddInputChange}
                  required
                />
                <select
                  name="bahan_bakar"
                  className="form-control-admin"
                  value={addFormData.bahan_bakar}
                  onChange={handleAddInputChange}
                  required
                >
                  <option value="">Pilih Bahan Bakar</option>
                  <option value="Solar">Solar</option>
                  <option value="Pertalite">Pertalite</option>
                  <option value="Pertamax">Pertamax</option>
                  <option value="Pertamax Turbo">Pertamax Turbo</option>
                </select>
                <input
                  type="number"
                  name="harga_sewa"
                  className="form-control-admin"
                  placeholder="Harga Sewa per Hari"
                  value={addFormData.harga_sewa}
                  onChange={handleAddInputChange}
                  required
                />
                <input
                  type="file"
                  name="foto"
                  className="form-control-admin"
                  onChange={handleAddInputChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn-primary">Tambah</button>
            </div>
          </form>
        </div>

        {/* Mobil List Table */}
        <h2 className="text-center mt-4">Daftar Mobil</h2>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Merek</th>
              <th>Model</th>
              <th>Nomor Polisi</th>
              <th>Jenis Mobil</th>
              <th>Bahan Bakar</th>
              <th>Kapasitas</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <tr key={car.id}>
                  <td><img src={getFotoMobil(car?.foto)} alt={car.merek} width="100" /></td>
                  <td>{car.merek}</td>
                  <td>{car.model}</td>
                  <td>{car.nomor_polisi}</td>
                  <td>{car.jenis_mobil}</td>
                  <td>{car.bahan_bakar}</td>
                  <td>{car.kapasitas_penumpang}</td>
                  <td>IDR {parseInt(car.harga_sewa).toLocaleString()}</td>
                  <td>{car.status}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(car.id_mobil)}>Hapus</Button>
                    <Button variant="info" onClick={() => handleUpdateClick(car)}>Update</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">Tidak ada mobil yang sesuai.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* Modal Konfirmasi Hapus */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin menghapus mobil ini?</p>
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

      {/* Modal Update Mobil */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Mobil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-container">
              <div className="form-column">
                <input
                  type="text"
                  name="merek"
                  className="form-control-admin"
                  placeholder="Merk"
                  value={updateFormData.merek}
                  onChange={handleUpdateInputChange}
                  required
                />
                <input
                  type="text"
                  name="model"
                  className="form-control-admin"
                  placeholder="Model"
                  value={updateFormData.model}
                  onChange={handleUpdateInputChange}
                  required
                />
                <input
                  type="number"
                  name="tahun_pembuatan"
                  className="form-control-admin"
                  placeholder="Tahun Pembuatan"
                  value={updateFormData.tahun_pembuatan}
                  onChange={handleUpdateInputChange}
                  required
                />
                <input
                  type="text"
                  name="nomor_polisi"
                  className="form-control-admin"
                  placeholder="Nomor Polisi"
                  value={updateFormData.nomor_polisi}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
              <div className="form-column">
                <select
                  name="jenis_mobil"
                  className="form-control-admin"
                  value={updateFormData.jenis_mobil}
                  onChange={handleUpdateInputChange}
                  required
                >
                  <option value="">Pilih Jenis Mobil</option>
                  <option value="MPV">MPV</option>
                  <option value="SUV">SUV</option>
                  <option value="HATCHBACK">HATCHBACK</option>
                  <option value="SPORT">SPORT</option>
                </select>
                <input
                  type="number"
                  name="kapasitas_penumpang"
                  className="form-control-admin"
                  placeholder="Kapasitas Penumpang"
                  value={updateFormData.kapasitas_penumpang}
                  onChange={handleUpdateInputChange}
                  required
                />
                <select
                  name="bahan_bakar"
                  className="form-control-admin"
                  value={updateFormData.bahan_bakar}
                  onChange={handleUpdateInputChange}
                  required
                >
                  <option value="">Pilih Bahan Bakar</option>
                  <option value="Solar">Solar</option>
                  <option value="Pertalite">Pertalite</option>
                  <option value="Pertamax">Pertamax</option>
                  <option value="Pertamax Turbo">Pertamax Turbo</option>
                </select>
                <input
                  type="number"
                  name="harga_sewa"
                  className="form-control-admin"
                  placeholder="Harga Sewa per Hari"
                  value={updateFormData.harga_sewa}
                  onChange={handleUpdateInputChange}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn-primary">Update</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MobilPage;
