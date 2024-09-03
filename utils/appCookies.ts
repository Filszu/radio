'use server';

import { Cookie } from '@/types';
import { cookies } from 'next/headers'

export default async function createCookie({ name, value }: Cookie) {
   
    const expires = 24 * 60 * 60 * 1000 * 10; // 10 days
    cookies().set(name!, value!, { expires: Date.now() + expires });
    // cookies().set('name', 'lee');
}

// get cookie
export async function getCookie(name: string): Promise<string | null> {
    const cookie = cookies().get(name);
    return cookie ? cookie.value : null;
}
