import React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAdminCookie } from '@/lib/cookies/adminCookies';
import MusicList from '@/components/MusicList';
import { Music } from 'lucide-react';
import { USong } from '@/types';
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
import CodeSnippet from '@/components/ui/custom/CodeSnippet';
import { PiShootingStarBold } from 'react-icons/pi';

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
        limit: songIndex + 30,
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

            <p className="text-center mt-2 mb-2">
                <strong>PartyName:</strong> {hostName} <strong>PartyId:</strong>{' '}
                {hostId}
            </p>

            <PartyMessageForm message={partyLastMsg} partyId={Number(hostId)} />

            <article className="text-center my-4">
                <h2>Create the spotify playlist</h2>
                <p className="flex text-center justify-center">
                    You can create the playlist for the party by clicking
                    <PiShootingStarBold
                        size={20}
                        className="text-yellow-400"
                    />{' '}
                    the button below. The playlist will be created for the
                    current day.
                </p>
                <h2>For Developers</h2>
                <h3>API</h3>
                <span className="text-orange-400"> Free PREMIUM feature</span>
                <p className="text-center mt-4 mb-2">
                    <strong>Get Party Playlist</strong>
                    <br />
                    <strong>Request:</strong> GET
                    <br />
                    <strong>Endpoint:</strong> /api/playlist
                    <br />
                    <CodeSnippet
                        commandPrefix="$"
                        commandText="/api/playlist?hostId=[your host id]&date=[date in format yyyy-mm-dd]"
                        commandPackage=" REST API"
                    />
                    <br />
                    <strong>Example:</strong>
                    <br />
                    <CodeSnippet
                        commandPrefix="$"
                        commandText={`https://partyvote.ciac.me/api/playlist?hostId=${hostId}&date=2024-11-03`}
                        commandPackage=" REST API"
                    />
                </p>
            </article>

            <MusicList songs={songs} isAdmin={true} />
        </section>
    );
};

export default Page;
