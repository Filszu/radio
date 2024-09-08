'use server';

import supabase from '@/config/supaBaseClient';
interface INewPartySong {
    songID: string;
    partyID: number;
}
export default async function postNewPartySong(props: INewPartySong) {

    const {songID, partyID} = props
    console.log('postNewPartySong', songID);
    const { data, error } = await supabase
        .from('uPartySongs')
        .insert([{ partyId: partyID, USongId: songID }])
        .select();

    if (error) {
        console.log(error);
        return null;
    }
    return 'success';
}
