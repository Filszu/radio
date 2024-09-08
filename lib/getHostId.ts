'use server';

import supabase from '@/config/supaBaseClient';



export async function getHostId(hostUrl: string) {
    let { data: hosts, error } = await supabase.from('hosts').select('id, hostUrl').eq('hostUrl', hostUrl).limit(1);

    if (error) return null;

    if (!hosts) return null;
    if (!hosts[0]) return null;

    // console.log(hosts[0])
    return hosts[0].id;



    
}
