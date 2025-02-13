'use server';

import supabase from '@/config/supaBaseClient';
interface INewPartySong {
    songID: string;
    partyID: number;
    votesPlus?: number;
}
export default async function postNewPartySong(props: INewPartySong) {

    const {songID, partyID, votesPlus} = props
    console.log('postNewPartySong', songID);
    const { data, error } = await supabase
        .from('uPartySongs')
        .insert([{ partyId: partyID, USongId: songID, votesPlus: votesPlus??0 }])
        .select();

    if (error) {
        console.log(error);
        return null;
    }
    return `success Song ${songID} added to party ${partyID}`;
}
