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
 * Not Used
 * Creates a new spreadsheet tab using an existing tab as a template
 * @param {string} name New spreadsheet tab name
 * @returns {string} name of new tab
 */
/* function createDataSheet(name) {
    let tmpl = connect().getSheetByName(dataTemplateName);
    return tmpl.copyTo(connect()).setName(name);
} */

/**
 * Sends html to the browser
 * @param {File} f File object 
 * @param {object} opt text to replace page variables
 * @returns 
 */
/* function render(f, opt) {
    let templ = HtmlService.createTemplateFromFile(f);
    if (opt) {
      // opt is an object containing key/value pairs of data to be passed to page variables
      // ie, id=opt.id
      let keys = Object.keys(opt);
      keys.forEach(function(k){
        templ[k] = opt[k];
      })
  
    }
    return templ.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
} */

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

