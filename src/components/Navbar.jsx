'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  // Mock auth state for demonstration
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* App Logo/Name */}
        <Link href="/" className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
          DevUnity
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <Link href="/events" className="hover:text-emerald-600 transition">Upcoming Events</Link>
        </div>

        {/* Conditional Login/Logout & Profile Dropdown */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img 
                  src={user.photoURL || "https://via.placeholder.com/40"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
                  title={user.name}
                />
              </div>

              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-750 shadow-lg rounded-md py-2 border dark:border-gray-700 z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-4 py-2 text-sm font-semibold border-b dark:border-gray-600 text-gray-700 dark:text-gray-200">
                    {user.name}
                  </div>
                  <Link href="/events/create" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Create Event</Link>
                  <Link href="/events/manage" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Manage Events</Link>
                  <Link href="/events/joined" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Joined Events</Link>
                  <button 
                    onClick={() => setUser(null)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login"
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}