'use server';

import supabase from '@/config/supaBaseClient';
import { revalidatePath } from 'next/cache';

interface songToUpdate {
    // formData: FormData,
    id: string;
    votesPlus: number;
}
// maybe check admin pass
export default async function putUPartySong({ id, votesPlus }: songToUpdate) {
    // console.log("formData", formData)
    console.log('id', id);

    const newVotesPlus = votesPlus + 1;
    const updated_at = new Date().toISOString();

    try {
        const { data: uPartySongs, error } = await supabase
            .from('uPartySongs')
            .update({
                votesPlus: newVotesPlus,
                updated_at: updated_at,

                // dailyVotesPlus: dailyVotesPlus??0,
                // dailyVotesMinus: dailyVotesMinus??0,
            })
            .eq('id', id)
            .select();

        if (error) {
            console.log(error);
            return new Error(`${error}`);
        }
        if (uPartySongs) {
            console.log(uPartySongs);
            return 'success';
        }
        revalidatePath('/');
    } catch (error) {
        console.log(error);
        return new Error('Error updating song');
    }
}
