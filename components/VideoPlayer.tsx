
import * as React from 'react';
import ReactPlayer from 'react-player/lazy'

interface VideoPlayerProps {
    url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {

    return (
        <div style={{
            position: 'relative',
            paddingTop: '56.25%',
        }}>
            <ReactPlayer
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
                controls={true}
                width={'100%'}
                height={'100%'}
                url={`${url}`} />
        </div>
    );
}