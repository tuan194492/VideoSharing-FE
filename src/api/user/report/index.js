import axios from "axios";
import { RequestFactory } from "../../../utils/request";

const baseReportURL = `${process.env.REACT_APP_BE_HOST}/report`;

const createReport = async (token, reportData) => {
    try {
        console.log(reportData);
        const formData = RequestFactory.createFormDataFromObject(reportData);
        const result = await axios.post(`${baseReportURL}/`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Report created successfully!'
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || 'An error occurred';
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

const getReportsByUser = async (token, page = 1, pageSize = 10) => {
    try {
        const result = await axios.get(`${baseReportURL}/user`, {
            headers: RequestFactory.createHeaderRequestFormDataWithToken(token),
            params: { page, pageSize }
        });
        return {
            success: true,
            data: result.data,
            message: 'User reports fetched successfully!'
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || 'An error occurred';
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

const approveReport = async (token, reportId) => {
    try {
        const result = await axios.post(`${baseReportURL}/${reportId}/approve`, {}, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Report approved successfully!'
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || 'An error occurred';
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

const rejectReport = async (token, reportId) => {
    try {
        const result = await axios.post(`${baseReportURL}/${reportId}/reject`, {}, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Report rejected successfully!'
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || 'An error occurred';
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

const getAllReportsForAdmin = async (token, page = 1, pageSize = 10) => {
    try {
        const result = await axios.get(`${baseReportURL}/admin`, {
            headers: RequestFactory.createHeaderRequestFormDataWithToken(token),
            params: { page, pageSize }
        });
        return {
            success: true,
            data: result.data,
            message: 'Admin reports fetched successfully!'
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.message || 'An error occurred';
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

export const reportService = {
    createReport,
    getReportsByUser,
    approveReport,
    rejectReport,
    getAllReportsForAdmin
};
