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
import Footer from '@/components/Footer';
import { CSPostHogProvider } from './providers';
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
        images: [`${'https://partyvote.ciac.me'}/imgs/opengraph-image.png`],
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
    newSongModal: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            {/* <head>
                <AdSense pId="ca-pub-6202644433627847" />
            </head> */}
            <CSPostHogProvider>
                <body className={inter.className}>
                    {/* {newSongModal} */}
                    {children}

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

                    <Script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6202644433627847"
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                    ></Script>
                </body>
            </CSPostHogProvider>
        </html>
    );
}
