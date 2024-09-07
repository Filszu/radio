'use server';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function getUser() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('../login');
    }

    // console.log(data);

   
    return data.user;
}
