export const revalidate = 3600
import { cache } from 'react';
import axios from 'axios';

import supabase from "@/config/supaBaseClient"
async function saveTokenToDB(token:string){
    const validTimeInSeconds = 3600;
    const appName = 'spotify';

    const { data, error } = await supabase
    .from('tokens')
    .insert([
        {
            token,
            valid_time_in_seconds: validTimeInSeconds,
            app_name: appName,
        },
    ])

    if (error) {
        console.error(error);
    }

}

async function getTokenFromDB(){

    
    let { data:tokens, error } = await supabase
    .from('tokens')
    .select('token, valid_time_in_seconds, created_at')
    .eq('app_name', 'spotify').order('created_at', { ascending: false }).limit(1)

    console.log("tokens>>>>", tokens)

    
    if(tokens && tokens.length > 0){
        const token = tokens[0];
        const now = new Date().getTime() / 1000; // convert to seconds
        const createdAt = new Date(token.created_at).getTime() / 1000; // convert to seconds
        const validTimeInSeconds = token.valid_time_in_seconds;

        const isTokenValid = now - createdAt < validTimeInSeconds;

        console.log("time raminning to expire token>>>>", validTimeInSeconds - (now - createdAt), "seconds")

        if(isTokenValid){
            return token.token;

        
        }
    }

    //if token is not valid, generate a new one
    return generateToken()




    
}


async function generateToken(){
    console.log("getting new token...")
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const authString = `${clientId}:${clientSecret}`;
    const base64AuthString = Buffer.from(authString).toString('base64');

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            'grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${base64AuthString}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token } = response.data;

        console.log("new token>>>>>>>", access_token)
        saveTokenToDB(access_token);
        return access_token;
    } catch (error) {
        console.error(error);
    }
}


const getSpotifyToken =cache( async () => {


    const token = await getTokenFromDB();
    return token;
   
})
export default getSpotifyToken;
