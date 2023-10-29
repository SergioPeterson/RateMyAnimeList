import { useAction, useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";


export function MyApp() {
 // const getUserInfo:JSON = useAction(api.myFunctions.getUserInfo);
 // const getAnimeInfo:JSON = useAction(api.myFunctions.getAnimeInfo);
  // const handleClick = () => {
 //   performMyAction({ a: 1 });
 // };


 // pass `handleClick` to a button
 // ...
  interface userInfo { //could get if access nested json for rawJSON[data]
   status:string;
   score:number;
   is_rewatching:boolean;
 }


 interface animeInfo {
   //following should be autosorted by JSONParse
   id:number;
   title:string;
   start_date:string;
   synopsis:string;
   mean:number;
   rank:number;
   popularity:number;
   nsfw:string;
   //will have to do some nesting stuff
   picture:string;
   genres:Array<number>;
   //recommendations:Array<number>
 }


 const performGetUserData = useAction(api.Api_call.getUserData);
 const performGetAnimeData = useAction(api.Api_call.getAnimeData);
 const genreFreqDict: Record<string, number> = {};
 const userParams: Record<string, any> = {
  "lowest_rated_show": "",
  "highest_disparity": "",
  "top_nice_show":"", 
  "top_normie_show":"",
  "last_show_added": "",
  "top_show_not_mentioned_yet":"",
  "top_5_show":[],
  "top_5_genre":[]
  }
 const performSetAnimeToDB = useMutation(api.Api_call.saveAnimeToDB);


 const parse = async (userName: string) => {
   const userAnimeListInfo: Record<number, userInfo> = {};
   const animeInfoDic: Record<number, animeInfo> = {};
   let iter = 0;
     const dataPromise = Promise.resolve(performGetUserData({username : userName, offset: iter}));
     dataPromise.then((jason) => {
       // do stuff with  json data in here
       while (true) {
         const currInfo = JSON.parse(jason);
         const data = currInfo.data;


         if (!data || data.length == 0) {
           break;
         }
          
         for (const d of data) {
           const animeNode = d.node;
           const animeId:number = animeNode.id;
           userAnimeListInfo[animeId] = d.list_status;

           animeInfoDic[animeId] = parseAnime(animeId);
           if (!databaseContains(animeId)){
             saveToDatabase(animeInfoDic[animeId]);
           }
         }
       iter+=100;
       }
     })  
    const userAnimeListArray = Object.entries(userAnimeListInfo);
    userAnimeListArray.sort((a, b) => b[1].score - a[1].score);
    const sortedAnimeIds = userAnimeListArray.map(([animeId]) => parseInt(animeId));
    
    userParams["lowest_rated_show"] = ;
    const genreFreqArray = Object.entries(genreFreqDict);
    genreFreqArray.sort((a, b) => b[1] - a[1]);
    userParams["top_5_genre"] = genreFreqArray.slice(0, 5); 
    userParams["top_5_show"] = sortedAnimeIds.slice(0,5);
 }

 const parseAnime = (animeId: number) => {
   const dataPromise = Promise.resolve(performGetAnimeData({id: animeId}));
   dataPromise.then((jason)=>{
     const animeInfoJSON = JSON.parse(jason);
     const animeI : animeInfo = JSON.parse(jason);
     animeI.picture = animeInfoJSON.picture.medium;


     let g = [];
     for (const genreDict of animeInfoJSON.genres){
       g.push(genreDict.name);
     }
     animeI.genres = g;
     return animeI;   
   })
   return {} as animeInfo;
 };


 const databaseContains = (animeId: number) => {
   // Implement the logic to check if the animeId exists in your database
   const performGetAnimeFromDB = useQuery(api.Api_call.findAnimeFromDB, {id: animeId});
   const animePromise = Promise.resolve(performGetAnimeFromDB);
   animePromise.then((data) => {
    return true;
   })
   return false;

 };


 const saveToDatabase = (data: animeInfo) => {
   // Implement the logic to save data to your database
   const savePromise = Promise.resolve(performSetAnimeToDB({animeinfo : data}));
 };
}
