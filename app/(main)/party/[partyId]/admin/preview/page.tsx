import { Button } from '@/components/ui/button';
import { Music, Share2 } from 'lucide-react';
import MusicList from '@/components/MusicList';
import NewSongDialog from '@/components/NewSongDialog';
import { getPartySongs, getSongs, getSongsCustom } from '@/lib/getSongs';
import { USong } from '@/types';

import Link from 'next/link';
import { IPartySong } from '@/types';
import TopSongsList from '@/components/TopSongs';
import { Suspense } from 'react';
import PageMsg from '@/components/PageMsg';
import { getHost } from '@/lib/getHostId';
import { notFound, redirect, } from 'next/navigation';

import AdBanner from '@/components/ads/google/AdBanner';

import LinksComponent from '@/components/ads/Links';
import { Metadata, ResolvingMetadata } from 'next';
import { getUser } from '@/lib/auth/getUser';

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const partyId = params.partyId;
    const host = await getHost(partyId);

    if (!host) {
        return {
            title: 'PARTY VOTE Party Not Found',
            description: 'The requested party could not be found.',
        };
    }

    const { hostName, hostDescription, hostUrl, keyWords, logoUrl } = host;
    const previousImages = (await parent).openGraph?.images || [];
    return {
        title: `${hostName ?? 'Party'} - PartyVOTE LIVE preview`,
        description: `Join the party at", ${hostDescription ?? 'partyVote'}`,
        keywords: ['party', 'music', 'Radio Elektron', hostName],
        openGraph: {
            title: `${hostName ?? 'Party'} - PartyVOTE`,
            description: `Join the party at ${
                hostName ?? ''
            } @ PartyVOTE. Vote for your favorite songs and see them played live. ${
                hostDescription ?? ''
            }`,
            type: 'website',
            url: `https://partyvote.ciac.me/party/${hostUrl}`,

            images: [logoUrl ?? '', ...previousImages],
        },
    };
}

export const revalidate = 10;
type Props = {
    params: { partyId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// export const metadata: Metadata = {
//     title: '',

//   }

export default async function SandBoxPage({ params, searchParams }: Props) {
    const user = await getUser();

    if (!user) {
        redirect('@/login');
    }

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
    const { hostUrl, hostDescription, hostName, votingFinishAt } = host;
    // const hostUrl = host;

    console.log('hostId', hostId);

    const songs: IPartySong[] = await getPartySongs({
        staringIndex: songIndex,
        limit: songIndex + 30,
        order: 'updated_at',
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
                <div className="flex gap-1 flwx-wrap justify-center">
                    <h2 className="text-3xl text-center">
                        <b>{hostName ?? ''}</b> party{' '}
                    </h2>
                    <Button
                        className="flex items-center  text-primary"
                        variant={'ghost'}
                    >
                        <Link
                            href={`/party/${host.hostUrl}/share`}
                            className="flex items-center  text-primary"
                        >
                            <Share2 size={30} />
                        </Link>
                    </Button>
                </div>

                <h3>{hostDescription ?? ''}</h3>
            </section>
            <div className="h-10"></div>
            <Suspense fallback={<div>...</div>}>
                <NewSongDialog
                    partyId={hostId}
                    votingFinishAt={votingFinishAt!}
                />
            </Suspense>

            {/* spacer */}
            <div className="h-10"></div>

            <section className="lg:w-8/12 md:w-10/12 w-full text-center flex flex-col items-center">
                {songIndex <= 1 && (
                    <TopSongsList
                        partyId={hostId}
                        votingFinishAt={votingFinishAt}
                    />
                )}

                {/* <AS_vBanner /> */}
                {/* <AdBox /> */}

                <div className="h-10"></div>

                <Suspense fallback={<div></div>}>
                    <PageMsg partyId={hostId} />
                </Suspense>

                <h2 className="uppercase text-2xl mt-8 mb-8">
                    Vote for your FAV SONGS🎵
                </h2>

                <MusicList songs={songs} isAdmin={false} isSandbox={true} />
                <div className="flex gap-1">
                    {songIndex >= 10 && (
                        <Link href={`?songIndex=${songIndex - 30}`}>
                            <Button className="mt-4">Prev page</Button>
                        </Link>
                    )}

                    <Link href={`?songIndex=${songIndex + 30}`}>
                        <Button className="mt-4">Next page</Button>
                    </Link>
                </div>

                {/* <CeneoAdsSection /> */}
            </section>

            <LinksComponent />
        </>
    );
}
