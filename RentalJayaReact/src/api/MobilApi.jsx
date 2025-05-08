// src/api/apiMobil.js
import useAxios from ".";

const getAllMobil = async (params) => {
    try {
        const response = await useAxios.get("/mobil", { params });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getMobilById = async (id) => {
    try {
        const response = await useAxios.get(`/mobil/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const createMobil = async (data) => {
    try {
        const formData = new FormData();
        
        // Ubah nama field dari 'gambar' ke 'foto' sesuai backend
        if (data.foto) {
            formData.append('foto', data.foto);
        }

        // Append data lainnya
        Object.keys(data).forEach(key => {
            if (key !== 'foto') {
                formData.append(key, data[key]);
            }
        });

        const response = await useAxios.post("/mobil", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const updateMobil = async (id, data) => {
    try {
        const response = await useAxios.put(`/mobil/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const deleteMobil = async (id) => {
    try {
        const response = await useAxios.delete(`/mobil/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;s
    }
};

const getFavoriteMobils = async () => {
    try {
        const response = await useAxios.get("/mobil/favorite");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const countMobils = async () => {
    try {
        const response = await useAxios.get('/count-mobils');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
const fetchMobils = async () => {
    try {
        const response = await getAllMobil({ search: searchTerm }); // Menambahkan parameter pencarian
        setMobils(response.data);
    } catch (error) {
        console.error('Error fetching mobil:', error);
    }
};

export { 
    getAllMobil, 
    getMobilById, 
    createMobil, 
    updateMobil, 
    deleteMobil,
    getFavoriteMobils,
    countMobils,
    fetchMobils
};