// app/api/postNewPartySong/route.ts
import postNewPartySong from '@/lib/submitNewPartySong';
import { NextResponse } from 'next/server';

// Define the expected request body type
interface PostNewPartySongRequestBody {
    songID: string;
    partyID: number;
}
const favSongs = [
    '65ef6d47-e1b4-4711-83d4-df2e8f3e3d62',
    '102a4e98-207b-4516-8e22-2150f27ca650',
    'b40c1e53-0104-4725-a470-c3a06c97231e',
    'cb644c94-8389-46e5-a4f7-01d409cb63c3',
    // '486d500a-a168-4a86-bba2-7ed7ece53326',
    // '248ac13e-3ed0-4c56-bc0a-8187a58ecf77',
    // '619470b4-565f-455f-97a9-d4d336fc1b09',
    // '8d3319ff-8336-4970-b3fb-f1d184e9fab7',
    // '3498d109-490c-40b4-9589-40ea51a00b5e',
    // '000ea91f-abc1-43af-9c97-3946bd0819e2',
    // 'c5695396-e696-46dd-89ef-42ca593853d6',
    // '2e94d9ce-489c-42db-8e59-0576e4f96cfb',
    // '7b12bff4-e3ac-406a-a019-ddfa54917942',
    // 'f105276e-f62f-4abb-ac8b-01674dea4c67',
    // '39b1c90d-abd3-44a4-821d-a899c76da4c3',
    // '2e648bb3-42b1-4e5c-b600-6db41aa26787',
    // '184a2c86-a6c3-413d-b779-b6f32b2e9bf2',
    // '0b5fb44f-eb8e-4ca8-8ae4-9f8f82e5a612',
    // 'cf2f3be7-b0dd-4e5d-bffb-0a3d0fde091b',
    // '1737bb65-420b-4282-bbf0-15588efd7455',
    // '7e0bed35-bec6-4365-9f37-4b251038eb40',
    // '762d9198-341b-4924-bcaa-a3928349f32d',
    // 'd025eaab-eb70-4c49-a691-405be3ef0620',
    // '51df3cc4-1977-4b16-83f6-64da284a90ea',
    // '334b0ed9-0529-495c-828d-909c84e04888',
    // 'a320a7ec-0584-4ed7-b81b-8822e6871ad6',
    'd325ed9b-7290-41ae-889e-3960c6ebc608',
    'ca3b4dbe-6f73-46bc-9dc6-ebf7089f0d70',
    '210df24f-8fd2-49c2-90af-747af4a952bf',
    '7774899e-f306-462f-b8ac-66c26aabea5b',
    '175122df-95d5-4c38-9a4f-75ca785cfb05',
    '0ab4b6b5-142e-4155-8e85-57d4c88d355a',
    '8d56d62c-9657-4792-94e3-928a00988dcf',
    '7a56e84e-6088-4912-b309-f6346ed03c38',
    'bc0d6ce5-8512-4547-a532-09193eb049ac',
    '6f3c14e2-e54e-445f-8d82-b392a17dd4fa',
    'eb40d6ba-bfa4-4998-a7b6-06ef205c7a0c',
    'de270d12-9b10-43b5-bd86-db4d6facc079',
    'bcd7106f-896a-4510-a9fa-dfeb070f138c',
    '6dc10f2e-8eaf-45e6-9fa1-cb0cb66a2090',
    '8c46f3f5-2d37-4c33-b5ee-59b205fc2d01',
    '9e72dfcd-2692-4db3-b371-f91253558c56',
];

async function addSongToParty(songID: string, partyID: number) {
    const votesPlus = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    console.log('addSongToParty', songID, partyID, votesPlus);
    const result = await postNewPartySong({
        songID: songID,
        partyID: partyID,
        votesPlus: votesPlus,
    });
    return result;
}

export async function POST(request: Request) {
    const apiKey = request.headers.get('apiKey');

    // Validate the API key
    if (apiKey !== process.env.MUSIC_API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Parse the request body
        const body = (await request.json()) as PostNewPartySongRequestBody;

        // Validate the request body
        if (!body.songID || !body.partyID) {
            return NextResponse.json(
                { error: 'Missing songID or partyID' },
                { status: 400 },
            );
        }

        if (body.songID === 'random') {
            body.songID = favSongs[Math.floor(Math.random() * favSongs.length)];
        }

        // Call your function to post a new party song
        const result = await addSongToParty(body.songID, body.partyID);

        return NextResponse.json(
            { success: true, data: result },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error in POST /api/postNewPartySong:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}
