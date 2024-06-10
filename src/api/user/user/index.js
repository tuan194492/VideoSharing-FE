import axios from "axios";
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
const baseAuthAdminURL = `${process.env.REACT_APP_BE_HOST}/auth`;


const findUserById = async (id) => {
    try {
        const result = await axios.get(`${baseAdminURL}/channel/${id}`);
        return {
            success: true,
            data: result.data,
            message: 'Login successfully!'
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.error
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

const getAllUsers = async (token) => {
    try {
        const result = await axios.get(`${baseAuthAdminURL}/all-user`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data
        };
    } catch (error) {
        console.log(error)
        let message = 'Network error';
        if (axios.isAxiosError(error)) {
            message = error.response?.data.message || message;
        }
        return {
            success: false,
            message
        };
    }
};

const activateUser = async (token, userId) => {
    try {
        const result = await axios.post(`${baseAuthAdminURL}/${userId}/activate`, {}, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            message: 'User activated successfully!'
        };
    } catch (error) {
        let message = 'Network error';
        if (axios.isAxiosError(error)) {
            message = error.response?.data.message || message;
        }
        return {
            success: false,
            message
        };
    }
};

const suspendUser = async (token, userId) => {
    try {
        const result = await axios.post(`${baseAuthAdminURL}/${userId}/suspend`, {}, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            message: 'User suspended successfully!'
        };
    } catch (error) {
        let message = 'Network error';
        if (axios.isAxiosError(error)) {
            message = error.response?.data.message || message;
        }
        return {
            success: false,
            message
        };
    }
};

export const userService = {
    findUserById,
    getAllUsers,
    activateUser,
    suspendUser,
}