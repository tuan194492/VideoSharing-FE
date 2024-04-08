function countLines(text) {
    // Split the text by newline characters
    const lines = text.split('\n');
    // Remove empty lines (if any)
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    // Return the number of non-empty lines
    return nonEmptyLines.length;
}

export const StringUtils = {
    countLines
};