// app/api/partyDailyUpdate/route.ts
import { NextResponse } from 'next/server';
import supabase from '@/config/supaBaseClient';

export async function PUT(request: Request) {
    const apiKey = request.headers.get('apiKey');

    // Validate the API key
    if (apiKey !== process.env.MUSIC_API_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Fetch all parties from the database
        const { data: parties, error: fetchError } = await supabase
            .from('hosts')
            .select('id, votingFinishAt, repeat');

        if (fetchError) {
            return NextResponse.json(
                { error: 'Failed to fetch parties' },
                { status: 500 },
            );
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight

        // Array to store updated parties
        const updatedParties = [];

        // Iterate through all parties
        for (const party of parties) {
            let newVotingFinishAt = new Date(today);

            // Handle different repeat cases
            switch (party.repeat) {
                case 'daily':
                    // Always set to today's midnight
                    newVotingFinishAt = new Date(today);
                    break;

                case 'every3days':
                case 'every_week':
                case 'every_month': {
                    // Calculate interval days
                    const intervalDays = {
                        every3days: 3,
                        every_week: 7,
                        every_month: 30,
                    }[party.repeat];

                    // Create cutoff date (today - 1 day)
                    const cutoffDate = new Date(today);
                    cutoffDate.setDate(today.getDate() - 1);

                    // Parse existing date if available
                    // Parse existing date if available
                    const existingDate = party.votingFinishAt
                        ? new Date(party.votingFinishAt.replace(' ', 'T') + 'Z')
                        : null;

                    // Check if existing date + interval exceeds today
                    if (existingDate) {
                        const testDate = new Date(existingDate);
                        testDate.setDate(testDate.getDate() + intervalDays);
                        if (testDate > today) {
                            newVotingFinishAt = cutoffDate;
                        }
                    }
                    break;
                }

                case 'no':
                default:
                    continue; // Skip parties with no repeat
            }

            // Format to YYYY-MM-DD 00:00:00+00
            const formattedDate = newVotingFinishAt
                .toISOString()
                .replace('T', ' ')
                .replace(/\.\d{3}Z$/, '+00');

            // Update database
            const { error: updateError } = await supabase
                .from('hosts')
                .update({ votingFinishAt: formattedDate })
                .eq('id', party.id);

            // if (!updateError) {
            updatedParties.push({
                id: party.id,
                newVotingFinishAt: formattedDate,
                oldVotingFinishAt: party.votingFinishAt,
                repeat: party.repeat,
            });

            if(updateError) {
                return NextResponse.json(
                    { error: 'DB error Failed to update votingFinishAt' },
                    { status: 500 },
                );
            }
            // }
        }

        return NextResponse.json({
            success: true,
            message: 'votingFinishAt updated for relevant parties',
            updatedParties,
        });
    } catch (error) {
        console.error('Error in POST /api/partyDailyUpdate:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}
