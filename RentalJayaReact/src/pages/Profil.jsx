import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { getUserProfile, updateUserProfile } from "../api/apiAuth";
import "../assets/styles/Profil.css";

const Profil = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    no_sim: "",
    no_telp: "",
    alamat: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        console.log("Response profile:", response);
        
        if (response.status === 'success' && response.data.user) {
          const userData = response.data.user;
          setProfileData({
            name: userData.name || "",
            email: userData.email || "",
            password: "",
            no_sim: userData.no_sim || "",
            no_telp: userData.no_telp || "",
            alamat: userData.alamat || "",
          });
          console.log("Profile data yang diset:", userData);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Gagal mengambil data profil");
      } finally {
        setLoading(false);
      }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToUpdate = { ...profileData };
      if (!dataToUpdate.password) {
        delete dataToUpdate.password;
      }

      const response = await updateUserProfile(dataToUpdate);
      if (response.status === 'success') {
        toast.success("Profil berhasil diperbarui");
        setIsEditing(false);
        fetchProfile();
      } else {
        throw new Error(response.message || "Gagal memperbarui profil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-light">Memuat data...</div>;
  }

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar />
      <div className="container mt-5 pt-5 profile-container">
        <div className="profile-section">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="section-title">Informasi Pengguna</h4>
            <button 
              className="btn btn-warning"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Batal' : 'Edit Profil'}
            </button>
          </div>

          <form onSubmit={handleEditProfile}>
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="form-control text-dark"
                id="nama"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control text-dark"
                id="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            {isEditing && (
              <div className="mb-3">
                <label htmlFor="kata-sandi" className="form-label">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  className="form-control text-dark"
                  id="kata-sandi"
                  value={profileData.password}
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="no-sim" className="form-label">
                No SIM
              </label>
              <input
                type="text"
                className="form-control text-dark"
                id="no-sim"
                value={profileData.no_sim}
                onChange={(e) =>
                  setProfileData({ ...profileData, no_sim: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="no-telp" className="form-label">
                No Telepon
              </label>
              <input
                type="text"
                className="form-control text-dark"
                id="no-telp"
                value={profileData.no_telp}
                onChange={(e) =>
                  setProfileData({ ...profileData, no_telp: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="alamat" className="form-label">
                Alamat
              </label>
              <textarea
                className="form-control text-dark"
                id="alamat"
                rows="2"
                value={profileData.alamat}
                onChange={(e) =>
                  setProfileData({ ...profileData, alamat: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            {isEditing && (
              <div className="text-center mt-4">
                <button type="submit" className="btn btn-warning">
                  Simpan Perubahan
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profil;