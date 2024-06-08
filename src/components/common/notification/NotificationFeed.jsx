import React, {useContext, useEffect, useRef, useState} from 'react';
import {FaEllipsisV} from 'react-icons/fa';
import {ImageUtils} from "../../../utils/images/ImageUtils";
import {NOTIFICATION_STATUS} from "../../../utils/enum/NotificationStatus";
import {DateUtils} from "../../../utils/date/DateUtils";
import {StringUtils} from "../../../utils/string/StringUtils";
import {useNavigate} from "react-router-dom";
import {NotificationType} from "../../../utils/enum/NotificationType";
import {notificationService} from "../../../api/user/notification";
import {AuthContext} from "../../../context/AuthContext";

export const NotificationFeed = (props) => {
    const notification = props.notification;
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();
    const [isRead, setIsRead] = useState(false);
    const handleReadNotification = (e) => {
        setIsRead(true)
    }

    const handleOnclick = async(e) => {
        const result = await notificationService.readNotification(notification.id, token);
        if (result.success) {
            setIsRead(true);
            props.update && props.update({
                ...notification,
                status: NOTIFICATION_STATUS.READ
            })
        }
        switch (notification.type) {
            case NotificationType.Like:
            case NotificationType.Dislike:
            case NotificationType.Subcribe:
            case NotificationType.Unfollow:
                navigate(`/user/channel/${notification.Actor.id}`);
                break;
            case NotificationType.Comment:
                navigate(`/user/video/detail/${notification.Video.id}`);
                break;
            default:
                break;
        }
    }

    const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
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

    useEffect(() => {
        if (notification) {
            setIsRead(notification.status === NOTIFICATION_STATUS.READ);
        }
    }, [notification]);
    return (
        <div
            onClick={handleOnclick}
            className={`flex items-center cursor-pointer p-4 border-b border-gray-200 hover:bg-gray-100 ${!isRead && 'bg-white'}`}>
            {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>}
            {isRead && <div className="w-2 h-2 rounded-full mr-2"></div>}
            <img className="w-12 h-12 rounded-full mr-4" src={ImageUtils.createImageSrcFromBuffer(notification?.Actor?.avatar)} alt="channel" />
            <div className="flex-1">
                <div className="text-sm">
                    {
                        notification?.type !== 'Subcribe' && <div>
                        <span
                            className="font-semibold">{notification?.Actor?.shortname}</span> {StringUtils.getNotifyLabel(notification.type)}
                            <span className="font-semibold">{notification?.Video?.title}</span>
                        </div>
                    }

                    {notification?.type === 'Subcribe' && <div><span
                        className="font-semibold">{notification.Actor?.shortname}</span> {StringUtils.getNotifyLabel(notification.type)}
                        <span className="font-semibold">{notification.type ? " to your channel" : ''}</span> </div>
                }
                </div>
                <div className="text-xs text-gray-500">{DateUtils.getPostedSince(notification?.createdAt)}</div>
            </div>
            <div className="flex justify-end px-4 pt-4 relative">
                <button
                    id="dropdownButton"
                    onClick={toggleDropdown}
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 absolute top-[-10px] right-0"
                    type="button"
                >
                    <FaEllipsisV />
                </button>
                <div
                    id="dropdown"
                    ref={dropdownRef}
                    className={`z-10 ${dropdownOpen ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute`}
                >
                    <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a
                                onClick={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setDropdownOpen(false)
                                    const result = await notificationService.unreadNotification(notification.id, token);
                                    if (result.success) {
                                        setIsRead(false);
                                        props.update && props.update({
                                           ...notification,
                                            status: NOTIFICATION_STATUS.UN_READ
                                        })
                                    }
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Mark as unread
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};