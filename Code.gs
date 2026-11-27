const SHEET_NAME = 'Responses';

/**
 * Set the SPREADSHEET_ID script property to the ID from your Google Sheets URL.
 * Deploy this project as a web app that executes as you and is accessible to anyone.
 */
function doPost(e) {
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || '{}');
    if (data.website) return json_({ ok: true }); // quiet honeypot for basic bot filtering

    const email = String(data.email || '').trim();
    const countryCode = String(data.countryCode || '').trim();
    const phone = String(data.phone || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      throw new Error('Invalid email address');
    }
    if (!/^\+[0-9]{1,4}$/.test(countryCode) || !/^[0-9 ()-]{5,20}$/.test(phone)) {
      throw new Error('Invalid phone details');
    }

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('Set the SPREADSHEET_ID script property first');
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(['Submitted at', 'Email', 'Country code', 'Contact number']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), email, countryCode, phone]);
    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
