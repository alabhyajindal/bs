import supabase from '@/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Footer() {
  const router = useRouter();

  const [userExists, setUserExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function handler() {
      await getCurrentUser();
      setIsLoading(false);
    }
    handler();
  }, [router, userExists]);

  async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      setUserExists(true);
      return data.session.user;
    }
    return null;
  }

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    setUserExists(false);
    router.push('/');
  }

  return (
    <footer className='flex gap-6 text-slate-500 mt-auto mb-4'>
      {!isLoading ? (
        <>
          {userExists ? (
            <>
              <p className='cursor-pointer' onClick={handleSignout}>
                Sign out
              </p>
              <Link href='/edit'>
                <p>Edit profile</p>
              </Link>
            </>
          ) : (
            <a href='mailto:alabhya@blindsaturday.com'>Support</a>
          )}
        </>
      ) : null}
    </footer>
  );
}
