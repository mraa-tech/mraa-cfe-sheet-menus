/**
 * Generates a unique alphanumeric string.
 *
 * @return {string} A randomly generated hexadecimal string.
 * @customfunction
 */
function GENERATEID() {
    let cell = SpreadsheetApp.getActiveSheet().getActiveCell().getDisplayValue();

    if (cell !== "") {
        return Math.floor(Math.random() * Math.floor(100000000)).toString(16).toUpperCase();
    }
}