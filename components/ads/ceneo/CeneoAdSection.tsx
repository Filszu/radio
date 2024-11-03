import React from 'react';
import { CeneoBox } from './CeneoBox';

const CeneoAdsSection = () => {
    const ceneoData = [
        // {
        //     id: '703701',
        //     channelId: '48366',
        //     partnerId: '28571',
        //     graphicId: '6685',
        //     newTab: true,
        // },
        // {
        //     id: '703704',
        //     channelId: '48366',
        //     partnerId: '28571',
        //     graphicId: '6751',
        //     newTab: true,
        // },
        // {
        //     id: '704466',
        //     channelId: '48366',
        //     partnerId: '28571',
        //     graphicId: '6785',
        //     newTab: true,
        // },
        {
            id: '706207',
            channelId: '48366',
            partnerId: '28571',
            graphicId: '6845',
            newTab: true,
        },
        
    ];

    const displayCeneoAdsInOrder = ceneoData.sort(() => Math.random() - 0.5);
    return (
        <section className="my-5 flex gap-10 flex-wrap-reverse items-center w-full justify-center">
            {/* <CeneoBox
                id="703701"
                channelId="48366"
                partnerId="28571"
                graphicId="6685"
                newTab={true}
            />
            <CeneoBox
                id="703704"
                channelId="48366"
                partnerId="28571"
                graphicId="6751"
                newTab={true}
            />
            <CeneoBox
                id="704466"
                channelId="48366"
                partnerId="28571"
                graphicId="6785"
                newTab={true}
            /> */}

            {displayCeneoAdsInOrder.map((data, index) => (
                <CeneoBox
                    key={index}
                    id={data.id}
                    channelId={data.channelId}
                    partnerId={data.partnerId}
                    graphicId={data.graphicId}
                    newTab={data.newTab}
                />
            ))}
        </section>
    );
};

export default CeneoAdsSection;
