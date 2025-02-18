import { stripe } from "@/utils/stripe/stripe";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getSession(sessionId: string) {
  return await stripe.checkout.sessions.retrieve(sessionId);
}

interface SearchParams {
  session_id: string;
}

export default async function CheckoutReturn({ searchParams }: { searchParams: SearchParams }) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  const renderCard = (title: string, description: string, customerId?: string) => (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {customerId && (
            <p className="text-sm text-gray-600">
              Your Stripe customer ID is: <span className="font-medium">{customerId}</span>
            </p>
          )}
          <Button asChild className={customerId ? "mt-4" : ""}>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  if (!session) {
    return renderCard("Payment Error", "There was an issue processing your payment.");
  }

  switch (session.status) {
    case "open":
      return renderCard("Payment Incomplete", "Your payment was not completed. Please try again.");
    case "complete":
      return renderCard("Payment Successful", "Thank you for your purchase!", session.customer as string);
    case "expired":
      return renderCard("Payment Expired", "Your payment session has expired. Please try again.");
    default:
      return null;
  }
}