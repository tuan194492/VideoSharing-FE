// src/ChannelCard.js
import React, {useEffect, useRef, useState} from 'react';
import {StringUtils} from "../../../utils/string/StringUtils";
import {ImageUtils} from "../../../utils/images/ImageUtils";
import {IMAGES} from "../../../utils/images/images";
import {useNavigate} from "react-router-dom";
import {subscribeService} from "../../../api/user/subscribe";
import {toast} from "react-toastify";

export const ChannelCard = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [channel, setChannel] = useState(props.data);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    props.data.User = props.data.Publisher;
    const visitChannel = () => {
        navigate(`/user/channel/${channel.User.id}`);
    }

    const [subscribed, setSubscribed] = useState(true);

    const unsubscribe = async () => {
        console.log(channel);
        const result = await subscribeService.undoSubscribeChannel(token, channel.User.id);
        console.log(result);
        if (result.success) {
            setSubscribed(false);
            return toast.success('Unsubscribed successfully')
        } else {
            return toast.error(result.message);
        }
    }

    const subscribe = async () => {
        const result = await subscribeService.subscribeChannel(token, channel.User.id);
        console.log(result);
        if (result.success) {
            setSubscribed(true);
            return toast.success('Subscribed successfully')
        } else {
            return toast.error(result.message);
        }
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };



    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4 relative">
                <button
                    id="dropdownButton"
                    onClick={toggleDropdown}
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 absolute top-1 right-1"
                    type="button"
                >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                    >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>
                <div
                    id="dropdown"
                    ref={dropdownRef}
                    className={`z-10 ${dropdownOpen ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute`}
                >
                    <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Edit
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Export Data
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className='w-24 h-24 mb-3 rounded-full shadow-lg'
                     src={channel?.avatar?.data ? ImageUtils.createImageSrcFromBuffer(channel.User.avatar.data) : IMAGES.icon.avatar}/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {channel.User.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  @{channel.User.shortname}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {StringUtils.formatNumber(channel.User.subscriberCount)} subscribers
                </span>
                <div className="flex mt-4 md:mt-6">
                    <button
                        onClick={visitChannel}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Visit channel
                    </button>
                    {
                        subscribed && <button
                            onClick={unsubscribe}
                            className="py-2 px-4 ms-2 text-sm font-medium text-white/[0.7] focus:outline-none bg-gray-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Unsubscribe
                        </button>
                    }

                    {
                        !subscribed && <button
                            onClick={subscribe}
                            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            Subscribe
                        </button>
                    }

                </div>
            </div>
        </div>
    );
};

