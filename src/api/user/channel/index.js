import axios from "axios";
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
const getSubscriptionList = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/subcriber/subcribe-to`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Get Subscription list successful!'
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.response.data.error
        };
    }
}

const getSubscriberList = async (channelId) => {
    try {
        const result = await axios.get(`${baseAdminURL}/subcriber/subcrber/${channelId}`, RequestFactory.createHeaderRequestFormDataWithToken(''));
        return {
            success: true,
            data: result.data,
            message: 'Get Subscriber list successful!'
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.response.data.error
        };
    }
}

export const channelService = {
    getSubscriptionList,
    getSubscriberList
}