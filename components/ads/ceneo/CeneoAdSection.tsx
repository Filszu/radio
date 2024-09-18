import React from 'react';
import { CeneoBox } from './CeneoBox';

const CeneoAdsSection = () => {
    return (
        <section className="flex gap-10">
            <CeneoBox
                id="703701"
                channelId="48366"
                partnerId="28571"
                graphicId="6685"
                newTab={false}
            />
            <CeneoBox
                id="703704"
                channelId="48366"
                partnerId="28571"
                graphicId="6751"
                newTab={false}
            />
            <CeneoBox
                id="704466"
                channelId="48366"
                partnerId="28571"
                graphicId="6785"
                newTab={false}
            />
        </section>
    );
};

export default CeneoAdsSection;
