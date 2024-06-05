import React, {useEffect, useRef, useState} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-hls-quality-selector';

export const HlsVideoPlayer = (props) => {
    const [player, setPlayer] = useState(null);

    console.log('Changing player ' + JSON.stringify(props))
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    useEffect(() => {
        if (props.src) {
            // Initialize the player if the video source is available
            if (!playerRef.current) {
                console.log('Set src to ' + props.src);

                playerRef.current = videojs(videoRef.current, {
                    controls: true,
                    autoplay: false,
                    preload: 'auto',
                    fluid: true,
                    responsive: true,
                    sources: [{
                        src: props.src,
                        type: 'application/x-mpegURL'
                    }]

                });
                setPlayer(playerRef.current);

                // Initialize the quality selector plugin
                playerRef.current.hlsQualitySelector();
            } else {
                // Update the source if the player is already initialized
                console.log('Updated src to ' + props.src);
                playerRef.current.src({
                    src: props.src,
                    type: 'application/x-mpegURL'
                });
                setPlayer(playerRef.current);

            }
        }

        return () => {
            // Dispose of the player when the component unmounts
            console.log('Disposing')
            console.log(player)
            if (player) {
                player.dispose();
                console.log('Player destroyed')
            }
        };
    }, [props.src, playerRef.current]);

    useEffect(() => {
        console.log('videoRef.current:', videoRef.current);
    }, []);

    return (
        <div className={'w-full h-full'}>
            <video
                ref={videoRef}
                id="my-video"
                className="video-js vjs-default-skin"
                controls
                preload="auto"
                data-setup='{ "playbackRates": [0.5, 1, 1.5, 2] }'
                width={props.width || "100%"}
                height={props.height || "100%"}
            />
        </div>
    );
};

