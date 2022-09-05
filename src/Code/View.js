/**
 * Runs when file is opened.
 * Adds a new menu and option to main sheet menu
 * @param {eventObject} e event
 */
function onOpen(e) {
    console.log(e);
    SpreadsheetApp.getUi()
    .createMenu('MRAA')
    .addItem('Create a New Show', 'createShowForm')
    .addItem('Create Show Price Sheet', 'createPriceSheetForm')
    .addToUi();
}

/**
 * Displays a show entry form in a modal window in the spreadsheet
 */
function createShowForm() {
    let html = HtmlService
    .createTemplateFromFile('Pages/CreateShowForm')
    .evaluate()
    .setTitle('Create a New Show');
    SpreadsheetApp.getUi().showSidebar(html);
}

function createPriceSheetForm() {
    let html = HtmlService
    .createTemplateFromFile('Pages/CreatePriceSheet')
    .evaluate()
    .setTitle('Create Show Price Sheet');
    SpreadsheetApp.getUi().showSidebar(html);
}