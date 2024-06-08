import axios from 'axios';
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
const getNotifications = async (token, page, pageSize) => {
    try {
        const result = await axios.get(`${baseAdminURL}/notifications?page=${page}&pageSize=${pageSize}`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Get Notification detail successful!'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}
const readNotification = async (notificationId, token) => {
    try {
        const formData = new FormData();
        const result = await axios.post(`${baseAdminURL}/notifications/read/${notificationId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Read notification successfully'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

const readAllNotification = async (token) => {
    try {
        const formData = new FormData();
        const result = await axios.post(`${baseAdminURL}/notifications/read-all`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Read all notification successfully'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

const unreadNotification = async (notificationId, token) => {
    try {
        const formData = new FormData();
        const result = await axios.post(`${baseAdminURL}/notifications/un-read/${notificationId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Unread notification successfully'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

const hasUnreadNotification = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/notifications/has-unread-notification`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Has unread notification successfully'
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

export const notificationService = {
    getNotifications,
    readNotification,
    readAllNotification,
    unreadNotification,
    hasUnreadNotification
}