// app/api/postNewPartySong/route.ts
import postNewPartySong from '@/lib/submitNewPartySong';
import { NextResponse } from 'next/server';

// Define the expected request body type
interface PostNewPartySongRequestBody {
    songID: string;
    partyID: number;
}



export async function POST(request: Request) {
    const apiKey = request.headers.get('apiKey');

    // Validate the API key
    // console.log('apiKey:', apiKey);
    // if (apiKey !== process.env.MUSIC_API_KEY) {
    if (apiKey !== "myProMusicFil$hu") {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Parse the request body
        const body = (await request.json()) as PostNewPartySongRequestBody;

        // Validate the request body
        if (!body.songID || !body.partyID) {
            return NextResponse.json({ error: 'Missing songID or partyID' }, { status: 400 });
        }

        // Call your function to post a new party song
        const result = await postNewPartySong({
            songID: body.songID,
            partyID: body.partyID,
        });

        return NextResponse.json({ success: true, data: result }, { status: 200 });
    } catch (error) {
        console.error('Error in POST /api/postNewPartySong:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}