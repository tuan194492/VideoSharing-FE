import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {notificationService} from "../../../api/user/notification";
import {NotificationFeed} from "./NotificationFeed";
import socket from "../../../context/Socket";
import {toast} from "react-toastify";


export const NotificationButton = (props) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [hasNewNotifications, setHasNewNotifications] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pagePerRequest = 5;
    const toggleNotifications = (e) => {
        e.preventDefault()
        e.stopPropagation();  // Stop the event from propagating
        //console.log(`toggleNotifications value prev`, showNotifications)
        // setHasNewNotifications(false)
        setShowNotifications(prev => !prev);
        //console.log(`toggleNotifications value after`, showNotifications)

    };

    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;

    useEffect(() => {
        if (user) {
            socket.on(`user${user.id}`, (data) => {
                toast.success(JSON.stringify(data));
                fetchNewNotifications();
            })
        }

        return () => {
            socket.off(`user${user?.id}`)
        }
    }, []);


    const initNotifications = async () => {
        const result = await notificationService.getNotifications(token, 1, pagePerRequest);
        console.log(result)
        if (result.success) {
            setNotifications(result.data.data);
        }
        const hasNewNotifications = await notificationService.hasUnreadNotification(token);
        console.log(hasNewNotifications)
        if (hasNewNotifications.success) {
            setHasNewNotifications(hasNewNotifications.data.hasUnread);
        }
    }


    const notificationRef = useRef(null);
    const notificationButtonRef = useRef(null);

    const handleClickOutside = (event) => {
        //console.log(`handleClickOutside from ${event.target}`)
        //console.log(showNotifications)
        if (( notificationButtonRef.current && notificationButtonRef.current.contains(event.target))) {
            //console.log(`handle click outside 1`)


            setShowNotifications(prev => !prev);
            return event.preventDefault();
        }
        if ((notificationRef.current && !notificationRef.current.contains(event.target))) {
            //console.log(`handle click outside 2`)

            //console.log(`handle click outside detail`)
            //console.log(notificationRef.current)
            //console.log(event.target)
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
        //console.log(`toggleNotifications value updated`, showNotifications);

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    const fetchMoreNotifications = async () => {
        const result = await notificationService.getNotifications(token, currentPage + 1, pagePerRequest);
        console.log(result)
        if (result.success) {
            setCurrentPage(currentPage + 1)
            setNotifications([...notifications, ...result.data.data]);
        }
    }

    const fetchNewNotifications = async () => {
        const result = await notificationService.getNotifications(token, 1, 1);
        console.log(result)
        if (result.success) {
            setHasNewNotifications(true)
            setNotifications(prev => [...result.data.data, ...prev ]);
            setCurrentPage(Math.ceil([...result.data.data, ...notifications ].length / pagePerRequest));
        }
    }

    const updateNotificationStatus = (newNotification) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === newNotification.id ? { ...newNotification} : notification
            )
        );
    };

    return (
        <div className={'relative flex justify-center'}>
            <button onClick={toggleNotifications} ref={notificationButtonRef} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <svg  xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-black' fill='none' viewBox='0 0 24 24' stroke='black'  >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                </svg>
            </button>
            <div className={'absolute top-0 right-[-8px]'}>
                {hasNewNotifications && <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />}
            </div>
            {showNotifications && (
                <ul ref={notificationRef} className="absolute top-8 right-0 bg-white border border-gray-300 rounded-lg h-[50vh] overflow-y-scroll w-[60vw] md:w-[30vw] shadow-lg p-3 list-none">
                    {notifications.map((notification, index) => (
                        <li key={index} className={`py-2 ${index !== notifications.length - 1 ? 'border-b border-gray-200' : ''}`}>
                            <NotificationFeed notification={notification} update={updateNotificationStatus} />
                        </li>
                    ))}
                    <li className="py-2 border-b border-gray-200">
                        <div className="flex justify-center">
                            <button
                                onClick={fetchMoreNotifications}
                                className="text-blue-500 hover:text-blue-600">Show more</button>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};
