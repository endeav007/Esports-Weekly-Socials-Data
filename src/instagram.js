import axios from 'axios';


//All Tokens
const { APP_ID, APP_SECRET, INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_MAIN_ID, OVERWATCH_ID, SPLATOON_ID, VALORANT_ID, TEKKEN_ID, 
MARVELRIVALS_ID, COUNTERSTRIKE_ID, STREETFIGHTER_ID, FORTNITE_ID, SMASH_ID, LEAGUEOFLEGENDS_ID, RAINBOWSIXSIEGE_ID, ROCKETLEAGUE_ID} = process.env;

const accounts =[
  {name: "main", id: INSTAGRAM_MAIN_ID},
  {name: "overwatch2", id: OVERWATCH_ID},
  {name: "splatoon", id: SPLATOON_ID},
  {name: "valorant", id: VALORANT_ID},
  {name: "tekken", id: TEKKEN_ID},
  {name: "marvelrivals", id: MARVELRIVALS_ID},
  {name: "counterstrike2", id: COUNTERSTRIKE_ID},
  {name: "streetfighter", id: STREETFIGHTER_ID},
  {name: "fortnite", id: FORTNITE_ID},
  {name: "smashultimate", id: SMASH_ID},
  {name: "leagueoflegends", id: LEAGUEOFLEGENDS_ID},
  {name: "rainbowsixsiege", id: RAINBOWSIXSIEGE_ID},
  {name: "rocketleague", id : ROCKETLEAGUE_ID}
];


export async function getMedia(account, pageToken) {
  const res = await axios.get(
    `https://graph.facebook.com/v18.0/${account.id}/media`,
    {
      params: {
        fields: "id,media_type,timestamp",
        access_token: pageToken
      }
    }
  );

  const followers = await axios.get(
    `https://graph.facebook.com/v18.0/${account.id}`,
    {
      params: {
        fields: "followers_count",
        access_token: pageToken
      }
    }
  );

  return res.data.data.map(media => ({
    ...media,
    account_id: account.id,
    account_name: account.name,
    account_followers: followers.data.followers_count

  }));
}


export async function getAllAccountData(){
  
  const results = await Promise.all(
    accounts.map(account =>
      getMedia(account, INSTAGRAM_ACCESS_TOKEN)
    )
  );
  //console.log(results.flat());
  return results.flat();
}


async function fetchMediaWithInsights(mediaArray, token){
  const recentMedia = mediaArray;

  return await Promise.all(
    recentMedia.map(async (media) => {
      try {
        const insightsResponse = await axios.get(
          `https://graph.facebook.com/v19.0/${media.id}/insights?metric=likes,comments,shares,total_interactions,views,reposts&access_token=${token}`
        );
        media.insights = {};
        for (let metric of insightsResponse.data.data) {
          media.insights[metric.name] = metric.values[0].value;
        }
      } catch (err) {
        console.error("Error fetching Instagram data:", err.response?.data || err.message);
      }
      return media;
    })
  );
}

function filterMediaSince(mediaArray, sinceDate) {
  const since = new Date(sinceDate);
  return mediaArray.filter(media =>
    new Date(media.timestamp) >= since
  );
}

function aggregateMetrics(mediaArray) {
 const totalsByAccount = {};

  for (const media of mediaArray) {
    const key = media.account_id;

    if (!totalsByAccount[key]) {
      totalsByAccount[key] = {
        account_id: media.account_id,
        account_name: media.account_name,
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        total_interactions: 0,
        total_posts: 0,
        total_followers: media.account_followers || 0 
      };
    }

    totalsByAccount[key].likes += media.insights?.likes || 0;
    totalsByAccount[key].comments += media.insights?.comments || 0;
    totalsByAccount[key].shares += media.insights?.shares || 0;
    totalsByAccount[key].views += media.insights?.views || 0;
    totalsByAccount[key].total_interactions += media.insights?.total_interactions || 0;
    totalsByAccount[key].total_posts += 1;

  }

  

  return Object.values(totalsByAccount);
}



export async function runDailyAggregation() {
  const sinceDate = "2026-01-01";

  const allMedia = await getAllAccountData();
  const filteredMedia = filterMediaSince(allMedia, sinceDate);

  const enrichedMedia = await fetchMediaWithInsights(
    filteredMedia,
    INSTAGRAM_ACCESS_TOKEN
  );

  const totals = aggregateMetrics(enrichedMedia);
  console.log(totals);

  return totals;
}