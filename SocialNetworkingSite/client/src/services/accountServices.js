import * as httpRequest from '~/utils/httpRequest';

export const login = async (data) => {
    try {
        const response = await httpRequest.post('auth/login', data);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const register = async (data) => {
    try {
        const response = await httpRequest.post('auth/register', data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
