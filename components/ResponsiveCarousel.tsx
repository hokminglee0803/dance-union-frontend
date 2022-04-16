import { Box, Skeleton } from '@mui/material';
import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ResponsiveCarouselProps {

}

export default function ResponsiveCarousel({ }: ResponsiveCarouselProps) {

    return (
        <div>
            <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                emulateTouch={true}
                infiniteLoop={true}
                swipeable={true}
                autoPlay={true}
            // onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
            >
                <div>
                    <img src="https://easyvolunteer.hk/assets/uploads/homepage_sliders/ev_banner_award.jpg" />
                </div>
                <div>
                    <img src="https://easyvolunteer.hk/assets/uploads/homepage_sliders/keyart_ev_banner.jpg" />
                </div>
            </Carousel>

        </div >
    );
}