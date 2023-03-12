import axios from 'axios';

export const helpHttp = () => {
    const httpRequest = async (endpoint, options) => {
        try {
            const response = await axios({
                method: options.method || 'GET',
                url: endpoint,
                data: options.data,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const get = (endpoint, options = {}) => httpRequest(endpoint, options);

    const post = (endpoint, options = {}) => {
        options.method = 'POST';
        return httpRequest(endpoint, options);
    };

    const put = (endpoint, options = {}) => {
        options.method = 'PUT';
        return httpRequest(endpoint, options);
    };

    const patch = (endpoint, options = {}) => {
        options.method = 'PATCH';
        return httpRequest(endpoint, options);
    };

    const del = (endpoint, options = {}) => {
        options.method = 'DELETE';
        return httpRequest(endpoint, options);
    };

    return {
        get,
        post,
        put,
        patch,
        del,
    };
};
