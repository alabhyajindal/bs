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
        if (!userDetails?.onboarding_completed) {
          router.push('/welcome/about');
        } else if (userDetails?.this_saturday_confirm) {
          router.push('/date/start');
        }
      }
      setIsLoading(false);
    }
    handler();
  }, [router]);

  // const nextSaturdayDate = useCallback(() => {
  //   let today = new Date();
  //   let dayOfWeek = today.getDay();
  //   let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
  //   let nextSaturday = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() + daysUntilSaturday
  //   );
  //   const options = {
  //     weekday: undefined,
  //     year: undefined,
  //     month: 'long',
  //     day: 'numeric',
  //   };
  //   return nextSaturday.toLocaleDateString('default', options);
  // }, [])();

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
      <Head>
        <title>Blind Saturday</title>
      </Head>
      {!isLoading ? (
        <div className='mt-8 max-w-md'>
          {userExists ? (
            <div className='flex flex-col '>
              <h1 className='text-2xl text-center'>
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
              <h1 className='text-2xl'>Go on a blind date this Saturday</h1>
              <Link href='/sign-up' className='mx-auto'>
                <button className='mt-4 text-slate-100 bg-slate-700 px-12 py-4 rounded-md'>
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
