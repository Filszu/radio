'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
    return (
        <div className="relative  flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                // style={{
                //     backgroundImage:
                //         "url('/placeholder.svg?height=1080&width=1920')",
                // }}
                aria-hidden="true"
            />
            <div
                className="absolute inset-0  bg-opacity-60 z-10"
                aria-hidden="true"
            />
            <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                    Host Your Party, Let Guests Pick the Beats
                </h2>
                <p className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
                    Create unforgettable parties where everyone has a say in the
                    playlist. Host, vote, and dance to the music you all love.
                </p>
                <div className="mt-10">
                    <Link href="/profile">
                        <Button size="lg" className="text-lg px-8 py-3">
                            Start Your Party
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
