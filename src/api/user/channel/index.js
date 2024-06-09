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
        const result = await axios.get(`${baseAdminURL}/subcriber/subcriber/${channelId}`, RequestFactory.createHeaderRequestFormDataWithToken(''));
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

const getViewAnalytic = async (channelId) => {
    try {
        const result = await axios.get(`${baseAdminURL}/channel/view-analytic/${channelId}`, RequestFactory.createHeaderRequestFormDataWithToken(''));
        return {
            success: true,
            data: result.data,
            message: 'Get View data list successful!'
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.response.data.error
        };
    }
}

const getMostWatchedVideos = async (channelId) => {
try {
        const result = await axios.get(`${baseAdminURL}/channel/most-watched-video/${channelId}`, RequestFactory.createHeaderRequestFormDataWithToken(''));
        return {
            success: true,
            data: result.data,
            message: 'Get Most Watched data list successful!'
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error.response.data.error
        };
    }
}

const getChannelAnalytics = async (channelId) => {
    try {
        const result = await axios.get(`${baseAdminURL}/channel/channel-analytic/${channelId}`, RequestFactory.createHeaderRequestFormDataWithToken(''));
       console.log(result);
        return {
            success: true,
            data: result.data,
            message: 'Get Channel Analytics successful!'
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: null,
            message: error.response.data.error
        };
    }
}

export const channelService = {
    getSubscriptionList,
    getSubscriberList,
    getViewAnalytic,
    getMostWatchedVideos,
    getChannelAnalytics
}