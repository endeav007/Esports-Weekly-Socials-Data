//what will call both instagram and sheets.

import {TestInstagram} from "./instagram.js";

async function main(){
    console.log("Fetching basic data");
    const data = await TestInstagram();

}

main().catch(err => {
    console.error(err);
    process.exit(1);
});