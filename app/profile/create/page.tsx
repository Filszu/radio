import { PricingTable } from '@/components/pricing-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        // redirect('/profile');
    }
    console.log('No creator profile found');
    const username = user.user_metadata?.full_name || user.email?.split('@')[0];

    // (plan: number)
    const handleCreateProfile = async (FormData: FormData) => {
        'use server';
       
        console.log('Creating profile');

        
        const usernamedata = FormData.get('username')??username;

        const profile = await postCreatorProfile({
            sessionUserId: user.id,
            username: usernamedata,
            // premiumStatus: plan === 1 ? false : true,
            premiumStatus: 0,
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
                <form action={handleCreateProfile}>
                    <Checkbox />

                    <Input
                        type="text"
                        placeholder="username"
                        name="username"
                        required
                        defaultValue={username}
                        className="text-center"
                    />
                    <label htmlFor="username" className="text-center block">
                        here u can change your username
                    </label>

                    <PricingTable
                        // plan1ButtonFunction={}
                        // plan2ButtonFunction={}
                    />
                </form>
            }
        </>
    );
};

export default createProfilePage;
