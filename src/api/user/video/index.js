import axios from 'axios';
import async from "async";
import {RequestFactory} from "../../../utils/request";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

const findVideoById = async (token, id) => {
    try {
        const result = await axios.get(`${baseAdminURL}/video/${id}`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Get Video detail successful!'
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

function fetchVideoDescriptionData (id) {
    return {
        viewCount: '100',
        dateTime: 'Mar 10, 2024',
        title: '[FULL] Tràng An Ninh Bình - Đại Từ | Giải Bóng đá Nam Đồng Bằng Sông Hồng',
        description: 'We use the useState hook to maintain the state of the description text.\n' +
            'We provide a textarea element for the user to input their description.\n' +
            'We display a character count indicating the remaining characters the user can input (assuming a maximum of 500 characters, adjust as needed).\n' +
            'You can further enhance this component by adding formatting options (e.g., bold, italic) through buttons or a toolbar and handling the formatting accordingly.We use the useState hook to maintain the state of the description text.\n' +
            'We provide a textarea element for the user to input their description.\n' +
            'We display a character count indicating the remaining characters the user can input (assuming a maximum of 500 characters, adjust as needed).\n' +
            'You can further enhance this component by adding formatting options (e.g., bold, italic) through buttons or a toolbar and handling the formatting accordingly.We use the useState hook to maintain the state of the description text.\n' +
            'We provide a textarea element for the user to input their description.\n' +
            'We display a character count indicating the remaining characters the user can input (assuming a maximum of 500 characters, adjust as needed).\n' +
            'You can further enhance this component by adding formatting options (e.g., bold, italic) through buttons or a toolbar and handling the formatting accordingly.We use the useState hook to maintain the state of the description text.\n' +
            'We provide a textarea element for the user to input their description.\n' +
            'We display a character count indicating the remaining characters the user can input (assuming a maximum of 500 characters, adjust as needed).\n' +
            'You can further enhance this component by adding formatting options (e.g., bold, italic) through buttons or a toolbar and handling the formatting accordingly.We use the useState hook to maintain the state of the description text.\n' +
            'We provide a textarea element for the user to input their description.\n' +
            'We display a character count indicating the remaining characters the user can input (assuming a maximum of 500 characters, adjust as needed).\n' +
            'You can further enhance this component by adding formatting options (e.g., bold, italic) through buttons or a toolbar and handling the formatting accordingly.We use the useState hook to maintain the state of the description text.\n' +
            'We provide a textarea element for the user to input their description.\n' +
            'We display a character count indicating the remaining characters the user can input (assuming a maximum of 500 characters, adjust as needed).\n' +
            'You can further enhance this component by adding formatting options (e.g., bold, italic) through buttons or a toolbar and handling the formatting accordingly.'
    }
}

const uploadVideo = async (data, uploadedVideo, uploadedImage, token)  => {
    try {
        const formData = RequestFactory.createFormDataFromObject(data);
        formData.append(`file`, uploadedVideo);
        formData.append('thumbnail', uploadedImage);

        const result = await axios.post(`${baseAdminURL}/video`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Create Video successful!'
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

const fetchVideoList = async (token, data) => {
    try {
        console.log(`${baseAdminURL}/video/watch?page=${data.page}&pageSize=${data.pageSize}`);
        const result = await axios.get(`${baseAdminURL}/video/watch?page=${data.page}&pageSize=${data.pageSize}`, RequestFactory.createHeaderRequestWithJson(token));
        return {
            success: true,
            data: result.data,
            message: 'Get Video list successful!'
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

const searchVideo = async (keyword) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({
            keyword: keyword
        })
        const result = await axios.post(`${baseAdminURL}/video/search`, formData ,RequestFactory.createHeaderRequestWithJson(''));
        return {
            success: true,
            data: result.data,
            message: 'Get Video list successful!'
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

const getLikedVideoList = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/video/liked-video`, RequestFactory.createHeaderRequestWithJson(token));
        return {
            success: true,
            data: result.data,
            message: 'Get Video list successful!'
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

const getWatchedVideoList = async (token, params) => {
    try {
        const result = await axios.get(`${baseAdminURL}/video/watched-video?page=${params?.page || 0}&pageSize=${params?.pageSize || 0}`, RequestFactory.createHeaderRequestWithJson(token));
        console.log(result);
        return {
            success: true,
            data: result.data,
            message: 'Get Watched Video list successful!'
        };
    } catch (error) {
        let message = '';
        console.log(error)
        message = error.response?.data?.message;
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

const updateVideo = async (videoId, data, uploadedImage, token)  => {
    try {
        const formData = RequestFactory.createFormDataFromObject(data);
        formData.append('thumbnail', uploadedImage);

        const result = await axios.post(`${baseAdminURL}/video/${videoId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Update Video successful!'
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

const getVideoByPublisherId = async (token, publisherId) => {
    try {
        const result = await axios.get(`${baseAdminURL}/video/get-by-publisher/${publisherId}`, RequestFactory.createHeaderRequestWithJson(token));
        return {
            success: true,
            data: result.data,
            message: 'Get Video list successful!'
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

const deleteWatchedVideo = async (token) => {
    try {
        const result = await axios.delete(`${baseAdminURL}/video/watched-video`, RequestFactory.createHeaderRequestWithJson(token));
        return {
            success: true,
            data: result.data,
            message: 'Delete Watcher Video successful!'
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

const getVideoSrc = async (videoId) => {
    try {
        const result = await axios.get(`${baseAdminURL}/video/stream-multi-res/${videoId}`);
        return {
            success: true,
            data: result.data,
            message: 'Get Video src successful!'
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

const watchVideo = async (videoId, token, watchTime) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({
            watchTime: watchTime
        });

        const result = await axios.post(`${baseAdminURL}/video/watch-video/${videoId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        console.log(result)
        return {
            success: true,
            data: result.data,
            message: 'Watch Video successful!'
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

export const videoService = {
    findVideoById,
    fetchVideoDescriptionData,
    uploadVideo,
    fetchVideoList,
    searchVideo,
    getLikedVideoList,
    getVideoByPublisherId,
    updateVideo,
    getWatchedVideoList,
    deleteWatchedVideo,
    getVideoSrc,
    watchVideo
}

