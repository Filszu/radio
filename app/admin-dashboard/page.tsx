import React from 'react';

type Props = {};
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAdminCookie } from '@/lib/cookies/adminCookies';
import MusicList from '@/components/MusicList';
import { Music } from 'lucide-react';
import { USong } from '@/database.types';
import { getPartySongs, getSongs, getSongsCustom } from '@/lib/getSongs';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getUserIP } from '@/lib/getUserIP';
import { getUserIP_api } from '@/lib/getUserIP3party';
import { IPartySong } from '@/types';
import PartyMessageForm from './partyMessageForm';
const Page = async (props: Props) => {
  const isLogged = await getAdminCookie();
  if (!isLogged) redirect('/admin-login');

  // const songs: USong[] = await getSongsCustom({
  //   limit: 100,
  //   order: 'created_at',
  // });

  
  
  const songs: IPartySong[] = await getPartySongs({
    staringIndex: 0,
    limit: 100,
    order: 'created_at',
    status: ["active","banned"],
   
});


  // page.tsx

  const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  console.log(ip);

  const realIp = header.get('x-real-ip');

  console.log(realIp);

  const ip3 = (header.get('cf-connecting-ip ') ?? '127.0.0.1').split(',')[0];
  console.log(ip3);

  const ipApi = await getUserIP_api();

  console.log(ipApi);

  // ...

  return (
    <section className="w-full">
      <h1 className="text-center">Admin Dashboard</h1>

      <p className="text-center mt-2 mb-2">
        You are logged in as Admin 🎯 from ip {ip}
        <br />
        {realIp}
        ip3:
        {ip3}
        <br />
        Api IP:
        {ipApi}
      </p>

      <PartyMessageForm />
      <MusicList songs={songs} isAdmin={true} />
    </section>
  );
};

export default Page;
