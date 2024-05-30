'use server';

import supabase from '@/config/supaBaseClient';
import { IActionMSG } from '@/types';
import { fakeSetTimeOut } from '@/utils/fakeSetTimeOut';

export default async function putTimeTable(formData: FormData) {
    console.log('tt...');

    const partyName = formData.get('partyName') as string;

    // await fakeSetTimeOut(2000);

    const returnMSG: IActionMSG = {
        message: `Party ${partyName} has been created`,
        title: 'Created new Party🎵!',
        status: 200,
        type: 'success',
    };
    return returnMSG;

    if (!partyName || partyName.length < 3 || partyName.length > 29) {
        returnMSG.message =
            'Party name must be between 3 and 29 characters long';
        returnMSG.title = 'Invalid Party Name';
        returnMSG.status = 400;
        returnMSG.type = 'error';
    }

    // check if party name contains only letters and numbers
    if (!/^[a-zA-Z0-9]*$/.test(partyName)) {
        returnMSG.message = 'Party name must contain only letters and numbers';
        returnMSG.title = 'Invalid Party Name';
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

    return returnMSG;
}
