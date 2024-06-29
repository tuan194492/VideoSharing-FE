import axios from 'axios';
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const userLogin = async (props) => {
    try {
        const result = await axios.post(`${baseAdminURL}/auth/login`, props);
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

export const userRegister = async (props) => {
    try {
        const result = await axios.post(`${baseAdminURL}/auth/register`, props);
        return {
            success: true,
            data: result.data,
            message: 'Register successfully!'
        };
    } catch (error) {
        // console.log(error)
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.message
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

export const userUpdate = async (token, data) => {
    try {
        const formData = RequestFactory.createFormDataFromObject(data);
        console.log(formData);
        const result = await axios.post(`${baseAdminURL}/auth/update`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Update  successfully!'
        };
    } catch (error) {
        console.log(error)
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.message
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

export const userUpdateAvatarAndBanner = async (token, data, avatar, banner) => {
    try {
        const formData = RequestFactory.createFormDataFromObject(data);
        formData.append('avatar', avatar);
        formData.append('banner', banner);
        console.log(formData);
        const result = await axios.post(`${baseAdminURL}/auth/update`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Update  successfully!'
        };
    } catch (error) {
        console.log(error)
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.message
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

export const userChangePassword = async (token, data) => {
    try {
        const result = await axios.post(`${baseAdminURL}/auth/change-password`,  RequestFactory.createFormDataFromObject(data), RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Change password successfully!'
        };
    } catch (error) {
        console.log(error)
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                message: error.response.data.message
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
