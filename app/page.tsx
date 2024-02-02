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

// export const dynamic = "force-dynamic"

export const revalidate = 30;
type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
    const songIndexParam = searchParams?.songIndex ?? 0;

    let songIndex = 0;
    if(Number(songIndexParam) ){
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
    const songs: IPartySong[] = await getPartySongs({
        staringIndex: songIndex,
        limit: songIndex + 10,
        order: 'created_at',
        status: 'active',
    });


    


    if (songs) {
        // console.log(songs)
    } else return Error('songs is not defined');

    //maybe i can use this to get ip address
    // https://api.ipify.org?format=json

    return (
        <>
            {/* <Link href="/add-new-song">xxxxxxxxx</Link> */}

            <NewSongDialog></NewSongDialog>

            {/* spacer */}
            <div className="h-10"></div>

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
