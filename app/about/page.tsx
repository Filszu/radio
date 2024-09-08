import Link from 'next/link';
// export const dynamic = "force-dynamic"
import Image from 'next/image';
import LeadLoomGirl from '@/public/imgs/avatars/leadloom_girl.png';

import { Button } from '@/components/ui/button';
export default async function Home() {
    return (
        <section className="w-full min-h-screen">
            <section className="center flex min-h-screen w-full  flex-col items-center justify-center ">
                <div
                    className="flex w-full flex-col items-center justify-center 
                "
                    // md:w-8/12 lg:w-2/12
                >
                    <Image
                        src={LeadLoomGirl}
                        alt="LeadLoom Girl Avatar"
                        width={500}
                        // height={500}

                        // className="w-full"
                        // style={{
                        //     objectFit: 'cover', // cover, contain, none
                        //   }}
                    />

                    <div className="bold relative bottom-10 text-center text-4xl font-extrabold tracking-tighter drop-shadow-lg md:bottom-20 md:text-8xl ">
                        LEADLOOM
                        <h1 className="text-xl font-bold tracking-normal md:text-2xl">
                            Earn amazing rewards by playing games
                        </h1>
                    </div>
                    <Link href="/dashboard" className="animate-bounce">
                        <Button className="p-6 ">
                            <span className="flex items-center justify-center gap-1 text-lg uppercase text-white">
                                begin the journey
                            </span>
                        </Button>
                    </Link>

                    <div className="h-10"></div>
                    <section>
                        <h2 className="text-2xl font-bold tracking-normal md:text-2xl">
                            About
                        </h2>
                        <div className="prose lg:prose-lg">
                            <h3 className="mb-4 underline">
                                Accurately represents your app's identity:
                            </h3>
                            <p>
                                The LeadLoom.games App is where you can play
                                various games and earn rewards. The app is
                                social and educational. Play games, earn
                                rewards, and invite friends and with them
                                together to earn even more prizes.
                            </p>

                            <h3 className="mb-4 mt-8 underline">
                                What will this app do with user data?
                            </h3>
                            <p>
                                The only user data received is: name, email and
                                profile picture. These will be saved and
                                re-displayed to the user. The email will be used
                                to identify the user. The name and profile
                                picture will be used as the name and profile
                                picture of your account on LeadLoom.games App.
                            </p>

                            <h3 className="mb-4 mt-8 underline">
                                How does this app enhance user functionality?
                            </h3>
                            <p>
                                This app contains video lectures of your school
                                syllabus. You can see your progress and also
                                your friend's progress and also chat with them.
                            </p>

                            <h3 className="mb-4 mt-8 underline">
                                Link to Privacy Policy:{' '}
                                <Link href="https://www.leadloom.games/about/privacy-policy">
                                https://www.leadloom.games/about/privacy-policy
                                </Link>
                            </h3>
                          
                            <h3 className="mb-4 mt-8 underline">
                                Describe the content, context, or connection to
                                the app:
                            </h3>
                            <p>
                                The LeadLoom.games App where you can play various games. We gathered the best games for you to play. Only selected games are available on the app. 
                            </p>

                            <h3 className="mb-4 mt-8 underline">
                                Google OAuth2 Limited Use Disclosure
                            </h3>
                            <p>
                                This app doesn't request restricted scopes, but
                                if it did, the LeadLoom.games App's use of
                                information received from Google APIs will
                                adhere to the Google API Services User Data
                                Policy, including the Limited Use requirements.
                            </p>

                            <h3 className="mb-4 mt-8 underline">Copyright</h3>
                            <p>
                                If you have a copyright complaint, please tell
                                me and include the LeadLoom.games App page that
                                contains the alleged content, identification of
                                the work claimed to have been infringed
                                including the name and reply email address of
                                the copyright holder/representative, an
                                assertion that the use of the material is not
                                authorized and an assertion that you are the
                                copyright holder/representative.
                            </p>

                            <p>Lets Connect|</p>
                        </div>
                    </section>

                    <Link href="/dashboard/faq" className="mt-4 underline">
                        Learn more
                    </Link>
                </div>
            </section>
            <div className="h-80"></div>
         
        </section>
    );
}
