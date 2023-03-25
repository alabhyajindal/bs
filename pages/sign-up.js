import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import supabase from '@/supabase';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function handleSignout() {
    const signUpPromise = new Promise(async (resolve, reject) => {
      try {
        let { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (!error) {
          resolve(data);
        } else {
          throw new Error(error);
        }
      } catch (err) {
        reject(err);
      }
    });

    toast.promise(
      signUpPromise,
      {
        loading: 'Creating your account',
        success: 'Check your mail',
        error: 'Please try again later',
      },
      { duration: 3000 }
    );
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

  return (
    <>
      {!isLoading ? (
        <>
          <Head>
            <title>Sign up | Blind Saturday</title>
          </Head>
          <div className='mt-8 flex flex-col items-center'>
            <h2 className='text-3xl'>Sign up</h2>
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
              onClick={handleSignout}
              className='mt-6  text-slate-100 bg-slate-700 px-12 py-4 rounded-md'
            >
              Sign up
            </button>

            <p className='mt-12 text-slate-500'>
              Already have an account?{' '}
              <span className='text-slate-700'>
                <Link href='/sign-in'>Sign in</Link>
              </span>
            </p>
          </div>
        </>
      ) : null}
    </>
  );
}
