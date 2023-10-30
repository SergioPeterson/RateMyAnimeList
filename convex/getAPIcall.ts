import axios from 'axios';  
const BASE_URL = 'https://api.jikan.moe/v4';

let _user_data = {
    "peronsal_data":{
        "mal_id": 0,
        "username": "string",
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string"
          },
          "webp": {
            "image_url": "string"
          }
        },
        "last_online": "string",
        "gender": "string",
        "birthday": "string",
        "location": "string",
        "joined": "string",
        "statistics": {
          "anime": {
            "days_watched": 0,
            "mean_score": 0,
            "watching": 0,
            "completed": 0,
            "on_hold": 0,
            "dropped": 0,
            "plan_to_watch": 0,
            "total_entries": 0,
            "rewatched": 0,
            "episodes_watched": 0
          },
          "manga": {
            "days_read": 0,
            "mean_score": 0,
            "reading": 0,
            "completed": 0,
            "on_hold": 0,
            "dropped": 0,
            "plan_to_read": 0,
            "total_entries": 0,
            "reread": 0,
            "chapters_read": 0,
            "volumes_read": 0
          }
        },
        "external": [
          {
            "name": "string",
            "url": "string"
          }
        ]
    },
    "Fav_data":{
        "anime": [
        {
        "type": "string",
        "start_year": 0,
        "mal_id": 0,
        "url": "string",
        "images": {
        "jpg": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
        },
        "webp": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
        }
        },
        "title": "string"
        }
        ],
        "manga": [
        {
        "type": "string",
        "start_year": 0,
        "mal_id": 0,
        "url": "string",
        "images": {
        "jpg": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
        },
        "webp": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
        }
        },
        "title": "string"
        }
        ],
        "characters": [
        {
        "mal_id": 0,
        "url": "string",
        "images": {
        "jpg": {
        "image_url": "string",
        "small_image_url": "string"
        },
        "webp": {
        "image_url": "string",
        "small_image_url": "string"
        }
        },
        "name": "string",
        "type": "string",
        "title": "string"
        }
        ],
        "people": [
        {
        "mal_id": 0,
        "url": "string",
        "images": {
        "jpg": {
        "image_url": "string",
        "small_image_url": "string"
        },
        "webp": {
        "image_url": "string",
        "small_image_url": "string"
        }
        },
        "name": "string"
        }
        ]
        }

  }

function printUserData() {
    console.log(`Username: ${_user_data.peronsal_data.username}`);
    console.log(`ID: ${_user_data.peronsal_data.mal_id}`);
    console.log(`Image: ${_user_data.peronsal_data.images.jpg.image_url}`);
    console.log(`Gender: ${_user_data.peronsal_data.gender}`); 
    console.log(`Joined: ${_user_data.peronsal_data.joined}`);
    console.log("\nAnime Statistics:");
    for (const [key, value] of Object.entries(_user_data.peronsal_data.statistics.anime)) {
        console.log(`${key}: ${value}`);
    }
    console.log("\nManga Statistics:");
    for (const [key, value] of Object.entries(_user_data.peronsal_data.statistics.manga)) {
        console.log(`${key}: ${value}`);
    }
}

export async function setUserData(username: string){
    try{
        const response = await axios.get(`${BASE_URL}/users/${username}/full`)
        _user_data.peronsal_data = response.data
        console.log(response.data.data)
        return true

    }catch(error){
        console.error('Error fetching user by username', error);
        return false
    }
}


export async function setUserFav(username: string) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}/favorites`);
        _user_data.Fav_data = response.data
        console.log(response.data.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching anime details:', error);
        throw error;
    }
}


export async function getAnimeDetails(animeId: number) {
    try {
        const response = await axios.get(`${BASE_URL}/anime/${animeId}`);
        console.log(response.data.data.title);
        console.log(response.data.data.synopsis);
        console.log(response.data.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching anime details:', error);
        throw error;
    }
}


export function getUserData(){
    return _user_data;
}
