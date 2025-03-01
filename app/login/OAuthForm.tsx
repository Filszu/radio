'use client';
import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

interface Props {
    btnClassName?: string;
    btnText?: string;
    btnVariant?:
        | 'outline'
        | 'default'
        | 'destructive'
        | 'secondary'
        | 'ghost'
        | 'link';
}

const OAuthForm = async (props: Props) =>
    // props: Props

    {
        const btnClassName = props.btnClassName || '';
        const btnText = props.btnText || 'Login with google';
        const btnVariant = props.btnVariant || 'outline';

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        );

        async function googleLogin() {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    // redirectTo: `${location.origin}/profile/create`,
                    redirectTo: `${location.origin}/auth/callback`,
                    // redirectTo: `${window.location.origin}?next=/profile/create`,
                    // redirectTo: `${window.location.origin}/profile/create`,
                },
            });

            console.log('data=========', data);
            if (error) {
                console.log('error=========', error);
            }
        }
        return (
            <>
                <Button
                    className={`w-full p-6 ${btnClassName}`}
                    variant={btnVariant}
                    onClick={googleLogin}
                >
                    <span className="flex items-center justify-center gap-1 text-lg ">
                        <FaGoogle />
                        {btnText}
                    </span>
                </Button>
            </>
        );
    };

export default OAuthForm;
