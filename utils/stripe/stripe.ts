// import { Stripe } from "@stripe/stripe-js";
// import { loadStripe, Stripe } from "@stripe/stripe-js";

// export const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);