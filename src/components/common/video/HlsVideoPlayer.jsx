import React, {useContext, useEffect, useRef, useState} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-hls-quality-selector';
import {useLocation, useNavigate} from "react-router-dom";
import {videoService} from "../../../api/user/video";
import {AuthContext} from "../../../context/AuthContext";

export const HlsVideoPlayer = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [player, setPlayer] = useState(null);
    console.log('Changing player ' + JSON.stringify(props))
    let videoRef = useRef(null);
    let playerRef = useRef(null);
    let watchTime = 0;
    let lastTime = 0;
    const location = useLocation();
    let handleTimeUpdate, handleEnded, handlePause;
    useEffect(() => {
        if (props.src) {
            // Initialize the player if the video source is available
            console.log('BEgin changing src')
            console.log(videoRef.current)
            console.log(playerRef.current)
            if (!playerRef.current) {
                console.log('BEgin changing src has current')
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
            const curPlayer = playerRef.current;
             handleTimeUpdate = () => {
                const currentTime = curPlayer.currentTime();
                if (!curPlayer.paused()) {
                    watchTime += Math.max(0,(currentTime - lastTime));
                }
                lastTime = currentTime;
            };

             handleEnded = async () => {
                if (props.callBackOnEnded) {
                    await props.callBackOnEnded();
                }
                console.log(curPlayer)
                console.log('Total watch time: ' + watchTime + ' seconds');
            };

             handlePause = () => {
                 if (props.callBackOnPause) {
                      props.callBackOnPause();
                 }
                console.log('Watch time so far: ' + watchTime + ' seconds');
            };

            if (curPlayer) {
                curPlayer.on('timeupdate', handleTimeUpdate);
                curPlayer.on('ended', handleEnded);
                curPlayer.on('pause', handlePause);
            }

        }

        return () => {
            // Dispose of the player when the component unmounts
            console.log('Disposing')
            console.log(player)

            if (player) {
                // player.dispose();
                player.off('timeupdate', handleTimeUpdate);
                player.off('handleEnded', handleEnded);
                player.off('handlePause', handlePause);
                // setPlayer(null);
                handleRouteChange(watchTime);
                console.log('Player destroyed')
            }

        };
    }, [props.src, playerRef.current]);

    useEffect(() => {
        console.log('videoRef.current:', videoRef.current);
    }, []);

    const handleRouteChange = async (value) => {
        console.log('User is navigating to a new page. Watch time: ' + value + ' seconds');
        await videoService.watchVideo(props.videoId, token, value);
    }




    return (
        <div className={'w-full h-full'}>
            <video
                ref={videoRef}
                id={props.videoId}
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

