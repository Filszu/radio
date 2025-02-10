import React from 'react';
import Link from 'next/link';

const LinksComponent = () => {
  return (
    <section className='max-h-12 overflow-clip text-xs text-transparent opacity-0'>
      <h3>
        <Link href="https://www.leadloom.games/?promocode=ww2">
          LeadLoom Games - Earn Money by playing games. Discover exciting games and use promo code WW2 for $5 BONUS! - leadloom.games
        </Link>
      </h3>
      <p className="">
        <Link href="https://www.leadloom.games/?promocode=ww2">
          Play Games and Earn Money with LeadLoom - Get $5 BONUS using promo code WW2! - leadloom.games
        </Link>
      </p>

      <h3>
        <Link href="https://ciac.me/">
          Creative Tools & Resources - Explore a collection of creative tools and resources for developers, designers, and creators - ciac.me
        </Link>
      </h3>
      <p>
        <Link href="https://ciac.me/">
          Discover Developer and Designer Resources at Creative Tools & Resources - ciac.me
        </Link>
      </p>

      <h3>
        <Link href="https://lessons.ciac.me/">
          Learn New Skills - Learn new skills with free and premium lessons on coding, design, and more. - lessons.ciac.me
        </Link>
      </h3>
      <p>
        <Link href="https://lessons.ciac.me/">
          Master Coding and Design with Free and Premium Lessons at Learn New Skills - lessons.ciac.me
        </Link>
      </p>

      <h3>
        <Link href="https://www.bunkier.zgora.pl/">
          Półkolonie dla dzieci w Zielonej Górze - Oferujemy półkolonie pełne atrakcji dla dzieci w Zielonej Górze. bunkier.zgora.pl
        </Link>
      </h3>
      <p>
        <Link href="https://www.bunkier.zgora.pl/">
          Fun-Filled Summer Camps for Kids in Zielona Góra - Półkolonie dla dzieci bunkier.zgora.pl
        </Link>
      </p>
    </section>
  );
};

export default LinksComponent;
