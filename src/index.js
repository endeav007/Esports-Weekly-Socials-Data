//what will call both instagram and sheets.

//import {TestInstagram} from "./instagram.js";
//import {getMedia} from "./instagram.js";
import { runDailyAggregation } from "./instagram.js";

import { updateTotalsSheet } from "./sheets.js";

const {INSTAGRAM_MAIN_ID, INSTAGRAM_ACCESS_TOKEN} = process.env;

async function main(){
    console.log("Fetching basic data");
    //const data = await TestInstagram();
    //const data = getMedia(INSTAGRAM_MAIN_ID, INSTAGRAM_ACCESS_TOKEN);
    //console.log(data);
    runDailyAggregation();

}

await updateTotalsSheet({
  sheets,
  spreadsheetId: process.env.SPREADSHEET_ID,
  totals,
  sinceDate: "2024-01-01"
});

main().catch(err => {
    console.error(err);
    process.exit(1);
});