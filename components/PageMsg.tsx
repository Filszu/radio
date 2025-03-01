'use server';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { getPartyMessage } from '@/lib/getMessage';

type Props = {
    partyId: number
  }

  
async function PageMsg(props: Props) {
    const partyMessages = await getPartyMessage({
        partyId: props.partyId,
        limit: 0,
        startingIndex: 0,
        asc: false,
        order: 'created_at',
    });

    // console.log(partyMessages);

    const partyLastMsg = partyMessages ? partyMessages[0].message ?? '' : '';
    return (
        <Alert variant={'success'}>
            <AlertTitle className="text-center text-2xl">
                New Message from Party's Host
            </AlertTitle>
            <AlertDescription className="text-center text-xl">
                {partyLastMsg}
            </AlertDescription>
        </Alert>
    );
}

export default PageMsg;
