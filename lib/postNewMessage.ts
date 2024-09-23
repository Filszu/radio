'use server';

import supabase from '@/config/supaBaseClient';
import { IActionMSG } from '@/types';
import { fakeSetTimeOut } from '@/utils/fakeSetTimeOut';

interface props{
    newMsg: string;
    partyId: number;
}
export default async function postMessage({newMsg, partyId}: props) {
    console.log('Posting PARTY msg...', newMsg, partyId);


    // const msg = formData.get('message') as string;
    
    const msg = newMsg;

    // await fakeSetTimeOut(2000);

   

    const returnMSG: IActionMSG = {
        message: `Updated party message to: ${msg}!`,
        title: 'Party message updated!💌',
        status: 200,
        type: 'success',
    };

    if (!msg || msg.length < 3 || msg.length > 450) {
        returnMSG.message = 'msg must be between 3 and 450 characters long';
        returnMSG.title = 'Invalid Party Message';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    // check if msg contains only letters and numbers and spaces and hyphens and underscores and quotes and emojis
    const pattern = /^[\p{L}\p{N}\p{P}\p{S}\p{M}\p{Zs}]*$/u;
    if (!pattern.test(msg)) {
        returnMSG.message =
            'Message name must contain only letters and numbers';
        returnMSG.title = 'Invalid msg';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    // const { data, error } = await supabase
    //     .from('hosts')
    //     .insert([{
    //         hostName: msg,
    //         hostUrl:
    //     }])
    //     .select();

    const { data, error } = await supabase
        .from('messages')
        .insert([{ partyId: partyId, message: msg }])
        .select();

    if (error) {
        returnMSG.message = error.message;
        returnMSG.title = 'Error';
        returnMSG.status = 500;
        returnMSG.type = 'error';
        return returnMSG;
    }

    return returnMSG;
}
