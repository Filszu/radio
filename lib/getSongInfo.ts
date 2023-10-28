// const axios = require('axios');
import axios from 'axios';


export default async function getSongInfoFromSpotify({trackId, accessToken}:{trackId:string, accessToken:string}){

    console.log("getSongInfoFromSpotify",trackId)
    // Replace with your own Spotify API access token
    // const accessToken = process.env.SPOTIFY_CLIENT_SECRET;
    // https://open.spotify.com/track/19SEn5eUuuixwxFPNtrq7D?si=028607b686de4fa0
    // get only track id


    
 try{

        // Make a GET request to the Spotify API endpoint for the track
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        })
    
        // Extract the relevant information about the track from the response
        const trackName = response.data.name;
        const artistName = response.data.artists[0].name;
        const albumName = response.data.album.name;
        const imageUrl = response.data.album.images[0].url;

        // Do something with the track information
        console.log(`Track: ${trackName}`);
        console.log(`Artist: ${artistName}`);
        console.log(`Album: ${albumName}`);
        console.log(`Image URL: ${imageUrl}`);

        const songInfo = {
            title: trackName,
            thumbnail: imageUrl,
            artist: artistName,
            album: albumName,
            explicit: response.data.explicit

        }
        return songInfo;
 }catch(err){
     console.log(err)
     return null
 }

    
   

   
    

}