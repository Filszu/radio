'use server';

import supabase from '@/config/supaBaseClient';
import { IActionMSG } from '@/types';
import { fakeSetTimeOut } from '@/utils/fakeSetTimeOut';
import { revalidatePath } from 'next/cache';

export default async function putTimeTable(formData: FormData) {
    console.log('tt...');

    const isOn = Boolean(formData.get('isOn')) ?? false;
    const currentPlaylistId = formData.get('currentPlaylistId') ?? 0;
    const hostId = Number(formData.get('hostId')) ?? 1;

    const timeRules = JSON.parse(formData.get('timeRules')?.toString() ?? '{}');

    // await fakeSetTimeOut(2000);

    const returnMSG: IActionMSG = {
        message: `Updated timeTable!`,
        title: 'Updated timeTable🎵!',
        status: 200,
        type: 'success',
    };

    console.log('putTimeTable', formData);

    const { data, error } = await supabase
        .from('timeTable')
        .update({
            isOn: isOn,
            currentPlaylistId: Number(currentPlaylistId),
            timeRules: timeRules,
        })
        .eq('hostid', 1)
        .select();

    if (error) {
        returnMSG.message = 'Error updating timeTable';
        returnMSG.title = 'Invalid req';
        returnMSG.status = 400;
        returnMSG.type = 'error';
    }

    if(!error)revalidatePath(`/api/timeTables`);
    return returnMSG;
}

// default rules
// {
//     "rules": {
//                        "1": [
//                            {
//                                "end": "08:50",
//                                "start": "08:45"
//                            },
//                            {
//                                "end": "09:50",
//                                "start": "09:00"
//                            },
//                            {
//                                "end": "10:50",
//                                "start": "10:00"
//                            },
//                            {
//                                "end": "11:50",
//                                "start": "11:00"
//                            },
//                            {
//                                "end": "12:50",
//                                "start": "12:00"
//                            },
//                            {
//                                "end": "13:50",
//                                "start": "13:00"
//                            },
//                            {
//                                "end": "14:50",
//                                "start": "14:00"
//                            },
//                            {
//                                "end": "15:50",
//                                "start": "15:00"
//                            },
//                            {
//                                "end": "16:50",
//                                "start": "16:00"
//                            }
//                        ]
//                    },
//                    "applyRule": {
//                        "Fri": 1,
//                        "Mon": 1,
//                        "Sat": 1,
//                        "Sun": 1,
//                        "Thu": 1,
//                        "Tue": 1,
//                        "Wed": 1
//                    }
//                }
