import React, {useEffect, useState} from 'react';
import {FaEllipsisV} from 'react-icons/fa';
import {ImageUtils} from "../../../utils/images/ImageUtils";
import {NOTIFICATION_STATUS} from "../../../utils/enum/NotificationStatus";
import {DateUtils} from "../../../utils/date/DateUtils";
import {StringUtils} from "../../../utils/string/StringUtils";
import {useNavigate} from "react-router-dom";

export const NotificationFeed = (props) => {
    const notification = props.notification;
    const navigate = useNavigate();
    const [isRead, setIsRead] = useState(false);
    const handleReadNotification = (e) => {
        setIsRead(true)
    }

    const handleOnclick = (e) => {

    }

    useEffect(() => {
        if (notification) {
            setIsRead(notification.status === NOTIFICATION_STATUS.READ);
        }
    }, [notification]);
    return (
        <div className={`flex items-center cursor-pointer p-4 border-b border-gray-200 hover:bg-gray-100 ${!isRead && 'bg-white'}`}>
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
            <button className="ml-4 text-gray-500 hover:text-gray-700">
                <FaEllipsisV />
            </button>
        </div>
    );
};