// src/api/apiPembayaran.js
import useAxios from ".";

const getAllPembayaran = async (params) => {
    try {
        const response = await useAxios.get("/pembayaran", { params });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getPembayaranById = async (id) => {
    try {
        const response = await useAxios.get(`/pembayaran/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const createPembayaran = async (data) => {
    try {
        const formData = new FormData();
        
        // Sesuaikan dengan field di backend
        formData.append('penyewaan_id', data.penyewaan_id);
        formData.append('jumlah', data.jumlah);
        formData.append('metode_pembayaran', data.metode_pembayaran);
        
        // Jika ada bukti pembayaran
        if (data.bukti_pembayaran) {
            formData.append('bukti_pembayaran', data.bukti_pembayaran);
        }

        const response = await useAxios.post("/pembayaran", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const updatePembayaran = async (id, data) => {
    try {
        const formData = new FormData();
        
        // Sesuaikan dengan field di backend
        if (data.status_pembayaran) {
            formData.append('status_pembayaran', data.status_pembayaran);
        }
        
        if (data.bukti_pembayaran) {
            formData.append('bukti_pembayaran', data.bukti_pembayaran);
        }

        // Tambahkan method PUT untuk Laravel
        formData.append('_method', 'PUT');

        const response = await useAxios.post(`/pembayaran/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Helper function untuk mendapatkan URL bukti pembayaran
const getBuktiPembayaranUrl = (buktiPembayaran) => {
    if (!buktiPembayaran) return null;
    return `${useAxios.defaults.baseURL}/storage/${buktiPembayaran}`;
};

export { 
    getAllPembayaran, 
    getPembayaranById, 
    createPembayaran, 
    updatePembayaran,
    getBuktiPembayaranUrl
};