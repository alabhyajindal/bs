import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import supabase from '@/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  async function getUserDetails() {
    const { data, error } = await supabase.from('users').select();
    return data;
  }

  async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      return data.session.user;
    }
    return null;
  }

  useEffect(() => {
    async function handler() {
      const user = await getCurrentUser();
      if (user) {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }
    handler();
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const [userDetails] = await getUserDetails();
    if (userDetails?.profile_completed) {
      router.push('/');
    } else {
      router.push('/welcome/about');
    }
  }

  async function handleSignin() {
    const signInPromise = new Promise(async (resolve, reject) => {
      try {
        let { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error) {
          const [userDetails] = await getUserDetails();
          resolve(data);
          if (userDetails?.profile_completed) {
            router.push('/');
          } else {
            router.push('/welcome/about');
          }
        } else {
          throw new Error(error);
        }
      } catch (err) {
        reject(err);
      }
    });

    toast.promise(signInPromise, {
      loading: 'Signing in',
      success: 'Signed in',
      error: 'Error',
    });
  }

  return (
    <>
      {!isLoading ? (
        <>
          <Head>
            <title>Sign in | Blind Saturday</title>
          </Head>
          <div className='mt-8 flex flex-col items-center'>
            <h2 className='text-3xl'>Sign in</h2>
            <form className='mt-4 flex flex-col justify-center'>
              <input
                className='border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
                type='email'
                value={email}
                placeholder='Email'
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className='mt-2 border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
                type='password'
                value={password}
                placeholder='Password'
                onChange={(event) => setPassword(event.target.value)}
              />
            </form>
            <button
              onClick={handleSignin}
              className='mt-6 text-slate-100 bg-slate-700 px-12 py-4 rounded-md'
            >
              Sign in
            </button>

            <p className='mt-12 text-slate-500'>
              Don&apos;t have an account?{' '}
              <span className='text-slate-700'>
                <Link href='/sign-up'>Sign up</Link>
              </span>
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}
