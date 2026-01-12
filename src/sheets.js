import axios from 'axios';
import {authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';


const spreadsheet_id = SPREADSHEET_ID.process.env;

const ACCOUNT_ROWS = {
    main: 2,
    overwatch2: 3, 
    splatoon: 4,
    valorant: 5,
    tekken: 6, 
    marvelrivals: 7,
    counterstrike2: 8,
    streetfighter: 9,
    fortnite: 10,
    smashultimate: 11,
    leagueoflegends: 12,
    rainbowsixsiege: 13,
    rocketleague: 14
};

function buildTotalsRow(totals) {
  return {
    likes: totals.likes ?? 0,
    comments: totals.comments ?? 0,
    shares: totals.comments ?? 0,
    total_interactions: totals.total_interactions ?? 0,
    last_updated: new Date().toISOString()
  };
}

function toSheetValues(row) {
  return COLUMNS.map(col => row[col]);
}

function rowObjectToSheetValues(row) {
  return [
    row.likes,
    row.comments,
    row.shares,
    row.views,
    row.total_interactions,
    row.last_updated
  ];
}


export async function updateTotalsSheet({
  sheets,
  spreadsheetId,
  totals,
  sinceDate,
  sheetName = "Totals"
}) {
  const data = [];

  for (const accountTotals of totals) {
    const rowIndex = ACCOUNT_ROWS[accountTotals.account_name];

    if (!rowIndex) {
      console.warn(`No row mapping for ${accountTotals.account_name}`);
      continue;
    }

    const row = buildTotalsRow(accountTotals, sinceDate);
    const values = toSheetValues(row);

    data.push({
      range: `${sheetName}!B${rowIndex}:G${rowIndex}`,
      values: [values]
    });
  }

  if (!data.length) return;

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "RAW",
      data
    }
  });
}