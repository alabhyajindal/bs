import Footer from './footer';
import Navbar from './navbar';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col items-center min-h-screen bg-fuchsia-200'>
      <Navbar />
      <main className='text-slate-700 flex flex-col items-center justify-center'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
