'use client';
import Script from 'next/script';
import { useEffect } from 'react';

// export const CeneoAffContainer = () => {
//   useEffect(() => {
//     const stamp = parseInt((new Date().getTime() / 86400).toString(), 10);
//     const script = document.createElement('script');
//     script.setAttribute('type', 'text/javascript');
//     script.setAttribute('src', `//partnerzyapi.ceneo.pl/External/dc.js?id=703701&channelId=48366&partnerId=28571&graphicId=6685&newTab=false&${stamp}`);
//     script.setAttribute('charset', 'utf-8');
//     document.head.appendChild(script);
//   }, []);

//   return <div id="ceneoaffcontainer703701"></div>;
// };

export interface CeneoBoxProps {
    id: string;
    channelId: string;
    partnerId: string;
    graphicId: string;
    newTab?: boolean;
  }

  export function CeneoBox({
    id,
    channelId,
    partnerId,
    graphicId,
    newTab = false,
  }: CeneoBoxProps) {
    const stamp = parseInt((new Date().getTime() / 86400).toString(), 10);
    const scriptSrc = `//partnerzyapi.ceneo.pl/External/dc.js?id=${id}&channelId=${channelId}&partnerId=${partnerId}&graphicId=${graphicId}&newTab=${newTab}&${stamp}`;
  
    return (
      <div>
        <div id={`ceneoaffcontainer${id}`}></div>
        <Script
          src={scriptSrc}
          strategy="afterInteractive"
          type="text/javascript"
          onLoad={() => {
            // console.log('ceneo Script loaded successfully');
          }}
          onError={(e) => {
            console.error(' ceneo Script failed to load', e);
          }}
        />
      </div>
    );
  }

  
// export function CeneoBox() {
//     const stamp = parseInt((new Date().getTime() / 86400).toString(), 10);
//     const scriptSrc = `//partnerzyapi.ceneo.pl/External/dc.js?id=703701&channelId=48366&partnerId=28571&graphicId=6685&newTab=false&${stamp}`;

//     return (
//         <div>
//             <div id="ceneoaffcontainer703701"></div>
//             <Script
//                 src={scriptSrc}
//                 strategy="afterInteractive"
//                 type="text/javascript"
//                 //   charset="utf-8"
//                 onLoad={() => {
//                     console.log('Script loaded successfully');
//                 }}
//                 onError={(e) => {
//                     console.error('Script failed to load', e);
//                 }}
//             />
//         </div>
//     );
// }
