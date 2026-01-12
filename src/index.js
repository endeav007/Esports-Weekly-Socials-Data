//what will call both instagram and sheets.

import { google } from "googleapis";
import fs from "fs";
import { runDailyAggregation } from "./instagram.js";
import { updateTotalsSheet } from "./sheets.js";

const {GOOGLE_SERVICE_ACCOUNT_JSON, INSTAGRAM_ACCESS_TOKEN, SPREADSHEET_ID} = process.env;
const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json", // path to your JSON key
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

async function main(){
    console.log("Fetching basic data");
    //const data = await TestInstagram();
    //const data = getMedia(INSTAGRAM_MAIN_ID, INSTAGRAM_ACCESS_TOKEN);
    //console.log(data);
    const totals = await runDailyAggregation();

    await updateTotalsSheet({
        sheets,
        spreadsheetId: SPREADSHEET_ID,
        totals,
        sinceDate: "2026-01-01"
    });

}



main().catch(err => {
    console.error(err);
    process.exit(1);
});