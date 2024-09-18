'use client'
import { useEffect } from 'react';

export const CeneoAffContainer = () => {
  useEffect(() => {
    const stamp = parseInt((new Date().getTime() / 86400).toString(), 10);
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', `//partnerzyapi.ceneo.pl/External/dc.js?id=703701&channelId=48366&partnerId=28571&graphicId=6685&newTab=false&${stamp}`);
    script.setAttribute('charset', 'utf-8');
    document.head.appendChild(script);
  }, []);

  return <div id="ceneoaffcontainer703701"></div>;
};

export default CeneoAffContainer;
