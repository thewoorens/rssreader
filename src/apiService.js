import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    get: async (url, params = {}, headers = {}) => {
        try {
            const response = await apiClient.get(url, {params, headers});
            return response.data;
        } catch (error) {
            return {error: error.response?.data || error.message};
        }
    },

    post: async (url, data = {}, headers = {}) => {
        try {
            const response = await apiClient.post(url, data, {headers});
            console.log("POST API RESPONSE => ", response);
            return response;
        } catch (error) {
            console.error("POST API ERROR => ", error);
            console.error("POST API ERROR STATUS CODE => ", error?.response?.status);
            return error?.response?.status || 500;
        }
    },

    put: async (url, data = {}, headers = {}) => {
        try {
            const response = await apiClient.put(url, data, {headers});
            return response.data;
        } catch (error) {
            return {error: error.response?.data || error.message};
        }
    },

    delete: async (url, headers = {}) => {
        try {
            const response = await apiClient.delete(url, {headers});
            return response.data;
        } catch (error) {
            return {error: error.response?.data || error.message};
        }
    },

    install: (app) => {
        app.config.globalProperties.$apiService = apiService;
    }
};