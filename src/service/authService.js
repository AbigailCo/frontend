import api from '../util/axios';

export const getCsrfToken = async () => {
    await api.get('/sanctum/csrf-cookie');
};

export const login = async (email, password) => {
    await getCsrfToken();
    return api.post('/api/login', { email, password });
};

export const logout = async () => {
    return api.post('/logout');
};

export const getUser = async () => {
    return api.get('/user');
};
