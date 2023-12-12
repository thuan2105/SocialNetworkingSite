import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import {
    EditOutlined,
    DeleteOutline,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from '@mui/icons-material';
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from '@mui/material';

import { setPosts } from '~/state';
import FlexBetween from '~/components/FlexBetween';
import UserImage from '~/components/UserImage';
import WidgetWrapper from '~/components/WidgetWrapper';
import * as postService from '~/services/postService';

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState('');
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width: 500px)');
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('userId', _id);
        formData.append('description', post);

        if (image) {
            formData.append('picture', image);
            formData.append('picturePath', image.name);
        }

        console.log(formData);

        postService
            .create(formData, token)
            .then((data) => {
                dispatch(setPosts({ data }));
                setImage(null);
                setPost('');
            })
            .catch((error) => console.log(error));
    };
    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What 's on your mind...! "
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: '100%',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '1rem 2rem',
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box border={`1px solid ${medium}`} borderRadius="0.5rem" marginTop="1rem" padding="1rem">
                    <Dropzone
                        acceptedFiles=".jpg, .jpeg, .pnj"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px solid ${palette.primary.main}`}
                                    padding="1rem"
                                    width="100%"
                                    sx={{
                                        '&:hover': { cursor: 'pointer' },
                                    }}
                                >
                                    <input {...getInputProps()} />

                                    {!image ? (
                                        <p>Add picture here!</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton sx={{ width: '10%' }} onClick={() => setImage(null)}>
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: '1.25rem 0' }} />

            <FlexBetween>
                <FlexBetween sx={{ cursor: 'pointer' }} gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain} sx={{ '&hover': { color: medium } }}>
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap="0.25rem" sx={{ cursor: 'pointer' }}>
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem" sx={{ cursor: 'pointer' }}>
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap="0.25rem" sx={{ cursor: 'pointer' }}>
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap="0.25rem" sx={{ cursor: 'pointer' }}>
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}
                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{ color: palette.background.alt, backgroundColor: palette.primary.main, borderRadius: '3rem' }}
                >
                    Post
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default MyPostWidget;
