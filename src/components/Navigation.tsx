'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">Flights</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <span className="mr-4 text-gray-600">Welcome, {user.username}</span>
                <Link 
                  href="/dashboard" 
                  className="mr-4 text-indigo-600 hover:text-indigo-800"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 