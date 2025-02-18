import supabase from '@/config/supaBaseClient';
import { PartyInfoBox } from './PartyInfoBox';
import { THost } from '@/types';
import Link from 'next/link';

interface IPartyInfoBoxContainer {
    userId?: string;
    admin?: boolean;
    collapsed?: boolean; // New prop for collapsed state
}

export async function PartyInfoBoxContainer(props: IPartyInfoBoxContainer) {

    console.log('props', props);
    

    let q = supabase
        .from('hosts')
        .select('*')
        .order('featured', { ascending: false });

    if (props.userId) q = q.eq('creatorId', props.userId || '');

    // Limit the number of results if collapsed
    if (props.collapsed) {
        q = q.limit(11); // Show only 6 parties when collapsed
    }

    let { data: hosts, error } = await q;

    if (error) {
        console.log(error);
        return null;
    }

    if (!hosts || hosts.length === 0) {
        return <div>There are no party hosts</div>;
    }

    return (
        <section>
            <div className="relative">
                <div className="flex justify-center items-center cursor-pointer gap-5 flex-wrap">
                    {hosts.map((host: THost) => (
                        <PartyInfoBox
                            key={host.id}
                            host={host}
                            {...host}
                            admin={props.admin ?? false}
                        />
                    ))}
                </div>

                {/* Fading effect */}
                {props.collapsed && (
                    <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-background to-transparent"></div>
                )}

                
            </div>
            {props.collapsed && (
                <div className="text-center mt-6">
                    <Link
                        href="/parites" // Update the href to the correct route
                        className="text-primary hover:text-primary-dark transition-colors"
                    >
                        See all parties →
                    </Link>
                </div>
            )}
        </section>
    );
}
