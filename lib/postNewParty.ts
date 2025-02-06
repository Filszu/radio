'use server';

import supabase from '@/config/supaBaseClient';
import { IActionMSG } from '@/types';
import { fakeSetTimeOut } from '@/utils/fakeSetTimeOut';

interface IPostParty {
    partyName: string;
    partyUrl: string;
    partyDescription: string;
    userId: string;
}
export default async function postParty(props: IPostParty) {
    console.log('Posting PARTY...');

    const { partyName, userId, partyUrl, partyDescription } = props;

    // await fakeSetTimeOut(2000);

    const returnMSG: IActionMSG = {
        message: `Party ${partyName} has been created`,
        title: 'Created new Party🎵!',
        status: 200,
        type: 'success',
    };

    if (!partyName || partyName.length < 3 || partyName.length > 29) {
        returnMSG.message =
            'Party name must be between 3 and 29 characters long';
        returnMSG.title = 'Invalid Party Name';
        returnMSG.status = 400;
        returnMSG.type = 'error';
    }

    // check if party name contains only letters and numbers and spaces
    if (!/^[a-zA-Z0-9 ]*$/.test(partyName)) {
        returnMSG.message = 'Party name must contain only letters and numbers';
        returnMSG.title = 'Invalid Party Name';
        returnMSG.status = 400;
        returnMSG.type = 'error';
    }
    // --------------------------------

    if (!partyUrl || partyUrl.length < 3 || partyUrl.length > 29) {
        returnMSG.message =
            'Party url must be between 3 and 29 characters long';
        returnMSG.title = 'Invalid Party URL';
        returnMSG.status = 400;
        returnMSG.type = 'error';
    }

    // check if party name contains only letters and numbers
    if (!/^[a-zA-Z0-9]*$/.test(partyUrl)) {
        returnMSG.message = 'Party url must contain only letters and numbers';
        returnMSG.title = 'Invalid Party URL';
        returnMSG.status = 400;
        returnMSG.type = 'error';
    }

    // const { data, error } = await supabase
    //     .from('hosts')
    //     .insert([{
    //         hostName: partyName,
    //         hostUrl:
    //     }])
    //     .select();

    if(returnMSG.status !== 200) return returnMSG;

    try {
        const { data, error } = await supabase
            .from('hosts')
            .insert([
                {
                    hostName: partyName,
                    hostUrl: partyUrl,
                    hostDescription: partyDescription,
                    creatorId: userId,
                },
            ])
            .select();

            console.log(data);

        if (error) {
            console.log(error);
            returnMSG.message = 'This party already exists';
            returnMSG.title = 'Error';
            returnMSG.status = 400;
        }
    } catch (error) {
        console.log(error);
        returnMSG.message = 'unknow Error creating party';
        returnMSG.title = 'Error';
    }

    return returnMSG;
}
