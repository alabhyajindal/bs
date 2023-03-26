import { useState } from 'react';
import supabase from '@/supabase';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Preferences() {
  const router = useRouter();

  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const [sexualOrientation, setSexualOrientation] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');

  async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    return data.session.user;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await getCurrentUser();
    const { error } = await supabase
      .from('users')
      .update({
        prefers_age_range: ageRange,
        prefers_gender: gender,
        prefers_sexual_orientation: sexualOrientation,
        prefers_neighborhood: neighborhood,
        prefers_city: city,
        profile_completed: true,
      })
      .eq('id', user.id);

    router.push('/welcome/security');
  }

  return (
    <>
      <Head>
        <title>Welcome | Blind Saturday</title>
      </Head>
      <div className='mt-4 flex flex-col items-center'>
        <h1 className='text-3xl'>Tell us who you are interested in</h1>
        <input
          type='text'
          className='mt-4 border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
          placeholder='Age Range'
          value={ageRange}
          onChange={(event) => setAgeRange(event.target.value)}
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
        <input
          type='text'
          className='mt-2 border-4 border-slate-200 w-64 rounded-sm px-6 py-2 outline-none focus:border-slate-300'
          placeholder='City'
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button
          onClick={handleSubmit}
          className='mt-6 text-slate-100 bg-slate-700 px-12 py-4 rounded-md mx-auto'
        >
          Submit
        </button>
      </div>
    </>
  );
}
