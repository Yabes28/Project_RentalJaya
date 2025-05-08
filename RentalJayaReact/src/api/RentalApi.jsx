// src/api/apiPenyewaan.js
import useAxios from ".";

const getPenyewaan = async () => {
    try {
        console.log("Memanggil API getPenyewaan...");
        const response = await useAxios.get('/penyewaan');
        console.log("Response dari API:", response);
        return response.data;
    } catch (error) {
        console.error("Error di getPenyewaan:", error);
        console.error("Error response:", error.response);
        throw error.response?.data || error;
    }
};

const getPenyewaanById = async (id) => {
    try {
        console.log("Mencoba mengambil penyewaan dengan ID:", id);
        // Gunakan endpoint yang sesuai dengan route di backend
        const response = await useAxios.get(`/penyewaan/${id}`);
        console.log("Response dari API getPenyewaanById:", response);
        return response.data;
    } catch (error) {
        console.error("Error di getPenyewaanById:", error);
        throw error.response?.data || error;
    }
};

const createPenyewaan = async (data) => {
    try {
        const response = await useAxios.post("/penyewaan", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const updatePenyewaan = async (id, data) => {
    try {
        const payload = {
            tanggal_selesai: data.tanggal_selesai,
            total_biaya: data.total_biaya,
            status: data.status // 'aktif' atau 'selesai'
        };

        const response = await useAxios.put(`/penyewaan/${id}`, payload);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Helper function untuk menghitung total biaya
const hitungTotalBiaya = (hargaPerHari, tanggalMulai, tanggalSelesai) => {
    const start = new Date(tanggalMulai);
    const end = new Date(tanggalSelesai);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return hargaPerHari * diffDays;
};

const getAllPenyewaan = async () => {
    try {
        const response = await useAxios.get('/all-penyewaan');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const getCurrentPenyewaan = async () => {
    try {
        const response = await useAxios.get('/current-penyewaan');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const countPenyewaans = async () => {
    try {
        const response = await useAxios.get('/count-penyewaans');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export {
    getPenyewaan,
    getPenyewaanById,
    createPenyewaan,
    updatePenyewaan,
    hitungTotalBiaya,
    getAllPenyewaan,
    getCurrentPenyewaan,
    countPenyewaans
};