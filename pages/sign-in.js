import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import supabase from '@/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  // async function getCurrentUser() {
  //   const { data, error } = await supabase.auth.getSession();
  //   if (data.session) setUser(data.session.user.id);
  // }

  async function getUserDetails() {
    const { data, error } = await supabase.from('users').select();
    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const [userDetails] = await getUserDetails();
    if (userDetails.onboarding_completed) {
      router.push('/');
    } else {
      router.push('/welcome/about');
    }
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className='mt-8'>
        <h2 className='text-2xl'>Sign in</h2>
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
          onSubmit={handleSubmit}
          className='mt-4  text-slate-100 bg-slate-700 px-12 py-4 rounded-md'
        >
          Submit
        </button>

        <p className='mt-12'>
          Don&apos;t have an account? <Link href='/sign-up'>Sign up</Link>
        </p>
      </div>
    </>
  );
}
