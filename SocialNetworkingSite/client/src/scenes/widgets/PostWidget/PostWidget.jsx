import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as postService from '~/services/postService';
import { setPost } from '~/state';
import Friend from '~/components/Friend';
import FlexBetween from '~/components/FlexBetween';
import WidgetWrapper from '~/components/WidgetWrapper';

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const patchLike = async () =>
        postService
            .patchLike(token, postId, { userId: loggedInUserId })
            .then((data) => {
                dispatch(setPost({ post: data }));
            })
            .catch((error) => console.log(error));
    return (
        <WidgetWrapper margin="2rem 0">
            <Friend friendId={postUserId} name={name} subTitle={location} userPicturePath={userPicturePath} />
            <Typography color={main} sx={{ marginTop: '1rem' }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="Post"
                    style={{
                        borderRadius: '0.75rem',
                        marginTop: '0.75rem',
                    }}
                    src={`${process.env.REACT_APP_BASE_URL}assets/${picturePath}`}
                />
            )}
            <FlexBetween marginTop="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {isComments && (
                <Box marginTop="0.5rem">
                    {comments.map((comment, index) => (
                        <Box key={index}>
                            <Divider />
                            <Typography sx={{ color: main, margin: '0.5rem 0', paddingLeft: '1rem' }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
