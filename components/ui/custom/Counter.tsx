'use client';

import { useEffect, useState } from 'react';

interface CounterProps {
    target: number; // Target number to count up to
    duration?: number; // Duration of the animation in milliseconds (optional)
    className?: string; // Additional className for styling (optional)
}

export function Counter({ target, duration = 2000, className }: CounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = target / (duration / 16); // Adjust increment for smooth animation

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target); // Set to the target value when done
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start)); // Update the count
            }
        }, 16); // 16ms for ~60fps animation

        return () => clearInterval(timer); // Cleanup on unmount
    }, [target, duration]);

    return (
        <span className={`text-primary ${className}`}>
            {count}
            <span className='animate-pulse'>+</span>
        </span>
    );
}