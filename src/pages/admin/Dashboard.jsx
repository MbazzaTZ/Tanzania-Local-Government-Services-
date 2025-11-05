import React from 'react';
import StatCard from '../../components/ui/StatCard';

export default function AdminDashboard() {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800'>Admin Overview 🧭</h2>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard title='Pending Verifications' value='5' />
        <StatCard title='Approved Users' value='142' />
        <StatCard title='Rejected' value='3' />
        <StatCard title='Total Citizens' value='247' />
      </div>
    </div>
  );
}

