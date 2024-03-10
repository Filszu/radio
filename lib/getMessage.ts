'use server';

import supabase from '@/config/supaBaseClient';
import { USong } from '@/database.types';
import { GetSongsParams, IPartySong, IpartyMessageRequest, PartyMessage } from '@/types';




export async function getPartyMessage(props:IpartyMessageRequest) {

    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('partyId', props.partyId)
        .range(props.startingIndex ?? 0, props.limit ?? 1)
        .order(props.order ?? 'created_at', { ascending: props.asc ?? false });

    if (error) return null;

    return data as PartyMessage[];
 
}
