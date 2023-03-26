import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import { useEffect } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function Fee() {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Setup Fee || Blind Saturday</title>
      </Head>
      <form action='/api/checkout_sessions' method='POST'>
        <p className='mt-4'>
          To finish setting up your account, just pay ₹500.
        </p>
        <p className='mt-4'>
          It&apos;s a one-time fully-refundable fee. If you end up missing a
          date, we&apos;ll transfer the amount to your date and put your account
          on hold.
        </p>
        <p className='mt-4'>
          To get this amount back, simply close your account via the Edit
          profile option in the footer.
        </p>

        <button
          className='mt-6 text-slate-100 bg-slate-700 px-12 py-4 rounded-md mx-auto'
          type='submit'
          role='link'
        >
          Pay setup fee
        </button>
      </form>
    </>
  );
}
