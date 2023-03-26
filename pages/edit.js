import supabase from '@/supabase';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Edit() {
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function handler() {
      const [userDetails] = await getUserDetails();
      if (userDetails?.account_cancelled) {
        setCancelled(true);
      }
    }

    handler();
  }, []);

  async function getUserDetails() {
    const { data, error } = await supabase.from('users').select();
    return data;
  }

  async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    return data.session.user;
  }

  async function cancelAccount() {
    const user = await getCurrentUser();
    const { error } = await supabase
      .from('users')
      .update({
        account_cancelled: true,
      })
      .eq('id', user.id);

    if (!error) {
      setCancelled(true);
    }
  }

  return (
    <>
      <Head>
        <title>Edit Profile | Blind Saturday</title>
      </Head>
      {cancelled ? (
        <>
          <p className='mt-4 text-lg'>
            Your account will be closed within 48 hours of receiving your
            request to cancel, and if you had paid the setup fee, it will be
            refunded within the same timeframe.
          </p>
        </>
      ) : (
        <p className='mt-4 cursor-pointer text-lg' onClick={cancelAccount}>
          Cancel my account
        </p>
      )}
    </>
  );
}
