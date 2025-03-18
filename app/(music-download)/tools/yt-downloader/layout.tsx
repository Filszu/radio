import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'PartyVote - Download Your Favourite Music',
    description:
        'Download your favorite music from Spotify and YouTube. Vote for your favourite music at parties and events.',
    keywords: [
        'music downloader',
        'spotify downloader',
        'youtube downloader',
        'party music',
        'music voting',
    ],
    authors: [{ name: 'PartyVote' }],
    creator: 'PartyVote',
    publisher: 'PartyVote',
    metadataBase: new URL('https://partyvote.ciac.me'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'PartyVote - Download Your Favourite Music',
        description:
            'Download your favorite music from Spotify and YouTube. Vote for your favourite music at parties and events.',
        url: 'https://partyvote.ciac.me',
        siteName: 'PartyVote',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'PartyVote - Download Your Favourite Music',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PartyVote - Download Your Favourite Music',
        description:
            'Download your favorite music from Spotify and YouTube. Vote for your favourite music at parties and events.',
        images: ['/og-image.png'],
        creator: '@partyvote',
    },
    // robots: {
    //     index: true,
    //     follow: true,
    //     googleBot: {
    //         index: true,
    //         follow: true,
    //         'max-video-preview': -1,
    //         'max-image-preview': 'large',
    //         'max-snippet': -1,
    //     },
    // },
    // icons: {
    //     icon: '/favicon.ico',
    //     shortcut: '/favicon-16x16.png',
    //     apple: '/apple-touch-icon.png',
    // },
    // manifest: '/site.webmanifest',
    // verification: {
    //     google: 'verification_token',
    //     yandex: 'verification_token',
    // },
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
