import supabase from '@/config/supaBaseClient';
import { PartyInfoBox } from './PartyInfoBox';
import { THost } from '@/types';

interface IPartyInfoBoxContainer {
    userId?: string;
    admin?: boolean;
}
export async function PartyInfoBoxContainer(props: IPartyInfoBoxContainer) {

  let q = supabase
  .from('hosts')
  .select('*')

  if(props.userId) q = q.eq('creatorId', props.userId || '');


    let { data: hosts, error } = await q;

    if (error) {
        console.log(error);
        return null;
    }

    // console.log(hosts);
    if (!hosts) {
        return <div>There are no party hosts</div>;
    }

    return (
        <div className="flex justify-center items-center cursor-pointer gap-5 flex-wrap">
            {hosts.map((host: THost) => (
                <PartyInfoBox key={host.id} host={host}{...host} admin={props.admin??false}/>
            ))}
        </div>
    );
}
