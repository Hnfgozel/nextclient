'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getReservations, getReservationsWithCustomers } from '@/utils/api';
import { ReservationWithAI } from '@/types';
import ReservationCard from '@/components/ReservationCard';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<ReservationWithAI[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const fetchReservations = async () => {
    if (!user) return;
    
    setIsLoadingData(true);
    try {
      const response = user.role === 'admin'
        ? await getReservationsWithCustomers(page, 5)
        : await getReservations(page, 5);

      setReservations(response.data);
      setTotalPages(Math.ceil(response.total / 5));
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetchReservations();
      const interval = setInterval(fetchReservations, 10000);
      return () => clearInterval(interval);
    }
  }, [user, page]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reservations Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Viewing as {user.role.toUpperCase()} - {user.username}
            </p>
          </div>

          {isLoadingData ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reservations.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    isAdmin={user.role === 'admin'}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 