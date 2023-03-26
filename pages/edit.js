import Head from 'next/head';

export default function Edit() {
  function cancelAccount() {
    //
  }

  return (
    <>
      <Head>
        <title>Edit Profile || Blind Saturday</title>
      </Head>
      <p className='mt-4 cursor-pointer'>Cancel my account</p>
    </>
  );
}
