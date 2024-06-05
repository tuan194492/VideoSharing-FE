import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';

export const HLSVideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            playerRef.current = videojs(videoRef.current, {
                fluid: true,
                techOrder: ['html5'],
                html5: {
                    hls: {
                        overrideNative: true
                    }
                }
            });

            playerRef.current.src({
                src,
                type: 'application/x-mpegURL'
            });

            const player = playerRef.current;
            const qualityLevels = player.qualityLevels();

            player.ready(() => {
                qualityLevels.on('addqualitylevel', (event) => {
                    const qualityLevel = event.qualityLevel;
                    console.log('Quality Level added:', qualityLevel);
                });

                createQualitySelector(player, qualityLevels);
            });

            return () => {
                if (playerRef.current) {
                    playerRef.current.dispose();
                }
            };
        }
    }, [src]);

    const createQualitySelector = (player, qualityLevels) => {
        const controlBar = player.controlBar;
        const qualityMenuButton = document.createElement('div');
        qualityMenuButton.className = 'vjs-menu-button vjs-menu-button-popup vjs-control vjs-button';
        qualityMenuButton.innerHTML = 'Quality';

        const qualityMenu = document.createElement('div');
        qualityMenu.className = 'vjs-menu';
        qualityMenuButton.appendChild(qualityMenu);

        const qualityMenuContent = document.createElement('ul');
        qualityMenuContent.className = 'vjs-menu-content';
        qualityMenu.appendChild(qualityMenuContent);

        for (let i = 0; i < qualityLevels.length; i++) {
            const qualityItem = document.createElement('li');
            qualityItem.className = 'vjs-menu-item';
            qualityItem.innerHTML = `${qualityLevels[i].height}p`;
            qualityItem.onclick = (function (levelIndex) {
                return function () {
                    for (let j = 0; j < qualityLevels.length; j++) {
                        qualityLevels[j].enabled = (j === levelIndex);
                    }
                };
            })(i);
            qualityMenuContent.appendChild(qualityItem);
        }

        controlBar.el().insertBefore(qualityMenuButton, controlBar.getChild('fullscreenToggle').el());
    };

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-default-skin w-full h-auto" controls preload="auto"></video>
        </div>
    );
};

