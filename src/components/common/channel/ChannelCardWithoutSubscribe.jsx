// src/ChannelCard.js
import React, {useRef, useState} from 'react';
import { StringUtils } from "../../../utils/string/StringUtils";
import { ImageUtils } from "../../../utils/images/ImageUtils";
import { IMAGES } from "../../../utils/images/images";
import { useNavigate } from "react-router-dom";

export const ChannelCardWithoutSubscribe = (props) => {
    const [channel, setChannel] = useState(props.data);
    const navigate = useNavigate();
    props.data.User = props.data.Publisher ? props.data.Publisher : props.data.user ;

    const visitChannel = () => {
        navigate(`/user/channel/${channel?.User?.id}`);
    }

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4 relative">
                {/* Dropdown button removed */}
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className='w-24 h-24 mb-3 rounded-full shadow-lg'
                     src={channel?.avatar?.data ? ImageUtils.createImageSrcFromBuffer(channel?.User?.avatar.data) : IMAGES.icon.avatar}/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {channel?.User?.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  @{channel?.User?.shortname}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {StringUtils.formatNumber(channel?.User?.subscriberCount)} subscribers
                </span>
                <div className="flex mt-4 md:mt-6">
                    <button
                        onClick={visitChannel}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Visit channel
                    </button>
                </div>
            </div>
        </div>
    );
};
