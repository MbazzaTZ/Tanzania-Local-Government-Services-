import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className='bg-blue-800 text-white shadow-md w-full fixed top-0 left-0 z-40'>
      <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <img src='/favicon.ico' alt='Logo' className='w-8 h-8 rounded-md bg-white border border-blue-600' />
          <Link to='/' className='text-lg font-semibold tracking-wide'>
            Tanzania Local Government Portal
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-6'>
          <Link to='/' className='hover:text-yellow-300 transition'>Home</Link>
          <Link to='/services' className='hover:text-yellow-300 transition'>Services</Link>
          <Link to='/resources' className='hover:text-yellow-300 transition'>Resources</Link>
          <Link to='/citizen/forms' className='hover:text-yellow-300 transition'>Citizen Forms</Link>
          <Link to='/login' className='bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md text-blue-900 font-semibold'>
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden bg-blue-700 border-t border-blue-600 text-sm px-6 py-2 flex justify-around'>
        <Link to='/' className='hover:text-yellow-300'>Home</Link>
        <Link to='/services' className='hover:text-yellow-300'>Services</Link>
        <Link to='/resources' className='hover:text-yellow-300'>Resources</Link>
        <Link to='/login' className='hover:text-yellow-300'>Login</Link>
      </div>
    </nav>
  );
}

