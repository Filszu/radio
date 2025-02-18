import { PartyInfoBox } from '@/components/PartyInfoBox';
import { PartyInfoBoxContainer } from '@/components/PartyInfoBoxContainer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { getCreatorProfile } from '@/lib/auth/getCreatorProfile';
import { getUser } from '@/lib/auth/getUser';
import Link from 'next/link';
// import { UserParties } from "./user-parties"
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
// Mock user data

export default async function UserProfile() {
    const user = await getUser();

    if (!user) {
        redirect('/login');
    }

    // console.log('user', user);

    const userProfile = {
        name: user.user_metadata.full_name,
        username: '@' + user.user_metadata.full_name,
        bio: 'Music lover | Party enthusiast | Always up for a good time!',
        avatar: user.user_metadata.avatar_url,
        followers: 0,
        following: 0,
    };

    const creatorProfile = await getCreatorProfile({ sessionUserId: user.id });

    if (!creatorProfile) {
        return <h1>Error - no creator profile</h1>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage
                            src={userProfile.avatar}
                            alt={userProfile.name}
                        />
                        <AvatarFallback>
                            {userProfile.name
                                .split(' ')
                                .map((n: any[]) => n[0])
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                        <CardTitle className="text-2xl flex gap-1 flex-wrap justify-center md:justify-start">
                            {userProfile.name}{' '}
                            <div>
                                {
                                    // userProfile.name === 'Filip' ?
                                    creatorProfile.premiumStatus === 3 && (
                                        <span className="text-green-500">
                                            PRO
                                        </span>
                                    )
                                }
                                {
                                    // userProfile.name === 'Filip' ?
                                    creatorProfile.premiumStatus === 1 && (
                                        <span className="text-green-500">
                                            Premium
                                        </span>
                                    )
                                }
                                {creatorProfile.premiumStatus === 0 && (
                                    <span className="text-orange-400">
                                        Not Premium yet :c
                                    </span>
                                )}
                                {creatorProfile.premiumStatus === 9 && (
                                    <span className="text-red-500">
                                        {' '}
                                        Banned
                                    </span>
                                )}
                                {creatorProfile.premiumStatus === 2 && (
                                    <span className="text-green-500">
                                        {' '}
                                        Trial premium
                                    </span>
                                )}

                                {(creatorProfile.premiumStatus === 1 ||
                                    creatorProfile.premiumStatus === 3 ||
                                    creatorProfile.premiumStatus === 2 ||
                                    creatorProfile.premiumStatus === 9) && (
                                    <div className="text-green-500 text-xs text-center -translate-y-1">
                                        {' '}
                                        (until {creatorProfile.premiumUntil})
                                    </div>
                                )}
                            </div>
                            <Link href="/pricing">
                            <Button>
                                {creatorProfile.premiumStatus === 0 || creatorProfile.premiumStatus === 2
                                    ? 'Upgrade'
                                    : 'Manage'}{' '}
                                Plan
                            </Button>
                            </Link>
                        </CardTitle>
                        <CardDescription>
                            {userProfile.username}
                        </CardDescription>
                        <p className="mt-2 text-muted-foreground">
                            {userProfile.bio}
                        </p>
                        <div className="mt-4 flex justify-center sm:justify-start gap-4">
                            <div>
                                <span className="font-bold">
                                    {userProfile.followers}
                                </span>{' '}
                                Followers
                            </div>
                            <div>
                                <span className="font-bold">
                                    {userProfile.following}
                                </span>{' '}
                                Following
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">My Parties</h2>
                    {/* <UserParties /> */}

                    <Suspense fallback={<div>...</div>}>
                        <PartyInfoBoxContainer userId={user.id} admin={true} />
                    </Suspense>

                    <div className="h-10"></div>
                    <Link href="/new-party">
                        <Button>Create Party</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
