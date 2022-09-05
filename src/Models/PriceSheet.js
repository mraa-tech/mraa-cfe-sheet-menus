function definePriceSheetTables() {
  return {
    pricesheet: {
      type: "standard",
      headers: 
        ['IMAGE', 'ARTIST NAME', 'EMAIL', 'PHONE', 'WORKTITLE', 'MEDIUM', 'SIZE', 'PRICE'],
      schema: {
        'image': 'a',
        'artist-name': 'b',
        'email': 'c',
        'phone': 'd',
        'work-title': 'e',
        'medium': 'f',
        'size': 'g',
        'price': 'h'
      }
    },
  }
}
/**
 * 
 * @param {string} name exhibit name
 * @returns new sheet
 * 
 * Called by createPriceSheetForm
 */
function createPriceSheet(name) {
  const ps = definePriceSheetTables().pricesheet
  const psSchema = ps.schema
  const ex = defineSubmissionTables().exhibits
  const exSchema = ex.schema
  const data = getSubmissionsById(getShowIdByName(name));

  if (name) {
    name = name + " Price Sheet"
  } else {
    name = "Price Sheet"
  }
  // check if a sheet already exists with this name?  
  let newSheet = connect().getSheetByName(name) 
  if (newSheet === null) {
    newSheet = connect().insertSheet(name)
    newSheet.appendRow(ps.headers)

    // loop through submissions data 
    data.map(d => {
      let imageId = d[exSchema.fileid.colToIndex()]
      let imageFormula = `=IMAGE("https://drive.google.com/uc?export=download&id=${imageId}",1)`
      let artistName = d[exSchema.firstname.colToIndex()] + " " + d[exSchema.lastname.colToIndex()]
      let email = d[exSchema.email.colToIndex()]
      let phone = d[exSchema.phone.colToIndex()]
      let workTitle = d[exSchema.worktitle.colToIndex()]
      let medium = d[exSchema.medium.colToIndex()]
      let size = d[exSchema.width.colToIndex()] + " x " + d[exSchema.height.colToIndex()]
      let price = "$" + d[exSchema.price.colToIndex()]

      newSheet.appendRow(
        [
          imageFormula,
          artistName,
          email,
          phone,
          workTitle,
          medium,
          size,
          price
        ])      
    })

  }

  return newSheet
}