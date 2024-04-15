function countLines(text) {
    // Split the text by newline characters
    const lines = text.split('\n');
    // Remove empty lines (if any)
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    // Return the number of non-empty lines
    return nonEmptyLines.length;
}

function convertSeconds(seconds) {
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

export const StringUtils = {
    countLines,
    convertSeconds
};