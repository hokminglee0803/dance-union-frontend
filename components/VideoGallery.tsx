import React, { useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import VideoPlayer from "./VideoPlayer";
import { VideoType } from "../interface/Video";
import ReactPlayer from 'react-player/lazy'
interface VideoGalleryProps {
    videos: VideoType[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [showMore, setShowMore] = React.useState(false);
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <ImageList sx={{ width: "100%", height: "auto" }} cols={isMobile ? 1 : 3} >
                {showMore && videos.map((item) => (
                    <>
                        <ImageListItem style={{
                            margin: 10
                        }}>
                            <div style={{
                                position: 'relative',
                                paddingTop: '100%',
                            }}>
                                <ReactPlayer
                                    loop={true}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                    width={'100%'}
                                    height={'100%'}
                                    controls={true}
                                    url={`${item.url}`} />
                            </div>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                style={{ minHeight: '10vh' }}
                            >
                                <Grid item xs={3}>
                                    {item.title}
                                </Grid>
                            </Grid >
                        </ImageListItem>

                    </>
                ))}
                {!showMore && videos?.slice(0, 6).map((item) => (
                    <>
                        <ImageListItem style={{
                            margin: 10
                        }}>
                            <div style={{
                                position: 'relative',
                                paddingTop: '100%',
                            }}>
                                <ReactPlayer
                                    loop={true}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                    width={'100%'}
                                    height={'100%'}
                                    controls={true}
                                    url={`${item.url}`} />
                            </div>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                style={{ minHeight: '10vh' }}
                            >
                                <Grid item xs={3}>
                                    {item.title}
                                </Grid>
                            </Grid >
                        </ImageListItem>

                    </>
                ))}
            </ImageList>
            <br />
            <Button onClick={() => setShowMore(!showMore)} variant="contained" style={{ float: 'right', display: videos?.length > 6 ? 'block' : 'none' }}>
                {showMore ? '更少' : '更多'}
                {showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
        </>
    );
}