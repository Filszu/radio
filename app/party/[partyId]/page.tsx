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
import { getHost } from '@/lib/getHostId';
import { notFound, redirect } from 'next/navigation';
import ASbox from '@/components/ads/ASBox';
import AS_vBanner from '@/components/ads/AS_vBanner';
import GoogleAdUnit from '@/components/ads/GoogleAdUnit';
import AdBanner from '@/components/ads/google/AdBanner';
import { CeneoBox } from '@/components/ads/ceneo/CeneoBox';
import CeneoAdsSection from '@/components/ads/ceneo/CeneoAdSection';
import { getUser } from '@/lib/auth/getUser';
import { Metadata } from 'next';
import { getPlayList } from '@/lib/getPlayList';
// export const dynamic = "force-dynamic"

export const revalidate = 30;
type Props = {
    params: { partyId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// export const metadata: Metadata = {
//     title: '',

//   }

export default async function Home({ params, searchParams }: Props) {
    const partyId = params.partyId;

    // console.log("%%%%%params", params);

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

    const host = await getHost(partyId);
    if (!host) notFound();
    const hostId = host.id;
    const { hostUrl, hostDescription, hostName } = host;
    // const hostUrl = host;

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

            <section className="">
                <h2 className="text-3xl text-center">
                    <b>{hostName ?? ''}</b> party
                </h2>

                <h3>{hostDescription ?? ''}</h3>
            </section>
            <div className="h-10"></div>
            <Suspense fallback={<div>...</div>}>
                <NewSongDialog partyId={hostId} />
            </Suspense>

            {/* spacer */}
            <div className="h-10"></div>

            <section className="w-full min-h-[300px] flex justify-center overflow-clip">
                <AdBanner
                    dataAdFormat="auto"
                    dataFullWidthResponsive={true}
                    dataAdSlot="4062933975"
                />
                <span className="hidden md:block">
                    <AdBanner
                        dataAdFormat="auto"
                        dataFullWidthResponsive={true}
                        dataAdSlot="4062933975"
                    />
                </span>
                <span className="hidden lg:block">
                    <AdBanner
                        dataAdFormat="auto"
                        dataFullWidthResponsive={true}
                        dataAdSlot="4062933975"
                    />
                </span>
            </section>

            <section className="lg:w-8/12 md:w-10/12 w-full text-center flex flex-col items-center">
                {songIndex <= 1 && <TopSongsList partyId={hostId} />}

                {/* <AS_vBanner /> */}
                <AdBox />
                <Suspense fallback={<div></div>}>
                    <PageMsg partyId={hostId} />
                </Suspense>

                <h2 className="uppercase text-2xl mt-8 mb-8">
                    Vote for your FAV SONGS🎵
                </h2>

                <MusicList songs={songs} isAdmin={false}/>
                <div className="flex gap-1">
                    {songIndex >= 10 && (
                        <Link href={`?songIndex=${songIndex - 10}`}>
                            <Button className="mt-4">Prev page</Button>
                        </Link>
                    )}

                    <Link href={`?songIndex=${songIndex + 10}`}>
                        <Button className="mt-4">Next page</Button>
                    </Link>
                </div>

                {/* <CeneoAdsSection /> */}
            </section>
        </>
    );
}
