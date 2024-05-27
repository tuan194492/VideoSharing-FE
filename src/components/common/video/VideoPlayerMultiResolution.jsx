// src/VideoPlayer.js
import React, { useState, useRef } from 'react';

export const VideoPlayerMultiResolution = (props) => {
    const videoSources = {
        source1: 'video1.mp4',
        source2: 'video2.mp4',
        source3: 'video3.mp4',
    };

    const [currentSource, setCurrentSource] = useState(videoSources.source1);
    const videoRef = useRef(null);

    const changeSource = (source) => {
        if (videoRef.current) {
            const isPlaying = !videoRef.current.paused && !videoRef.current.ended;
            const currentTime = videoRef.current.currentTime;

            videoRef.current.src = source;
            videoRef.current.currentTime = currentTime;
            if (isPlaying) {
                videoRef.current.play();
            }
        }
        setCurrentSource(source);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
                <video ref={videoRef} controls className="w-full mb-4">
                    <source src={currentSource} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="flex justify-between">
                    <button
                        className="source-btn bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => changeSource(videoSources.source1)}
                    >
                        Source 1
                    </button>
                    <button
                        className="source-btn bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => changeSource(videoSources.source2)}
                    >
                        Source 2
                    </button>
                    <button
                        className="source-btn bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => changeSource(videoSources.source3)}
                    >
                        Source 3
                    </button>
                </div>
            </div>
        </div>
    );
};
