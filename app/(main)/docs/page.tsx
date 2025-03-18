import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <section>
            <h2>usefull links</h2>
            <Link href="/docs/privacy-policy">privacy policy</Link>
            <hr />
            <Link href="/docs/terms-of-service">terms of service</Link>
        </section>
    );
};

export default page;
