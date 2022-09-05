/**
 * Generate a unique identifier.
 * @return {string} id 
 * 
 * Called by Shows
 */
function generateUniqueId() {
    return Math.floor(Math.random() * Math.floor(100000000)).toString(16).toUpperCase();
}

/**
 * Create a new image folder for uploaded art work. Each show has it's own image folder.
 * @return {string} new folder id 
 * 
 * Called by Shows
 */
function createImageFolder(name) {
    let parentFolder = DriveApp.getFolderById(parentImageFolderId);

    return parentFolder.createFolder(name).getId();
}

/**
 * HTML fragments to include in HTML sent to browser
 * @param {File} file File object
 * @returns {HTMLTemplate} html fragment
 * 
 * Called by all Pages
 */
function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}

/**
 * Gets current year in four digit format (yyyy)
 * @returns {number} year
 */
function getCurrentYear() {
  y = new Date().getFullYear();
  return y;
}

