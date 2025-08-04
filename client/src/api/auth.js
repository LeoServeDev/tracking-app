import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
    try {
        console.log('Attempting login with:', { email });
        const response = await api.post('/auth/login', { email, password });
        console.log('Login successful:', response.data);
        return response;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

export const register = async (firstName, lastName, email, password) => {
    try {
        console.log('Attempting registration with:', { firstName, lastName, email });
        const response = await api.post('/auth/register', { firstName, lastName, email, password });
        console.log('Registration successful:', response.data);
        return response;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
};

export const logout = async () => {
    try {
        console.log('Logging out...');
        const token = localStorage.getItem('token');
        if (token) {
            const response = await api.post('/auth/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Logout successful:', response.data);
        }
        // Remove token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return { message: 'Logged out successfully' };
    } catch (error) {
        console.error('Logout error:', error.response?.data || error.message);
        // Still remove token even if API call fails
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw error;
    }
}; 