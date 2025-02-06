'use server';

import supabase from '@/config/supaBaseClient';

interface Iprops {
    sessionUserId: string;
    created_at?: string;
    premiumStatus?: number;
    ref?: Text;
    username?: string;
    promoCode?: string;
    premiumUntil?: string;
}
export  async function getCreatorProfile(props: Iprops) {
    let { data: profiles, error } = await supabase
        .from('partyCreators')
        .select('*')
        .eq('id', props.sessionUserId)
        .single();

        

    if (error) {
        console.log(error);
        return null;
    }

    return profiles;
}

function premiumUntilDate(): string {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 14);
    return futureDate.toISOString().split('T')[0];
}

export async function postCreatorProfile(props: Iprops) {
    console.log('props', props);
    let { data: profiles, error } = await supabase
        .from('partyCreators')
        .insert({
            id: props.sessionUserId,
            // premiumStatus: Number(props.premiumStatus), // Change the value to a number
            premiumStatus: 2,
            premiumUntil: premiumUntilDate(), 
            ref: props.ref?.toString(),
            username: props.username?.toString(),
        });

    if (error) {
        console.log(error);
        return null;
    }

    console.log(profiles);
    return true;
}
