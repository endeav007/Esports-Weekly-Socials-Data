import axios from 'axios';


//tokens
const { APP_ID, APP_SECRET, INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_MAIN_ID, OVERWATCH_ID, SPLATOON_ID, VALORANT_ID, TEKKEN_ID, 
MARVELRIVALS_ID, COUNTERSTRIKE_ID, STREETFIGHTER_ID, FORTNITE_ID, SMASH_ID, LEAGUEOFLEGENDS_ID, RAINBOWSIXSIEGE_ID, ROCKETLEAGUE_ID} = process.env;

const all_accounts_data = [];
const accounts1 ={
  main: INSTAGRAM_MAIN_ID,
  overwatch2: OVERWATCH_ID,
  splatoon3: SPLATOON_ID,
  valorant: VALORANT_ID,
  tekken: TEKKEN_ID,
  marvelrivals: MARVELRIVALS_ID,
  counterstrike2: COUNTERSTRIKE_ID,
  streetfighter: STREETFIGHTER_ID,
  fortnite: FORTNITE_ID,
  smashultimate: SMASH_ID,
  leagueoflegends: LEAGUEOFLEGENDS_ID,
  rainbowsixsiege: RAINBOWSIXSIEGE_ID,
  rocketleague: ROCKETLEAGUE_ID
};


const accounts = [INSTAGRAM_MAIN_ID, OVERWATCH_ID, SPLATOON_ID, VALORANT_ID, TEKKEN_ID, MARVELRIVALS_ID, COUNTERSTRIKE_ID, 
  STREETFIGHTER_ID, FORTNITE_ID, SMASH_ID, LEAGUEOFLEGENDS_ID, RAINBOWSIXSIEGE_ID, ROCKETLEAGUE_ID]

export async function getMedia(igUserId, pageToken) {
  const res = await axios.get(
    `https://graph.facebook.com/v18.0/${igUserId}/media`,
    {
      params: {
        fields: "id,caption,media_type,like_count,comments_count,timestamp",
        limit: 5,
        access_token: pageToken
      }
    }
  );
  console.log(res.data.data);
  return res.data.data;
}


export async function getAllAccountData(){
  accounts.forEach(account => {
      all_accounts_data.push(getMedia(account, INSTAGRAM_ACCESS_TOKEN));
  });
  console.log(all_accounts_data);
}


