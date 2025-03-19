'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
    Music,
    Users,
    Vote,
    Headphones,
    Mic2,
    Calendar,
    Star,
    Zap,
    PartyPopper,
} from 'lucide-react';
import TrustBox from './ui/custom/TrustpilotBtn';

export function FeaturesSectionsAnimated() {
    const animatedElementsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 },
        );

        animatedElementsRef.current.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el: HTMLHeadingElement | null) => {
        if (el && !animatedElementsRef.current.includes(el)) {
            animatedElementsRef.current.push(el); // Correct type is now inferred
        }
    };

    return (
        <div className="bg-background text-foreground">
            {/* How It Works Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2
                        className="text-3xl font-bold text-center mb-12 flex items-center justify-center"
                        ref={addToRefs}
                    >
                        <Zap className="w-8 h-8 mr-2 text-primary" />
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Calendar,
                                title: 'Create Your Party',
                                description:
                                    'Set up your event with a few clicks',
                            },
                            {
                                icon: Users,
                                title: 'Invite Guests',
                                description:
                                    'Share a unique link with your friends',
                            },
                            {
                                icon: Vote,
                                title: 'Vote for Songs',
                                description:
                                    'Everyone gets a say in the playlist',
                            },
                        ].map((item, index) => (
                            <Card
                                key={index}
                                className="text-center"
                                ref={addToRefs}
                            >
                                <CardContent className="pt-6">
                                    <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                                    <h3 className="text-xl font-semibold mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted md:rounded-md">
                <div className="max-w-7xl mx-auto">
                    <h2
                        className="text-3xl font-bold text-center mb-12 flex items-center justify-center"
                        ref={addToRefs}
                    >
                        <Star className="w-8 h-8 mr-2 text-primary" />
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Music,
                                title: 'Diverse Playlists',
                                description:
                                    'Access millions of songs across genres',
                            },
                            {
                                icon: Vote,
                                title: 'Real-time Voting',
                                description:
                                    'Dynamic playlist updates based on votes',
                            },
                            {
                                icon: Headphones,
                                title: 'DJ Mode',
                                description:
                                    'Take control and curate the perfect vibe',
                            },
                            {
                                icon: Users,
                                title: 'Multiple Parties',
                                description:
                                    'Host various events simultaneously',
                            },
                            {
                                icon: Mic2,
                                title: 'Karaoke Option',
                                description:
                                    'Switch to karaoke mode for extra fun',
                            },
                            {
                                icon: Calendar,
                                title: 'Scheduled Playlists',
                                description:
                                    'Plan your music for different party phases',
                            },
                        ].map((feature, index) => (
                            <Card key={index} ref={addToRefs}>
                                <CardContent className="flex items-center p-6">
                                    <feature.icon className="w-8 h-8 mr-4 text-primary" />
                                    <div>
                                        <h3 className="font-semibold mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2
                        className="text-3xl font-bold text-center mb-12 flex items-center justify-center"
                        ref={addToRefs}
                    >
                        <PartyPopper className="w-8 h-8 mr-2 text-primary" />
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Alex',
                                role: 'Party Host',
                                quote: 'This app made my birthday bash unforgettable! Everyone loved choosing the music.',
                            },
                            {
                                name: 'Sam',
                                role: 'DJ Enthusiast',
                                quote: 'The DJ mode is fantastic. I can ensure the vibe stays right while still letting guests contribute.',
                            },
                            {
                                name: 'Jamie',
                                role: 'Regular Partygoer',
                                quote: "I love being able to influence the playlist at parties. It's so much fun!",
                            },
                        ].map((testimonial, index) => (
                            <Card
                                key={index}
                                className="bg-primary text-primary-foreground"
                                ref={addToRefs}
                            >
                                <CardContent className="p-6">
                                    <p className="mb-4 italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <p className="font-semibold">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm">
                                        {testimonial.role}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <section className="mt-12">
                    <TrustBox />
                </section>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted md:rounded-md">
                <div className="max-w-3xl mx-auto text-center" ref={addToRefs}>
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Host Your Ultimate Party?
                    </h2>
                    <p className="text-xl mb-8">
                        Join thousands of hosts creating unforgettable
                        experiences with crowd-sourced playlists.
                    </p>
                    <Link href="/profile">
                        <Button size="lg" className="text-lg px-8 py-3">
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
