import * as httpRequest from '~/utils/httpRequest';

// Posts
export const create = async (data, token) => {
    try {
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await httpRequest.post('posts', data, headers);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBulletin = async (token) => {
    try {
        const response = await httpRequest.get('posts', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getPostsUser = async (userId, token) => {
    try {
        const response = await httpRequest.get(`posts/${userId}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Like Post

export const patchLike = async (token, postId, body) => {
    try {
        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await httpRequest.patch(`posts/${postId}/like`, body, headers);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
