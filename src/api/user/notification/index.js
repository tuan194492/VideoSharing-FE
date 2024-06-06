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

}

const readAllNotification = async (token) => {

}

const hideNotification = async (notificationId, token) => {

}

export const notificationService = {
    getNotifications,
    readNotification,
    readAllNotification,
    hideNotification,
}