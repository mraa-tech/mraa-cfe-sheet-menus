function defineCFETables() {
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

/**
 * Get id of an exhibit by it's name. Assumes names are unique.
 * @param {string} name the name of a show
 * @returns a show id
 * 
 * Called by PriceSheet
 */
function getShowIdByName(name) {
  const c = defineCFETables().config
  const sheet = connect(CFE_ID).getSheetByName(c.name)
  const data = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn())
    .getDisplayValues();
  const showId = data.filter((d) => d[1] === name);

  return showId[0][0];
}

/**
 * Build a data validation rule for the status list.
 * @returns a data validation rule
 */
function buildStatusValidation() {
  const as = defineCFETables().appsettings
  const schema = as.schema
  const sheet = connect(CFE_ID).getSheetByName(as.name)
  const statusList = sheet.getRange(schema.statuslist)
  const rule = SpreadsheetApp
    .newDataValidation()
    .requireValueInRange(statusList, true)
    .build()
  
  return rule
}

/**
 * Get the list of valid statuses for a call for entry.
 * @returns an array of statuses
 */
function getStatusList() {
  const as = defineCFETables().appsettings
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
 * @param {json} show
 * @returns  the row that was added to sheet
 * 
 * Called by CreateShowForm
 */
function addShowToSheet(show) {
    const c = defineCFETables().config
    const as = defineCFETables().appsettings
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