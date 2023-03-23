import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import supabase from '@/supabase';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignout() {
    const signUpPromise = new Promise(async (resolve, reject) => {
      try {
        let { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });

    toast.promise(signUpPromise, {
      loading: 'Creating your account',
      success: 'Check your mail',
      error: 'Please try again later',
    });
  }

  return (
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
  );
}
