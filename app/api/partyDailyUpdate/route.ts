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
            // Default newVotingFinishAt remains as today's midnight.
            let newVotingFinishAt = new Date(today);
            // Define cutoffDate as yesterday (midnight)
            const cutoffDate = new Date(today);
            cutoffDate.setDate(today.getDate() - 1);
          
            switch (party.repeat) {
              case 'daily': {
                // Always update to today for daily events.
                newVotingFinishAt = new Date(today);
                break;
              }
          
              case 'every3days':
              case 'every_week':
              case 'every_month': {
                // Determine the interval based on the repeat type.
                const intervalDays = {
                  every3days: 3,
                  every_week: 7,
                  every_month: 30,
                }[party.repeat];
          
                // If there's an existing finish date, check the difference.
                if (party.votingFinishAt) {
                  const existingDate = new Date(
                    party.votingFinishAt.replace(' ', 'T') + 'Z',
                  );
                  // Calculate how many days have passed since the existing finish date.
                  const diffInDays =
                    (today.getTime() - existingDate.getTime()) / (1000 * 60 * 60 * 24);
                  // Only update if the difference is greater than the interval.
                  if (diffInDays > intervalDays) {
                    newVotingFinishAt = cutoffDate;
                  } else {
                    // If not enough days have passed, skip this party.
                    continue;
                  }
                }
                break;
              }
          
              case 'no':
              default:
                // Skip parties with no repeat.
                continue;
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
          
            if (updateError) {
              return NextResponse.json(
                { error: 'DB error Failed to update votingFinishAt' },
                { status: 500 },
              );
            }
          
            updatedParties.push({
              id: party.id,
              newVotingFinishAt: formattedDate,
              oldVotingFinishAt: party.votingFinishAt,
              repeat: party.repeat,
            });
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
