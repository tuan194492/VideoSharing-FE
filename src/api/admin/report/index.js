import axios from "axios";
import { RequestFactory } from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

const createReport = async (token, reportData) => {
    try {
        const formData = RequestFactory.createFormDataFromObject(reportData);
        const result = await axios.post(`${baseAdminURL}/report`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Report created successfully!'
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
};

const getReportsByUser = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/report/user`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data.data.rows
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
};

const approveReport = async (token, reportId, reportRemark) => {
    try {

        const result = await axios.post(`${baseAdminURL}/report/${reportId}/approve`, RequestFactory.createFormDataFromObject({
            reportRemark
        }), RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Report approved successfully!'
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
};

const rejectReport = async (token, reportId, reportRemark) => {
    try {
        const result = await axios.post(`${baseAdminURL}/report/${reportId}/reject`, RequestFactory.createFormDataFromObject({
            reportRemark
        }), RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Report rejected successfully!'
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
};

const getAllReportsForAdmin = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/report/admin`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        console.log(result);
        return {
            success: true,
            data: result.data.data.rows
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
};


export const reportService = {
    createReport,
    getReportsByUser,
    approveReport,
    rejectReport,
    getAllReportsForAdmin
};
