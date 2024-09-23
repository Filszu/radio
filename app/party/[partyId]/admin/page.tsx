import React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAdminCookie } from '@/lib/cookies/adminCookies';
import MusicList from '@/components/MusicList';
import { Music } from 'lucide-react';
import { USong } from '@/database.types';
import { getPartySongs, getSongs, getSongsCustom } from '@/lib/getSongs';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getUserIP } from '@/lib/getUserIP';
import { getUserIP_api } from '@/lib/getUserIP3party';
import { IPartySong } from '@/types';
import PartyMessageForm from './partyMessageForm';
import { getPartyMessage } from '@/lib/getMessage';
import { getHost } from '@/lib/getHostId';
import { getUser } from '@/lib/auth/getUser';

type Props = {
    params: { partyId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: Props) => {
    // const isLogged = await getAdminCookie();
    // if (!isLogged) redirect('/admin-login');

    const user = await getUser();

  if (!user) {
      redirect('/login');
  }

    const partyId = params.partyId;

    const songIndexParam = searchParams?.songIndex ?? 0;

    let songIndex = 0;
    if (Number(songIndexParam)) {
        songIndex = Number(songIndexParam);
    }

    const host = await getHost(partyId);
    if (!host) notFound();
    const hostId = host.id;
    const { hostUrl, hostDescription, hostName, creatorId } = host;


    if (creatorId !== user.id) {
      redirect('/login');
    }


    const songs: IPartySong[] = await getPartySongs({
        staringIndex: songIndex,
        limit: songIndex + 10,
        order: 'created_at',
        status: ['active', 'banned'],
        partyId: Number(hostId),
    });

    // page.tsx

    const header = headers();
    const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
    console.log(ip);

    const realIp = header.get('x-real-ip');

    console.log(realIp);

    const ip3 = (header.get('cf-connecting-ip ') ?? '127.0.0.1').split(',')[0];
    console.log(ip3);

    const ipApi = await getUserIP_api();

    console.log(ipApi);

    // ...

    // paryt Message

    const partyMessages = await getPartyMessage({
        partyId: Number(hostId),
        limit: 0,
        startingIndex: 0,
        asc: false,
        order: 'created_at',
    });

    // console.log(partyMessages);

    const partyLastMsg = partyMessages ? partyMessages[0].message ?? '' : '';

    return (
        <section className="w-full">
            <h1 className="text-center">{partyId} Admin Dashboard</h1>

            <p className="text-center mt-2 mb-2">
                You are logged in as Admin 🎯 from ip {ip}
                <br />
                {realIp}
                ip3:
                {ip3}
                <br />
                Api IP:
                {ipApi}
            </p>

            <PartyMessageForm message={partyLastMsg} partyId={Number(hostId)}/>
            <MusicList songs={songs} isAdmin={true} />
        </section>
    );
};

export default Page;
