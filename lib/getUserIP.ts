'use server'
import { headers } from 'next/headers';

export async function getUserIP(){
    
    const header = headers();
    const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
    // console.log(ip);

    const realIp = header.get('x-real-ip');

    // console.log(realIp);

    return ip;
}