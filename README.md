# InstantForm

A small responsive contact form that collects an email address, country calling code, and contact number, then appends submissions to a Google Sheet using Google Apps Script.

## Connect it to Google Sheets

1. Create a Google Sheet. Copy its ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`.
2. In the sheet, open **Extensions → Apps Script**. Replace the editor contents with [`Code.gs`](Code.gs), then save.
3. In Apps Script, open **Project Settings → Script properties → Add script property**. Set the property name to `SPREADSHEET_ID` and its value to your sheet ID. Save it.
4. Select **Deploy → New deployment**, choose **Web app**, set **Execute as** to **Me**, and set **Who has access** to **Anyone**. Deploy and authorize the requested access.
5. Copy the web app URL (it ends in `/exec`). In [`index.html`](index.html), replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL. Commit the change.
6. The first successful submission creates a `Responses` tab with headers and adds each new submission as a row. Check that tab to verify receipt.

The web app needs public access so the form can submit without visitors signing in. Keep the spreadsheet private; do not put its ID or credentials in the webpage. Anyone who obtains the deployed web app URL can submit to it, so treat that URL as public and review/clean up submissions as needed. The page uses a basic honeypot and server-side validation, not a full anti-spam service.

## Publish the webpage free

The repository is currently private. GitHub Pages is available for free from a **public** repository; publishing from a private repository requires an eligible paid plan. To publish at no cost, change this repository to public in **Settings → General → Danger Zone → Change repository visibility**, then go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save. GitHub will show the live URL after deployment. Alternatively, keep the repository private and use another static host's free tier.

Until you configure the Apps Script URL and deploy the page, the form will display a setup message rather than send details.
