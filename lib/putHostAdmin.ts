'use server';

import supabase from '@/config/supaBaseClient';
import { IActionMSG } from '@/types';

interface Props {
    partyId: number;
    hostName: string;
    hostUrl: string;
    hostDescription: string;
    supportedMusicServices: number[];
    keyWords: string;
    logoUrl: string;
    votingFinishAt: string;
    repeat: string;
}

export default async function putPartyAdmin({
    partyId,
    hostName,
    hostUrl,
    hostDescription,
    supportedMusicServices,
    keyWords,
    logoUrl,
    votingFinishAt,
    repeat,
}: Props): Promise<IActionMSG> {
    console.log('Updating party settings...', partyId);

    const returnMSG: IActionMSG = {
        message: `Updated party settings successfully!`,
        title: 'Party settings updated!🎉',
        status: 200,
        type: 'success',
    };

    // Validate hostName
    if (!hostName || hostName.length < 3 || hostName.length > 100) {
        returnMSG.message = 'Host name must be between 3 and 100 characters long';
        returnMSG.title = 'Invalid Host Name';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    // Validate hostUrl
    // if (!hostUrl || hostUrl.length < 3 || hostUrl.length > 200) {
    //     returnMSG.message = 'Host URL must be between 3 and 200 characters long';
    //     returnMSG.title = 'Invalid Host URL';
    //     returnMSG.status = 400;
    //     returnMSG.type = 'error';
    //     return returnMSG;
    // }

    // Validate hostDescription
    if (!hostDescription || hostDescription.length < 3 || hostDescription.length > 500) {
        returnMSG.message = 'Host description must be between 3 and 500 characters long';
        returnMSG.title = 'Invalid Host Description';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    // Validate keyWords
    if (!keyWords || keyWords.length < 3 || keyWords.length > 200) {
        returnMSG.message = 'Keywords must be between 3 and 200 characters long';
        returnMSG.title = 'Invalid Keywords';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    // Validate votingFinishAt
    if (!votingFinishAt || isNaN(Date.parse(votingFinishAt))) {
        returnMSG.message = 'Invalid voting finish date';
        returnMSG.title = 'Invalid Date';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    // Validate repeat
    const validRepeatOptions = ['no', 'daily', 'every3days', 'every_week', 'every_month'];
    if (!validRepeatOptions.includes(repeat)) {
        returnMSG.message = 'Invalid repeat option';
        returnMSG.title = 'Invalid Repeat Option';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    // Update party settings in the database
    const { data, error } = await supabase
        .from('hosts')
        .update({
            hostName,
            // hostUrl,
            hostDescription,
            supportedMusicServices,
            keyWords,
            logoUrl,
            votingFinishAt,
            repeat,
        })
        .eq('id', partyId)
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