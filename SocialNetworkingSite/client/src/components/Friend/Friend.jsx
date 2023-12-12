import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setFriends } from '~/state';
import FlexBetween from '../FlexBetween';
import UserImage from '../UserImage';
import * as friendService from '~/services/friendService';

const Friend = ({ friendId, name, subTitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = () =>
        friendService
            .patchFriend(_id, friendId, token)
            .then((data) => dispatch(setFriends({ friends: data })))
            .catch((error) => console.log(error));
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{ '&:hover': { color: palette.primary.light, cursor: 'pointer' } }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subTitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton onClick={() => patchFriend()} sx={{ backgroundColor: primaryLight, padding: '0.6rem' }}>
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default Friend;
