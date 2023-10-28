import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        {children}
        <Toaster />
        
      </body>
    </html>
  )
}
