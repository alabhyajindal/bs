import { useState } from 'react';
import supabase from '@/supabase';
import { useRouter } from 'next/router';

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

  async function handleSubmit(e) {
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
    <div>
      <h1>Tell us about yourself</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type='text'
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type='number'
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </label>
        <br />
        <label>
          Gender:
          <input
            type='text'
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </label>
        <br />
        <label>
          Sexual Orientation:
          <input
            type='text'
            value={sexualOrientation}
            onChange={(event) => setSexualOrientation(event.target.value)}
          />
        </label>
        <br />
        <label>
          Neighborhood:
          <input
            type='text'
            value={neighborhood}
            onChange={(event) => setNeighborhood(event.target.value)}
          />
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}
