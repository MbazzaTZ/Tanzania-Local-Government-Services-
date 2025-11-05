import React from 'react';

export default function StatCard({ title, value }) {
  return (
    <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition'>
      <h4 className='text-gray-600 text-sm'>{title}</h4>
      <p className='text-3xl font-bold text-green-700 mt-2'>{value}</p>
    </div>
  );
}

