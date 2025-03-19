'use server';

import supabase from '@/config/supaBaseClient';

export default async function putPremiumStatus(
    userId: string,
    premiumStatus: number,
) {
    const premiumUntil = new Date();
    premiumUntil.setDate(premiumUntil.getDate() + 30); // Add 30 days to the current date

    const { data, error } = await supabase
        .from('partyCreators')
        .update({
            premiumStatus: premiumStatus,
            premiumUntil: premiumUntil.toISOString(),
        })
        .eq('id', userId)
        .select();

    if (error) {
        console.error('Error updating premium status:', error);
        throw error;
    }

    return data;
}
