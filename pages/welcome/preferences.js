import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import supabase from '@/supabase';
import { useRouter } from 'next/router';

export default function Preferences() {
  const router = useRouter();

  const [ageRange, setAgeRange] = useState('');
  const [gender, setGender] = useState('');
  const [sexualOrientation, setSexualOrientation] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  async function getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
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
      })
      .eq('id', user.id);

    router.push('/');
  }

  return (
    <main className={styles.main}>
      <h1>Tell us who you are interested in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age Range:
          <input
            type='text'
            value={ageRange}
            onChange={(event) => setAgeRange(event.target.value)}
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
    </main>
  );
}
