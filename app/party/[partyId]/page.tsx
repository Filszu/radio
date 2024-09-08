import Image from 'next/image';
import Logo from '../public/imgs/logo-elektron.jpg';
import { VotingList } from '@/components';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
import MusicList from '@/components/MusicList';
import NewSongDialog from '@/components/NewSongDialog';
import { getPartySongs, getSongs, getSongsCustom } from '@/lib/getSongs';
import { USong } from '@/database.types';

import Link from 'next/link';
import { IPartySong } from '@/types';
import TopSongsList from '@/components/TopSongs';
import { Suspense } from 'react';
import AdBox from '@/components/ads/AdBox';
import { getPartyMessage } from '@/lib/getMessage';
import PageMsg from '@/components/PageMsg';
import { getHostId } from '@/lib/getHostId';
import { notFound } from 'next/navigation';

// export const dynamic = "force-dynamic"

export const revalidate = 30;
type Props = {
    params: { partyId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ params, searchParams }: Props) {
    const partyId = params.partyId;

    const songIndexParam = searchParams?.songIndex ?? 0;

    let songIndex = 0;
    if (Number(songIndexParam)) {
        songIndex = Number(songIndexParam);
    }
    // const songs: USong[] = await getSongs();
    // getSongsCustom
    // const songs: USong[] = await getSongsCustom({
    //     staringIndex: songIndex,
    //     limit: songIndex + 10,
    //     order: 'created_at',
    //     status: 'active',
    // });

    const hostId = await getHostId(partyId);
    if (!hostId) notFound();

    console.log('hostId', hostId);

    const songs: IPartySong[] = await getPartySongs({
        staringIndex: songIndex,
        limit: songIndex + 10,
        order: 'created_at',
        status: 'active',
        partyId: Number(hostId),
        // partyId: 1,
    });

    if (songs) {
        // console.log(songs)
    } else return Error('songs is not defined');

    //maybe i can use this to get ip address
    // https://api.ipify.org?format=json

    return (
        <>
            {/* <Link href="/add-new-song">xxxxxxxxx</Link> */}

            <Suspense fallback={<div>...</div>}>
                <NewSongDialog partyId={hostId}/>
            </Suspense>

            {/* spacer */}
            <div className="h-10"></div>

            {songIndex <= 1 && <TopSongsList />}

            <AdBox />
            <Suspense fallback={<div></div>}>
                <PageMsg />
            </Suspense>

            <h2 className="uppercase text-2xl mt-8 mb-8">
                głosuj na ulubione piosenki
            </h2>

            <MusicList songs={songs} isAdmin={false} />
            <div className="flex gap-1">
                {songIndex >= 10 && (
                    <Link href={`?songIndex=${songIndex - 10}`}>
                        <Button className="mt-4">Poprzednia strona</Button>
                    </Link>
                )}

                <Link href={`?songIndex=${songIndex + 10}`}>
                    <Button className="mt-4">Następna strona</Button>
                </Link>
            </div>
        </>
    );
}
