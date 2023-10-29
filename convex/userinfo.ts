import React from "react";
import { useAction, useQueries, useQuery } from "convex/react";
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

 const parse = async (userName: string) => {
   const userAnimeListInfo: Record<number, userInfo> = {};
   const animeInfo: Record<number, animeInfo> = {};
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

           animeInfo[animeId] = parseAnime(animeId);
           if (!databaseContains(animeId)){
             saveToDatabase(animeInfo);
           }
         }
       iter+=100;
       }
     })
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
   const performGetAnimeFromDB = useQuery(api.Api_call.findAnime, {id: animeId});
   const animePromise = Promise.resolve(performGetAnimeFromDB)
   return true;
 };


 const saveToDatabase = (data: Record<number, animeInfo>) => {
   // Implement the logic to save data to your database
 };
}
