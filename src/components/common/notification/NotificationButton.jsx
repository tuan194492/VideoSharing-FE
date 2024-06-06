import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {notificationService} from "../../../api/user/notification";
import {NotificationFeed} from "./NotificationFeed";

export const NotificationButton = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const initNotifications = async () => {
        const result = await notificationService.getNotifications(token, 1, 5);
        console.log(result)
        if (result.success) {
            setNotifications(result.data.data);
        }
    }

    const notificationRef = useRef(null);
    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setShowNotifications(false);
        }
    };

    const initData = async () => {
        await initNotifications();
    }

    useEffect(() => {
        initData()
    }, []);

    useEffect(() => {
        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    return (
        <div className={'relative flex justify-center'}>
            <button onClick={toggleNotifications} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-black' fill='none' viewBox='0 0 24 24' stroke='black'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                </svg>
            </button>
            {showNotifications && (
                <ul ref={notificationRef} className="absolute top-8 right-0 bg-white border border-gray-300 rounded-lg w-[30vw] shadow-lg p-3 list-none">
                    {notifications.map((notification, index) => (
                        <li key={index} className={`py-2 ${index !== notifications.length - 1 ? 'border-b border-gray-200' : ''}`}>
                            <NotificationFeed notification={notification} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
