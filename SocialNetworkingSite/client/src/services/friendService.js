import * as httpRequest from '../utils/httpRequest';

export const getFriends = async (userId, token) => {
    try {
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await httpRequest.get(`users/${userId}/friends`, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const patchFriend = async (_id, friendId, token, ...data) => {
    try {
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await httpRequest.patch(`users/${_id}/${friendId}`, data, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
