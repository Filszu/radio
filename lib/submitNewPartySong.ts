'use server';

import supabase from '@/config/supaBaseClient';

export default async function postNewPartySong(songID: string) {

    console.log('postNewPartySong', songID);
    const { data, error } = await supabase
        .from('uPartySongs')
        .insert([{ partyId: 1, USongId: songID }])
        .select();

    if (error) {
        console.log(error);
        return null;
    }
    return 'success';
}
