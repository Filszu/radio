// const axios = require('axios');
import { secondsToMinutesAndSeconds } from '@/utils/convertTime';
import axios from 'axios';


export  async function getSongInfoFromSpotify({trackId, accessToken}:{trackId:string, accessToken:string}){

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
  
        const duration_in_s = secondsToMinutesAndSeconds(response.data.duration_ms/1000)
        

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
            explicit: response.data.explicit,
            duration: duration_in_s,

        }
        return songInfo;
 }catch(err){
     console.log(err)
     return null
 }

    
   

   
    

}

// export async function getSongInfoFromYtMusic({ videoId, accessToken }: { videoId: string; accessToken: string }) {
//     try {
//         // Construct the URL with query parameters
//         const url = new URL('https://www.googleapis.com/youtube/v3/videos');
//         url.searchParams.append('part', 'snippet,contentDetails');
//         url.searchParams.append('id', videoId);
//         url.searchParams.append('key', accessToken);

//         // Make a GET request to the YouTube Music API endpoint for the track
//         const response = await fetch(url.toString());

//         if (!response.ok) {
//             console.log("Invalid video ID or API error");
//             throw new Error("Invalid video ID or API error");
//         }

//         const data = await response.json();

//         if (!data.items || !data.items.length) {
//             console.log("No video found");
//             throw new Error("No video found");
//         }

//         console.log("res yt ---->", JSON.stringify(data.items[0]));

//         const videoData = data.items[0];
//         const trackName = videoData.snippet.title;
//         const artistName = videoData.snippet.channelTitle;
//         const imageUrl = videoData.snippet.thumbnails.high.url;
//         const imageThumbnail = videoData.snippet.thumbnails.default.url;
//         const duration_in_s = secondsToMinutesAndSeconds(parseDuration(videoData.contentDetails.duration));

//         console.log(`Track: ${trackName}`);
//         console.log(`Artist: ${artistName}`);
//         console.log(`Image URL: ${imageUrl}`);

//         return {
//             title: trackName,
//             thumbnail: imageUrl,
//             artist: artistName,
//             explicit: false,
//             duration: duration_in_s,
//         };
//     } catch (err) {
//         console.log("error yt music <=> getting song info ");
//         console.log(err);
//         return err;
//     }
// }


export  async function getSongInfoFromYtMusic({ videoId, accessToken }: { videoId: string; accessToken: string }) {
    // console.log("getSongInfoFromYtMusic", videoId);
    
    try {
        // Make a GET request to the YouTube Music API endpoint for the track
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                part: 'snippet,contentDetails',
                id: videoId,
                key: accessToken
            }
        });

        if(!response){
            return null;
            
        }

        if(response.status !== 200){
            // return null;
            console.log("Invalid video ID")
            throw new Error("Invalid video ID");
        }
        if (!response.data.items.length) {
            // return null;
            console.log("No video found")
            throw new Error("No video found");
        }

        console.log("res yt ---->",JSON.stringify(response.data.items[0]));

        const videoData = response.data.items[0];
        const trackName = videoData.snippet.title;
        const artistName = videoData.snippet.channelTitle;
        const imageUrl = videoData.snippet.thumbnails.high.url;
        const imageThumbnail = videoData.snippet.thumbnails.default.url;
        const duration_in_s = secondsToMinutesAndSeconds(parseDuration(videoData.contentDetails.duration));

        console.log(`Track: ${trackName}`);
        console.log(`Artist: ${artistName}`);
        console.log(`Image URL: ${imageUrl}`);

        return {
            title: trackName,
            thumbnail: imageUrl,
            artist: artistName,
            explicit: false,
            duration: duration_in_s,
        };
    } catch (err) {
        console.log("error yt music <=> getting song info ")
        console.log(err);
        return err;
        
        // return null;
    }
}

function parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;
    const hours = match[1] ? parseInt(match[1]) * 3600 : 0;
    const minutes = match[2] ? parseInt(match[2]) * 60 : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    return hours + minutes + seconds;
}
