import useAxios from ".";

const SignUp = async (data) => {
    try {
        const response = await useAxios.post("/register", data);
        if (response.data.status === 'success') {
            // Simpan token dan user data ke localStorage setelah register berhasil
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const SignIn = async (credentials) => {
    try {
        const response = await useAxios.post('/login', credentials);
        if (response.data.token) {
            // Simpan token dan user data ke localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userData', JSON.stringify({
                id: response.data.id_user,
                name: response.data.name || 'Pengguna' // default name jika tidak ada
            }));
            localStorage.setItem('isLoggedIn', 'true');
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const getUserProfile = async () => {
    try {
        const response = await useAxios.get("/profile");
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            window.location.href = '/login';
        }
        throw error;
    }
};

const updateUserProfile = async (data) => {
    try {
        const response = await useAxios.put('/profile', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const logout = async () => {
    try {
        const response = await useAxios.post("/logout");
        // Hapus token dan user data dari localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const countUsers = async () => {
    try {
        const response = await useAxios.get('/count-users');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const fetchAllUsers = async () => {
    try {
        const response = await useAxios.get('/users');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

const deleteUser = async (id) => {
    try {
        const response = await useAxios.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export { SignUp, SignIn, getUserProfile, updateUserProfile, logout, countUsers, fetchAllUsers, deleteUser };