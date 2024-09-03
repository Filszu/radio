import React from 'react';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

const createProfilePage = async() => {
    const supabase = createClient();


    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('../login')
    
    
    }

    console.log(data)

    return (
        <>
            <p>Hello {data.user.email}</p>
        </>
    );
};

export default createProfilePage;
