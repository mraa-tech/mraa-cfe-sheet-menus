/**
 * The init file is processed first by Google App script. 
 */
function init() {

  // Scopes needed
  // SpreadsheetApp.open(file);
  // DriveApp.createFile(blob);
  // SpreadsheetApp.getUi();
}
/**
 * Placing connect here ensures that the SpreadsheetApp object is created 
 * and available to all the Models
 * @param  {string} id Spreadsheet id
 * @returns {object} SpreadsheetApp object
 * 
 * Called by all Models
 */
function connect(id) {
  let conn;
  if (id) {
      conn = SpreadsheetApp.openById(id);
  } else {
      conn = SpreadsheetApp.getActiveSpreadsheet();
  }
  return conn;
}