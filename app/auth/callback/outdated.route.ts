import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
// import { createClient } from '@/utils/supabase/server'
import supabase from '@/config/supaBaseClient';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
//   const next = searchParams.get('next') ?? '/'
  const next = searchParams.get('next') ?? '/profile';
  // const next = searchParams.get('next') ?? '/profile/create';
  // const next = "/profile/create";

  if (code) {
    // const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        console.log('forwardeding to', `${origin}${next}`)
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        console.log('forwardeding to', `https://${forwardedHost}${next}`)
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        console.log('forwardeding to', `${origin}${next}`)
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}