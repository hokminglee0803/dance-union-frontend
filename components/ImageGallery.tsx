import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function ImageGallery({ photos }) {

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <>
            <Gallery photos={photos ? showMore ? photos : photos.slice(0, 8) : []} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
            <br />
            <Button onClick={() => setShowMore(!showMore)} variant="contained" style={{ float: 'right' }} endIcon={showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
                 {showMore ? '更少' : '更多'}
            </Button>
        </>
    );
}