function getCFETables() {
  return {
    config: {
      name: "Config",
      type: "standard",
      headers: 1,
      schema: {
        showid: "a",
        exhibitname: "b",
        cfeopendate: "c",
        cfeclosedate: "d",
        maxentriesperartist: "e",
        maxentriespershow: "f",
        imagefolderid: "g",
        allownfs: "h",
        status: "i",
        payfeeonly: "j",
        purchaselimit: "k",
        showopendate: "l",
        showclosedate: "m",
        entryfee: "n",
        registrationlink: "o",
        registrationlinkversion: "p"
      },
    },
    appsettings: {
      name: "AppSettings",
      type: "standard",
      headers: 1,
      schema: {
        maximagesize: "a2",
        cfecontact: "b2",
        statuslist: "c2:c",
        latestdeploymenturl: "d2",
        applicationversion: "e2",
        latestdeploymentlist: "d2:d",
        applicationversionlist: "e2:e"
      },
    },
  };
}

/* 
const config = connect().getSheetByName("Config");
const appSettings = connect().getSheetByName("AppSettings"); */

// Defines the structure of the config array
/* const Config = {
  showId: 0,
  exhibitName: 1,
  callForEntriesDate: 2,
  callForEntriesCloseDate: 3,
  maxEntriesPerArtist: 4,
  maxEntriesPerShow: 5,
  imageFolderId: 6,
  allowNFS: 7,
  status: 8,
  payFeeOnly: 9,
  purchaseLimit: 10,
  registrationLink: 11,
}; */

// Map field names to column position
/* const ConfigColMap = {
  showId: 1,
  exhibitName: 2,
  callForEntriesDate: 3,
  callForEntriesCloseDate: 4,
  maxEntriesPerArtist: 5,
  maxEntriesPerShow: 6,
  imageFolderId: 7,
  allowNFS: 8,
  status: 9,
  payFeeOnly: 10,
  purchaseLimit: 11,
  registrationLink: 12,
}; */

// cell reference for max image size app setting
/* const ASMaxImageSize = "a2";
const ASLatestUrl = "b2";
const ASLatestUrlVersion = "c2"; */

/**
 * Get the maximum allowed size for images in MB
 *
 * @returns {numeric}   max image size
 */
/* function getMaxImageSize() {
  let data = parseInt(appSettings.getRange(ASMaxImageSize).getDisplayValue());
  return isNaN(data) ? "" : data;
} */

/**
 * Get the lastest deployed url for the CFE application
 *
 * @returns {string} application url
 */
/* function getLastestDeploymentUrl() {
  const as = getCFETables().appsettings
  const sheet = connect(CFE_ID).getSheetByName(as.name)
  const range = as.schema.latestdeploymenturl
  const data = sheet
    .getRange(range)
    .getDisplayValue()
  return data
} */

/**
 * Retrieve a show from the Config tab
 * @param {string} id Unique show identifier
 * @returns {object} Show object
 */
/* function getShow(id) {
  let data = config
    .getRange(2, 1, config.getLastRow() - 1, config.getLastColumn())
    .getDisplayValues();
  let show = {};

  for (let d of data) {
    if (d[Config.showId] === id) {
      show.id = d[Config.showId]; // 0
      show.name = d[Config.exhibitName]; // 1
      show.openDate = d[Config.callForEntriesDate]; // 2
      show.closeDate = d[Config.callForEntriesCloseDate]; // 3
      show.maxEntriesPerArtist = d[Config.maxEntriesPerArtist]; // 4
      show.maxEntriesPerShow = d[Config.maxEntriesPerShow]; //5
      show.imageFolderId = d[Config.imageFolderId]; // 6
      show.allowNFS = d[Config.allowNFS]; // 7
      show.payFeeOnly = d[Config.payFeeOnly]; //8
      show.purchaseLimit = d[Config.purchaseLimit]; //9
      show.registrationLink = d[Config.registrationLink]; // 10
    }
  }
  return show;
} */

/**
 *
 * @param {string} id Unique show identifier
 * @returns {string} Show name
 */
/* function getShowName(id) {
  return getShow(id).name;
} */

/**
 * Get all current show identifiers
 * @returns {array} All unique show identifiers
 */
/* function getAllShowIds() {
  let shows = new Array();
  let allShows = config
    .getRange(2, 1, config.getLastRow() - 1, 1)
    .getDisplayValues();

  shows = allShows.map((s) => s[0]);

  return shows;
} */

/**
 * Get maximum entries allowed for a show
 * @param {string} id Unique show identifier
 * @returns {number} Max entries
 */
/* function getMaxEntriesPerShow(id) {
  let max = 0;
  let maxEntriesPerShow = getShow(id).maxEntriesPerShow;
  if (maxEntriesPerShow) {
    max = maxEntriesPerShow;
  }
  return max;
} */

/**
 * Get maximum entries allowed per artist
 * @param {string} id Unique show identifier
 * @returns {number} Max artist entries
 */
/* function getMaxEntriesPerArtist(id) {
  let max = getShow(id).maxEntriesPerArtist;
  return max;
} */

/**
 * Get Pay Fee Only setting for requested show
 * @param {string} id Unique show identifier
 * @returns {boolean} yes/no
 */
/* function getPayFeeOnly(id) {
  let pfo = getShow(id).payFeeOnly;
  return pfo;
} */

/**
 * Get a list of all open shows
 * @returns {array} a list of all open shows
 */
/* function getAllOpenShows() {
  let data = config
    .getRange(2, 1, config.getLastRow() - 1, config.getLastColumn())
    .getDisplayValues();
  let openShows = data.filter((d) => d[Config.status] === "OPEN");

  return openShows;
} */

/**
 *
 * @param {string} name the name of a show
 * @returns {string} show id
 * 
 * Called by PriceSheet
 */
function getShowIdByName(name) {
  const c = getCFETables().config
  const sheet = connect(CFE_ID).getSheetByName(c.name)
  const data = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn())
    .getDisplayValues();
  const showId = data.filter((d) => d[1] === name);

  return showId[0][0];
}

function buildStatusValidation() {
  const as = getCFETables().appsettings
  const schema = as.schema
  const sheet = connect(CFE_ID).getSheetByName(as.name)
  const statusList = sheet.getRange(schema.statuslist)
  const rule = SpreadsheetApp
    .newDataValidation()
    .requireValueInRange(statusList, true)
    .build()
  
  return rule
}

function getStatusList() {
  const as = getCFETables().appsettings
  const schema = as.schema
  const sheet = connect(CFE_ID).getSheetByName(as.name)
  const data = sheet
    .getRange(schema.statuslist)
    .getDisplayValues()

  // remove rows with an empty column value
  const list = data.filter(item => item[0] !== "")
  return list
}

/**
 * Add a new show to the Config tab
 * @param {object} show 
 * @returns {array} Row added to sheet
 * 
 * Called by CreateShowForm
 */
function addShowToSheet(show) {
    const c = getCFETables().config
    const as = getCFETables().appsettings
    const sheet = connect(CFE_ID).getSheetByName(c.name)
    const schema = c.schema
    const asSchema = as.schema
    const latestAppVer = `=${as.name}!${asSchema.applicationversion}`
    const lastRow = sheet.getLastRow() + 1
    const latestAppUrl = `=concat(${as.name}!${asSchema.latestdeploymenturl},a${lastRow})`

    let row = []
    row[schema.showid.colToIndex()] = generateUniqueId().toString()
    row[schema.exhibitname.colToIndex()] = show.exhibitName
    row[schema.cfeopendate.colToIndex()] = show.startDate
    row[schema.cfeclosedate.colToIndex()] = show.closeDate
    row[schema.maxentriesperartist.colToIndex()] = show.maxEntriesPerArtist
    row[schema.maxentriespershow.colToIndex()] = show.maxEntriesPerShow
    row[schema.imagefolderid.colToIndex()] = createImageFolder(show.exhibitName)
    row[schema.registrationlink.colToIndex()] = latestAppUrl
    row[schema.registrationlinkversion.colToIndex()] = latestAppVer
    row[schema.entryfee.colToIndex()] = show.entryFee 

    sheet.appendRow(row)
    sheet
      .getRange("c2:d")
      .setNumberFormat("MM/dd/yyyy h:mm am/pm")
    sheet
      .getRange(schema.status + sheet.getLastRow())
      .setDataValidation(buildStatusValidation())
      .setValue(getStatusList()[0]) // assumption is that first value is the default value
    return row
}