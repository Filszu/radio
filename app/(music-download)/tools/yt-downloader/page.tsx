'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Music, Download, ArrowDown, Vote, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import WaveSVG from './components/wave-svg';
import MusicNotes from './components/music-notes';
import Link from 'next/link';

export default function Home() {
    const searchParams = useSearchParams();
    const urlParam = searchParams.get('url');

    const [url, setUrl] = useState(urlParam || '');
    const router = useRouter();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    // Update URL state when the URL parameter changes
    useEffect(() => {
        if (urlParam) {
            setUrl(urlParam);
        }
    }, [urlParam]);

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-green-50 to-red-50"
            ref={containerRef}
        >
            {/* Hero Section */}
            <motion.div
                className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
                style={{ opacity, scale }}
            >
                <WaveSVG className="absolute top-0 left-0 w-full h-full z-0" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-6">
                        PartyVote
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
                        Vote for your favourite MUSIC
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="z-10 w-full max-w-md"
                >
                    <form className="relative">
                        <Input
                            type="text"
                            placeholder="Paste Spotify or YouTube URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="pr-24 h-14 bg-white/90 border-2 border-green-500 focus:border-red-500 transition-colors text-black"
                        />
                        <Link
                            href={`yt-downloader/download?url=${encodeURIComponent(
                                url,
                            )}`}
                        >
                            <Button
                                type="submit"
                                className="absolute right-1 top-1 h-12 bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Download
                            </Button>
                        </Link>
                    </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 z-10"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2,
                        }}
                    >
                        <ArrowDown className="h-10 w-10 text-gray-700" />
                    </motion.div>
                </motion.div>

                <MusicNotes />
            </motion.div>

            {/* Features Section */}
            <motion.section
                className="py-20 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                        Host Your Party, Let Guests Pick the Beats
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center"
                        >
                            <div className="relative w-64 h-64 mb-6">
                                <Image
                                    src=""
                                    alt="Person listening to music"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-green-700 mb-2">
                                1. Copy the Link
                            </h3>
                            <p className="text-center text-gray-700">
                                Copy the URL from Spotify or YouTube of the song
                                you want to download
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center"
                        >
                            <div className="relative w-64 h-64 mb-6">
                                <Image
                                    src=""
                                    alt="Person at computer"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-red-700 mb-2">
                                2. Paste & Submit
                            </h3>
                            <p className="text-center text-gray-700">
                                Paste the URL into our downloader and click the
                                download button
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center"
                        >
                            <div className="relative w-64 h-64 mb-6">
                                <Image
                                    src=""
                                    alt="Person downloading music"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold text-green-700 mb-2">
                                3. Download
                            </h3>
                            <p className="text-center text-gray-700">
                                Your music file will be processed and ready to
                                download in seconds
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Party Section */}
            <motion.section
                className="py-20 px-4 bg-gradient-to-r from-green-100 to-red-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                        Create unforgettable parties where everyone has a say in
                        the playlist
                    </h2>

                    <p className="text-xl text-gray-700 mb-10">
                        Host, vote, and dance to the music you all love.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <Card className="bg-white/80 border-green-500/30 text-left">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                                    <PartyPopper className="mr-2 h-5 w-5" />{' '}
                                    Host a Party
                                </h3>
                                <p className="text-gray-700">
                                    Create a party room, share the link with
                                    your guests, and let them add songs to the
                                    playlist.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 border-red-500/30 text-left">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                                    <Vote className="mr-2 h-5 w-5" /> Vote for
                                    Songs
                                </h3>
                                <p className="text-gray-700">
                                    Let your guests vote for their favorite
                                    songs to determine what plays next at your
                                    party.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="https://partyvote.ciac.me">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-xl px-8 py-6 h-auto text-white"
                            >
                                <PartyPopper className="mr-2 h-6 w-6" />
                                Start Your Party
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Recent Parties Section */}
            <motion.section
                className="py-20 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
                        Recent and most popular PARTIES
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            {
                                name: 'Radio Elektron',
                                author: '@author',
                                slug: 'radio-elektron',
                                bg: 'bg-gradient-to-br from-gray-200 to-gray-400',
                            },
                            {
                                name: 'test',
                                author: '@author',
                                slug: 'mybigVotingParty',
                                bg: 'bg-gradient-to-br from-red-200 to-red-400',
                            },
                            {
                                name: 'ni**aLand',
                                author: '@author',
                                slug: 'niggaLand',
                                bg: 'bg-gradient-to-br from-yellow-200 to-yellow-400',
                            },
                            {
                                name: 'MagicioMusic',
                                author: '@author',
                                slug: 'magico',
                                bg: 'bg-gradient-to-br from-purple-200 to-purple-400',
                            },
                            {
                                name: 'tiktok songs',
                                author: '@author',
                                slug: 'tiktok',
                                bg: 'bg-gradient-to-br from-blue-200 to-blue-400',
                            },
                        ].map((party, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className={`${party.bg} rounded-lg p-4 aspect-square flex flex-col justify-between cursor-pointer shadow-md`}
                                onClick={() =>
                                    window.open(
                                        `https://partyvote.ciac.me/${party.slug}`,
                                        '_blank',
                                    )
                                }
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
                                        <Music className="h-4 w-4 text-gray-800" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">
                                            {party.name}
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            {party.author}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-auto">
                                    /{party.slug}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Instructions Section */}
            <motion.section
                className="py-20 px-4 bg-gradient-to-r from-green-100 to-red-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
                        Instructions
                    </h2>

                    <Card className="bg-white/80 border-none shadow-xl">
                        <CardContent className="pt-6">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-lg font-medium text-green-700">
                                        Supported Platforms
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-700">
                                        Our downloader supports both Spotify and
                                        YouTube links. Simply paste the URL of
                                        the song, playlist, or video you want to
                                        download.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-lg font-medium text-red-700">
                                        Download Process
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-700">
                                        After submitting the URL, you'll be
                                        redirected to the download page where
                                        you can select the quality and format of
                                        your download. The file will be
                                        processed on our servers and made
                                        available for download.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-lg font-medium text-green-700">
                                        Legal Considerations
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-700">
                                        Please ensure you have the right to
                                        download the content. This tool is
                                        intended for personal use only with
                                        content that is either in the public
                                        domain or that you have permission to
                                        download.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-lg font-medium text-red-700">
                                        API Usage
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-700">
                                        Developers can use our API to integrate
                                        music downloading capabilities into
                                        their applications. The API endpoint is{' '}
                                        <code className="bg-gray-200 px-2 py-1 rounded">
                                            /api/download?url=YOUR_URL
                                        </code>{' '}
                                        which accepts GET requests.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                className="py-20 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                        Ready to Download Your Music?
                    </h2>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-xl px-8 py-6 h-auto"
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }
                        >
                            <Music className="mr-2 h-6 w-6" />
                            Start Downloading Now
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
