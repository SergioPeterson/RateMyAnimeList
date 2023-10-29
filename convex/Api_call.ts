import { action, query, mutation } from "./_generated/server";
import { v } from "convex/values";



function censor(censor : any) {
  var i = 0;
  
  return function(key : any , value: any) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 
    
    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';
    
    ++i; // so we know we aren't using the original object anymore
    
    return value;  
  }
}

export const getUserData = action({
  args: { username: v.string(), offset: v.number() },
  handler: async (_, args) => {
    console.log(`Sending the username ${args.username} to the server...`);
    const apiKey = process.env.MAL_API_KEY!;
    const headers = {
      'Content-Type': 'application/json',
      'X-MAL-CLIENT-ID': apiKey,
    }
    console.log(apiKey);
    console.log(`https://api.myanimelist.net/v2/users/${args.username}/animelist?fields=list_status&limit=100&offset=${args.offset}`);
    const data = await fetch(`https://api.myanimelist.net/v2/users/${args.username}/animelist?fields=list_status&limit=100&offset=${args.offset}`, {headers});
    const obj = await data.json()
    return obj;
  },
});

export const getAnimeData = action({
  args: { id: v.number() },
  handler: async (_, args) => {
    console.log(`Querying for anime with id ${args.id}...`);
    const apiKey = process.env.MAL_API_KEY!;
    const headers = {
      'Content-Type': 'application/json',
      'X-MAL-CLIENT-ID': apiKey,
    }
    console.log(apiKey);
    const data = await fetch(`https://api.myanimelist.net/v2/anime/${String(args.id)}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics`, {headers});
    const obj = await data.json();
    return obj;
  },
});

export const findAnimeFromDB = query({
  args: { id: v.number() }, 
  handler: async (ctx, args) => {
    const anime = await ctx.db
      .query("animes")
      .filter((q) => q.eq(q.field("id"), args.id))
      .collect();
    return anime;
  },
});
  
 export const saveAnimeToDB = mutation({
  args: {animeinfo : v.object({id: v.number(),
    title: v.string(),
    start_date: v.string(),
    synopsis: v.string(),
    mean: v.number(),
    rank: v.number(),
    popularity: v.number(),
    nsfw: v.string(),
    picture: v.string(),
    genres: v.array(v.number())})},
  handler: async (ctx, args) => {
    const animeID = await ctx.db.insert("animes", args.animeinfo);
    return animeID;
  }
 });
