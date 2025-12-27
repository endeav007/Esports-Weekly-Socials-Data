import axios from 'axios';


//tokens
const { APP_ID, APP_SECRET, INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_MAIN_ID, OVERWATCH_ID, SPLATOON_ID, VALORANT_ID, TEKKEN_ID, 
MARVELRIVALS_ID, COUNTERSTRIKE_ID, STREETFIGHTER_ID, FORTNITE_ID, SMASH_ID, LEAGUEOFLEGENDS_ID, RAINBOWSIXSIEGE_ID, ROCKETLEAGUE_ID} = process.env;

const all_accounts = {};
const accounts ={
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

export async function TestInstagram() {
    try {
    const response = await axios.get(
      "https://graph.facebook.com/v18.0/me/accounts",
      {
        params: {
          access_token: INSTAGRAM_ACCESS_TOKEN
        }
      }
    );
    console.log("Accounts response:", response.data);
  } catch (error) {
    console.error("Instagram test failed");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
 
}

export async function GetMedaAccounts(account_ID){
    const token = INSTAGRAM_ACCESS_TOKEN;
    try{
        
        const response = await axios.get(
            `https://graph.facebook.com/v19.0/${account_ID}?fields=id,username,media.limit(5){id,caption,media_type,media_url,timestamp}&access_token=${token}`

        );
        all_accounts.push(response);
        console.log("New accounts array: " + all_accounts);
    } catch (error){
        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

GetMedaAccounts(accounts.main);
