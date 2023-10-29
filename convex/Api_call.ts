import { action } from "./_generated/server";
import { v } from "convex/values";


export const getUserData = action({
  
  args: { username: v.string(), offset: v.int64()},
  handler: async (args) => {
    const { username, offset } = args;
    console.log(`Sending the username ${username} to the server...`);
    const data = await fetch(`https://api.myanimelist.net/v2/users/${username}/animelist?fields=list_status&limit=100&offset=${offset}`);
    return data;
    // do something with data
    
  },
});