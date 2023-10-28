// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"

export const revalidate = 3600
import { cache } from 'react';
import axios from 'axios';

const getSpotifyToken =cache( async () => {
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
        return access_token;
    } catch (error) {
        console.error(error);
    }
})
export default getSpotifyToken;
