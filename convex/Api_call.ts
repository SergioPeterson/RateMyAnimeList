import { action } from "./_generated/server";
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
    // do something with data
  },
});