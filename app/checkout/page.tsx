import EmbeddedCheckoutButton from "@/components/stripe/EmbeddedCheckoutForm";


export const revalidate = 30;
type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PartiesPage({ searchParams }: Props) {
    return (
        <>
           
            <section className="mt-10">
                <h1 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
                    Checkout
                </h1>
                <EmbeddedCheckoutButton />
            </section>

        </>
    );
}
