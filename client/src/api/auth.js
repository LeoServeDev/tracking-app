import axios from 'axios';

export const login = async (email, password) => {
    return axios.post('/api/auth/login', { email, password });
};

export const register = async (firstName, lastName, email, password) => {
    return axios.post('/api/auth/register', { firstName, lastName, email, password });
}; 