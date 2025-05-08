import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Register.css";
import Navbar from "../components/Navbar";
import { SignUp } from "../api/apiAuth";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    no_sim: "",
    no_telp: "",
    alamat: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Reset error message when user types
  };

  const handleCheck = (e) => {
    setIsDisabled(!e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      console.log('Attempting registration with:', {
        ...formData,
        password: '****' // Hide password in logs
      });
      
      const response = await SignUp(formData);
      
      console.log('Registration response:', response);

      console.log('Full response structure:', {
        response,
        data: response.data,
        status: response.status,
        statusText: response.statusText
      });
      
      if (response.status === 'success') {
        alert(response.message || "Registrasi berhasil!");
        navigate("/login");
      } else {
        setErrorMessage(response.message || "Terjadi kesalahan saat registrasi");
      }
    } catch (error) {
      console.error('Registration error details:', {
        response: error.response,
        message: error.message,
        status: error.response?.status,
        fullError: error
      });
      
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        setErrorMessage(errorMessages.join('\n'));
      } else {
        setErrorMessage(
          error.response?.data?.message ||
          "Email sudah terdaftar atau ada kesalahan input" ||
          "Terjadi kesalahan. Silakan coba lagi."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container bg-dark text-light">
      <Navbar />

      <div className="register-form">
        <h3 className="text-center mb-4">Daftar ke Rental Jaya</h3>
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage.split('\n').map((msg, idx) => (
              <div key={idx}>{msg}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nama
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="no_sim" className="form-label">
              No SIM
            </label>
            <input
              type="text"
              className="form-control"
              id="no_sim"
              name="no_sim"
              value={formData.no_sim}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="no_telp" className="form-label">
              No Telepon
            </label>
            <input
              type="text"
              className="form-control"
              id="no_telp"
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">
              Alamat
            </label>
            <input
              type="text"
              className="form-control"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
            />
          </div>
          <label className="d-flex justify-content-start">
            <input type="checkbox" onChange={handleCheck} />
            <p className="ms-2" style={{ color: "#ffffff" }}>
              Saya telah membaca dan menyetujui {" "}
              <a href="#" className="text-warning">
                Syarat dan Ketentuan
              </a>
            </p>
          </label>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-warning"
              disabled={isDisabled || loading}
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </div>
          <div className="text-center mt-3">
            <span>Sudah punya akun? </span>
            <a href="/login" className="text-warning">
              Masuk
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;