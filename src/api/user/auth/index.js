import axios from 'axios';
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
        console.log(error)
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

