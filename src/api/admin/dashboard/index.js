import axios from "axios";
import {RequestFactory} from "../../../utils/request";

const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

const getAdminDashboardData = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/setting/dashboard`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.error(error);
        let message = error.response?.data?.message || 'Network error';
        return {
            success: false,
            data: null,
            message
        };
    }
}

const getSettings = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/setting`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.error(error);
        let message = error.response?.data?.message || 'Network error';
        return {
            success: false,
            data: null,
            message
        };
    }
}

const updateSettings = async (token, data) => {
    try {
        const result = await axios.put(`${baseAdminURL}/setting`, RequestFactory.createFormDataFromObject(data), RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.error(error);
        let message = error.response?.data?.message || 'Network error';
        return {
            success: false,
            data: null,
            message
        };
    }
}

export const dashboardService = {
    getAdminDashboardData,
    getSettings,
    updateSettings
}