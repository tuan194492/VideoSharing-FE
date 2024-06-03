// src/UploadVideosCard.js
import React from 'react';
import uploadIllustration from '../../assets/icon/no_content_illustration_upload_video_v3.svg';
import {useNavigate} from "react-router-dom"; // Ensure to replace with your image path

export const UploadVideosCard = () => {
    const navigate = useNavigate();
    return (
        <div className="relative bg-white rounded-lg shadow-lg p-8 py-18 m-4 w-full max-w-sm flex flex-col items-center border border-gray-300">
            <div className="absolute inset-0 border border-gray-300 rounded-lg transform scale-105 z-0"></div>
            <div className="relative z-10 py-16 flex justify-center flex-col">
                <div className={'flex justify-center'}>
                    <img src={uploadIllustration} alt="Upload Illustration" className="w-24 h-24 mb-4"/>

                </div>
                <p className="text-center text-gray-700 mb-4">
                    Want to see metrics on your recent video? Upload and publish a video to get started.
                </p>
                <div className={'flex justify-center'}>
                    <button
                        onClick={e => navigate('/user/video/create')}
                        className="bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow-md hover:bg-blue-600 transition duration-300 text-sm">
                        UPLOAD VIDEOS
                    </button>
                </div>

            </div>
        </div>
    );
};

