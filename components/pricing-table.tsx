'use client';

import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import SubmitButton from './ui/custom/SubmitButton';

interface Iprops {
    plan1ButtonFunction?: () => void;
    plan2ButtonFunction?: () => void;
}

export function PricingTable(props: Iprops) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">
                Choose Your Plan and Host Your{' '}
                <span className="text-primary uppercase">first party</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Free Plan */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">Free Plan</CardTitle>
                        <CardDescription>
                            Get started with basic features
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-4xl font-bold">
                            $0
                            <span className="text-xl font-normal">/month</span>
                        </div>
                        <ul className="space-y-2">
                            <ListItem included>
                                Limited parties hosting
                            </ListItem>
                            <ListItem included>
                                Host 1 party per account
                            </ListItem>
                            <ListItem included>Ad-supported page</ListItem>
                            <ListItem>Create playlists</ListItem>
                            <ListItem>Music API access</ListItem>
                            <ListItem>Admin dashboard</ListItem>
                            <ListItem>Your Party Logo</ListItem>
                            <ListItem included>TEST premium features</ListItem>
                            <ListItem included>
                                with Free Premium PRO Trial for 14 days <br />
                                included (with ads)
                            </ListItem>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton
                            className="w-full"
                            onClick={() => props.plan1ButtonFunction}
                            btnText="Get Started"
                        >
                            Get Started
                        </SubmitButton>
                    </CardFooter>
                </Card>

                {/* $1 Plan */}
                <Card className="w-full border-primary">
                    <CardHeader>
                        <CardTitle className="text-2xl">Premium Plan</CardTitle>
                        <CardDescription>Unlock all features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-4xl font-bold">
                            <span className="line-through text-xl">7$ </span>$1
                            <span className="text-xl font-normal">/month<sup>*</sup></span>
                        </div>
                        <ul className="space-y-2">
                            <ListItem included>
                                max 2 music parties
                            </ListItem>
                            <ListItem included>Music API access</ListItem>
                            <ListItem included>Ad-free listening for 2 parties</ListItem>
                            <ListItem included>
                                Create and share playlists
                            </ListItem>
                            <ListItem included>100 daily users per party limit</ListItem>
                            <ListItem included>Exclusive content</ListItem>
                            <ListItem included>Admin dashboard</ListItem>
                            <ListItem included>Your Party Logo</ListItem>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() => {
                                console.log('hahaha');
                                props.plan2ButtonFunction;
                            }}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Subscribe Now
                        </Button>
                    </CardFooter>
                </Card>
                {/* $ULTIMATE Plan */}
                <Card className="w-full ">
                    <CardHeader>
                        <CardTitle className="text-2xl ">
                            <span className="text-yellow-500">PRO </span>
                            ULTIMATE Plan</CardTitle>
                        <CardDescription>Unlock all features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-4xl font-bold">
                            <span className="line-through text-xl">10$ </span>$1 
                            <span className="text-xl font-normal">/month<sup>*</sup></span>
                        </div>
                        <ul className="space-y-2">
                            <ListItem included>
                                Unlimited music parties
                            </ListItem>
                            <ListItem included>Music API access</ListItem>
                            <ListItem included>Ad-free listening</ListItem>
                            <ListItem included>
                                Create and share playlists
                            </ListItem>
                            <ListItem included>Unlimited party users</ListItem>
                            <ListItem included>Exclusive content</ListItem>
                            <ListItem included>Advanced Admin dashboard</ListItem>
                            <ListItem included>Your Party Logo</ListItem>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() => {
                                console.log('hahaha');
                                props.plan2ButtonFunction;
                            }}
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Subscribe Now
                        </Button>
                    </CardFooter>
                </Card>
                

            </div>
            <div className="text-center mt-8 text-sm text-gray-500">
                <sup>*</sup> - first 30 days at $1, then monthly subscription
                <br />
                <sup>**</sup>Party monetization features coming soon for the Ultimate plan 
            </div>
        </div>
    );
}

function ListItem({
    children,
    included,
}: {
    children: React.ReactNode;
    included?: boolean;
}) {
    return (
        <li className="flex items-center space-x-2">
            {included ? (
                <Check className="h-5 w-5 text-green-500" />
            ) : (
                <X className="h-5 w-5 text-red-500" />
            )}
            <span>{children}</span>
        </li>
    );
}
