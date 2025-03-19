import EmbeddedCheckoutButton from '@/components/stripe/EmbeddedCheckoutForm';
import { getUser } from '@/lib/auth/getUser';
import { redirect } from 'next/navigation';

export const revalidate = 30;
type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PartiesPage({ searchParams }: Props) {
    // search param check the planId

    const planId = searchParams.planId;

    const user = await getUser();
    

    if (!user) {
        redirect('/login');
    }

    // 7$ per month
    // price_1QtxYZDnH12kMFjFzgfjhv9S

    // 10$ per month
    // price_1QtyUpDnH12kMFjFCyhoilYF
    // trial
    // price_1QtyWBDnH12kMFjFwuiFRdoo

    let toPay = 0;
    let priceId = 'price_1QtyWBDnH12kMFjFwuiFRdoo';
    // production
        priceId = 'price_1QtzznDnH12kMFjFsJYesXT4';
    if (planId === 'premium') {
        priceId = 'price_1QtxYZDnH12kMFjFzgfjhv9S';
        // production
        priceId = 'price_1QtzzrDnH12kMFjFgLBiUo6n';
        toPay = 7;
    } else if (planId === 'pro') {
        priceId = 'price_1QtyUpDnH12kMFjFCyhoilYF';
        // production
        priceId = 'price_1QtzzpDnH12kMFjFoME0atP6';
        
        toPay = 10;
    }

    // if (!planId) {
    //     return (
    //         <div>
    //             <h1>Error: Missing planId</h1>
    //         </div>
    //     );
    // }

    return (
        <>
            <section className="mt-10 text-center min-h-screen ">
                <h2 className="text-3xl font-bold  mb-12 flex items-center justify-center">
                    Checkout
                </h2>
                <h3>Pay ${toPay} per month</h3>
                <EmbeddedCheckoutButton priceId={priceId} userId={user.id} />
            </section>
        </>
    );
}
