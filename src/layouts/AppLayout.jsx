import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';
import Navbar from '../components/ui/Navbar';
import { Toaster } from 'react-hot-toast';

export default function AppLayout() {
  return (
    <div className='flex h-screen bg-gray-100 text-gray-900'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Navbar />
        <main className='flex-1 overflow-y-auto p-6'>
          <Outlet />
        </main>
      </div>
      <Toaster position='top-right' />
    </div>
  );
}
