import React from 'react';
export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-green-600 text-white'>
      <h1 className='text-4xl font-bold mb-4'>🇹🇿 Tanzania Local Government Portal</h1>
      <p className='text-lg mb-6'>Empowering citizens through digital governance.</p>
      <a href='/login' className='btn-primary'>Get Started</a>
    </div>
  );
}
