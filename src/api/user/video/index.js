import axios from 'axios';
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

function findVideoById(id) {

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

export const userService = {
    findVideoById,
    fetchVideoDescriptionData
}

