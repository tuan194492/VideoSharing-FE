function countLines(text) {
    // Split the text by newline characters
    const lines = text.split('\n');
    // Remove empty lines (if any)
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    // Return the number of non-empty lines
    return nonEmptyLines.length;
}

function convertSeconds(seconds) {
    seconds = Math.floor(seconds);
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30.44; // Approximate average month length
    const year = day * 365.25; // Approximate average year length

    if (seconds < minute) {
        return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    } else if (seconds < hour) {
        const numMinutes = Math.floor(seconds / minute);
        return `${numMinutes} minute${numMinutes !== 1 ? 's' : ''}`;
    } else if (seconds < day) {
        const numHours = Math.floor(seconds / hour);
        return `${numHours} hour${numHours !== 1 ? 's' : ''}`;
    } else if (seconds < week) {
        const numDays = Math.floor(seconds / day);
        return `${numDays} day${numDays !== 1 ? 's' : ''}`;
    } else if (seconds < month) {
        const numWeeks = Math.floor(seconds / week);
        return `${numWeeks} week${numWeeks !== 1 ? 's' : ''}`;
    } else if (seconds < year) {
        const numMonths = Math.floor(seconds / month);
        return `${numMonths} month${numMonths !== 1 ? 's' : ''}`;
    } else {
        const numYears = Math.floor(seconds / year);
        return `${numYears} year${numYears !== 1 ? 's' : ''}`;
    }
}

function formatNumber(num) {
    if (num == null) {
        return 0;
    }
    if (num < 1000) {
        if (num !== Math.floor(num)) {
            return num.toFixed(2);
        } else return num;
    } else if (num < 1000000) {
        return (num / 1000).toFixed(3).replace(/\.?0+$/, '') + 'K';
    } else {
        return (num / 1000000).toFixed(2).replace(/\.?0+$/, '') + 'M';
    }
}

function displayDescription(description) {
    if (!description) return '';
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    return description.replace(regex, '<br>');
}

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function capitalizeFirstLetter(str) {
    if (str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getBase64String(str) {
    return btoa(new Uint8Array(str).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
    }, ''));
}

const getNotifyLabel = (type) => {
    switch (type) {
        case "Like":
            return "Like to";
        case "Dislike":
            return "Dislike to";
        case "Comment":
            return "Comment to";
        case "Subcribe":
            return "Subscribed to";
        case "Post Video":
            return "Uploaded ";
        default:
            return "";
    }
}

function convertToHLSUrl(mp4Url) {
    // Extract the directory path (common path)
    const commonPath = mp4Url.substring(0, mp4Url.lastIndexOf('/') + 1);

    // Constructing the HLS URL
    return commonPath + 'hls/index.m3u8';
}

export const StringUtils = {
    countLines,
    convertSeconds,
    formatNumber,
    displayDescription,
    formatDate,
    capitalizeFirstLetter,
    getBase64String,
    getNotifyLabel,
    convertToHLSUrl
};