'use server';

import supabase from '@/config/supaBaseClient';

interface Iprops {
    sessionUserId: string;
    created_at?: string;
    premiumStatus?: boolean;
    ref?: Text;
    username?: string;
    promoCode?: string;
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
}

// Filters

export async function postCreatorProfile(props: Iprops) {
    console.log('props', props);
    let { data: profiles, error } = await supabase
        .from('partyCreators')
        .insert({
            id: props.sessionUserId,
            premiumStatus: Number(props.premiumStatus), // Change the value to a number
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
