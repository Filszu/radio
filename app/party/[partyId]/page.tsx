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
import { notFound } from 'next/navigation';
import ASbox from '@/components/ads/ASBox';
import AS_vBanner from '@/components/ads/AS_vBanner';
import GoogleAdUnit from '@/components/ads/GoogleAdUnit';
import AdBanner from '@/components/ads/google/AdBanner';
import CeneoAffContainer from '@/components/ads/ceneo/CeneoBox';

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
            {/* <section className="w-full h-60 flex justify-center">
                <AdBanner
                    dataAdFormat="auto"
                    dataFullWidthResponsive={true}
                    dataAdSlot="4643526086"
                />
            </section> */}
            {/* <section className="w-full min-h-[300px] flex justify-center">
                <AdBanner
                    dataAdFormat="auto"
                    dataFullWidthResponsive={true}
                    dataAdSlot="4062933975"
                />
                <AdBanner
                    dataAdFormat="auto"
                    dataFullWidthResponsive={true}
                    dataAdSlot="4062933975"
                />
                <AdBanner
                    dataAdFormat="auto"
                    dataFullWidthResponsive={true}
                    dataAdSlot="4062933975"
                />


                
            </section> */}

            <section className="w-full min-h-[300px] flex justify-center overflow-hidden">
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

            {songIndex <= 1 && <TopSongsList partyId={hostId} />}

            {/* <AS_vBanner /> */}
            <AdBox />
            <Suspense fallback={<div></div>}>
                <PageMsg partyId={hostId} />
            </Suspense>

            {/* <div className="h-96 w-full ">
                <GoogleAdUnit>
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block', width: '100%' }}
                        data-ad-client="ca-pub-6202644433627847"
                        data-ad-slot="9203339114"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    ></ins>
                </GoogleAdUnit>
            </div> */}

            <h2 className="uppercase text-2xl mt-8 mb-8">
                Vote for your FAV SONGS🎵
            </h2>

            <MusicList songs={songs} isAdmin={false} />
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
            <section>
                <CeneoAffContainer />
            </section>
        </>
    );
}
