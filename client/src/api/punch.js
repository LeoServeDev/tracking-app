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

export const punchInOut = async (punchType, notes = '') => {
    try {
        console.log('Punching in/out:', { punchType, notes });
        const response = await api.post('/punch', { punchType, notes }, {
            headers: getAuthHeaders()
        });
        console.log('Punch successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Punch error:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllPunches = async () => {
    try {
        console.log('Fetching all punches...');
        const response = await api.get('/punch', {
            headers: getAuthHeaders()
        });
        console.log('Punches fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching punches:', error.response?.data || error.message);
        throw error;
    }
};

export const getTodayPunches = async () => {
    try {
        console.log('Fetching today\'s punches...');
        const response = await api.get('/punch/today', {
            headers: getAuthHeaders()
        });
        console.log('Today\'s punches fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching today\'s punches:', error.response?.data || error.message);
        throw error;
    }
};

export const getWeekPunches = async () => {
    try {
        console.log('Fetching week\'s punches...');
        const response = await api.get('/punch/week', {
            headers: getAuthHeaders()
        });
        console.log('Week\'s punches fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching week\'s punches:', error.response?.data || error.message);
        throw error;
    }
};

export const deletePunch = async (punchId) => {
    try {
        console.log('Deleting punch:', punchId);
        const response = await api.delete(`/punch/${punchId}`, {
            headers: getAuthHeaders()
        });
        console.log('Punch deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting punch:', error.response?.data || error.message);
        throw error;
    }
};

export const getStats = async (range = 'week') => {
    try {
        console.log('Fetching stats for range:', range);
        const response = await api.get(`/punch/stats?range=${range}`, {
            headers: getAuthHeaders()
        });
        console.log('Stats fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:', error.response?.data || error.message);
        throw error;
    }
}; 