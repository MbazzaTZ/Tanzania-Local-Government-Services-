import React from 'react';
import StatCard from '../../components/ui/StatCard';

export default function MwananchiDashboard() {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800'>Welcome, Mwananchi 👋</h2>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard title='Applications Submitted' value='4' />
        <StatCard title='Pending Approvals' value='1' />
        <StatCard title='Approved Services' value='3' />
        <StatCard title='Reports Filed' value='2' />
      </div>
    </div>
  );
}

