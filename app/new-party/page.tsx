
import React from 'react';
import NewPartyForm from './NewPartyForm';

type Props = {};

const NewPartyPage = (props: Props) => {
    return (
        <section>
            <h1>Host new PARTY!🎉🪅</h1>
            <section className="w-full mt-4 text-center">
                <NewPartyForm/>
            </section>
        </section>
    );
};

export default NewPartyPage;
