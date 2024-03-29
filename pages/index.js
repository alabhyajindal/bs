import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import supabase from '@/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [userExists, setUserExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function handler() {
      const user = await getCurrentUser();
      if (user) {
        const [userDetails] = await getUserDetails();
        if (!userDetails?.profile_completed) {
          router.push('/welcome/about');
        } else if (!userDetails?.security_deposit_complete) {
          router.push('/welcome/fee');
        } else if (userDetails?.this_saturday_confirm) {
          router.push('/date/start');
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    handler();
  }, [router]);

  async function getUserDetails() {
    const { data, error } = await supabase.from('users').select();
    return data;
  }

  async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      setUserExists(true);
      return data.session.user;
    }
    return null;
  }

  async function handleYes() {
    const user = await getCurrentUser();
    const { error } = await supabase
      .from('users')
      .update({
        this_saturday_confirm: true,
      })
      .eq('id', user.id);

    router.push('/date/start');
  }

  return (
    <>
      {!isLoading ? (
        <>
          <Head>
            <title>Blind Saturday</title>
          </Head>
          <div className='mt-8 max-w-md'>
            {userExists ? (
              <div className='flex flex-col '>
                <h1 className='text-3xl text-center'>
                  Do you want to go on a date this Saturday?
                </h1>
                <button
                  className='mt-4 text-slate-100 bg-slate-700 px-12 py-4 rounded-md mx-auto'
                  onClick={handleYes}
                >
                  Yes
                </button>
              </div>
            ) : (
              <div className='flex flex-col '>
                <div>
                  <h1 className='text-4xl'>How it works</h1>
                  <ul className='text-lg mt-4'>
                    <li>Sign up!</li>
                    <li>Tell us about yourself</li>
                    <li>Tell us who you are interested in</li>
                    <li>Pay a fully refundable setup fee of ₹500</li>
                    <li>Get a blind date for the upcoming Saturday</li>
                  </ul>
                </div>
                <Link href='/sign-up' className='mx-auto'>
                  <button className='mt-6 text-slate-100 bg-slate-700 px-12 py-4 rounded-md'>
                    Sign up
                  </button>
                </Link>
                <p className='text-center mt-4 text-slate-500'>
                  Already have an account?{' '}
                  <span className='text-slate-700'>
                    <Link href='/sign-in'>Sign in</Link>
                  </span>
                </p>

                <div>
                  <h1 className='text-4xl mt-8'>Got 3 minutes? Curious?</h1>
                  <video width='100%' controls className='mt-4 mb-8'>
                    <source src='/walkthrough.mp4' type='video/mp4' />
                  </video>
                </div>
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
