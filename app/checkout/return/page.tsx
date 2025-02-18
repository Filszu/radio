import { stripe } from "@/utils/stripe/stripe";

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId!);
  return session;
}

interface SearchParams {
  session_id: string;
}

export default async function CheckoutReturn({ searchParams }: { searchParams: SearchParams }) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  console.log(session);

  if (session?.status === "open") {
    return <p>Payment did not work.</p>;
  }

  if (session?.status === "complete") {
    return (
      <h3>
        We appreciate your business! Your Stripe customer ID is:
        {(session.customer as string)}.
      </h3>
    );
  }

  return null;
}