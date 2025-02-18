"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// 7$ per month
// price_1QtxYZDnH12kMFjFzgfjhv9S

// 10$ per month
// price_1QtyUpDnH12kMFjFCyhoilYF
// trial
// price_1QtyWBDnH12kMFjFwuiFRdoo

interface EmbeddedCheckoutButtonProps {
  priceId: string;  
  userId: string;
}

export default function EmbeddedCheckoutButton({ priceId, userId }: EmbeddedCheckoutButtonProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("api/payments/embedded-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId: priceId, userId: userId }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, []);

  const options = { fetchClientSecret };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
  };

  return (
    <div id="checkout" className="my-4">
      <Button onClick={handleCheckoutClick}>
        Pay Now
      </Button>

      <Dialog open={showCheckout} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-screen-2xl">
          <DialogHeader>
            <DialogTitle>Embedded Checkout</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {showCheckout && (
              <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}