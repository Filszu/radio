import EmbeddedCheckoutButton from "@/components/stripe/EmbeddedCheckoutForm";


export const revalidate = 30;
type Props = {
    searchParams: { [key: string]: string | string[] | undefined };

};

export default async function PartiesPage({ searchParams }: Props) {
    // search param check the planId
   
    const planId = searchParams.planId;

    // 7$ per month
// price_1QtxYZDnH12kMFjFzgfjhv9S

// 10$ per month
// price_1QtyUpDnH12kMFjFCyhoilYF
// trial
// price_1QtyWBDnH12kMFjFwuiFRdoo

    let toPay = 0;
    let priceId = "price_1QtyWBDnH12kMFjFwuiFRdoo"
    if(planId==="premium"){
        priceId = "price_1QtxYZDnH12kMFjFzgfjhv9S"
        toPay = 7;

    }
    else if(planId==="pro"){
        priceId = "price_1QtyUpDnH12kMFjFCyhoilYF"
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
           
            <section className="mt-10 text-center">
                <h2 className="text-3xl font-bold  mb-12 flex items-center justify-center">
                    Checkout 

                </h2>
                <h3>
                    Pay ${toPay} per month
                </h3>
                {/* <EmbeddedCheckoutButton priceId={priceId}/> */}
            </section>

        </>
    );
}
