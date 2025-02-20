'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Users, Vote, Zap } from 'lucide-react';

interface Stat {
    icon: React.ElementType;
    title: string;
    target: number;
    description: string;
}

export function StatsSection() {
    const animatedElementsRef = useRef<HTMLElement[]>([]);
    const [counters, setCounters] = useState<{ [key: string]: number }>({
        songs: 0,
        parties: 0,
        votes: 0,
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        startCounterAnimation();
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
            animatedElementsRef.current.push(el);
        }
    };

    const startCounterAnimation = () => {
        const stats: Stat[] = [
            { icon: Music, title: 'Songs Added', target: 300, description: 'Explore a vast library of music' },
            { icon: Users, title: 'Parties Created', target: 35, description: 'Host and join amazing events' },
            { icon: Vote, title: 'Votes', target: 1000, description: 'Your voice shapes the playlist' },
        ];

        stats.forEach((stat) => {
            let currentCount = 0;
            const interval = setInterval(() => {
                currentCount += Math.ceil(stat.target / 50); // Adjust speed here
                if (currentCount >= stat.target) {
                    currentCount = stat.target;
                    clearInterval(interval);
                }
                setCounters((prev) => ({
                    ...prev,
                    [stat.title.toLowerCase().replace(/\s+/g, '_')]: currentCount,
                }));
            }, 30); // Adjust interval for smoother/faster animation
        });
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <h2
                    className="text-3xl font-bold text-center mb-12 flex items-center justify-center"
                    ref={addToRefs}
                >
                    <Zap className="w-8 h-8 mr-2 text-primary" />
                    Join Our Community
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Music,
                            title: 'Songs_added',
                            target: 300,
                            description: 'Explore a vast library of music',
                        },
                        {
                            icon: Users,
                            title: 'parties_created',
                            target: 35,
                            description: 'Host and join amazing events',
                        },
                        {
                            icon: Vote,
                            title: 'votes',
                            target: 1000,
                            description: 'Your voice shapes the playlist',
                        },
                    ].map((stat, index) => (
                        <Card
                            key={index}
                            className="text-center"
                            ref={addToRefs}
                        >
                            <CardContent className="pt-6">
                                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                                <h3 className="text-5xl font-bold mb-2">
                                    {counters[stat.title]}+
                                </h3>
                                <p className="text-xl font-semibold mb-2">
                                    {stat.title.replace(/_/g, ' ')}
                                </p>
                                <p className="text-muted-foreground">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}