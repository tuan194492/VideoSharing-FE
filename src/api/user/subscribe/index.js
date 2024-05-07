import axios from "axios";
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

const subscribeChannel = async (token, channelId) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        formData.append('channelId', channelId);
        console.log(channelId)
        const result = await axios.post(`${baseAdminURL}/subcriber/subcribe`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Subscribe Channel successful!'
        };
    } catch (error) {
        console.log(error)
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

const undoSubscribeChannel = async (token, channelId) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        formData.append('channelId', channelId);

        const result = await axios.post(`${baseAdminURL}/subcriber/unsubcribe`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Subscribe Channel successful!'
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

const isSubscribed = async (token, channelId) => {
    if (!token || !channelId) {
        return {
            success: false,
            isSubscribed: false
        };
    }

    try {
        const result = await axios.get(`${baseAdminURL}/subcriber/is_subscribed/${channelId}`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        console.log(result)
        return {
            success: true,
            isSubscribed: result.data.isSubscribed
        }
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                isSubscribed: false,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                isSubscribed: false
            };
        }
    }


}

export const subscribeService = {
    subscribeChannel,
    undoSubscribeChannel,
    isSubscribed
}