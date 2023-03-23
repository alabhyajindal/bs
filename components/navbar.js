import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href='/'>
        <h1 className='text-7xl text-slate-800'>blind saturday</h1>
      </Link>
    </nav>
  );
}
