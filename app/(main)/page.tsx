import Image from 'next/image';
import Logo from '../public/imgs/logo-elektron.jpg';
import { VotingList } from '@/components';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
import MusicList from '@/components/MusicList';
import NewSongDialog from '@/components/NewSongDialog';
import { getPartySongs, getSongs, getSongsCustom } from '@/lib/getSongs';
import { USong } from '@/types';

import Link from 'next/link';
import { IPartySong } from '@/types';
import TopSongsList from '@/components/TopSongs';
import { Suspense } from 'react';
import AdBox from '@/components/ads/AdBox';
import { getPartyMessage } from '@/lib/getMessage';
import PageMsg from '@/components/PageMsg';
import { PartyInfoBoxContainer } from '@/components/PartyInfoBoxContainer';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSectionsAnimated } from '@/components/features-sections-animated';
import { Vortex } from '@/components/ui/vortex';
import { Header } from '@/components/Header';
import AdBanner from '@/components/ads/google/AdBanner';
import StatsSection from '@/components/StatsSection';


// export const dynamic = "force-dynamic"

export const revalidate = 120;
type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
    return (
        <>
            <HeroSection />
            <section className="mt-10">
                <h1 className="text-3xl font-bold text-center mb-12 flex items-center justify-center ">
                    Recent and most popular PARTIES
                </h1>
                <Suspense fallback={<div>...</div>}>
                    <PartyInfoBoxContainer collapsed={true} />
                </Suspense>
            </section>

            <FeaturesSectionsAnimated />

            <section className="md:w-8/12">
                <TopSongsList partyId={1} />
            </section>


            <StatsSection />    
        </>
    );
}
