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
        }
      }
      setIsLoading(false);
    }
    handler();
  }, [router]);

  const nextSaturdayDate = useCallback(() => {
    let today = new Date();
    let dayOfWeek = today.getDay();
    let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    let nextSaturday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysUntilSaturday
    );
    const options = {
      weekday: undefined,
      year: undefined,
      month: 'long',
      day: 'numeric',
    };
    return nextSaturday.toLocaleDateString('default', options);
  }, [])();

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

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    setUserExists(false);
  }

  return (
    <>
      <Head>
        <title>Blind Saturday</title>
      </Head>
      {!isLoading ? (
        <>
          <div className='mt-8'>
            <h1 className='text-2xl'>
              Do you want to go on a date this Saturday?
            </h1>
            <div className='mt-2 underline'>
              {userExists ? (
                'Yes'
              ) : (
                <Link href='/sign-in'>Sign in to get started</Link>
              )}
              {userExists ? <p onClick={handleSubmit}>Sign out</p> : null}
            </div>
          </div>
          <div className='mt-4'>
            {userExists
              ? `Please keep your calendar free from 5pm to 10pm this Saturday,{' '}
              ${nextSaturdayDate}. We will select a time and place for your date
              based on you and your date&apos;s preferences.`
              : null}
          </div>
        </>
      ) : null}
    </>
  );
}
