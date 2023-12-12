import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostWidget from '../PostWidget';
import { setPosts } from '~/state';
import * as postService from '~/services/postService';

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (isProfile) {
            postService
                .getPostsUser(userId, token)
                .then((data) => {
                    dispatch(setPosts({ posts: data }));
                })
                .catch((error) => console.log(error));
        } else {
            postService
                .getBulletin(token)
                .then((data) => {
                    dispatch(setPosts({ posts: data }));
                })
                .catch((error) => console.log(error));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                ),
            )}
        </>
    );
};

export default PostsWidget;
