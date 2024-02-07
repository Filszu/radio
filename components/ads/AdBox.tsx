import React from 'react';

import leadloomAd from '../../public/ads/imgs/leadloom_ad.png';
import temu1 from '../../public/ads/imgs/temu1.png';
import temu2 from '../../public/ads/imgs/temu2.png';
import wot from '../../public/ads/imgs/wotS.png';
import AdUnit from './AdUnit';
import { IAdUnit } from '@/types';

const ads: IAdUnit[] = [
    {
        image: leadloomAd,
        url: 'https://bit.ly/radioLeadLoom',
        name: 'Leadloom ad',
    },
    {
        image: temu1,
        url: 'https://bit.ly/radioTemu1',
        name: 'Temu1 ad',
    },

    {
        image: wot,
        url: 'https://bit.ly/radioWoT',
        name: 'Wot ad',
    },
    {
        image: temu2,
        url: 'https://bit.ly/radioTemu2',
        name: 'Temu2 ad',
    },
];

const AdBox = () => {
    //shufle ads
    const showAds = ads.sort(() => Math.random() - 0.5);
    return (
        <section>
            <div className="flex justify-center gap-10 items-center p-10 flex-wrap ">
                {showAds.map((ad, index) => {
                    return <AdUnit key={index} {...ad} />;
                })}
                {/* <AdUnit key={0} {...showAds[0]} />
                <AdUnit key={1} {...showAds[1]} />
                <span className="hidden md:block">
                    
                </span>
                <AdUnit key={2} {...showAds[2]} />
                <AdUnit key={3} {...showAds[3]} /> */}
            </div>
        </section>
    );
};

export default AdBox;
