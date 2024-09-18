import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Image from 'next/image';
import Logo from '../public/imgs/logo-elektron.jpg';
import Link from 'next/link';
import Script from 'next/script';
import { Header } from '@/components/Header';
import AdSense from '@/components/ads/AdSense';
// import { FiGithub } from 'react-icons/fi'


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'PartyVote',
    description:
        'Party Vote Radio Elektron by Filszu Host Your Party, Let Guests Pick the BeatsCreate unforgettable parties where everyone has a say in the playlist. Host, vote, and dance to the music you all love.',
    keywords:
        'party, vote, partyvote, ciac.me, radio, elektron, zielona góra, gora, elektronik, filszu, radio,zseis,ckziu, nr2, Filip Szumowski, filshu',
    openGraph: {
        title: 'PartyVote - Vote for your favorite songs',
        description:
            'Party Vote Radio Elektron by Filszu Host Your Party, Let Guests Pick the BeatsCreate unforgettable parties where everyone has a say in the playlist. Host, vote, and dance to the music you all love Radio Elektron by Filszu',
        url: 'https://partyvote.ciac.me',
        siteName: 'PartyVote',
        images: [
            {
                url: '/imgs/logo.png',
                width: 500,
                height: 500,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },

    // <AdSense pId="ca-pub-6202644433627847" />
    // Open Graph
    // 'og:type': 'website',
    // 'og:site_name': 'Radio Elektron',
    // 'og:url': 'https://radio-elektron.vercel.app/',
    // 'og:title': 'Radio Elektron',
    // 'og:description': 'Radio Elektron by Filszu',
    // 'og:image': 'https://radio-elektron.vercel.app/imgs/logo-elektron.jpg',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
    newSongModal: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <AdSense pId="ca-pub-6202644433627847" />
            </head>
            <body className={inter.className}>
                {/* {newSongModal} */}
                <main className="flex min-h-screen flex-col items-center md:pt-1 w-full">
                    {/* <header className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm md:flex md:justify-between">
                        
                        <div className="flex items-center justify-center w-full md:flex md:w-auto">
                            <Image
                                src={Logo}
                                width={50}
                                height={50}
                                alt="logo elktrona"
                                className="m-5"
                            />
                            <Link href="/">
                                <h1>Radio Elektron</h1>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <h2 className="">Głosuj na ulubione utwory</h2>
                        </div>
                    </header> */}
                    <Header />

                    <div className="h-10"></div>

                    {children}
                </main>

                <Toaster />

                <footer className="text-center w-full my-10  ">
                    <h3>
                        Created with ❣️ by{' '}
                        <Link
                            href={'https://lessons.ciac.me/'}
                            className="link-underline text-primary"
                        >
                            Filszu
                        </Link>{' '}
                        2023 - 2024
                    </h3>
                    <h3 className="">
                        Give a ⭐ on{' '}
                        <Link
                            href={'https://github.com/Filszu/radio'}
                            className="link-underline text-primary"
                        >
                            {/* <FiGithub size={10} />  */}
                            Github repo
                        </Link>
                    </h3>
                </footer>

                <Script
                    // strategy='lazyOnload'
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `}
                </Script>
            </body>
        </html>
    );
}
