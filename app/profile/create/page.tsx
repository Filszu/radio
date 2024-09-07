import { PricingTable } from '@/components/pricing-table';
import { Button } from '@/components/ui/button';
import {
    postCreatorProfile,
    getCreatorProfile,
} from '@/lib/auth/getCreatorProfile';
import { getUser } from '@/lib/auth/getUser';
import { Checkbox } from '@radix-ui/react-checkbox';

import { redirect } from 'next/navigation';
import React from 'react';
const createProfilePage = async () => {
    
    const user = await getUser();

    const creatorProfile = await getCreatorProfile({ sessionUserId: user.id });

    if (creatorProfile) {
        console.log('creator profile found');
    }
    console.log('No creator profile found');
    const username = user.user_metadata?.full_name || user.email?.split('@')[0];

    const handleCreateProfile = async () => {
        'use server';
        console.log('Creating profile');
        const profile = await postCreatorProfile({
            sessionUserId: user.id,
            username: username,
            premiumStatus: false,
        });
        redirect('/profile');
        
    };
    

    // handleCreateProfile()
    return (
        <>
            <h2>
                Hello <b>{username}</b> ({user.email})
            </h2>

            {
                <PricingTable
                    plan1ButtonFunction={handleCreateProfile}
                    plan2ButtonFunction={handleCreateProfile}
                />
            }
        </>
    );
};

export default createProfilePage;
