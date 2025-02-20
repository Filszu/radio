

import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Users, Vote, Zap } from 'lucide-react';
import { Counter } from './ui/custom/Counter'; // Import the Counter component
import { getStats } from '@/lib/getServiceStats';
import { fakeSetTimeOut } from '@/utils/fakeSetTimeOut';

export async function StatsBoxes() {

    const stats = await getStats();
    // await fakeSetTimeOut(5000);


    if(!stats) return <></>;

   

;

  

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
            {
                icon: Music,
                title: 'Songs Added',
                target: stats.total_songs,
                description: 'Explore a vast library of music',
            },
            {
                icon: Users,
                title: 'Parties Created',
                target: stats.total_party_creators,
                description: 'Host and join amazing events',
            },
            {
                icon: Vote,
                title: 'Votes',
                target: stats.total_votes,
                description: 'Your voice shapes the playlist',
            },
        ].map((stat, index) => (
            <Card
                key={index}
                className="text-center"
                // ref={addToRefs}
            >
                <CardContent className="pt-6">
                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-5xl font-bold mb-2">
                        <Counter 
                        target={stat.target ?? 0}
                         />
                    </h3>
                    <p className="text-xl font-semibold mb-2">
                        {stat.title}
                    </p>
                    <p className="text-muted-foreground">
                        {stat.description}
                    </p>
                </CardContent>
            </Card>
        ))}
    </div>
    );
}