import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

import Form from './Form';

function LoginPage() {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    return (
        <Box>
            <Box width="100%" background={theme.palette.background.alt} textAlign="center" padding="1rem 6%">
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Sociopedia
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? '50%' : '93%'}
                backgroundColor={theme.palette.background.alt}
                padding="2rem"
                margin="2rem auto"
                borderRadius="1.5rem"
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
                    Welcome to Socipedia, the Social Media for Sociopaths!
                </Typography>
                <Form />
            </Box>
        </Box>
    );
}

export default LoginPage;
