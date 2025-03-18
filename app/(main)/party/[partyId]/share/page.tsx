import { SharePartyCompact } from "@/components/ui/custom/SharePartyCompact";
import { Share } from "next/font/google";

type Props = {
    params: { partyId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const SharePage = async ({ params, searchParams }: Props) => {
    const partyId = params.partyId;

    return (
        <>
            <SharePartyCompact partyUrlShort={partyId} />
        </>
    );
};

export default SharePage;
