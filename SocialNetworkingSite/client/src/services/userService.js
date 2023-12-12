import * as httpRequest from '~/utils/httpRequest';

export const user = async (userId, token) => {
    try {
        const response = await httpRequest.get(`users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
