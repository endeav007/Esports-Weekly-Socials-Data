import axios from 'axios';


//tokens
const { APP_ID, APP_SECRET, INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_MAIN_ID, OVERWATCH_ID, SPLATOON_ID, VALORANT_ID, TEKKEN_ID, 
MARVELRIVALS_ID, COUNTERSTRIKE_ID, STREETFIGHTER_ID, FORTNITE_ID, SMASH_ID, LEAGUEOFLEGENDS_ID, RAINBOWSIXSIEGE_ID, ROCKETLEAGUE_ID} = process.env;


export async function TestInstagram(){
    const url =  `https://graph.facebook.com/v18.0/me?access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    const response = await axios.get(url);
    console.log(response.data);
}




