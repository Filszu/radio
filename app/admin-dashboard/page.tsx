import React from 'react';

type Props = {};
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAdminCookie } from '@/lib/cookies/adminCookies';
import MusicList from '@/components/MusicList';
import { Music } from 'lucide-react';
import { USong } from '@/database.types';
import { getSongs, getSongsCustom } from '@/lib/getSongs';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getUserIP } from '@/lib/getUserIP';
const Page = async (props: Props) => {
  const isLogged = await getAdminCookie();
  if (!isLogged) redirect('/admin-login');

  const songs: USong[] = await getSongsCustom({
    limit: 100,
    order: 'created_at',
  });

  // page.tsx

  const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  console.log(ip);

  const realIp = header.get('x-real-ip');

  console.log(realIp);

  const ip2 = await getUserIP();

  

  // ...

  return (
    <section className="w-full">
      <h1 className="text-center">Admin Dashboard</h1>

      <p className="text-center mt-2 mb-2">
        You are logged in as Admin 🎯 from ip {ip}
      </p>

      {/* <Music size={64} /> */}
      <MusicList songs={songs} isAdmin={true} />
    </section>
  );
};

export default Page;
