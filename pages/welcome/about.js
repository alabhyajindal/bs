import { useState } from 'react';
import supabase from '@/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function About() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [sexualOrientation, setSexualOrientation] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    return data.session.user;
  }

  async function handleNext(e) {
    e.preventDefault();
    const user = await getCurrentUser();
    const { error } = await supabase.from('users').upsert({
      id: user.id,
      full_name: fullName,
      age: Number(age),
      gender,
      sexual_orientation: sexualOrientation,
      neighborhood,
    });

    router.push('/welcome/preferences');
  }

  return (
    <>
      <Head>
        <title>Welcome | Blind Saturday</title>
      </Head>
      <div className='mt-4 flex flex-col items-center'>
        <h1 className='text-3xl'>Tell us about yourself</h1>
        <input
          type='text'
          className='mt-4 border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
          placeholder='Full Name'
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        <input
          type='number'
          className='mt-2 border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
          placeholder='Age'
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          type='text'
          className='mt-2 border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
          placeholder='Gender'
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        />
        <input
          type='text'
          className='mt-2 border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
          placeholder='Sexual Orientation'
          value={sexualOrientation}
          onChange={(event) => setSexualOrientation(event.target.value)}
        />
        <input
          type='text'
          className='mt-2 border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
          placeholder='Neighborhood'
          value={neighborhood}
          onChange={(event) => setNeighborhood(event.target.value)}
        />

        <button
          onClick={handleNext}
          className='mt-6 text-slate-100 bg-slate-700 px-12 py-4 rounded-md mx-auto'
        >
          Next
        </button>
      </div>
    </>
  );
}
