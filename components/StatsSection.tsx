import React, { Suspense } from 'react';
import { Card, CardContent } from './ui/card';
import { StatsBoxes } from './StatsBoxes';
import { Zap } from 'lucide-react';

const StatsSection = async() => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
            <h2
                className="text-3xl font-bold text-center mb-12 flex items-center justify-center"
                // ref={addToRefs}
            >
                <Zap className="w-8 h-8 mr-2 text-primary" />
                Join Our Community
            </h2>

            <Suspense fallback={<LoadingSkeleton />}>
                <StatsBoxes />
            </Suspense>

           
        </div>
    </section>
        
    );

    
};

function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
                <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                        <div className="w-12 h-12 mx-auto mb-4 bg-muted rounded-full" />
                        <div className="h-12 w-24 mx-auto mb-4 bg-muted rounded-lg" />
                        <div className="h-6 w-32 mx-auto mb-2 bg-muted rounded-lg" />
                        <div className="h-4 w-48 mx-auto bg-muted rounded-lg" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default StatsSection;
