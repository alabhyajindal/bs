import Footer from './footer';
import Navbar from './navbar';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col items-center'>
      <Navbar />
      <main className='text-slate-700'>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}