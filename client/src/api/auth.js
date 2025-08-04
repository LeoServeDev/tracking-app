import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: '/api',
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