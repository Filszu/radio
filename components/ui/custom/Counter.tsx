'use client';

import { useEffect, useState, useRef } from 'react';

interface CounterProps {
    target: number;
    duration?: number;
    className?: string;
}

export function Counter({ target, duration = 2000, className }: CounterProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, target, duration]);

    return (
        <span ref={ref} className={`text-primary ${className}`}>
            {count}
            <span className='animate-pulse'>+</span>
        </span>
    );
}
