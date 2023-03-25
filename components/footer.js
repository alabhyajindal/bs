import supabase from '@/supabase';
import { useRouter } from 'next/router';

export default function Footer({ userExists }) {
  const router = useRouter();

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      router.push('/');
    }
  }

  return (
    <footer className='flex gap-6 text-slate-500 mt-auto mb-4'>
      {userExists ? (
        <>
          <p className='cursor-pointer' onClick={handleSignout}>
            Sign out
          </p>
          <p>Edit profile</p>
        </>
      ) : (
        <a href='mailto:alabhya@blindsaturday.com'>Support</a>
      )}
    </footer>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.auth.getSession();
  if (data?.session?.user) {
    return { props: { userExists: true } };
  }
  return { props: { userExists: false } };
}
