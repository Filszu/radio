'use server';

import supabase from '@/config/supaBaseClient';
import { TTimeTable } from '@/types';

export async function getTimeTable() {
    let { data, error } = await supabase
        .from('timeTable')
        .select('*').limit(1);

    if (error) return null;

    return data as TTimeTable[];
}
