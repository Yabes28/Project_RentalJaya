// src/api/apiPengembalian.js
import useAxios from ".";

const getAllPengembalian = async () => {
    try {
      const response = await useAxios.get(`/pengembalian`)
      return response.data;
    } catch (error) {
      console.error('Error fetching pengembalian:', error);
      throw error;
    }
  };

const getPengembalianById = async (id) => {
    try {
        const response = await useAxios.get(`/pengembalian/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const createPengembalian = async (data) => {
    try {
        const response = await useAxios.post('/pengembalian', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const updatePengembalian = async (id, data) => {
    try {
        const formData = new FormData();

        // Update data yang diperlukan
        if (data.kondisi_mobil) formData.append('kondisi_mobil', data.kondisi_mobil);
        if (data.denda_kerusakan) formData.append('denda_kerusakan', data.denda_kerusakan);
        if (data.denda_keterlambatan) formData.append('denda_keterlambatan', data.denda_keterlambatan);
        if (data.total_denda) formData.append('total_denda', data.total_denda);
        if (data.status) formData.append('status', data.status);

        // Tambahkan method PUT untuk Laravel
        formData.append('_method', 'PUT');

        const response = await useAxios.post(`/pengembalian/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error updating pengembalian:', error);
        throw error.response.data;
    }
};

// Helper function untuk menghitung denda keterlambatan
const hitungDendaKeterlambatan = (tanggalSeharusnya, tanggalKembali, dendaPerHari = 100000) => {
    const seharusnya = new Date(tanggalSeharusnya);
    const kembali = new Date(tanggalKembali);
    const diffTime = Math.abs(kembali - seharusnya);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays * dendaPerHari : 0;
};

// Helper function untuk menghitung total denda
const hitungTotalDenda = (dendaKeterlambatan, dendaKerusakan) => {
    return Number(dendaKeterlambatan) + Number(dendaKerusakan);
};

export {
    getAllPengembalian,
    getPengembalianById,
    createPengembalian,
    updatePengembalian,
    hitungDendaKeterlambatan,
    hitungTotalDenda
};