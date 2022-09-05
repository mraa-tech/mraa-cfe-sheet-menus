function defineSubmissionTables() {
  return {
    exhibits: {
      name: "Exhibits",
      type: "standard",
      headers: 1,
      schema: {
        eventid: "a",
        eventtitle: "b",
        firstname: "c",
        lastname: "d",
        email: "e",
        phone: "f",
        worktitle: "g",
        medium: "h",
        width: "i",
        height: "j",
        price: "k",
        filename: "l",
        fileid: "m",
        member: "n",
        availablity: "o", // not currently used
        hidden: "p", // not currently used
        fullname: "q", // not currently used
        timestamp: "r", // not currently used
      },
    },
    countsbytitleartist: {
      name: "Counts By Title Artist",
      type: "pivot",
      headers: 1,
      summary: "Grand Total",
      schema: {
        title: "a",
        id: "b",
        email: "c",
        artistname: "d",
        entries: "e",
      },
    },
    countsbyartisttitle: {
      name: "Counts By Artist Title",
      type: "pivot",
      headers: 1,
      summary: "Grand Total",
      schema: {
        email: "a",
        title: "b",
        count: "c",
      },
    },
    countsbyid: {
      name: "Counts By Id",
      type: "pivot",
      headers: 1,
      summary: "Grand Total",
      schema: {
        id: "a",
        title: "b",
        count: "c",
      },
    },
  };
}

/**
 * Get shows that are currently calling for entries
 * @returns a list of unique events
 *  
 * Called by createPriceSheetForm
 */
 function getCurrentCalls() {
    const e = defineSubmissionTables().exhibits
    const sheet = connect(CFE_ID).getSheetByName(e.name)
    const schema = e.schema
    const startRow = e.headers + 1
    const startCol = schema.eventtitle.colToIndex() + 1
    const data = sheet
      .getRange(startRow, startCol, sheet.getLastRow() - e.headers, 1)
      .getDisplayValues()
  
    const filteredData = data.map((d) => d[0])
    const uniqueEvents = [...new Set(filteredData)]
  
    return uniqueEvents
  }

/**
 * Get all submissions for an event
 * @param {string} id Event Id
 * @returns a list of all submissions
 *
 * Called by PriceSheet
 */
function getSubmissionsById(id) {
    const e = defineSubmissionTables().exhibits
    const sheet = connect(CFE_ID).getSheetByName(e.name)
    const schema = e.schema
    const startRow = e.headers + 1
    const startCol = schema.eventtitle.colToIndex() + 1
    let data = sheet
        .getRange(
            startRow,
            schema.eventid.colToIndex() + 1,
            sheet.getLastRow() - 1,
            schema.fileid.colToIndex() + 1
        )
        .getValues()
    data = data.filter((d) => d[0] === id);

    return data;
}
