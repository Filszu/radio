import React from 'react';
import AdBanner from './ASBox';

{
    /* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6202644433627847"
     crossorigin="anonymous"></script>
<!-- partyvote1 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6202644433627847"
     data-ad-slot="4062933975"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */
}
const AS_vBanner = () => {
    return (
        <aside className="flex w-full min-h-[180px] justify-center">
            AS_vBanner
            <br />
            <AdBanner
                dataAdSlot="4062933975"
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
            />
            s
        </aside>
    );
};

export default AS_vBanner;
