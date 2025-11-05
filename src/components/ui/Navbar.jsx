import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  return (
    <header className='flex justify-between items-center px-6 py-3 bg-white shadow-md'>
      <h1 className='text-2xl font-bold text-green-700'>🇹🇿 Local Gov Portal</h1>
      <button id='themeToggle' className='p-2 rounded hover:bg-gray-100'>
        <Moon className='w-5 h-5 hidden dark:inline' />
        <Sun className='w-5 h-5 dark:hidden' />
      </button>
    </header>
  );
}

