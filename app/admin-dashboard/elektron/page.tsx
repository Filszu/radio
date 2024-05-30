import React from 'react';

type Props = {};
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAdminCookie } from '@/lib/cookies/adminCookies';
import MusicList from '@/components/MusicList';
import { Music } from 'lucide-react';
import { USong } from '@/database.types';
import { getPartySongs, getSongs, getSongsCustom } from '@/lib/getSongs';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getUserIP } from '@/lib/getUserIP';
import { getUserIP_api } from '@/lib/getUserIP3party';
import TimeTableForm from './TimeTableForm';
import { getTimeTable } from '@/lib/getTimeTable';
import { ITimeTableRow, TTimeTable } from '@/types';
const Page = async (props: Props) => {
    const isLogged = await getAdminCookie();
    if (!isLogged) redirect('/admin-login');

    const timeTable:any[] = await getTimeTable() || [];

    // const timeTable:TTimeTable[] = await getTimeTable() || [];

    
    const timeTableRow:ITimeTableRow  = timeTable[0];

    console.log(timeTableRow);

    

    return (
        <section className="w-full">
            <h1 className="text-center">Admin Dashboard</h1>

            <p className="text-center mt-2 mb-2">
                You are logged in as Admin 🎯 from ip
            </p>
            

            <TimeTableForm timeTable={timeTableRow}/>
        </section>
    );
};

export default Page;
