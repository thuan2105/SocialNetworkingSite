import { Box, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as friendService from '~/services/friendService';
import { setFriends } from '~/state';
import Friend from '~/components/Friend';
import WidgetWrapper from '~/components/WidgetWrapper';

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = () =>
        friendService
            .getFriends(userId, token)
            .then((data) => {
                dispatch(setFriends({ friends: data }));
            })
            .catch((error) => console.log(error));
    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <WidgetWrapper>
            <Typography color={palette.neutral.dark} variant="h5" sx={{ marginBottom: '1.5rem' }}>
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend, index) => (
                    <Friend
                        key={index}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subTitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
