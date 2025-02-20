'use server';

import supabase from '@/config/supaBaseClient';
import { USong } from '@/types';
import {
    GetSongsParams,
    IPartySong,
    IpartyMessageRequest,
    PartyMessage,
} from '@/types';

export async function getStats() {
    let { data, error } = await supabase
        .from('party_aggregates')
        .select('*');

    if (error) return null;

    if (!data) return null;
    if (!data[0]) return null;
    return data[0];
}
