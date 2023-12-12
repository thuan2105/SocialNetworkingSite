import { Box, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import { UseSelector, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Navbar from '../Navbar';
import FriendListWidget from '../widgets/FriendListWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import UserWidget from '../widgets/UserWidget';
import * as userService from '~/services/userService';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

    const getUser = () => {
        userService
            .user(userId, token)
            .then((data) => setUser(data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap="0.5rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? ' 26%' : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box margin="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? ' 42%' : undefined}
                    marginTop={isNonMobileScreens ? undefined : '2rem'}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <Box margin="2rem 0" />
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
}

export default ProfilePage;
