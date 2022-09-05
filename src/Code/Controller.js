/*
    Accepts input and converts it to commands for the model or view.

    The controller responds to the user input and performs interactions on the data model objects. 
    The controller receives the input, optionally validates it and then passes the input to the model.
*/
/* var Route = {};
Route.path = function (r, callback) {
    Route[r] = callback;
} */

/* function doGet(e) {
    let r;
    Route.path("done", loadThankYou);
    Route.path("test", loadSamplePage);
    Route.path("payment", loadPaymentPage);
    Route.path("wizard", loadWizard);

    // Add all current show ids as Routes
    let shows = getAllShowIds();
    for (let s of shows) {
        Route.path(s, loadWizard);
    }

    if (Route[e.parameter.v]) {
        r = Route[e.parameter.v](e.parameter.v);
    } else {
        r = loadError();
    }
    return r;
} */

/* function saveFile(f,d,imgfolder) {
    let blob = Utilities.newBlob(f.bytes, f.mimeType, f.filename);
    let targetFolderId = imgfolder == undefined?imageFolderId:imgfolder;
    let uploadFolder = DriveApp.getFolderById(targetFolderId);
    let today = new Date();
    let member = isMember(d[DataColMap.email-1])?"YES":"NO";
    let newFileId = uploadFolder.createFile(blob).getId();
    d.push(newFileId);
    d.push(member);   

    d.push(""); // placeholder for availability
    d.push(""); // placeholder for hidden
    d.push(today);
    return saveToSheet(d);
} */

/* function saveToSheet(data) {
    let ws = connect().getSheetByName(targetSheet);
    ws.appendRow(data);
    return data;
    return true;
} */

/**
 * 
 * @returns 
 */
/* function loadSamplePage() {
    return render(`${pageRoot}/CallForEntries`);
} */

/**
 * Creates the Call For Entries form 
 * @param {string} showId Unique show identifier
 * @returns {HTMLTemplate} Call for entries form page
 */
/* function loadCFE(showId) {
    // s is an object that contains all show information
    // s is passed to the page template where the key/value pairs are iterated through and sets page variables
    let s = getShow(showId);
    return render(`${pageRoot}/CallForEntries`, s);
} */

/**
 * Creates the Thank You page 
 * @returns {HTMLTemplate} Thank You page
 */
/* function loadThankYou() {
    return render(`${pageRoot}/ThankYou`);
} */

/**
 * Creates the Payment page
 * @returns {HTMLTemplate} Payment page
 */
/* function loadPaymentPage() {
    return render(`${pageRoot}/Payment`);
}
 */
/**
 * Creates the Call For Entries Wizard 
 * @returns {HTMLTemplate} Wizard page
 */
/* function loadWizard(showId) {
    let s = getShow(showId);
    return render(`${pageRoot}/Wizard`, s);
} */

/**
 * Creates the Error page 
 * @returns {HTMLTemplate} Error page
 */
function loadError() {
    return render(`${pageRoot}/Error`);
}
