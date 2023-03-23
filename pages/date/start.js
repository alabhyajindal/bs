import Head from 'next/head';

export default function Start() {
  return (
    <>
      <Head>
        <title>Start | Blind Saturday</title>
      </Head>
      <div className='flex flex-col gap-4 mt-8 max-w-md text-lg'>
        <p className='text-3xl'>
          We&apos;re finding a match that fits your preferences.{' '}
        </p>
        <p>
          You will get a mail on{' '}
          <span className='underline'>Thursday at 9 PM</span>, with all the
          details for your date, including the time and restaurant location.
        </p>
        <p>
          Please remember that getting a date depends on the people available
          matching your preferences. You may or may not get a date this week.
        </p>
      </div>
    </>
  );
}
