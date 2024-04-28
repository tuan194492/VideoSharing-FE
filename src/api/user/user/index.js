import axios from "axios";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;


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

export const userService = {
    findUserById
}