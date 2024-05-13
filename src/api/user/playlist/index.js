import {RequestFactory} from "../../../utils/request";
import axios from "axios";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
const getPlaylistListByUser = async (token) => {
    try {
        const result = await axios.get(`${baseAdminURL}/playlist/all`, RequestFactory.createHeaderRequestFormDataWithToken(token));
        console.log(result)
        return {
            success: true,
            count: result.data.data.count,
            data: result.data.data.rows,
            message: 'Get playlist list successfully!'
        };
    } catch (error) {
        let message = '';
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                count: 0,
                data: [],
                message: error.response.data.error
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                count: 0,
                data: [],
            };
        }
    }
}

const addToPlaylist = async (videoId, playlistId, token) => {
    try {
        console.log(videoId, playlistId)
        const formData = RequestFactory.createFormDataFromObject({});
        formData.append('playlistId', playlistId);
        formData.append('videoId', videoId);
        console.log(formData)
        const result = await axios.post(`${baseAdminURL}/playlist/add-video-to-playlist`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Add video to playlist successful!'
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

const deleteVideoFromPlaylist = async (videoId, playlistId, token) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        formData.append('playlistId', playlistId);
        formData.append('videoId', videoId);
        const result = await axios.post(`${baseAdminURL}/playlist/remove-video-from-playlist`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Remove video from playlist successful!'
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

const createPlaylist = async (data, token) => {
    try {
        const formData = RequestFactory.createFormDataFromObject(data);
        const result = await axios.post(`${baseAdminURL}/playlist/create-playlist`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        console.log(result)
        return {
            success: true,
            data: result.data,
            message: 'Create playlist successful!'
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

const deletePlaylist = async (playlistId, token) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        const result = await axios.post(`${baseAdminURL}/playlist/delete-playlist/${playlistId}`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            data: result.data,
            message: 'Delete playlist successful!'
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

const isAddedToPlaylist = async (playlistId, videoId, token) => {
    try {
        const formData = RequestFactory.createFormDataFromObject({});
        formData.append('playlistId', playlistId);
        formData.append('videoId', videoId);
        console.log(formData)
        const result = await axios.post(`${baseAdminURL}/playlist/is-added-to-playlist`, formData, RequestFactory.createHeaderRequestFormDataWithToken(token));
        return {
            success: true,
            isAddedToPlaylist: result.data.isAddedToPlaylist
        };
    } catch (error) {
        let message = '';
        message = error.response.data.message;
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                isAddedToPlaylist: false,
                message: message
            };
        } else {
            return {
                success: false,
                isAddedToPlaylist: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

export const playlistService = {
    getPlaylistListByUser,
    addToPlaylist,
    createPlaylist,
    deletePlaylist,
    deleteVideoFromPlaylist,
    isAddedToPlaylist
}