import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import Image from 'next/image'
import Logo from '../public/imgs/logo-elektron.jpg'
import Link from 'next/link'
import Script from 'next/script'
// import { FiGithub } from 'react-icons/fi'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Radio Elektron',
  description: 'Radio Elektron by Filszu',
  keywords:"radio, elektron, zielona góra, gora, elektronik, filszu, radio,zseis,ckziu, nr2, Filip Szumowski, filshu",
  openGraph: {
    title: 'Radio Elektron',
    description: 'Radio Elektron by Filszu',
    url: 'https://ciac.me',
    siteName: 'Radio Elektron',
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

  // Open Graph
  // 'og:type': 'website',
  // 'og:site_name': 'Radio Elektron',
  // 'og:url': 'https://radio-elektron.vercel.app/',
  // 'og:title': 'Radio Elektron',
  // 'og:description': 'Radio Elektron by Filszu',
  // 'og:image': 'https://radio-elektron.vercel.app/imgs/logo-elektron.jpg',

}

export default function RootLayout({
  children,
  newSongModal,
}: {
  children: React.ReactNode
  newSongModal: React.ReactNode

}) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        {/* {newSongModal} */}
        <main className="flex min-h-screen flex-col items-center p-14">
      <header className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm md:flex md:justify-between">
      {/* <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex md:justify-between">
      </div> */}
        <div className='flex items-center justify-center w-full md:flex md:w-auto'>
          <Image src={Logo} width={50} height={50} alt="logo elktrona" className='m-5'/>
          <Link href="/">
            <h1>Radio Elektron</h1>
          </Link>
           </div>
          <div className='flex items-center justify-center'><h2 className=''>Głosuj na ulubione utwory</h2></div>
        
      
          </header>
      
        <div className='h-10'></div>  

        {children}
        </main>

        <Toaster />

        <footer
        className='text-center w-full my-10  '
        >
          <h3>Created with ❣️ by <Link href={"https://lessons.ciac.me/"} className='link-underline text-primary'>Filszu</Link> 2023</h3>
          <h3 className=''>Give a ⭐ on <Link href={"https://github.com/Filszu/radio"} className='link-underline text-primary'>
          {/* <FiGithub size={10} />  */}
          Github repo 
          
          </Link >
          
            </h3>
        </footer>

        <Script 
        // strategy='lazyOnload'
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
        />
        <Script
        id="google-analytics"
        strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        
        
      </body>
    </html>
  )
}
