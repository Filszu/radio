import React from 'react';

import leadloomAd from '../../public/ads/imgs/leadloom_ad.png';
import leadloomAd1 from '../../public/ads/imgs/leadloom_ad1.png';
import temu1 from '../../public/ads/imgs/temu1.png';
import temu2 from '../../public/ads/imgs/temu2.png';
import wot from '../../public/ads/imgs/wotS.png';
import wow from '../../public/ads/imgs/wow1.jpg';
import AdUnit from './AdUnit';
import { IAdUnit } from '@/types';

const ads: IAdUnit[] = [
    {
        image: leadloomAd,
        url: 'https://bit.ly/radioLeadLoom',
        name: 'Leadloom ad',
    },
    {
        image: leadloomAd1,
        url: 'https://bit.ly/radioLeadLoom',
        name: 'Leadloom ad 1',
    },
    // {
    //     image: temu1,
    //     url: 'https://bit.ly/radioTemu1',
    //     name: 'Temu1 ad',
    // },

    {
        image: wot,
        url: 'https://bit.ly/radioWoT',
        name: 'Wot ad',
    },
    {
        image: "http://image.ceneostatic.pl/data/products/145205850/p-hama-mini-usb-c-pd-qc-3-0-18-65w-biala-201643.jpg",
        url: 'https://www.ceneo.pl/145205850?pid=28571&crid=703709&cid=48366&fid=223',
        name: 'Hama Mini USB-C PD/QC 3.0 18-65W biała (201643)',
    },
    {
        image: wow,
        url: 'https://bit.ly/radioWoT',
        name: 'Wow ad',
    },
    // {
    //     image: temu2,
    //     url: 'https://bit.ly/radioTemu2',
    //     name: 'Temu2 ad',
    // },
];

const AdBox = () => {
    //shufle ads
    const showAds = (ads.sort(() => Math.random() - 0.5)).slice(0, 4);
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
