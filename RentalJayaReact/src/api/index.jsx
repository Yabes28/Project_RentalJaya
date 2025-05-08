import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";

export const getFotoMobil = (foto) => {
    if (!foto) return null;
    return `${BASE_URL}/storage/${foto}`;
};

const useAxios = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor untuk menambahkan token
useAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor untuk handling error
useAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error status
            switch (error.response.status) {
                case 401: // Unauthorized
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    // Redirect ke halaman login jika menggunakan router
                    // window.location.href = '/login';
                    break;
                case 403: // Forbidden
                    console.error('Akses ditolak');
                    break;
                case 404: // Not Found
                    console.error('Data tidak ditemukan');
                    break;
                case 422: // Validation Error
                    console.error('Validasi gagal:', error.response.data.errors);
                    break;
                default:
                    console.error('Terjadi kesalahan:', error.response.data.message);
            }
        } else if (error.request) {
            // Network error
            console.error('Network error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Helper function untuk upload file
export const uploadFile = async (url, file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await useAxios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onUploadProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onUploadProgress(percentCompleted);
                }
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default useAxios;