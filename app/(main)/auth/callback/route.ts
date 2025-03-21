import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);

    const { searchParams } = requestUrl;
    const code = searchParams.get('code');
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/profile';

    if (code) {
        const cookieStore = cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.delete({ name, ...options });
                    },
                },
            },
        );
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // return NextResponse.redirect(`${origin}/dashboard`);

            // return NextResponse.redirect(requestUrl.origin+"/dashboard")
            console.log('redirecting to', next, requestUrl.origin);
            // return NextResponse.redirect(requestUrl.origin+"/dashboard")
            return NextResponse.redirect(requestUrl.origin+"/profile")
        }
        if(error) {
            console.log('error', error);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}