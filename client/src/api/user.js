import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProfile = async () => {
    try {
        console.log('Fetching user profile...');
        const response = await api.get('/user/profile', {
            headers: getAuthHeaders()
        });
        console.log('Profile fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
        throw error;
    }
};

export const updateProfile = async (profileData) => {
    try {
        console.log('Updating profile with:', profileData);
        const response = await api.put('/user/profile', profileData, {
            headers: getAuthHeaders()
        });
        console.log('Profile updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error.response?.data || error.message);
        throw error;
    }
}; 