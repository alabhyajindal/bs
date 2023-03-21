import Layout from '@/components/layout';
import '@/styles/globals.css';
import { Changa_One } from 'next/font/google';

const changa_one = Changa_One({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }) {
  return (
    <div className={changa_one.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
