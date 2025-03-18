import React from 'react';
import NewPartyForm from './NewPartyForm';
import { getUser } from '@/lib/auth/getUser';
import { redirect } from 'next/navigation';

type Props = {};

const NewPartyPage = async(props: Props) => {
    const user = await getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <section>
            <h1>Host new PARTY!🎉🪅</h1>
            <section className="w-full mt-4 text-center">
                <NewPartyForm userId={user.id} />
            </section>
        </section>
    );
};

export default NewPartyPage;
