import Link from 'next/link';
import { Button } from './ui/button';
import { Vortex } from './ui/vortex';
import Image from 'next/image';
import Logo from '../public/imgs/logo.png';
export async function Header() {
    return (
        <header className="w-full mx-auto rounded-md  h-[30rem] overflow-hidden">
            <Vortex
                // backgroundColor="black"
                // baseHue={800}
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
            >
                <Link
                    href="/"
                    className="cursor-pointer flex items-center justify-center gap-3 mb-4"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight  ">
                        PartyVote
                    </h1>
                    <Image src={Logo} width={80} height={80} alt="logo" className=" " />
                    {/* <h3 className='text-center'>by ciac.me</h3> */}
                </Link>
                <h2 className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center font-bold ">
                    Vote for your favourite MUSIC 🎵
                </h2>
                {/* <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                    <Button></Button>
                </div> */}
            </Vortex>
        </header>
    );
}
