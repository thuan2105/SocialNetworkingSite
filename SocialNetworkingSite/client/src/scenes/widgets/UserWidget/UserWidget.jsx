import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userService from '~/services/userService';
import UserImage from '~/components/UserImage';
import WidgetWrapper from '~/components/WidgetWrapper';
import FlexBetween from '~/components/FlexBetween';

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    useEffect(() => {
        const getUser = async () => {
            userService
                .user(userId, token)
                .then((response) => {
                    setUser(response);
                })
                .catch((error) => console.log(error));
        };
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) return null;

    const { firstName, lastName, location, occupation, viewerProfile, impression, friends } = user;
    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                marginBottom="0.5rem"
                padding="0.5rem"
                sx={{
                    '&:hover': {
                        backgroundColor: palette.primary.light,
                        cursor: 'pointer',
                        borderRadius: '10px',
                    },
                }}
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography variant="h5" color={dark} fontWeight="550">
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box padding="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem">
                    <LocationOnOutlined
                        fontSize="larger"
                        sx={{
                            color: main,
                        }}
                    />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined
                        fontSize="larger"
                        sx={{
                            color: main,
                        }}
                    />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />

            {/* THIRD ROW */}
            <Box padding="1rem 0">
                <FlexBetween marginBottom="0.5rem">
                    <Typography color={medium}>Who 's viewed your profile</Typography>
                    <Typography color={main} fontWeight="550">
                        {viewerProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight="550">
                        {impression}
                    </Typography>
                </FlexBetween>
            </Box>
            <Divider />

            {/* FOURTH ROW */}
            <Box padding="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="550" marginBottom="1rem">
                    Social Profile
                </Typography>
                <FlexBetween gap="1rem" marginBottom="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="550">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
                <FlexBetween gap="1rem" marginBottom="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="550">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;
